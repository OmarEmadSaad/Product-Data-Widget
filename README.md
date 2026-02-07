# Tactful Product Collector Widget

A lightweight TamperMonkey userscript widget that automatically extracts product information from Amazon and eBay product pages and collects user emails.

## Features

- **Automatic Product Data Extraction**: Extracts product name, price, and URL from Amazon and eBay product pages
- **Beautiful UI**: Modern, responsive widget with smooth animations and intuitive design
- **Email Collection**: Collects user emails with validation
- **Data Persistence**: Stores collected data in Supabase database
- **Style Isolation**: Uses Tailwind CSS without conflicting with host website styles
- **Minimizable Widget**: Can be minimized or closed by the user
- **Multi-Site Support**: Works on multiple Amazon and eBay domains (US, UK, CA, DE, FR)

## Project Structure

```
tactful-widget/
│
├── userscript/
│   └── tactful-widget.user.js        # TamperMonkey script - injects bundled widget
│
├── src/
│   ├── widget-main.jsx               # React entry point - mounts widget
│   │
│   ├── components/
│   │   ├── Widget.jsx                # Main widget container
│   │   ├── EmailForm.jsx             # Email input + validation + submit
│   │   └── ProductInfo.jsx           # Displays extracted product data
│   │
│   ├── hooks/
│   │   └── useProductData.js         # Handles product scraping logic
│   │
│   ├── scrapers/
│   │   ├── amazonScraper.js          # Extract Amazon product data
│   │   └── ebayScraper.js            # Extract eBay product data
│   │
│   ├── services/
│   │   └── apiService.js             # Handles sending data via Fetch API
│   │
│   └── utils/
│       ├── validators.js             # Email validation helpers
│       └── domHelpers.js             # DOM helper functions
│
├── supabase/
│   └── functions/
│       └── submit-product/           # Edge function for data submission
│
├── dist/                             # Built widget bundle
├── vite.config.ts                    # Vite configuration for widget bundling
└── README.md
```

## Technology Stack

- **React** - UI framework
- **Tailwind CSS** - Styling (no CSS file needed)
- **Vite** - Build tool and bundler
- **Supabase** - Backend database and Edge Functions
- **TamperMonkey** - Userscript manager
- **Lucide React** - Icons

## Installation & Setup

### 1. Prerequisites

- Node.js (v18 or higher)
- TamperMonkey browser extension ([Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/))
- Supabase account (already configured in this project)

### 2. Build the Widget

```bash
# Install dependencies
npm install

# Build the widget bundle
npm run build
```

This will generate the following files in the `dist/` folder:
- `tactful-widget.iife.js` - The main widget JavaScript bundle
- `tactful-widget.css` - The widget styles

### 3. Host the Widget Files

You need to host the built files on a publicly accessible server. Options include:

- **GitHub Pages**: Push the `dist` folder to a GitHub repo and enable GitHub Pages
- **Netlify/Vercel**: Deploy the `dist` folder
- **Your own server**: Upload files to your web server

Example using Python's simple HTTP server for local testing:
```bash
cd dist
python3 -m http.server 8000
```

### 4. Configure the Userscript

1. Open `userscript/tactful-widget.user.js`
2. Update the following URLs with your hosted files:

```javascript
const WIDGET_JS_URL = 'https://your-domain.com/tactful-widget.iife.js';
const WIDGET_CSS_URL = 'https://your-domain.com/tactful-widget.css';
```

### 5. Install the Userscript

1. Open TamperMonkey dashboard in your browser
2. Click "Create a new script"
3. Copy the entire contents of `userscript/tactful-widget.user.js`
4. Paste it into the TamperMonkey editor
5. Click "File" → "Save" or press `Ctrl+S`

## Testing

### Test on Amazon

1. Go to any Amazon product page:
   - US: https://www.amazon.com/dp/B08N5WRWNW
   - UK: https://www.amazon.co.uk/dp/B08N5WRWNW

2. The widget should appear in the bottom-right corner
3. Verify product name and price are extracted correctly
4. Enter your email and click "Submit Product Data"
5. Check for success message

### Test on eBay

1. Go to any eBay product page:
   - US: https://www.ebay.com/itm/[any-item-id]
   - UK: https://www.ebay.co.uk/itm/[any-item-id]

2. The widget should appear in the bottom-right corner
3. Verify product name and price are extracted correctly
4. Enter your email and click "Submit Product Data"
5. Check for success message

## Database Schema

The widget stores data in a Supabase table with the following structure:

```sql
CREATE TABLE product_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  product_name text NOT NULL,
  price text NOT NULL,
  page_url text NOT NULL,
  source text NOT NULL CHECK (source IN ('amazon', 'ebay')),
  created_at timestamptz DEFAULT now()
);
```

## Architecture Overview

### 1. Data Flow

```
Product Page → Scraper → useProductData Hook → Widget UI → EmailForm → API Service → Supabase Edge Function → Database
```

### 2. Widget Lifecycle

1. **Injection**: TamperMonkey userscript injects the widget container into the page
2. **Loading**: Widget CSS and JS files are loaded from hosted URLs
3. **Initialization**: React app mounts into the injected container
4. **Scraping**: Product data is extracted from the current page
5. **Display**: Widget shows extracted data to the user
6. **Submission**: User enters email and submits data
7. **Storage**: Data is sent to Supabase and stored in the database

### 3. Component Architecture

- **Widget.jsx**: Main container, handles minimize/close state
- **ProductInfo.jsx**: Displays extracted product data with refresh button
- **EmailForm.jsx**: Handles email input, validation, and submission
- **useProductData.js**: Custom hook that detects website and extracts data
- **Scrapers**: Website-specific DOM scraping logic

### 4. Style Isolation

The widget uses Tailwind CSS classes that are scoped to the widget container, preventing conflicts with host website styles. The widget is rendered in a fixed position container with a high z-index.

## Troubleshooting

### Widget Not Appearing

- Check browser console for errors
- Verify TamperMonkey is enabled
- Ensure you're on a product page (not search results)
- Check that URLs in userscript are correct and accessible

### Product Data Not Extracted

- Amazon/eBay may change their HTML structure
- Check browser console for scraping errors
- Update selectors in `amazonScraper.js` or `ebayScraper.js`

### Submission Fails

- Check network tab for failed requests
- Verify Supabase Edge Function is deployed
- Check that environment variables are set correctly

## Development

### Local Development

```bash
# Install dependencies
npm install

# Start development server (for testing the widget UI)
npm run dev
```

Visit `http://localhost:5173` to see the widget in development mode.

### Build for Production

```bash
npm run build
```

### Lint Code

```bash
npm run lint
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Security & Privacy

- Email validation is performed both client-side and server-side
- Data is transmitted over HTTPS
- Row Level Security (RLS) is enabled on the database
- No sensitive data is stored in the userscript

## License

MIT License

## Support

For issues, questions, or contributions, please open an issue on the GitHub repository.

---

Built with React, Tailwind CSS, Vite, and Supabase
