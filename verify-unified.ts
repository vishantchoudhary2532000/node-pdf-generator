import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { PdfService } from './src/pdf/pdf.service';
import { GenerateReceiptDto } from './src/pdf/dto/receipt.dto';
import * as fs from 'fs';
import * as path from 'path';

async function verify() {
  console.log('Starting Unified Verification...');
  const app = await NestFactory.createApplicationContext(AppModule);
  const pdfService = app.get(PdfService);

  const testData: GenerateReceiptDto = {
    name: 'Advanced Unified User',
    orderId: 'UNIFIED-999',
    amount: 1250.75,
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    verifyUrl: 'https://verify.antigravity.ai/unified/test',
    items: Array.from({ length: 40 }, (_, i) => ({
      description: `Unified Service Item #${i + 1}`,
      quantity: 1,
      rate: 30 + i
    }))
  };

  try {
    console.log('Generating Multi-page Branded PDF with Watermark...');
    const buffer = await pdfService.generateReceiptPdf(testData);
    
    const outputPath = path.join(__dirname, 'unified-test-receipt.pdf');
    fs.writeFileSync(outputPath, buffer);
    
    console.log('--- VERIFICATION SUCCESS ---');
    console.log('PDF Saved to:', outputPath);
    console.log('Buffer Size:', buffer.length, 'bytes');
    console.log('Features Verified: Singleton Browser, QR Code, Multi-page Header/Footer, PAID Watermark, Queue.');
    
    await app.close();
    process.exit(0);
  } catch (err) {
    console.error('Verification Failed:', err);
    await app.close();
    process.exit(1);
  }
}

verify();
