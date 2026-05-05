"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";

interface MenuItem {
  _id: string;
  name: string;
  slug: { current: string };
  description: string;
  price: string;
  has3DModel: boolean;
  category: { name: string; slug: { current: string } };
}

interface Category {
  _id: string;
  name: string;
  slug: { current: string };
  displayOrder: number;
  items: MenuItem[];
}

// Memoized static background pattern - no more Math.random() on render
const DOT_POSITIONS = [
  { left: '5%', top: '12%', opacity: 0.15 },
  { left: '18%', top: '35%', opacity: 0.1 },
  { left: '72%', top: '8%', opacity: 0.2 },
  { left: '88%', top: '42%', opacity: 0.12 },
  { left: '25%', top: '68%', opacity: 0.18 },
  { left: '55%', top: '82%', opacity: 0.1 },
  { left: '92%', top: '75%', opacity: 0.15 },
  { left: '35%', top: '25%', opacity: 0.08 },
];

function CoffeePattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#2d1f1a 1px, transparent 1px), linear-gradient(90deg, #2d1f1a 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      {DOT_POSITIONS.map((pos, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-[#a67040]"
          style={{ left: pos.left, top: pos.top, opacity: pos.opacity }}
        />
      ))}
    </div>
  );
}

// Reduced floating doodles - only 3 instead of 7
function FloatingDoodle({ type, delay, left, top }: { type: 'bean' | 'cup'; delay: number; left: string; top: string }) {
  const svg = type === 'bean' ? (
    <svg width="25" height="25" viewBox="0 0 50 50" fill="none">
      <ellipse cx="25" cy="25" rx="12" ry="16" stroke="#a67040" strokeWidth="2" fill="none" />
      <path d="M25 10 Q27 25 25 40" stroke="#a67040" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width="25" height="25" viewBox="0 0 40 40" fill="none">
      <path d="M8 12h18a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V15a3 3 0 0 1 3-3z" stroke="#a67040" strokeWidth="2" fill="none" />
      <path d="M26 16h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3" stroke="#a67040" strokeWidth="2" fill="none" />
    </svg>
  );

  return (
    <div
      className="absolute pointer-events-none animate-float-slow"
      style={{ left, top, animationDelay: `${delay}s`, opacity: 0.25 }}
    >
      {svg}
    </div>
  );
}

function CategoryPill({
  label,
  active,
  onClick,
  icon,
  count
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 md:px-5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2 ${
        active
          ? "bg-[#2d1f1a] text-white shadow-lg"
          : "bg-white text-[#2d1f1a] hover:bg-[#a67040] hover:text-white shadow-md"
      }`}
    >
      {icon}
      <span className="whitespace-nowrap">{label}</span>
      <span className={`text-xs px-1.5 py-0.5 rounded-full ${active ? 'bg-white/20' : 'bg-[#2d1f1a]/10'}`}>
        {count}
      </span>
    </button>
  );
}

function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <Link
      href={`/menu/${item.slug.current}`}
      className="group relative block bg-white rounded-2xl p-4 md:p-5 shadow-sm hover:shadow-xl transition-all duration-200 hover:-translate-y-1 cursor-pointer border border-transparent hover:border-[#a67040]/30"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#a67040]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 relative z-10">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h4 className="font-semibold text-lg text-[#2d1f1a] group-hover:text-[#a67040] transition-colors duration-200">
              {item.name}
            </h4>
            {item.has3DModel && (
              <span className="inline-flex items-center text-xs bg-[#a67040]/10 text-[#a67040] px-2 py-0.5 rounded-full font-medium">
                3D
              </span>
            )}
          </div>
          <p className="text-sm text-[#6b5b4f]">{item.description}</p>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="serif text-xl md:text-2xl font-semibold text-[#2d1f1a]">{item.price}</span>
          <div className="w-9 h-9 rounded-full bg-[#f6f1ea] flex items-center justify-center text-[#a67040] sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 7l5 5-5 5" />
            </svg>
          </div>
        </div>
      </div>
      <div className="mt-2 text-xs text-[#a67040] sm:hidden">
        Tap to view details
      </div>
    </Link>
  );
}

function MenuCategory({ category }: { category: Category }) {
  const categoryTotal = useMemo(() =>
    category.items.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0).toFixed(2),
    [category.items]
  );

  const iconMap: Record<string, string> = {
    'espresso': '☕',
    'pour-over': '🫖',
    'cold-drinks': '🧊',
    'bakery': '🥐'
  };

  return (
    <div className="mb-10">
      <h3 className="serif text-2xl md:text-3xl text-[#a67040] mb-5 pb-3 border-b-2 border-[#a67040]/30 flex items-center gap-3">
        <span className="text-[#a67040]/60 hidden md:block">
          {iconMap[category.slug.current] || '☕'}
        </span>
        {category.name}
        <span className="ml-auto text-sm font-normal text-[#6b5b4f] bg-white px-3 py-1 rounded-full shadow-sm">
          {category.items.length} items · ${categoryTotal}
        </span>
      </h3>
      <div className="grid gap-3">
        {category.items.map((item) => (
          <MenuItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => {
        setCategories(data.categories || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch menu:', err);
        setLoading(false);
      });
  }, []);

  // Memoize expensive calculations
  const totalItemCount = useMemo(() =>
    categories.reduce((sum, cat) => sum + cat.items.length, 0),
  [categories]
  );

  const totalPrice = useMemo(() =>
    categories.reduce((sum, cat) =>
      sum + cat.items.reduce((catSum, item) => catSum + parseFloat(item.price.replace('$', '')), 0), 0
    ).toFixed(2),
  [categories]
  );

  const filteredCategories = useMemo(() =>
    activeCategory ? categories.filter(cat => cat.slug.current === activeCategory) : categories,
  [activeCategory, categories]
  );

  if (!mounted) {
    return (
      <>
        <Nav />
        <div className="min-h-screen pt-24 flex items-center justify-center bg-[#f6f1ea]">
          <div className="text-[#2d1f1a]">Loading...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="grain fixed inset-0 z-50 pointer-events-none" />
      <Nav />

      {/* Reduced floating doodles - only 3 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <FloatingDoodle type="bean" delay={0} left="5%" top="15%" />
        <FloatingDoodle type="cup" delay={2} left="88%" top="20%" />
        <FloatingDoodle type="bean" delay={4} left="50%" top="75%" />
      </div>

      <main className="min-h-screen pt-20 pb-16 bg-[#f6f1ea] relative z-10">
        <CoffeePattern />
        <section className="py-10 md:py-16 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="text-center mb-6 md:mb-8">
              <p className="text-sm tracking-[0.3em] uppercase text-[#a67040] mb-3 font-medium">
                The Menu
              </p>
              <h1 className="serif text-4xl md:text-5xl lg:text-6xl text-[#2d1f1a] mb-3">
                Crafted with <span className="text-[#a67040] italic">care.</span>
              </h1>
              <p className="text-[#6b5b4f] max-w-lg mx-auto md:text-lg">
                Tap any item to explore in 3D or view in augmented reality
              </p>
            </div>

            <div className="flex justify-center mb-6">
              <div className="bg-white px-5 py-2 rounded-full shadow-md text-sm text-[#6b5b4f]">
                Full menu total: <span className="font-semibold text-[#2d1f1a]">${totalPrice}</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 md:gap-3 px-2">
              <CategoryPill
                label="All"
                active={activeCategory === null}
                onClick={() => setActiveCategory(null)}
                icon={<span>☕</span>}
                count={totalItemCount}
              />
              {categories.map((cat) => (
                <CategoryPill
                  key={cat._id}
                  label={cat.name}
                  active={activeCategory === cat.slug.current}
                  onClick={() => setActiveCategory(cat.slug.current)}
                  count={cat.items.length}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          {loading ? (
            <div className="text-center py-20">
              <div className="text-[#2d1f1a]">Loading menu...</div>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <MenuCategory key={category._id} category={category} />
            ))
          )}
        </section>
      </main>

      <footer className="bg-[#1f1612] text-[#f6f1ea] py-10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="serif text-xl text-[#f6f1ea]">
            Brew<span className="text-[#a67040]">&</span>Bean
          </div>
          <p className="text-xs tracking-widest uppercase">2024 - Made with care in Brooklyn</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-[#a67040] transition">Instagram</a>
            <a href="#" className="hover:text-[#a67040] transition">Twitter</a>
            <a href="#" className="hover:text-[#a67040] transition">Spotify</a>
          </div>
        </div>
      </footer>
    </>
  );
}