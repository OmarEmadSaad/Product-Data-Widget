/*
  # Create product submissions table

  1. New Tables
    - `product_submissions`
      - `id` (uuid, primary key)
      - `email` (text, user email address)
      - `product_name` (text, extracted product name)
      - `price` (text, product price as displayed)
      - `page_url` (text, URL of the product page)
      - `source` (text, either 'amazon' or 'ebay')
      - `created_at` (timestamptz, submission timestamp)
  
  2. Security
    - Enable RLS on `product_submissions` table
    - Add policy for anonymous users to insert their submissions
    - Add policy for service role to read all submissions
  
  3. Notes
    - This table stores product data collected from Amazon and eBay via the widget
    - Email is stored for future communication with users
    - Price is stored as text to preserve formatting and currency symbols
*/

CREATE TABLE IF NOT EXISTS product_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  product_name text NOT NULL,
  price text NOT NULL,
  page_url text NOT NULL,
  source text NOT NULL CHECK (source IN ('amazon', 'ebay')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE product_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit product data"
  ON product_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);