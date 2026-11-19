/**
 * Compress an image file in the browser so it's under `maxBytes`.
 * Re-encodes as JPEG, scaling down as needed. Returns a File.
 */
export async function compressImage(
  file,
  { maxBytes = 2 * 1024 * 1024, maxDimension = 1600, minQuality = 0.5 } = {}
) {
  if (!file || !file.type.startsWith('image/')) {
    throw new Error('Please choose an image file (JPG, PNG or HEIC).');
  }

  // Already small enough and in a web-friendly format: send as-is.
  if (file.size <= maxBytes && /^image\/(jpeg|png|webp)$/.test(file.type)) {
    return file;
  }

  let img;
  try {
    img = await loadImage(file);
  } catch {
    if (file.size <= maxBytes) return file; // can't decode (e.g. HEIC on desktop) but small enough
    throw new Error("We couldn't read that photo. Please try a JPG or PNG under 2MB.");
  }

  let width = img.naturalWidth;
  let height = img.naturalHeight;
  let scale = Math.min(1, maxDimension / Math.max(width, height));

  for (let attempt = 0; attempt < 4; attempt++) {
    const w = Math.max(1, Math.round(width * scale));
    const h = Math.max(1, Math.round(height * scale));
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff'; // flatten transparency
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);

    for (let q = 0.85; q >= minQuality - 0.001; q -= 0.1) {
      const blob = await toBlob(canvas, 'image/jpeg', q);
      if (blob && blob.size <= maxBytes) {
        return new File([blob], baseName(file.name) + '.jpg', { type: 'image/jpeg' });
      }
    }
    scale *= 0.7; // still too big: shrink dimensions and try again
  }

  throw new Error('That photo is too large to send. Please try a smaller one.');
}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('decode failed'));
    };
    img.src = url;
  });
}

function toBlob(canvas, type, quality) {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

function baseName(name) {
  return (name || 'photo').replace(/\.[^.]+$/, '') || 'photo';
}
