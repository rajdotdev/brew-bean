"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="reveal">
          <p className="text-sm tracking-[0.3em] uppercase text-[#b08456] mb-6">
            Est. 2014 - Slow-Brewed
          </p>
          <h1 className="serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] font-medium mb-8 text-[#3b2a20]">
            Where every<br />
            <em className="text-[#b08456]">cup</em> tells<br />
            a story.
          </h1>
          <p className="text-lg text-[#3b2a20]/70 max-w-md mb-10 leading-relaxed">
            Hand-roasted beans, quiet mornings, and conversations that last longer than the foam.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/menu" className="btn-primary px-8 py-4 rounded-full text-sm tracking-wide">
              Explore the Menu
            </Link>
            <Link
              href="/story"
              className="px-8 py-4 rounded-full text-sm tracking-wide border border-[#3b2a20]/30 hover:border-[#3b2a20] transition"
            >
              Our Story
            </Link>
          </div>
        </div>

        <div className="relative reveal">
          <div className="relative aspect-[4/5] max-w-md mx-auto md:max-w-none rounded-[2rem] overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80"
              alt="Coffee"
              fill
              className="object-cover hero-img"
              priority
            />
            {/* Steam */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2">
              <div className="steam" style={{ left: "-20px", animationDelay: "0s" }} />
              <div className="steam" style={{ left: "0px", animationDelay: "0.6s" }} />
              <div className="steam" style={{ left: "20px", animationDelay: "1.2s" }} />
            </div>
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-6 -left-6 md:-left-12 bg-[#faf6f0] rounded-full w-28 h-28 md:w-40 md:h-40 flex flex-col items-center justify-center shadow-xl border border-[#3b2a20]/10">
            <span className="serif text-3xl md:text-4xl text-[#b08456]">10+</span>
            <span className="text-xs tracking-widest uppercase mt-1 text-center px-2">Years Brewing</span>
          </div>
        </div>
      </div>

      <Link
        href="/menu"
        className="scroll-arrow absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] uppercase flex flex-col items-center gap-2"
      >
        Scroll
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 4v16M4 12l4 4 4-4" />
        </svg>
      </Link>
    </section>
  );
}

function Marquee() {
  const items = [
    "Single Origin",
    "Locally Roasted",
    "Pour Over",
    "Espresso Bar",
    "Fresh Pastries",
  ];

  return (
    <section className="bg-[#3b2a20] text-[#f6f1ea] py-6 overflow-hidden">
      <div className="marquee">
        <div className="marquee-track serif text-2xl md:text-3xl italic">
          {items.map((item, i) => (
            <span key={i} className="mx-4">
              {item}
              <span className="mx-6 text-[#b08456]">*</span>
            </span>
          ))}
          {items.map((item, i) => (
            <span key={`dup-${i}`} className="mx-4">
              {item}
              <span className="mx-6 text-[#b08456]">*</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-[#3b2a20] text-[#f6f1ea] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10 reveal">
        <h2 className="serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-8">
          Pull up a chair.
          <br />
          Stay <em className="text-[#b08456]">a while.</em>
        </h2>
        <p className="text-[#f6f1ea]/70 max-w-xl mx-auto mb-10 leading-relaxed">
          Reserve a table for the weekend, or just walk in - well save you the seat by the window.
        </p>
        <Link
          href="/visit"
          className="inline-block bg-[#f6f1ea] text-[#3b2a20] px-10 py-4 rounded-full text-sm tracking-wide hover:bg-[#b08456] hover:text-[#f6f1ea] transition-all duration-300 hover:-translate-y-1"
        >
          Reserve a Table
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#1f1612] text-[#f6f1ea]/60 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="serif text-xl text-[#f6f1ea]">
          Brew<span className="text-[#b08456]">&</span>Bean
        </div>
        <p className="text-xs tracking-widest uppercase">2024 - Made with care in Brooklyn</p>
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-[#b08456] transition">
            Instagram
          </a>
          <a href="#" className="hover:text-[#b08456] transition">
            Twitter
          </a>
          <a href="#" className="hover:text-[#b08456] transition">
            Spotify
          </a>
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
      { threshold: 0.15 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="grain fixed inset-0 z-50 pointer-events-none" />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}