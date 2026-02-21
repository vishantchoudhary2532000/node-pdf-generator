const puppeteer = require('puppeteer');
(async () => {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('https://example.com');
    console.log('Title:', await page.title());
    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error('Launch failed:', err);
    process.exit(1);
  }
})();
