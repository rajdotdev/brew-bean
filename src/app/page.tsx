"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";

// Animated floating elements configuration
const DOODLES = [
  { type: 'bean', x: '3%', y: '8%', size: 50, delay: 0, rotate: 15, color: 'text-[#a67040]/25' },
  { type: 'bean', x: '12%', y: '18%', size: 35, delay: 1.2, rotate: -20, color: 'text-[#a67040]/20' },
  { type: 'bean', x: '8%', y: '65%', size: 45, delay: 2.5, rotate: 45, color: 'text-[#2d1f1a]/15' },
  { type: 'bean', x: '15%', y: '85%', size: 30, delay: 0.8, rotate: -10, color: 'text-[#a67040]/18' },

  { type: 'bean', x: '88%', y: '12%', size: 55, delay: 1.5, rotate: -30, color: 'text-[#a67040]/22' },
  { type: 'bean', x: '92%', y: '30%', size: 40, delay: 3, rotate: 25, color: 'text-[#a67040]/18' },
  { type: 'bean', x: '85%', y: '55%', size: 48, delay: 2, rotate: -45, color: 'text-[#2d1f1a]/12' },
  { type: 'bean', x: '90%', y: '78%', size: 35, delay: 0.5, rotate: 60, color: 'text-[#a67040]/20' },

  { type: 'cup', x: '22%', y: '25%', size: 45, delay: 1.8, rotate: 10, color: 'text-[#a67040]/15' },
  { type: 'cup', x: '78%', y: '42%', size: 40, delay: 2.8, rotate: -15, color: 'text-[#2d1f1a]/10' },
  { type: 'cup', x: '75%', y: '70%', size: 50, delay: 0.3, rotate: 5, color: 'text-[#a67040]/18' },

  { type: 'leaf', x: '5%', y: '42%', size: 35, delay: 3.2, rotate: -60, color: 'text-[#a67040]/20' },
  { type: 'leaf', x: '95%', y: '48%', size: 30, delay: 1.8, rotate: 30, color: 'text-[#2d1f1a]/15' },

  { type: 'sparkle', x: '35%', y: '6%', size: 20, delay: 0.7, rotate: 0, color: 'text-[#a67040]/30' },
  { type: 'sparkle', x: '55%', y: '15%', size: 18, delay: 2.2, rotate: 0, color: 'text-[#a67040]/25' },
  { type: 'sparkle', x: '25%', y: '45%', size: 22, delay: 1.5, rotate: 0, color: 'text-[#a67040]/28' },
  { type: 'sparkle', x: '65%', y: '35%', size: 16, delay: 3.5, rotate: 0, color: 'text-[#a67040]/22' },
  { type: 'sparkle', x: '48%', y: '88%', size: 20, delay: 0.9, rotate: 0, color: 'text-[#a67040]/25' },
  { type: 'sparkle', x: '72%', y: '92%', size: 18, delay: 2.4, rotate: 0, color: 'text-[#a67040]/20' },

  { type: 'heart', x: '42%', y: '10%', size: 25, delay: 1.1, rotate: -5, color: 'text-[#a67040]/25' },
  { type: 'heart', x: '58%', y: '78%', size: 22, delay: 2.9, rotate: 10, color: 'text-[#a67040]/20' },

  { type: 'steam', x: '18%', y: '12%', size: 30, delay: 2.1, rotate: 0, color: 'text-[#2d1f1a]/12' },
  { type: 'steam', x: '82%', y: '18%', size: 25, delay: 0.6, rotate: 0, color: 'text-[#2d1f1a]/10' },
];

// SVG Components
function CoffeeBean({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 50 50" fill="none">
      <ellipse cx="25" cy="25" rx="14" ry="20" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.1" />
      <path d="M25 8 Q32 25 25 42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function CoffeeCup({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50" fill="none">
      <path d="M10 12h25a5 5 0 0 1 5 5v15a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V17a5 5 0 0 1 5-5z" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.1" />
      <path d="M33 18h5a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-5" stroke="currentColor" strokeWidth="2.5" />
      <path d="M15 5h15a2 2 0 0 1 2 2v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function Leaf({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <path d="M15 2 Q28 15 15 28 Q2 15 15 2Z" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.15" />
      <path d="M15 8 v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 14 Q15 18 20 14" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

function Sparkle({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8L10 0Z" fill="currentColor" />
    </svg>
  );
}

function Heart({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <path d="M15 25 C5 18, 2 12, 7 7 C11 3, 15 6, 15 6 C15 6, 19 3, 23 7 C28 12, 25 18, 15 25Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
    </svg>
  );
}

function SteamSvg({ size }: { size: number }) {
  return (
    <svg width={size * 1.5} height={size * 2} viewBox="0 0 30 50" fill="none">
      <path d="M8 5 Q15 15 8 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M22 10 Q15 25 22 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M15 0 Q20 10 15 20 Q10 30 15 45" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function DoodleElement({ doodle }: { doodle: typeof DOODLES[0] }) {
  const { type, size, rotate, color } = doodle;

  const renderDoodle = () => {
    switch (type) {
      case 'bean': return <CoffeeBean size={size} />;
      case 'cup': return <CoffeeCup size={size} />;
      case 'leaf': return <Leaf size={size} />;
      case 'sparkle': return <Sparkle size={size} />;
      case 'heart': return <Heart size={size} />;
      case 'steam': return <SteamSvg size={size} />;
      default: return null;
    }
  };

  return (
    <div
      className={`absolute ${color} animate-float-slow pointer-events-none`}
      style={{
        left: doodle.x,
        top: doodle.y,
        transform: `rotate(${rotate}deg)`,
        animationDelay: `${doodle.delay}s`,
        animationDuration: `${6 + Math.random() * 4}s`,
      }}
    >
      {renderDoodle()}
    </div>
  );
}

// Background with animated pattern
function BackgroundPattern() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#faf6ef] via-[#f6f1ea] to-[#efe8db]" />

      {/* Animated gradient blobs */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-[#a67040]/8 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-[#a67040]/6 to-transparent rounded-full translate-x-1/3 translate-y-1/3 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-gradient-to-r from-[#2d1f1a]/3 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />

      {/* Floating doodles */}
      {DOODLES.map((doodle, i) => (
        <DoodleElement key={i} doodle={doodle} />
      ))}

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle, #2d1f1a 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />

      {/* Dot pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle, #a67040 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
        opacity: 0.05,
      }} />
    </div>
  );
}

// Hero Section
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-[5]">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="reveal space-y-8">
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg border border-[#a67040]/10">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
                  <path d="M15 2 Q28 15 15 28 Q2 15 15 2Z" stroke="#a67040" strokeWidth="2" fill="#a67040" fillOpacity="0.2" />
                </svg>
              </div>
              <span className="text-sm font-medium text-[#2d1f1a] tracking-wide">Artisan Coffee Since 2014</span>
            </div>

            <h1 className="serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.92] font-medium text-[#2d1f1a]">
              Where every<br />
              <em className="text-[#a67040] italic">cup</em> tells<br />
              <span className="relative inline-block">
                a story.
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                  <path d="M2 6 C50 2, 150 2, 198 6" stroke="#a67040" strokeWidth="3" strokeLinecap="round" fill="none" />
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[#6b5b4f] max-w-lg leading-relaxed">
              Hand-roasted beans, quiet mornings, and conversations that last longer than the foam.
              <span className="block mt-2 text-[#a67040] font-medium">Now with AR food preview!</span>
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/menu" className="group inline-flex items-center gap-2 bg-[#2d1f1a] text-white px-8 py-4 rounded-full text-sm tracking-wide hover:bg-[#a67040] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                Explore the Menu
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 7l5 5-5 5" />
                </svg>
              </Link>
              <Link href="/story" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm tracking-wide border-2 border-[#2d1f1a]/20 hover:border-[#2d1f1a] hover:bg-white/50 transition-all">
                Our Story
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#a67040]/10 rounded-full flex items-center justify-center">
                  <CoffeeCup size={18} />
                </div>
                <span className="text-sm text-[#6b5b4f]">50+ Drinks</span>
              </div>
              <div className="w-px h-6 bg-[#2d1f1a]/10" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#a67040]/10 rounded-full flex items-center justify-center">
                  <Sparkle size={14} />
                </div>
                <span className="text-sm text-[#6b5b4f]">AR Preview</span>
              </div>
              <div className="w-px h-6 bg-[#2d1f1a]/10" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#a67040]/10 rounded-full flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="#a67040"><path d="M10 15l-5.5 3 1-6L1 8.5l6.5-.5L10 2l2.5 6 6.5.5-4.5 3.5 1 6z" /></svg>
                </div>
                <span className="text-sm text-[#6b5b4f]">4.8 Rating</span>
              </div>
            </div>
          </div>

          <div className="relative reveal" style={{ animationDelay: '0.2s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#a67040]/20 to-[#a67040]/5 rounded-full scale-110 blur-3xl" />

            <div className="relative">
              <div className="aspect-square max-w-lg mx-auto rounded-[3rem] overflow-hidden shadow-2xl shadow-[#2d1f1a]/10 border-4 border-white/50">
                <Image
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80"
                  alt="Premium coffee brewing"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl flex items-center gap-3 animate-float-slow z-10">
                <div className="w-12 h-12 bg-[#a67040]/10 rounded-full flex items-center justify-center border-2 border-[#a67040]/20">
                  <CoffeeCup size={24} />
                </div>
                <div>
                  <p className="font-semibold text-[#2d1f1a]">AR View</p>
                  <p className="text-xs text-[#6b5b4f]">Preview in 3D</p>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 md:-left-8 bg-white rounded-2xl p-4 shadow-xl animate-float-slow z-10" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <p className="serif text-3xl font-bold text-[#a67040]">10+</p>
                    <p className="text-xs text-[#6b5b4f]">Years</p>
                  </div>
                  <div className="w-px h-10 bg-[#2d1f1a]/10" />
                  <div className="text-center">
                    <p className="serif text-3xl font-bold text-[#a67040]">25K+</p>
                    <p className="text-xs text-[#6b5b4f]">Cups/year</p>
                  </div>
                </div>
              </div>

              {/* Decorative corner doodles */}
              <div className="absolute -top-8 -left-8 animate-float-slow" style={{ animationDelay: '0.5s' }}>
                <CoffeeBean size={40} />
              </div>
              <div className="absolute -bottom-8 right-1/4 animate-float-slow" style={{ animationDelay: '1.5s' }}>
                <Leaf size={30} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#6b5b4f] z-10">
        <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-6 h-10 border-2 border-[#6b5b4f]/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-[#a67040] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

// Features Section
function Features() {
  const features = [
    {
      icon: <Sparkle size={32} />,
      title: "AR Food Preview",
      desc: "See our dishes in 3D before ordering. View coffee cups, pastries, and more in your space using augmented reality."
    },
    {
      icon: <CoffeeBean size={32} />,
      title: "Single Origin Beans",
      desc: "Sourced directly from farmers in Ethiopia, Colombia, and Guatemala. Every cup tells the story of its origin."
    },
    {
      icon: <CoffeeCup size={32} />,
      title: "Fresh Daily",
      desc: "Baked fresh every morning at 5 AM. Our pastries are made from scratch with imported European butter."
    },
    {
      icon: <Leaf size={32} />,
      title: "Eco-Friendly",
      desc: "Compostable cups, reusable lids, and direct trade relationships. Good for you, good for the planet."
    }
  ];

  return (
    <section className="py-20 md:py-32 relative z-[5] bg-gradient-to-b from-[#f6f1ea] to-[#efe8db]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 text-sm tracking-[0.3em] uppercase text-[#a67040] mb-4 bg-[#a67040]/10 px-4 py-2 rounded-full">
            <Leaf size={16} />
            <span>Why Choose Us</span>
          </div>
          <h2 className="serif text-4xl md:text-5xl lg:text-6xl text-[#2d1f1a] mb-6">
            Crafted with <em className="text-[#a67040]">passion</em>
          </h2>
          <p className="text-[#6b5b4f] max-w-2xl mx-auto text-lg">
            Every detail matters when it comes to great coffee. Here is what makes us different.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-[#2d1f1a]/5 reveal"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-[#a67040]/10 rounded-2xl flex items-center justify-center mb-6 text-[#a67040] group-hover:bg-[#a67040]/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="serif text-xl font-semibold text-[#2d1f1a] mb-3">{feature.title}</h3>
              <p className="text-[#6b5b4f] text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// AR Section
function ARSection() {
  return (
    <section className="py-20 md:py-32 bg-[#2d1f1a] text-white relative overflow-hidden z-[5]">
      {/* Background doodles */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10"><CoffeeBean size={60} /></div>
        <div className="absolute top-20 right-20 -rotate-45"><CoffeeBean size={80} /></div>
        <div className="absolute bottom-20 left-1/4"><CoffeeCup size={70} /></div>
        <div className="absolute bottom-10 right-10 rotate-30"><CoffeeBean size={50} /></div>
        <div className="absolute top-1/2 right-1/4 rotate-15"><Sparkle size={30} /></div>
        <div className="absolute bottom-1/3 left-1/3"><Leaf size={40} /></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 text-sm tracking-[0.3em] uppercase text-[#a67040] mb-4 bg-white/10 px-4 py-2 rounded-full">
              <Sparkle size={14} />
              <span>New Feature</span>
            </div>
            <h2 className="serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
              View Your<br />
              <em className="text-[#a67040]">Order in 3D</em>
            </h2>
            <p className="text-[#f6f1ea]/80 text-lg leading-relaxed mb-8 max-w-md">
              Cannot decide? Use our AR feature to preview any dish before you order.
              Just tap the 3D badge on any menu item and see it come to life in your space.
            </p>

            <div className="space-y-5">
              {[
                { step: "1", title: "Open any menu item", desc: "Browse our full menu and find the 3D badge" },
                { step: "2", title: 'Tap "View in Your Space"', desc: "Opens your camera with AR overlay" },
                { step: "3", title: "Place it anywhere", desc: "Tap a surface and walk around your 3D item" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#a67040]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#a67040] font-semibold">{item.step}</span>
                  </div>
                  <div>
                    <p className="font-medium text-lg">{item.title}</p>
                    <p className="text-sm text-[#f6f1ea]/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative reveal" style={{ animationDelay: '0.2s' }}>
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Phone mockup */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#3b2a20] to-[#1f1612] rounded-[3rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-[#f6f1ea] rounded-[2.5rem] overflow-hidden relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#2d1f1a] rounded-b-2xl z-10" />

                  <div className="absolute inset-0 bg-gradient-to-b from-[#f6f1ea] to-[#e8e0d5] flex items-center justify-center p-6">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-6 relative">
                        <div className="absolute inset-0 bg-[#a67040]/20 rounded-full animate-ping" />
                        <div className="relative w-full h-full flex items-center justify-center">
                          <div className="w-24 h-24 bg-[#a67040]/10 rounded-full flex items-center justify-center">
                            <CoffeeCup size={48} />
                          </div>
                        </div>
                      </div>
                      <p className="serif text-2xl text-[#2d1f1a] mb-2">Extra Chocolate Cupcake</p>
                      <p className="text-[#6b5b4f] font-medium mb-6">$4.50</p>
                      <div className="inline-flex items-center gap-2 bg-[#a67040] text-white px-6 py-3 rounded-full text-sm font-medium">
                        <Sparkle size={14} />
                        <span>View in AR</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating decoration */}
              <div className="absolute -top-4 -right-4 bg-[#a67040] text-white rounded-2xl p-4 shadow-lg animate-float-slow">
                <Sparkle size={24} />
              </div>

              {/* Corner doodles */}
              <div className="absolute -bottom-6 -left-6 animate-float-slow">
                <CoffeeBean size={45} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Testimonials
function Testimonials() {
  const reviews = [
    { name: "Sarah M.", text: "Best coffee in Brooklyn! The AR preview is such a cool feature.", rating: 5 },
    { name: "James K.", text: "Love that I can see the pastries in 3D before ordering. Amazing!", rating: 5 },
    { name: "Emily R.", text: "The atmosphere is perfect for remote work. Great wifi too!", rating: 5 },
  ];

  return (
    <section className="py-20 md:py-32 relative z-[5] bg-gradient-to-b from-[#efe8db] to-[#f6f1ea]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 text-sm tracking-[0.3em] uppercase text-[#a67040] mb-4">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="#a67040"><path d="M10 15l-5.5 3 1-6L1 8.5l6.5-.5L10 2l2.5 6 6.5.5-4.5 3.5 1 6z" /></svg>
            <span>Testimonials</span>
          </div>
          <h2 className="serif text-4xl md:text-5xl lg:text-6xl text-[#2d1f1a]">
            What people <em className="text-[#a67040]">say</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-8 shadow-sm border border-[#2d1f1a]/5 reveal"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <svg key={j} width="20" height="20" viewBox="0 0 20 20" fill="#a67040"><path d="M10 15l-5.5 3 1-6L1 8.5l6.5-.5L10 2l2.5 6 6.5.5-4.5 3.5 1 6z" /></svg>
                ))}
              </div>
              <p className="text-[#2d1f1a] mb-6 leading-relaxed">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#a67040]/10 rounded-full flex items-center justify-center">
                  <span className="serif text-lg font-semibold text-[#a67040]">{review.name.charAt(0)}</span>
                </div>
                <span className="font-medium text-[#2d1f1a]">{review.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-20 md:py-28 relative z-[5] bg-[#f6f1ea]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center reveal">
        <h2 className="serif text-4xl md:text-5xl lg:text-6xl text-[#2d1f1a] mb-6 leading-tight">
          Pull up a chair.<br />
          Stay <em className="text-[#a67040]">a while.</em>
        </h2>
        <p className="text-[#6b5b4f] text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Whether you are here for a quick espresso or a leisurely afternoon,
          there is always a seat waiting for you.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-[#2d1f1a] text-white px-8 py-4 rounded-full hover:bg-[#a67040] transition-all duration-300 hover:-translate-y-1"
          >
            View Full Menu
          </Link>
          <Link
            href="/visit"
            className="inline-flex items-center gap-2 bg-[#a67040] text-white px-8 py-4 rounded-full hover:bg-[#8a5d35] transition-all duration-300 hover:-translate-y-1"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Find Us
          </Link>
        </div>
      </div>
    </section>
  );
}

// Marquee
function Marquee() {
  const items = ["Single Origin", "Locally Roasted", "Pour Over", "Espresso Bar", "Fresh Pastries", "AR Preview"];

  return (
    <section className="py-8 bg-[#2d1f1a] text-[#f6f1ea] overflow-hidden relative z-[5]">
      <div className="flex">
        <div className="marquee whitespace-nowrap">
          <div className="marquee-track serif text-xl md:text-2xl italic flex items-center gap-8">
            {items.map((item, i) => (
              <span key={i} className="flex items-center gap-4">
                <span className="text-[#a67040]">.</span> {item}
              </span>
            ))}
            {items.map((item, i) => (
              <span key={`dup-${i}`} className="flex items-center gap-4">
                <span className="text-[#a67040]">.</span> {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-[#1f1612] text-[#f6f1ea] py-16 relative z-[5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <h3 className="serif text-3xl mb-4">
              Brew<span className="text-[#a67040]">&</span>Bean
            </h3>
            <p className="text-[#f6f1ea]/60 mb-6 max-w-md">
              Hand-roasted coffee, fresh pastries, and a warm place to call home.
              Est. 2014 in the heart of Brooklyn.
            </p>
            <div className="flex gap-4">
              {["Instagram", "Twitter", "TikTok"].map((social, i) => (
                <a key={social} href="#" className="w-10 h-10 bg-[#f6f1ea]/10 rounded-full flex items-center justify-center hover:bg-[#a67040] transition-colors">
                  <span className="text-xs">{['I', 'T', 'T'][i]}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#a67040]">Quick Links</h4>
            <ul className="space-y-2 text-[#f6f1ea]/60">
              <li><Link href="/menu" className="hover:text-[#a67040] transition">Menu</Link></li>
              <li><Link href="/story" className="hover:text-[#a67040] transition">Our Story</Link></li>
              <li><Link href="/visit" className="hover:text-[#a67040] transition">Visit Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#a67040]">Hours</h4>
            <ul className="space-y-2 text-[#f6f1ea]/60">
              <li>Mon - Fri: 7am - 8pm</li>
              <li>Saturday: 8am - 9pm</li>
              <li>Sunday: 8am - 6pm</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#f6f1ea]/10 text-center text-sm text-[#f6f1ea]/40 flex items-center justify-center gap-2">
          <CoffeeCup size={14} />
          <span>2024 Brew & Bean - Brooklyn, NY</span>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="grain fixed inset-0 z-[100] pointer-events-none" />
      <BackgroundPattern />
      <Nav />
      <main className="relative z-[5]">
        <Hero />
        <Marquee />
        <Features />
        <ARSection />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}