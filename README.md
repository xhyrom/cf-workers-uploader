<div align="center">
    <h1>Cloudflare Workers Uploader</h1>
</div>

Image/file uploader that works with [Cloudflare Workers](https://workers.cloudflare.com/).

## Setup
**1)** `npm i @cloudflare/wrangler -g`
**1.5)** Rename `wrangler.example.toml` -> `wrangler.toml`
**2)** `wrangler kv:namespace create "UPLOADS"`
**2.5)** Update `wrangler.toml` variables
**3)** `wrangler publish`