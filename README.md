<div align="center">

# 📱 WhatsApp DP Fetcher API 🚀

![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![JSON](https://img.shields.io/badge/JSON-black?style=for-the-badge&logo=json&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)

<p align="center">
  <b>A high-speed, serverless API to fetch WhatsApp Profile Pictures using phone numbers.</b>
  <br />
  <i>Built for developers who need quick profile resolution without the hassle of session management.</i>
</p>

---

## 🔗 Live Endpoint
### `https://whatsapp-dp-api.vercel.app/?=91XXXXXXXXXX`

---

## 🎨 API Features
- ⚡ **Lightning Fast:** Built on Vercel Serverless Functions.
- 🛡️ **Sanitized Input:** Automatically cleans symbols (+, -, space) from phone numbers.
- 🔄 **Smart Fallback:** Automatically returns a default avatar if the DP is private or not set.
- 🔓 **CORS Enabled:** Ready to be used in any Web or Mobile application.

---

## 🚀 How to Use

Simply append the WhatsApp number (with country code) after the `?` in your URL.

| Purpose | Endpoint Structure |
| :--- | :--- |
| **Fetch DP** | `https://whatsapp-dp-api.vercel.app/?=917054606206` |

---

## 📤 Sample Response

When you hit the API, you get a clean JSON response:

```json
{
  "status": "success",
  "number": "917054606206",
  "result": "https://whatsapp-dp-api.vercel.app/?=917054606206",
  "apiOwner": "Divyansh Deewana"
}
