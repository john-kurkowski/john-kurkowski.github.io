# Deployment

This site intentionally separates CI from production publishing.

Netlify owns the builds. GitHub Actions owns the production publishing gate.
Auto publishing must stay locked in Netlify so production deploys can be built
without going live before CI passes.

## Deploy Flow

- Pull requests get Netlify Deploy Previews through Netlify's Git integration.
- Non-production branches get Netlify branch deploys, depending on the site's
  branch deploy settings in Netlify.
- Pushes to `master` create Netlify production deploys, but Netlify does not
  publish them automatically while auto publishing is locked.
- After GitHub Actions checks pass on `master`, the production deploy job finds
  the Netlify production deploy for the same commit SHA and publishes that
  deploy.

## Production Invariants

- Keep Netlify builds active.
- Keep Netlify auto publishing locked.
- Do not replace the GitHub Actions publish step with an artifact upload unless
  production should stop exercising Netlify's build environment.
- Do not publish a Netlify deploy unless its commit SHA matches the GitHub
  Actions run that passed CI.

## Troubleshooting

If production does not publish after CI passes:

- Check the GitHub Actions production deploy job logs.
- Confirm `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` are available to GitHub
  Actions.
- Confirm Netlify has a production deploy for the same commit SHA.
- Confirm the matching Netlify deploy reached the `ready` state.
- Confirm Netlify auto publishing is still locked; the workflow publishes one
  matching deploy and does not unlock future automatic publishing.
