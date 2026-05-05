import { NextResponse } from 'next/server';
import { getSiteSettings } from '@/sanity/client';

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json(settings);
}
