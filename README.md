<div align="center">
    <h1>Cloudflare Workers Uploader</h1>
</div>

Image/file uploader that works with [Cloudflare Workers](https://workers.cloudflare.com/).  

## Examples

### ShareX Config

```json
{
  "Version": "13.6.1",
  "Name": "cf-workers",
  "DestinationType": "ImageUploader, TextUploader, FileUploader",
  "RequestMethod": "POST",
  "RequestURL": "https://cf-workers-uploader.hyro.workers.dev/",
  "Headers": {
    "Authorization": "authorization key"
  },
  "Body": "MultipartFormData",
  "FileFormName": "file",
  "URL": "$json:url$"
}
```

## NodeJS - Undici

```js
import { fetch } from 'undici';
import { readFile } from 'fs/promises';
import FormData from 'form-data';

(async() => {
    const formData = new FormData();

    const image = await readFile('./name_of_file.png');
    formData.append('file', image, 'name_of_file.png');

    const res = await fetch('https://cf-workers-uploader.hyro.workers.dev/', {
        method: 'POST',
        headers: {
            ...formData.getHeaders(),
            'Authorization': 'authorization key'
        },
        body: formData.getBuffer()
    }).catch(() => {})

    console.log((await res.json()))
})();
```

## Setup
**1)** `npm i @cloudflare/wrangler -g`  
**1.5)** Rename `wrangler.example.toml` -> `wrangler.toml`  
**2)** `wrangler kv:namespace create "UPLOADS"`  
**2.5)** Update `wrangler.toml` variables  
**3)** `wrangler secret put AUTH_TOKEN`  
**4)** `wrangler publish`  