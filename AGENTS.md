# Agent Instructions

- After changing any file, before ending the turn, run `npm run check:fix`. Fix
  any reported issues until the command passes cleanly.
- When changing application code, content schemas, build behavior, or tests,
  also run `npm test`.
- Mirror source paths when naming tests for application modules. For example,
  tests for `src/config/site.ts` belong in `test/config/site.test.ts`.
