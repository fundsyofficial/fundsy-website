# CI

`ci.yml` runs on every push to `main` and every pull request: install, typecheck, lint,
build. All four have to pass.

There is no `env:` block, and there should not be one. The site reads no environment
variables — all content is in `src/lib/`, all images are in `public/`. If a build step
ever needs a secret, something has been added that does not belong.
