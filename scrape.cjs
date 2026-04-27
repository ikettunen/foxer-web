const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Intercept network requests to catch product API
  let productsData = null;
  page.on('response', async response => {
    const url = response.url();
    if (url.includes('.json') || url.includes('/api/')) {
      try {
        const text = await response.text();
        if (text.includes('price') || text.includes('hinta')) {
          console.log('Found potential JSON data from:', url);
          // Try to parse it just to see
          productsData = text;
        }
      } catch (e) {}
    }
  });

  await page.goto('https://varjoliitokauppa.fi/kauppa', { waitUntil: 'networkidle' });
  
  // Wait a bit to ensure products render
  await page.waitForTimeout(2000);
  
  // Extract products from DOM if we couldn't intercept them
  const products = await page.evaluate(() => {
    const items = [];
    // Usually products are in a grid, let's grab all text blocks that look like products
    const elements = document.querySelectorAll('a, div');
    // A heuristic: look for € symbol
    const priceElements = Array.from(document.querySelectorAll('*')).filter(el => el.innerText && el.innerText.includes('€'));
    
    // Simplistic extraction:
    const gridItems = document.querySelectorAll('.grid > div'); // common tailwind pattern
    gridItems.forEach(el => {
      items.push(el.innerText);
    });
    return {
      rawPrices: priceElements.map(e => e.innerText).slice(0, 50),
      gridText: items
    };
  });

  console.log('DOM Extracted Data:', JSON.stringify(products).substring(0, 1000));
  if (productsData) {
      console.log('API Extracted Data Snippet:', productsData.substring(0, 500));
      fs.writeFileSync('products.json', productsData);
  }
  
  await browser.close();
})();
