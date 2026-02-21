# Unified Node PDF Generator Production Guide

This project combines all high-end features: Browser Pooling, Multi-page support, Watermarks, and QR Code generation.

## Features
- **Singleton Browser**: Reuses Chromium instance via incognito contexts.
- **Concurrency Queue**: Limits parallel renders to 5.
- **Advanced Templates**: Supports fixed headers/footers and "PAID" watermarks.
- **Validation**: Strict DTO validation for all requests.

## Deployment on Linux/EC2

### 1. Install Dependencies
```bash
sudo apt update
sudo apt install -y chromium-browser fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils
```

### 2. Run in Production
```bash
npm install
npm run build
npm run start:prod
```

### 3. API Usage
`GET /pdf/receipt?name=John+Doe&orderId=123&amount=499&logoUrl=...&verifyUrl=...`
