import { useState, useEffect } from 'react';
import { scrapeAmazonProduct } from '../scrapers/amazonScraper';
import { scrapeEbayProduct } from '../scrapers/ebayScraper';
import { detectWebsite } from '../utils/domHelpers';

export const useProductData = () => {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const extractProductData = () => {
      try {
        const website = detectWebsite();

        if (!website) {
          setError('Unsupported website');
          setLoading(false);
          return;
        }

        let data;
        if (website === 'amazon') {
          data = scrapeAmazonProduct();
        } else if (website === 'ebay') {
          data = scrapeEbayProduct();
        }

        setProductData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error extracting product data:', err);
        setError('Failed to extract product data');
        setLoading(false);
      }
    };

    setTimeout(extractProductData, 1000);
  }, []);

  const refreshProductData = () => {
    setLoading(true);
    setError(null);

    const website = detectWebsite();
    if (!website) {
      setError('Unsupported website');
      setLoading(false);
      return;
    }

    let data;
    if (website === 'amazon') {
      data = scrapeAmazonProduct();
    } else if (website === 'ebay') {
      data = scrapeEbayProduct();
    }

    setProductData(data);
    setLoading(false);
  };

  return { productData, loading, error, refreshProductData };
};
