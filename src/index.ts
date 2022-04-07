import { handleRequest as handleCheck } from './handleCheck';
import { handleRequest as handleGet } from './handleGet';
import { handleRequest as handleUpload } from './handleUpload';

addEventListener('fetch', event => {
    const { searchParams } = new URL(event.request.url);

    let respondWith;
    if (event.request.method === 'POST' && searchParams.get('check')) {
        respondWith = handleCheck(event.request)
    } else if (event.request.method === 'POST') {
        respondWith = handleUpload(event.request);
    } else {
        respondWith = handleGet(event.request);
    }

    event.respondWith(respondWith)
});