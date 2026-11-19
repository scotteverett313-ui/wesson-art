import { useEffect, useRef, useState } from 'react';
import { site } from '../data/site.js';
import SectionHeading from './SectionHeading.jsx';
import Reveal from './Reveal.jsx';
import { compressImage } from '../lib/compressImage.js';

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;
const MAX_PHOTO_BYTES = 2 * 1024 * 1024;

const initial = {
  name: '',
  phone: '',
  service: '',
  time1: '',
  time2: '',
  time3: '',
  notes: '',
};

function validate(values, photoError) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  const digits = values.phone.replace(/\D/g, '');
  if (!digits) errors.phone = 'Please enter your phone number so Miss G can text you.';
  else if (digits.length < 10 || digits.length > 11) errors.phone = 'Please enter a 10-digit phone number, like 313-555-0123.';
  if (!values.service) errors.service = 'Please choose a service.';
  if (!values.time1.trim()) errors.time1 = 'Please add at least two days and times that work for you.';
  if (!values.time2.trim()) errors.time2 = 'Please add a second option in case the first is taken.';
  if (photoError) errors.photo = photoError;
  return errors;
}

export default function BookingForm() {
  const { accent, title } = site.sections.booking;
  const [values, setValues] = useState(initial);
  const [photo, setPhoto] = useState(null); // original File
  const [photoPreview, setPhotoPreview] = useState('');
  const [photoError, setPhotoError] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false); // user tried to submit at least once
  const [status, setStatus] = useState('idle'); // idle | compressing | sending | success | error
  const [serverMessage, setServerMessage] = useState('');
  const formRef = useRef(null);
  const successRef = useRef(null);

  useEffect(() => {
    if (!photo) {
      setPhotoPreview('');
      return undefined;
    }
    const url = URL.createObjectURL(photo);
    setPhotoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [photo]);

  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  function update(e) {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    if (submitted) setErrors(validate(next, photoError));
  }

  function onPhotoChange(e) {
    const file = e.target.files?.[0] || null;
    setPhoto(file);
    let err = '';
    if (file && !file.type.startsWith('image/')) err = 'Please choose a photo (JPG, PNG or HEIC).';
    setPhotoError(err);
    if (submitted) setErrors(validate(values, err));
  }

  function clearPhoto() {
    setPhoto(null);
    setPhotoError('');
    const input = formRef.current?.querySelector('input[name="photo"]');
    if (input) input.value = '';
    if (submitted) setErrors(validate(values, ''));
  }

  function focusFirstError(errs) {
    const first = Object.keys(errs)[0];
    const el = formRef.current?.querySelector(`[name="${first}"]`);
    el?.focus();
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setServerMessage('');
    const errs = validate(values, photoError);
    setErrors(errs);
    if (Object.keys(errs).length) {
      focusFirstError(errs);
      return;
    }

    if (!ENDPOINT) {
      setStatus('error');
      setServerMessage(
        `The booking form isn't connected yet. Please DM @${site.contact.instagramHandle} on Instagram or text ${site.contact.phoneDisplay}.`
      );
      console.warn('VITE_FORM_ENDPOINT is not set. See .env.example.');
      return;
    }

    const data = new FormData();
    data.append('name', values.name.trim());
    data.append('phone', values.phone.trim());
    data.append('service', values.service);
    data.append('preferred_time_1', values.time1.trim());
    data.append('preferred_time_2', values.time2.trim());
    if (values.time3.trim()) data.append('preferred_time_3', values.time3.trim());
    if (values.notes.trim()) data.append('notes', values.notes.trim());
    data.append('_subject', `New booking request from ${values.name.trim()}`);
    // Honeypot: real people never fill this in.
    const gotcha = formRef.current?.elements.namedItem('_gotcha');
    if (gotcha && gotcha.value) return;

    try {
      if (photo) {
        setStatus('compressing');
        const compressed = await compressImage(photo, { maxBytes: MAX_PHOTO_BYTES });
        data.append('photo', compressed, compressed.name);
      }

      setStatus('sending');
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
        return;
      }

      let message = "Something went wrong and your request didn't send.";
      try {
        const body = await res.json();
        if (body?.errors?.length) {
          message = body.errors.map((er) => er.message).join(' ');
        } else if (body?.error) {
          message = body.error;
        }
      } catch {
        /* non-JSON response */
      }
      setStatus('error');
      setServerMessage(`${message} Please try again or DM @${site.contact.instagramHandle} on Instagram.`);
    } catch (err) {
      setStatus('error');
      const isPhotoError = err?.message && /photo/i.test(err.message);
      setServerMessage(
        isPhotoError
          ? err.message
          : `We couldn't reach the booking service. Check your connection and try again, or DM @${site.contact.instagramHandle} on Instagram.`
      );
      if (isPhotoError) {
        setPhotoError(err.message);
        setErrors(validate(values, err.message));
      }
    }
  }

  const busy = status === 'compressing' || status === 'sending';
  const errorCount = Object.keys(errors).length;

  if (status === 'success') {
    return (
      <section id="book" className="section section--dark" aria-labelledby="booking-title">
        <div className="container booking">
          <SectionHeading accent={accent} title={title} id="booking-title" />
          <div className="form-card form-card--success" role="status" tabIndex={-1} ref={successRef}>
            <p className="success__title">Request sent!</p>
            <p className="success__body">{site.booking.successMessage}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="book" className="section section--dark" aria-labelledby="booking-title">
      <div className="container booking">
        <SectionHeading accent={accent} title={title} id="booking-title" />
        <Reveal as="p" className="section-intro section-intro--on-dark">
          {site.booking.intro}
        </Reveal>

        <Reveal className="form-card">
          <form ref={formRef} onSubmit={onSubmit} noValidate encType="multipart/form-data">
            {submitted && errorCount > 0 && (
              <div className="form-alert" role="alert">
                Please fix the {errorCount === 1 ? 'highlighted field' : `${errorCount} highlighted fields`} below.
              </div>
            )}
            {status === 'error' && serverMessage && (
              <div className="form-alert" role="alert">
                {serverMessage}
              </div>
            )}

            <Field label="Your name" name="name" error={errors.name} required>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={update}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                required
              />
            </Field>

            <Field label="Phone number" name="phone" hint="Miss G confirms by text." error={errors.phone} required>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="313-555-0123"
                value={values.phone}
                onChange={update}
                aria-invalid={!!errors.phone}
                aria-describedby={[errors.phone ? 'phone-error' : null, 'phone-hint'].filter(Boolean).join(' ')}
                required
              />
            </Field>

            <Field label="Service" name="service" error={errors.service} required>
              <select
                id="service"
                name="service"
                value={values.service}
                onChange={update}
                aria-invalid={!!errors.service}
                aria-describedby={errors.service ? 'service-error' : undefined}
                required
              >
                <option value="">Choose a service…</option>
                {site.services.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name}
                  </option>
                ))}
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </Field>

            <fieldset className="fieldset">
              <legend>
                Preferred days &amp; times <span className="req" aria-hidden="true">*</span>
              </legend>
              <p className="hint" id="times-hint">
                Give two or three options, for example “Saturday Nov 29, afternoon”.
              </p>
              <Field label="Option 1" name="time1" error={errors.time1} required>
                <input
                  id="time1"
                  name="time1"
                  type="text"
                  value={values.time1}
                  onChange={update}
                  aria-invalid={!!errors.time1}
                  aria-describedby={[errors.time1 ? 'time1-error' : null, 'times-hint'].filter(Boolean).join(' ')}
                  required
                />
              </Field>
              <Field label="Option 2" name="time2" error={errors.time2} required>
                <input
                  id="time2"
                  name="time2"
                  type="text"
                  value={values.time2}
                  onChange={update}
                  aria-invalid={!!errors.time2}
                  aria-describedby={errors.time2 ? 'time2-error' : undefined}
                  required
                />
              </Field>
              <Field label="Option 3 (optional)" name="time3">
                <input id="time3" name="time3" type="text" value={values.time3} onChange={update} />
              </Field>
            </fieldset>

            <Field
              label="Photo of your current hair (optional)"
              name="photo"
              hint="Helps Miss G plan your time. Large photos are shrunk automatically before sending."
              error={errors.photo}
            >
              <input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                onChange={onPhotoChange}
                aria-invalid={!!errors.photo}
                aria-describedby={[errors.photo ? 'photo-error' : null, 'photo-hint'].filter(Boolean).join(' ')}
              />
              {photoPreview && !photoError && (
                <div className="photo-preview">
                  <img src={photoPreview} alt="Preview of the photo you chose" />
                  <button type="button" className="btn btn--ghost btn--sm" onClick={clearPhoto}>
                    Remove photo
                  </button>
                </div>
              )}
            </Field>

            <Field label="Anything else? (optional)" name="notes" hint="Hair length, style inspo, allergies, questions.">
              <textarea id="notes" name="notes" rows={4} value={values.notes} onChange={update} aria-describedby="notes-hint" />
            </Field>

            {/* Honeypot for spam bots. Hidden from people and screen readers. */}
            <div className="hp" aria-hidden="true">
              <label htmlFor="_gotcha">Leave this empty</label>
              <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn--dark btn--lg" disabled={busy} aria-busy={busy}>
                {status === 'compressing' ? 'Preparing photo…' : status === 'sending' ? 'Sending…' : 'Send Booking Request'}
              </button>
              <p className="hint">No payment now. Miss G will confirm by text.</p>
            </div>
            <p className="visually-hidden" aria-live="polite">
              {status === 'compressing' ? 'Preparing your photo.' : status === 'sending' ? 'Sending your request.' : ''}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, name, hint, error, required, children }) {
  return (
    <div className={`field ${error ? 'field--error' : ''}`}>
      <label htmlFor={name}>
        {label}
        {required && (
          <span className="req" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>
      {hint && (
        <p className="hint" id={`${name}-hint`}>
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p className="error" id={`${name}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
