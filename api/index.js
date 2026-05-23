const axios = require('axios');

module.exports = async (req, res) => {
    // Hidden sources using Hex mapping
    const _s1 = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x6e\x61\x76\x61\x74\x61\x72\x2e\x69\x6f\x2f\x77\x68\x61\x74\x73\x61\x70\x70\x2f";
    const _s2 = "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x75\x69\x2d\x61\x76\x61\x74\x61\x72\x73\x2e\x63\x6f\x6d\x2f\x61\x70\x6i\x2f\x3f\x6e\x61\x6d\x65\x3d";
    
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const query = req.url.split('?')[1] || "";
    
    // Case 1: Image Request (Internal Proxy)
    if (query.startsWith('view=')) {
        const targetNum = query.replace('view=', '');
        try {
            const response = await axios.get(_s1 + targetNum, { responseType: 'arraybuffer' });
            res.setHeader('Content-Type', response.headers['content-type']);
            return res.send(response.data);
        } catch (e) {
            const fallback = await axios.get(_s2 + targetNum, { responseType: 'arraybuffer' });
            res.setHeader('Content-Type', 'image/png');
            return res.send(fallback.data);
        }
    }

    // Case 2: JSON Response
    let number = query.replace(/[^0-9]/g, "");
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    if (!number || number.length < 10) {
        return res.status(400).json({
            status: "error",
            message: "Invalid number parameter",
            apiOwner: "Divyansh Deewana"
        });
    }

    // Proxy URL generation (This hides the original source)
    const secure_url = `${protocol}://${host}/?view=${number}`;

    res.status(200).json({
        status: "success",
        number: number,
        dp_url: secure_url,
        provider: "https://t.me/tera_paglu",
        apiOwner: "Divyansh Deewana"
    });
};
