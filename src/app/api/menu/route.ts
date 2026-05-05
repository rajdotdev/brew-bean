import { NextRequest, NextResponse } from 'next/server';
import { getMenuItems, getCategories } from '@/sanity/client';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (slug) {
    const { getMenuItemBySlug } = await import('@/sanity/client');
    const item = await getMenuItemBySlug(slug);
    return NextResponse.json(item);
  }

  const [menuItems, categories] = await Promise.all([
    getMenuItems(),
    getCategories()
  ]);

  // Group by category
  const grouped = categories.map(cat => ({
    ...cat,
    items: menuItems.filter(item => item.category?.slug?.current === cat.slug.current)
  }));

  return NextResponse.json({ categories: grouped, menuItems });
}
