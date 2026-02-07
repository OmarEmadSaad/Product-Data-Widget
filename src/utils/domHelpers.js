export const detectWebsite = () => {
  const href = window.location.href.toLowerCase();
  const hostname = window.location.hostname.toLowerCase();

  // Amazon detection – تغطي amazon.com, amazon.eg, amazon.de, amazon.co.uk, amazon.ca, amazon.in, amazon.sa, amazon.ae ... إلخ
  // + الـ paths الشائعة لصفحات المنتجات (dp, gp/product, ...)
  if (
    hostname.includes("amazon.") ||
    href.includes("/dp/") ||
    href.includes("/gp/product/") ||
    href.includes("/gp/aw/d/") || // mobile/old links
    href.includes("/gp/aw/review/")
  ) {
    console.log(
      "[Tactful Widget] Detected Amazon – hostname:",
      hostname,
      "path:",
      window.location.pathname,
    );
    return "amazon";
  }

  // eBay detection – تغطي ebay.com, ebay.de, ebay.co.uk, ebay.ca, ebay.com.au, ebay.fr ... إلخ
  // + الـ pattern الأساسي لصفحة المنتج (/itm/)
  if (
    hostname.includes("ebay.") ||
    href.includes("/itm/") ||
    (href.includes("/sch/") && href.includes("/i.html?") === false) // تجنب صفحات البحث
  ) {
    console.log(
      "[Tactful Widget] Detected eBay – hostname:",
      hostname,
      "path:",
      window.location.pathname,
    );
    return "ebay";
  }

  // لو مش مدعوم – طباعة للـ debug عشان نعرف ليه
  console.warn(
    "[Tactful Widget] Unsupported website – hostname:",
    hostname,
    "full URL:",
    window.location.href,
  );
  return null;
};
