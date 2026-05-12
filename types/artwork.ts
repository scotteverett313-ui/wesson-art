export interface Artwork {
  id: string;
  slug: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  description: string;
  image: string;
  images?: string[];
  featured: boolean;
  series: string;
}
