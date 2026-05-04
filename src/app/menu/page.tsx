"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { categories, MenuItem } from "@/data/menu";
import Nav from "@/components/Nav";

function DoodleCoffeeBean({ className = "", delay = 0, style }: { className?: string; delay?: number; style?: React.CSSProperties }) {
  return (
    <svg
      className={`doodle-bean ${className}`}
      style={{ ...style, animationDelay: `${delay}s` }}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <ellipse cx="20" cy="20" rx="14" ry="18" stroke="#b08456" strokeWidth="2" strokeDasharray="4 2" fill="none" />
      <path d="M20 6 Q24 20 20 34" stroke="#b08456" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DoodleSteam({ className = "" }: { className?: string }) {
  return (
    <svg className={`doodle-steam ${className}`} width="30" height="50" viewBox="0 0 30 50" fill="none">
      <path d="M10 10 Q15 20 10 30" stroke="#b08456" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M20 15 Q25 25 20 40" stroke="#b08456" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function DoodleWave({ className = "" }: { className?: string }) {
  return (
    <svg className={`doodle-wave ${className}`} width="100" height="20" viewBox="0 0 100 20" fill="none">
      <path d="M0 10 Q25 0 50 10 T100 10" stroke="#b08456" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2" />
    </svg>
  );
}

function DoodleArrow({ className = "" }: { className?: string }) {
  return (
    <svg className={`doodle-arrow ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M12 7l5 5-5 5" stroke="#b08456" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <Link
      href={`/menu/${item.id}`}
      className="menu-item-card group block bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h4 className="font-medium text-lg text-coffee truncate">{item.name}</h4>
            {item.modelPath && (
              <span className="inline-flex items-center text-xs bg-[#b08456]/10 text-caramel px-3 py-1 rounded-full font-medium">
                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
                3D
              </span>
            )}
          </div>
          <p className="text-sm text-coffee/60 mt-1 line-clamp-2">{item.desc}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="serif text-xl text-coffee">{item.price}</span>
          <span className="menu-arrow opacity-0 group-hover:opacity-100 transition-opacity text-caramel">
            <DoodleArrow />
          </span>
        </div>
      </div>
    </Link>
  );
}

function CategorySection({ category, index }: { category: typeof categories[0]; index: number }) {
  return (
    <div className="category-section reveal">
      <div className="flex items-center gap-4 mb-8">
        <DoodleCoffeeBean className="hidden sm:block" delay={index * 0.2} />
        <h3 className="serif text-3xl md:text-4xl text-caramel">{category.label}</h3>
        <div className="flex-1 hidden sm:block">
          <DoodleWave />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {category.items.map((item, i) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>

      {index < categories.length - 1 && (
        <div className="flex justify-center my-12">
          <DoodleSteam className="opacity-50" />
        </div>
      )}
    </div>
  );
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-20 pb-16">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          {/* Background Doodles */}
          <div className="absolute inset-0 pointer-events-none">
            <DoodleCoffeeBean className="absolute top-20 left-10 opacity-20 animate-float" />
            <DoodleCoffeeBean className="absolute top-40 right-20 opacity-15 animate-float-delayed" style={{ animationDelay: '1s' }} />
            <DoodleSteam className="absolute bottom-20 left-1/4 opacity-20" />
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="text-center mb-12 reveal">
              <p className="text-sm tracking-[0.3em] uppercase text-caramel mb-4">The Menu</p>
              <h1 className="serif text-5xl md:text-6xl lg:text-7xl text-coffee mb-6">
                Crafted with care.
              </h1>
              <p className="text-coffee/70 max-w-md mx-auto">
                Tap any item to explore in 3D. Some drinks can be viewed in augmented reality.
              </p>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === null
                    ? 'bg-[#3b2a20] text-white'
                    : 'bg-[#faf6f0] text-coffee hover:bg-[#b08456]/20'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? 'bg-[#3b2a20] text-white'
                      : 'bg-[#faf6f0] text-coffee hover:bg-[#b08456]/20'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Menu Grid */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          {categories
            .filter((cat) => !activeCategory || cat.id === activeCategory)
            .map((category, index) => (
              <CategorySection
                key={category.id}
                category={category}
                index={categories.indexOf(category)}
              />
            ))}
        </section>
      </main>

      {/* Footer from home page */}
      <footer className="bg-[#1f1612] text-[#f6f1ea]/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="serif text-xl text-[#f6f1ea]">
            Brew<span className="text-caramel">&</span>Bean
          </div>
          <p className="text-xs tracking-widest uppercase">2024 - Made with care in Brooklyn</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-caramel transition">Instagram</a>
            <a href="#" className="hover:text-caramel transition">Twitter</a>
            <a href="#" className="hover:text-caramel transition">Spotify</a>
          </div>
        </div>
      </footer>
    </>
  );
}