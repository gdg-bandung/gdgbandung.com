/*
  # URL Shortener Schema

  1. New Tables
    - `short_urls`: Stores shortened URL data
      - `id` (uuid, primary key)
      - `original_url` (text)
      - `short_code` (text, unique)
      - `custom_alias` (text, unique, nullable)
      - `created_at` (timestamp)
      - `expires_at` (timestamp, nullable)
      - `password` (text, nullable)
      - `user_id` (uuid, references auth.users)
      - `click_count` (integer)

    - `url_clicks`: Stores click analytics
      - `id` (uuid, primary key)
      - `url_id` (uuid, references short_urls)
      - `clicked_at` (timestamp)
      - `referrer` (text, nullable)
      - `ip_address` (text)
      - `user_agent` (text)
      - `country` (text, nullable)
      - `city` (text, nullable)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create short_urls table
CREATE TABLE IF NOT EXISTS short_urls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  original_url text NOT NULL,
  short_code text UNIQUE NOT NULL,
  custom_alias text UNIQUE,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  password text,
  user_id uuid REFERENCES auth.users NOT NULL,
  click_count integer DEFAULT 0,
  CHECK (char_length(short_code) >= 4)
);

-- Create url_clicks table
CREATE TABLE IF NOT EXISTS url_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url_id uuid REFERENCES short_urls NOT NULL,
  clicked_at timestamptz DEFAULT now(),
  referrer text,
  ip_address text NOT NULL,
  user_agent text NOT NULL,
  country text,
  city text
);

-- Enable RLS
ALTER TABLE short_urls ENABLE ROW LEVEL SECURITY;
ALTER TABLE url_clicks ENABLE ROW LEVEL SECURITY;

-- Policies for short_urls
CREATE POLICY "Users can create their own short URLs"
  ON short_urls
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own short URLs"
  ON short_urls
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own short URLs"
  ON short_urls
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own short URLs"
  ON short_urls
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for url_clicks
CREATE POLICY "Users can view clicks for their URLs"
  ON url_clicks
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM short_urls
      WHERE id = url_clicks.url_id
      AND user_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_short_urls_user_id ON short_urls(user_id);
CREATE INDEX IF NOT EXISTS idx_short_urls_short_code ON short_urls(short_code);
CREATE INDEX IF NOT EXISTS idx_url_clicks_url_id ON url_clicks(url_id);
CREATE INDEX IF NOT EXISTS idx_url_clicks_clicked_at ON url_clicks(clicked_at);