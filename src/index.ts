import { handleRequest as handleCheck } from './handleCheck';
import { handleRequest as handleGet } from './handleGet';
import { handleRequest as handleUpload } from './handleUpload';

addEventListener('fetch', (event) => {
    const { searchParams } = new URL(event.request.url);

    let respondWith;
    switch (event.request.method) {
        case 'POST':
            if (searchParams.get('check')) {
                respondWith = handleCheck(event.request);
                return;
            }

            respondWith = handleUpload(event.request);
            break;
        default:
            respondWith = handleGet(event.request);
            break;
    }

    event.respondWith(respondWith);
});
