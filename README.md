# nuxt-cloudflare-dev-fetch-repro

Minimal reproduction: with `nitro.preset: 'cloudflare_module'`, `nuxt dev` (Nuxt 4.6.x) fails to render
because `$fetch('/api/config')` called from a plugin during SSR is not resolved by Nitro's local fetch.

```
✖ Error (500): [GET] "/api/config": <no response> Failed to parse URL from /api/config
  Caused by: TypeError [ERR_INVALID_URL]: Invalid URL
```

## Steps

```sh
pnpm install   # Node >= 24.11 (tested on 24.12.0)
pnpm dev
curl -i http://localhost:3000/   # => 500 (expected 200)
```

## Results (cold start: no `.nuxt` / `node_modules/.cache`, Node 24.12.0, request sent 3s after "Ready")

| Nuxt | preset | `/` |
| --- | --- | --- |
| 4.6.1 | `cloudflare_module` | 500 |
| 4.6.1 | default (node-server) | 200 |
| 4.5.2 | `cloudflare_module` | 200 |

To compare, remove `nitro.preset` from `nuxt.config.ts`, or set `nuxt` to `4.5.2` in `package.json`.
