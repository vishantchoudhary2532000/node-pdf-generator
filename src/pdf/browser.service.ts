import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class BrowserService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(BrowserService.name);
  private browser: puppeteer.Browser | null = null;
  private initializingPromise: Promise<void> | null = null;

  async onModuleInit() {
    await this.initBrowser();
  }

  private async initBrowser() {
    if (this.initializingPromise) {
      return this.initializingPromise;
    }

    this.initializingPromise = (async () => {
      try {
        this.logger.log('Launching Puppeteer browser instance (Singleton)...');
        this.browser = await puppeteer.launch({
          headless: true,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu',
            '--font-render-hinting=none',
          ],
        });

        this.browser.on('disconnected', () => {
          this.logger.warn('Browser process disconnected. Resetting state.');
          this.browser = null;
          this.initializingPromise = null;
        });
      } catch (error) {
        this.logger.error('Failed to launch browser', error);
        this.initializingPromise = null;
        throw error;
      }
    })();

    return this.initializingPromise;
  }

  async createNewContext(): Promise<puppeteer.BrowserContext> {
    if (!this.browser || !this.browser.isConnected()) {
      await this.initBrowser();
    }

    try {
      const browser = this.browser;
      if (!browser) throw new Error('Browser initialization failed');
      return await browser.createBrowserContext();
    } catch (error) {
      this.logger.error('Failed to create browser context, retrying browser init...', error);
      this.browser = null;
      this.initializingPromise = null;
      await this.initBrowser();
      
      const browser = this.browser as puppeteer.Browser | null;
      if (!browser) throw new Error('Browser re-initialization failed');
      return await browser.createBrowserContext();
    }
  }

  async onModuleDestroy() {
    if (this.browser) {
      this.logger.log('Closing Puppeteer browser...');
      await this.browser.close();
    }
  }
}
