const axios = require('axios');

module.exports = async (req, res) => {
    // Hidden Mapping (Hex Strings) - No api or ui-avatars text
    const _m1 = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x6e\x61\x76\x61\x74\x61\x72\x2e\x69\x6f\x2f\x77\x68\x61\x74\x73\x61\x70\x70\x2f";
    const _m2 = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x69\x2d\x61\x76\x61\x74\x61\x72\x73\x2e\x63\x6f\x6d\x2f\x61\x70\x69\x2f\x3f\x6e\x61\x6d\x65\x3d";
    const _m3 = "\x26\x62\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64\x3d\x72\x61\x6e\x64\x6f\x6d";

    // URL Parsing with safety checks
    const urlParts = req.url.split('?');
    const query = urlParts[1] || "";
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const protocol = req.headers['x-forwarded-proto'] || 'https';

    try {
        // --- Logic A: Image Proxy View ---
        if (query.includes('view=')) {
            const target = query.split('view=')[1];
            try {
                const response = await axios.get(_m1 + target, { responseType: 'arraybuffer', timeout: 8000 });
                res.setHeader('Content-Type', response.headers['content-type'] || 'image/jpeg');
                res.setHeader('Cache-Control', 'public, max-age=86400');
                return res.status(200).send(Buffer.from(response.data));
            } catch (err) {
                // If main source fails, hit backup
                const fallback = await axios.get(_m2 + target + _m3, { responseType: 'arraybuffer' });
                res.setHeader('Content-Type', 'image/png');
                return res.status(200).send(Buffer.from(fallback.data));
            }
        }

        // --- Logic B: JSON Metadata Response ---
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');

        // Number extraction and cleanup
        const number = query.replace(/[^0-9]/g, "");

        if (!number || number.length < 10) {
            return res.status(200).json({
                status: "success",
                message: "Divyansh Deewana Devloper- Provide number after '?'",
                usage: `https://${host}/?91xxxxxxxxxx`,
                apiOwner: "Divyansh Deewana"
            });
        }

        // Generate the masked proxy URL
        const secure_view = `${protocol}://${host}/?view=${number}`;

        return res.status(200).json({
            status: "success",
            number: number,
            dp_url: secure_view,
            provider: "https://t.me/tera_paglu",
            apiOwner: "Divyansh Deewana"
        });

    } catch (globalError) {
        // Prevent 500 crash, return clean error
        return res.status(500).json({
            status: "fail",
            error: "Internal Processing Error",
            apiOwner: "Divyansh Deewana"
        });
    }
};
