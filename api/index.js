const axios = require('axios');

module.exports = async (req, res) => {
    // Hidden Strings (Base64 Encoded)
    const _0x1a = "aHR0cHM6Ly91bmF2YXRhci5pby93aGF0c2FwcC8="; // unavatar.io
    const _0x2b = "aHR0cHM6Ly91aS1hdmF0YXJzLmNvbS9hcGkvP25hbWU9"; // ui-avatars
    const _0x3c = "JmJhY2tncm91bmQ9cmFuZG9t"; // &background=random

    // Decoding function
    const resolve = (str) => Buffer.from(str, 'base64').toString('utf-8');

    const query = req.url.split('?')[1] || "";
    let number = query.replace(/[^0-9]/g, "");

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    if (!number || number.length < 10) {
        return res.status(400).json({
            status: "error",
            message: "Please provide a valid WhatsApp number with country code (e.g. ?917054606206)",
            apiOwner: "Divyansh Deewana"
        });
    }

    try {
        // Constructing URLs from decrypted strings
        const dpUrl = `${resolve(_0x1a)}${number}`;
        const fallback = `${resolve(_0x2b)}${number}${resolve(_0x3c)}`;

        res.status(200).json({
            status: "success",
            number: number,
            dp_url: dpUrl,
            fallback_url: fallback,
            provider: "https://t.me/tera_paglu",
            apiOwner: "Divyansh Deewana"
        });

    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: "System fetch error",
            error: error.message
        });
    }
};
