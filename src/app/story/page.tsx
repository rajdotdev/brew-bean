"use client";

import Image from "next/image";
import Nav from "@/components/Nav";

function DoodleCoffeeBean({ className = "" }: { className?: string }) {
  return (
    <svg className={`doodle-bean ${className}`} width="40" height="40" viewBox="0 0 40 40" fill="none">
      <ellipse cx="20" cy="20" rx="14" ry="18" stroke="#b08456" strokeWidth="2" strokeDasharray="4 2" fill="none" />
      <path d="M20 6 Q24 20 20 34" stroke="#b08456" strokeWidth="2" strokeLinecap="round" />
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

export default function StoryPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-20 pb-16">
        {/* Hero */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <DoodleCoffeeBean className="absolute top-20 left-10 opacity-20 animate-float" />
            <DoodleCoffeeBean className="absolute top-40 right-20 opacity-15 animate-float-delayed" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="text-center mb-16 reveal">
              <p className="text-sm tracking-[0.3em] uppercase text-caramel mb-4">Our Story</p>
              <h1 className="serif text-5xl md:text-6xl lg:text-7xl text-coffee mb-8 leading-tight">
                A small space with <em className="text-caramel">big</em> heart.
              </h1>
              <div className="max-w-2xl mx-auto">
                <DoodleWave />
              </div>
            </div>

            {/* Story Content */}
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="reveal order-2 md:order-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative rounded-2xl aspect-[3/4] overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=600&q=80"
                      alt="Cafe interior"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative rounded-2xl aspect-[3/4] overflow-hidden mt-8 md:mt-12">
                    <Image
                      src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&q=80"
                      alt="Barista"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="reveal order-1 md:order-2 space-y-6">
                <p className="text-lg text-coffee/70 leading-relaxed">
                  Brew & Bean started in 2014 as a tiny corner shop with three tables and a single
                  espresso machine. A decade later, were still small and still obsessed with the
                  details that make a perfect cup.
                </p>
                <p className="text-lg text-coffee/70 leading-relaxed">
                  We source our beans directly from farms in Ethiopia, Colombia, and Guatemala, roast in
                  small batches each week, and pull every shot like it matters because it does.
                </p>
                <p className="text-lg text-coffee/70 leading-relaxed">
                  Every morning at 5am, before the city wakes up, were already roasting, grinding,
                  and prepping. Not because we have to, but because we believe that the best
                  moments happen when someone sits down with a cup thats been made with intention.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#3b2a20]/10">
                  <div>
                    <p className="serif text-4xl text-caramel">12</p>
                    <p className="text-xs uppercase tracking-widest mt-1">Origin Farms</p>
                  </div>
                  <div>
                    <p className="serif text-4xl text-caramel">5am</p>
                    <p className="text-xs uppercase tracking-widest mt-1">Daily Roast</p>
                  </div>
                  <div>
                    <p className="serif text-4xl text-caramel">Unlimited</p>
                    <p className="text-xs uppercase tracking-widest mt-1">Refills</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
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