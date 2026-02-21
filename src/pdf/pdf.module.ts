import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { BrowserService } from './browser.service';
import { PdfController } from './pdf.controller';

@Module({
  providers: [PdfService, BrowserService],
  controllers: [PdfController],
})
export class PdfModule {}
