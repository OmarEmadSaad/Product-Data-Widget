export const validateEmail = (email) => {
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  return { isValid: true, error: null };
};

export const validateProductData = (productData) => {
  const errors = [];

  if (!productData.productName || productData.productName === 'Product name not found') {
    errors.push('Product name could not be extracted');
  }

  if (!productData.price || productData.price === 'Price not available') {
    errors.push('Product price could not be extracted');
  }

  if (!productData.pageUrl) {
    errors.push('Page URL is missing');
  }

  if (!productData.source || !['amazon', 'ebay'].includes(productData.source)) {
    errors.push('Invalid source');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
