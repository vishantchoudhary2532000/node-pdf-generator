# Testing & Verification Guide

Follow these steps to test and verify the unified PDF Generator service.

## 1. Start the Server
First, ensure you are in the project directory and start the NestJS application.

```bash
cd github/node-pdf-generator
npm run start:dev
```
The server will start on [http://localhost:3000](http://localhost:3000).

## 2. Testing with Postman
1. Open Postman.
2. Click **Import** and drag-and-drop the `postman_collection.json` file from the project root.
3. You will see a collection named **Node PDF Generator**.
4. **GET Request**: Good for simple links.
5. **POST Request (Recommended)**: Best for complex data (items). Use the JSON body in Postman to add any number of items. Click **Save Response > Save to a file** to see the PDF.

## 3. Testing with Browser (Direct Download)
Copy and paste this URL into your browser to download a sample receipt:
`http://localhost:3000/pdf/receipt?name=John+Doe&orderId=INV-999&amount=599.99&logoUrl=https://cdn-icons-png.flaticon.com/512/3135/3135715.png&verifyUrl=https://google.com`

## 4. What to Verify in the PDF
- [ ] **Branding**: Logo should be on top-left, "RECEIPT" on top-right.
- [ ] **QR Code**: Scan the QR code with your phone; it should lead to the `verifyUrl`.
- [ ] **Watermark**: A light red "PAID" watermark should be in the center (rotated).
- [ ] **Header/Footer**: Open a multi-page PDF to see repeating order info at the top and page numbers at the bottom.
- [ ] **Items Table**: If items were provided, they should be listed with total calculation.

## 5. Performance Verification
Run the `verify-unified.ts` script to simulate production workload:
```bash
npx ts-node verify-unified.ts
```
This script tests the singleton browser behavior and generates a multi-page PDF.
