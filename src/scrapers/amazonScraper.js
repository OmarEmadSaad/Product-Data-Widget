export const scrapeAmazonProduct = () => {
  try {
    const productName =
      document.querySelector('#productTitle')?.textContent?.trim() ||
      document.querySelector('h1.a-size-large')?.textContent?.trim() ||
      'Product name not found';

    const priceWhole = document.querySelector('.a-price-whole')?.textContent?.trim();
    const priceFraction = document.querySelector('.a-price-fraction')?.textContent?.trim();
    const priceSymbol = document.querySelector('.a-price-symbol')?.textContent?.trim();

    let price = 'Price not available';
    if (priceWhole) {
      price = `${priceSymbol || '$'}${priceWhole}${priceFraction || ''}`;
    } else {
      const altPrice = document.querySelector('.a-price .a-offscreen')?.textContent?.trim();
      if (altPrice) {
        price = altPrice;
      }
    }

    const pageUrl = window.location.href;

    return {
      productName,
      price,
      pageUrl,
      source: 'amazon',
    };
  } catch (error) {
    console.error('Error scraping Amazon product:', error);
    return {
      productName: 'Error extracting product name',
      price: 'Error extracting price',
      pageUrl: window.location.href,
      source: 'amazon',
    };
  }
};
