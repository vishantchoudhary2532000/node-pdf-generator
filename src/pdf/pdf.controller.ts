import { Controller, Get, Post, Body, Query, Res, Header } from '@nestjs/common';
import type { Response } from 'express';
import { PdfService } from './pdf.service';
import { GenerateReceiptDto } from './dto/receipt.dto';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get('receipt')
  @Header('Content-Type', 'application/pdf')
  async downloadReceipt(
    @Query() query: GenerateReceiptDto,
    @Res() res: Response,
  ) {
    const pdfBuffer = await this.pdfService.generateReceiptPdf(query);
    
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=receipt-${query.orderId}.pdf`,
    );
    res.send(pdfBuffer);
  }

  @Post('receipt')
  @Header('Content-Type', 'application/pdf')
  async createReceipt(
    @Body() body: GenerateReceiptDto,
    @Res() res: Response,
  ) {
    const pdfBuffer = await this.pdfService.generateReceiptPdf(body);
    
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=receipt-${body.orderId}.pdf`,
    );
    res.send(pdfBuffer);
  }
}
