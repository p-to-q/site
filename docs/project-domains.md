# Project Domain Notes

This site sometimes points at projects that have their own production hostnames.

## `agent_lifeRestarter`

Planned domain posture:

- Primary public domain: `https://machinedie.life`
- Organization alias: `https://liferestart.ptoq.io`

Why:

- `machinedie.life` is the public-facing product / artwork name.
- `liferestart.ptoq.io` keeps the project legible inside the `p-to-q` namespace.

Expected configuration when the project deployment is ready:

1. Add both hostnames to the project in Vercel.
2. Set `NEXT_PUBLIC_BASE_URL=https://machinedie.life` in production.
3. Redirect `https://liferestart.ptoq.io/*` to `https://machinedie.life/*`.
4. Keep preview deployments on their preview URLs unless a dedicated staging host is introduced later.

This repository only documents and links to that project. The actual redirect and canonical behavior must be configured in the `agent_lifeRestarter` deployment repo once it is available in the workspace.
