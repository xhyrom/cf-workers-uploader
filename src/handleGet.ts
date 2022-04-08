export const handleRequest = async(request: Request): Promise<Response> => {
    const { searchParams } = new URL(request.url);
    const file = searchParams.get('file');
    const embed = searchParams.get('embed');

    if (!file) {
        return new Response(
            JSON.stringify({
                error: 'No file provided',
            }),
            { status: 400 }
        );
    }

    if (embed) {
        return new Response([
            '<!DOCTYPE html>',
            '<html>',
                '<head>',
                    '<meta property="twitter:card" content="summary_large_image">',
                    `<meta property="twitter:image" content="${request.url.replace('&embed=true', '')}">`,
                    `<meta property="og:image" content="${request.url.replace('&embed=true', '')}">`,
                '</head>',
                '<style>',
                `
                body {
                  background-color: #222222;
                  padding: 5rem 0;
                  flex: 1;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                }
                .img-fluid {
                  max-width:100%;
                  height:auto;
                }           
               `,
                '</style>',
                '<body>',
                    `<img src="${request.url.replace('&embed=true', '')}" alt="image" class="img-fluid">`,
                '</body>',
            '</html>'
        ].join('\n'), {
            headers: {
                'content-type': 'text/html;charset=UTF-8',
            },
        })
    } else {
        const arrayBuffer = await UPLOADS.get(
            file.replaceAll('.png', ''),
            'arrayBuffer'
        );
    
        return new Response(arrayBuffer);
    }
}