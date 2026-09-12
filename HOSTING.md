# Run KrishiRakshak on your chosen host

Use a host with **Node.js 22+ or Docker** for the complete website and AI backend. Netlify is optional; the included adapter remains for your temporary deployment. No npm dependencies or frontend build are required.

## Local setup
1. Copy `.env.example` to `.env` in this folder.
2. Enter `GEMINI_API_KEY`; optionally add `KINDWISE_API_KEY` for the independent crop.health opinion. Keep this file private.
3. Run `npm run check`. It reports missing configuration without printing keys. This does not verify billing or key validity.
4. Run `npm start` and open `http://localhost:3000`.

The server now automatically reads `.env` from its own project folder. Existing hosting environment variables take priority.

## Node.js hosting
Upload the project source, choose Node.js 22+, and set the start command to `npm start`. Set the two keys in your hosting provider's private environment settings. Use its supplied `PORT`; the server binds to all interfaces when a hosting port is provided. If needed, set `HOST=0.0.0.0`. The same server serves the website and `/api/` routes, so leave `API_BASE_URL` empty.

## Docker hosting
Build with `docker build -t krishirakshak .`, then run with your host's secret/environment settings. Local example: `docker run --rm --env-file .env -p 3000:3000 krishirakshak`. The image excludes `.env` files. Docker deployment has not been tested in this environment.

## Static-only hosts
Static pages cannot securely run these API integrations by themselves. Either deploy the included Node server alongside the static site, or choose Node/Docker hosting for the entire project. With separate hosting, set the backend origin in `config.js` (`API_BASE_URL`) and allow the frontend's exact origin using the backend's `ALLOWED_ORIGINS` environment variable.

Do not upload `.env` to a static public folder or put API keys in browser JavaScript. This Node server only serves an explicit list of public files; server/configuration files are not publicly served.

## Verify before SIH submission
- Open `/api/status`: configuration flags must be true. This alone does not prove provider access.
- Send one real crop question through Rakshak and confirm a sourced response.
- Test a clear leaf photo and a non-leaf photo; confirm that rejected/uncertain photos produce no disease result.
- Check expert review and download a report in your selected language.

Changing hosts does not resolve invalid API keys, missing account access or depleted provider credits. Live API checks still require working provider credentials.
