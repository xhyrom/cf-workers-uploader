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
                `/* This Source Code Form is subject to the terms of the Mozilla Public
                * License, v. 2.0. If a copy of the MPL was not distributed with this file,
                * You can obtain one at http://mozilla.org/MPL/2.0/. */
               
               @media not print {
                 /* N.B.: Remember to update ImageDocument.css in the tree or reftests may fail! */
               
                 body {
                   color: #eee;
                   background-image: url("chrome://global/skin/media/imagedoc-darknoise.png");
                 }
               
                 img.transparent {
                   background: hsl(0,0%,90%) url("chrome://global/skin/media/imagedoc-lightnoise.png");
                   color: #222;
                 }
               }

               /* -*- Mode: C++; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
                /* This Source Code Form is subject to the terms of the Mozilla Public
                * License, v. 2.0. If a copy of the MPL was not distributed with this
                * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

                /*
                * This CSS stylesheet defines the rules to be applied to any ImageDocuments,
                * including those in frames.
                */

                body {
                /* To give the image access to our document's full viewport, we need to
                    override the margin that the html.css UA stylesheet would otherwise apply
                    to our body. */
                margin: 0;
                }

                @media not print {
                .shrinkToFit {
                    cursor: zoom-in;
                }

                .overflowingVertical, .overflowingHorizontalOnly {
                    cursor: zoom-out;
                }
                }

                img {
                display: block;
                }

                /* -*- Mode: C++; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
                /* This Source Code Form is subject to the terms of the Mozilla Public
                 * License, v. 2.0. If a copy of the MPL was not distributed with this
                 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
                
                /*
                  This CSS stylesheet defines the rules to be applied to ImageDocuments that
                  are top level (e.g. not iframes).
                */
                
                @media not print {
                  img {
                    text-align: center;
                    position: absolute;
                    margin: auto;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                  }
                
                  img.overflowingVertical {
                    /* If we're overflowing vertically, we need to set margin-top to
                       0.  Otherwise we'll end up trying to vertically center, and end
                       up cutting off the top part of the image. */
                    margin-top: 0;
                  }
                
                  .completeRotation {
                    transition: transform 0.3s ease 0s;
                  }
                }
                
                img {
                  image-orientation: from-image;
                }                
               `,
                '</style>',
                '<body>',
                    `<img src="${request.url.replace('&embed=true', '')}" alt="image" class="transparent">`,
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