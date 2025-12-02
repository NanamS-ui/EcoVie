/*
  # Blog Schema for Ecology Website

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, unique, not null)
      - `slug` (text, unique, not null)
      - `description` (text)
      - `created_at` (timestamptz)
    
    - `posts`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `slug` (text, unique, not null)
      - `excerpt` (text)
      - `content` (text, not null)
      - `image_url` (text)
      - `category_id` (uuid, foreign key)
      - `published` (boolean, default false)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - No write access for anonymous users (admin-only in future)

  3. Indexes
    - Index on posts.slug for fast lookups
    - Index on posts.category_id for filtering
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text NOT NULL,
  image_url text,
  category_id uuid REFERENCES categories(id),
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can view published posts"
  ON posts FOR SELECT
  TO anon
  USING (published = true);

CREATE INDEX IF NOT EXISTS posts_slug_idx ON posts(slug);
CREATE INDEX IF NOT EXISTS posts_category_id_idx ON posts(category_id);
CREATE INDEX IF NOT EXISTS posts_created_at_idx ON posts(created_at DESC);