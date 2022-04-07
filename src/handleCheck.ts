const sha1 = async(file: File): Promise<string> => {
    const fileData = await file.arrayBuffer();
    const digest = await crypto.subtle.digest('SHA-1', fileData);
    const array = Array.from(new Uint8Array(digest));
    const sha1 =  array.map(b => b.toString(16).padStart(2, '0')).join('')
    return sha1;
}

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

    if (typeof AUTH_TOKEN !== 'undefined' && request.headers.get('authorization') !== AUTH_TOKEN) {
        return new Response(
            JSON.stringify({
                error: 'Invalid authorization token',
            }),
            { status: 401 }
        );
    }

    const hash = await sha1(file);

    return new Response(JSON.stringify({
        name: file.name,
        type: file.type,
        size: file.size,
        hash,
    }));
}