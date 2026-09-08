# CI

`ci.yml` runs on every push to `main` and every pull request: install, typecheck,
lint, build. All four have to pass.

The build step is given placeholder Supabase values on purpose. The site must build
without real credentials — if that stops being true, this job fails, which is the
signal that something is reading the database at build time when it should not be.

Once the site is on Vercel, add the real values as repository secrets and reference
them here instead.
