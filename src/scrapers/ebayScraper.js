export const scrapeEbayProduct = () => {
  try {
    const productName =
      document.querySelector('h1.x-item-title__mainTitle')?.textContent?.trim() ||
      document.querySelector('.it-ttl')?.textContent?.trim() ||
      document.querySelector('[data-testid="x-item-title"]')?.textContent?.trim() ||
      'Product name not found';

    const priceElement =
      document.querySelector('.x-price-primary .ux-textspans')?.textContent?.trim() ||
      document.querySelector('.mainPrice')?.textContent?.trim() ||
      document.querySelector('[itemprop="price"]')?.textContent?.trim() ||
      document.querySelector('.notranslate')?.textContent?.trim();

    const price = priceElement || 'Price not available';

    const pageUrl = window.location.href;

    return {
      productName,
      price,
      pageUrl,
      source: 'ebay',
    };
  } catch (error) {
    console.error('Error scraping eBay product:', error);
    return {
      productName: 'Error extracting product name',
      price: 'Error extracting price',
      pageUrl: window.location.href,
      source: 'ebay',
    };
  }
};
