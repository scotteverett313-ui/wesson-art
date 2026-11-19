# DJ landing page

A single-file landing page for a house music DJ: `index.html`. No build step, no dependencies beyond Google Fonts.

## Editing

Everything on the page comes from the `SITE` object at the top of the `<script>` block in `index.html`:

- `name`, `city`, `genre`, `lede`, `facts` drive the hero.
- `about`, `genres`, `rider`, `credits` fill the About section.
- `events` is one list. Each entry has a `date` (`YYYY-MM-DD`). Dates on or after today show under Upcoming, older ones under Past, grouped by year. Optional fields: `time`, `tag`, `note`, `link` (tickets).
- `tracks` feeds the player. Drop MP3 files in an `audio/` folder next to `index.html` and set `src`. The first sample track has `demo: true`, which plays a synthesized house groove so the player works before any files exist. Delete it once real mixes are in.
- `soundcloud` is the profile URL. It powers the embedded SoundCloud player and the Listen/SoundCloud buttons.
- `socials` are the handle pills. `feed` is the list of post cards. For an Instagram post, set `embed: true` and the post URL to show the post itself instead of a card.
- `booking.email` is shown on the page. Leave `booking.endpoint` blank to send requests through the visitor's email app, or set it to a Formspree (or similar) POST URL to submit directly.

Sample events, posts and the demo track are placeholders. Replace them before going live.

## Deploying

Upload `index.html` (and the `audio/` folder if used) to any static host: Netlify, Vercel, GitHub Pages, or a plain web server. The SoundCloud and Instagram embeds need a real `https://` origin, so they will not render from a local `file://` open.
