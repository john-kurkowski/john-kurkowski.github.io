# Jujutsu article scripts

These scripts support the stacked-diff visualization in the Jujutsu article. Run
commands from the repository root.

Regenerate the authentic `jj log` fixtures:

```sh
scripts/posts/jujutsu-for-ai-assisted-coding/setup-stacked-diff-fixture.sh
```

This replaces the text fixtures in
`src/components/posts/jujutsu-for-ai-assisted-coding/fixtures/`.

Regenerate the 1200×630 raster preview:

```sh
PLAYWRIGHT_CHANNEL=chrome npm exec -- tsx scripts/posts/jujutsu-for-ai-assisted-coding/capture-stacked-diff.ts
```

This replaces the SEO image in
`src/content/posts/2026-07-12-jujutsu-for-ai-assisted-coding/`. Omit
`PLAYWRIGHT_CHANNEL=chrome` when Playwright's bundled Chromium is installed.
