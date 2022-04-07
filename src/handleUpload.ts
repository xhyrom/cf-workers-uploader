import { nanoid } from 'nanoid';

export const handleRequest = async(request: Request): Promise<Response> => {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
        return new Response(
            JSON.stringify({
                error: 'No file provided',
            }),
            { status: 400 }
        );
    }

    if (AUTH_TOKEN && request.headers.get('authorization') !== AUTH_TOKEN) {
        return new Response(
            JSON.stringify({
                error: 'Invalid authorization token',
            }),
            { status: 401 }
        );
    }

    const arrayBuffer = await file.arrayBuffer();

    const id = nanoid(12);

    return new Promise((resolve, reject) => {
        UPLOADS.put(id, arrayBuffer)
            .then(() => {
                return resolve(new Response(JSON.stringify({
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    success: true,
                    url: `https://${new URL(request.url).hostname}/?file=${id}&embed=true`,
                    id
                })));
            })
            .catch((e) => {
                return resolve(new Response(JSON.stringify({
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    success: false,
                    error: e
                })));
            }); 
    });
}