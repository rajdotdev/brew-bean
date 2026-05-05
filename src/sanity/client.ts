import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'nfr65h0c',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-02-01',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export interface MenuItem {
  _id: string;
  name: string;
  slug: { current: string };
  description: string;
  price: string;
  category: { _id: string; name: string; slug: { current: string } };
  has3DModel: boolean;
  isAvailable: boolean;
  featured: boolean;
  modelFile?: {
    asset: {
      url: string;
    };
  };
  image?: any;
}

export interface Category {
  _id: string;
  name: string;
  slug: { current: string };
  description?: string;
  displayOrder: number;
  icon?: string;
}

export interface SiteSettings {
  siteName: string;
  tagline?: string;
  established?: string;
  address?: string;
  phone?: string;
  email?: string;
  hours?: { day: string; time: string }[];
  socialLinks?: { platform: string; url: string }[];
}

export async function getMenuItems(): Promise<MenuItem[]> {
  return client.fetch(`
    *[_type == "menuItem" && isAvailable == true] | order(_createdAt asc) {
      _id,
      name,
      slug,
      description,
      price,
      has3DModel,
      isAvailable,
      featured,
      "modelFile": modelFile{
        asset->{
          url
        }
      },
      category->{
        _id,
        name,
        slug
      }
    }
  `);
}

export async function getMenuItemBySlug(slug: string): Promise<MenuItem | null> {
  return client.fetch(`
    *[_type == "menuItem" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      description,
      price,
      has3DModel,
      isAvailable,
      featured,
      "modelFile": modelFile{
        asset->{
          url
        }
      },
      image,
      category->{
        _id,
        name,
        slug
      }
    }
  `, { slug });
}

export async function getCategories(): Promise<Category[]> {
  return client.fetch(`
    *[_type == "category"] | order(displayOrder asc) {
      _id,
      name,
      slug,
      description,
      displayOrder,
      icon
    }
  `);
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(`
    *[_type == "siteSettings"][0] {
      siteName,
      tagline,
      established,
      address,
      phone,
      email,
      hours,
      socialLinks
    }
  `);
}
