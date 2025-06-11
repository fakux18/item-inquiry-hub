
-- Create storage bucket for marketplace images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'marketplace-images',
  'marketplace-images', 
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
);

-- Create storage policies for the bucket
CREATE POLICY "Public read access for marketplace images"
ON storage.objects FOR SELECT
USING (bucket_id = 'marketplace-images');

CREATE POLICY "Authenticated users can upload marketplace images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'marketplace-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update their marketplace images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'marketplace-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete marketplace images"
ON storage.objects FOR DELETE
USING (bucket_id = 'marketplace-images' AND auth.role() = 'authenticated');

-- Create listings table
CREATE TABLE public.listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(12, 2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('properties', 'vehicles', 'equipment')),
  location TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'pending', 'sold')),
  image_urls TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  -- Property specific fields
  bedrooms INTEGER,
  bathrooms INTEGER,
  area DECIMAL(10, 2),
  year_built INTEGER,
  -- Vehicle specific fields
  make TEXT,
  model TEXT,
  year INTEGER,
  mileage INTEGER,
  transmission TEXT,
  -- Common fields
  condition TEXT
);

-- Enable Row Level Security
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for listings
CREATE POLICY "Public read access for listings"
ON public.listings FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert listings"
ON public.listings FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update listings"
ON public.listings FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete listings"
ON public.listings FOR DELETE
USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER handle_listings_updated_at
  BEFORE UPDATE ON public.listings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
