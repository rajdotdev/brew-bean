"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import Nav from "@/components/Nav";

// Memoized dot positions - no Math.random() on render
const DOT_POSITIONS = [
  { left: '8%', top: '15%', opacity: 0.12 },
  { left: '75%', top: '8%', opacity: 0.18 },
  { left: '20%', top: '72%', opacity: 0.1 },
  { left: '85%', top: '65%', opacity: 0.15 },
];

function CoffeePattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#2d1f1a 1px, transparent 1px), linear-gradient(90deg, #2d1f1a 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
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

// Single floating doodle - reduced from multiple
function FloatingDoodle({ delay }: { delay: number }) {
  return (
    <div
      className="absolute pointer-events-none animate-float-slow hidden md:block"
      style={{ left: '90%', top: '20%', animationDelay: `${delay}s`, opacity: 0.2 }}
    >
      <svg width="30" height="30" viewBox="0 0 50 50" fill="none">
        <ellipse cx="25" cy="25" rx="12" ry="16" stroke="#a67040" strokeWidth="2" strokeDasharray="3 2" fill="none" />
        <path d="M25 10 Q27 25 25 40" stroke="#a67040" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function DoodleWave() {
  return (
    <svg className="mx-auto" width="100" height="20" viewBox="0 0 100 20" fill="none">
      <path d="M0 10 Q25 0 50 10 T100 10" stroke="#a67040" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2" />
    </svg>
  );
}

export default function StoryPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoize stats that don't change
  const stats = useMemo(() => [
    { value: '12', label: 'Origin Farms' },
    { value: '5am', label: 'Daily Roast' },
    { value: 'Unlimited', label: 'Refills' },
  ], []);

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
      <FloatingDoodle delay={0} />
      <Nav />
      <main className="min-h-screen pt-20 pb-16 bg-[#f6f1ea] relative z-10">
        <CoffeePattern />
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="text-center mb-16">
              <p className="text-sm tracking-[0.3em] uppercase text-[#a67040] mb-4 font-medium">
                Our Story
              </p>
              <h1 className="serif text-4xl md:text-5xl lg:text-6xl text-[#2d1f1a] mb-8 leading-tight">
                A small space with <em className="text-[#a67040]">big</em> heart.
              </h1>
              <DoodleWave />
            </div>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="order-2 md:order-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative rounded-2xl aspect-[3/4] overflow-hidden shadow-xl">
                    <Image
                      src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=600&q=80"
                      alt="Cafe interior"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative rounded-2xl aspect-[3/4] overflow-hidden shadow-xl mt-8 md:mt-12">
                    <Image
                      src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&q=80"
                      alt="Barista"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2 space-y-5">
                <p className="text-lg text-[#6b5b4f] leading-relaxed">
                  Brew & Bean started in 2014 as a tiny corner shop with three tables and a single
                  espresso machine. A decade later, we're still small and still obsessed with the
                  details that make a perfect cup.
                </p>
                <p className="text-lg text-[#6b5b4f] leading-relaxed">
                  We source our beans directly from farms in Ethiopia, Colombia, and Guatemala, roast in
                  small batches each week, and pull every shot like it matters because it does.
                </p>
                <p className="text-lg text-[#6b5b4f] leading-relaxed">
                  Every morning at 5am, before the city wakes up, we're already roasting, grinding,
                  and prepping. Not because we have to, but because we believe that the best
                  moments happen when someone sits down with a cup that's been made with intention.
                </p>

                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#2d1f1a]/10">
                  {stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <p className="serif text-3xl md:text-4xl text-[#a67040]">{stat.value}</p>
                      <p className="text-xs uppercase tracking-widest mt-1 text-[#6b5b4f]">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
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