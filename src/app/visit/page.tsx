"use client";

import Nav from "@/components/Nav";

// Floating doodles
function FloatingDoodle({ type, delay, left, top }: { type: 'pin' | 'clock' | 'sparkle'; delay: number; left: string; top: string }) {
  const doodles = {
    pin: (
      <svg width="30" height="30" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="18" r="8" stroke="#a67040" strokeWidth="2" fill="none" />
        <path d="M24 26 L24 38" stroke="#a67040" strokeWidth="2" />
        <path d="M20 34 L24 38 L28 34" stroke="#a67040" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    clock: (
      <svg width="30" height="30" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="18" stroke="#a67040" strokeWidth="2" fill="none" />
        <path d="M24 14 L24 24 L32 28" stroke="#a67040" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    sparkle: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8L10 0Z" fill="#a67040" opacity="0.3" />
      </svg>
    )
  };

  return (
    <div
      className="absolute pointer-events-none animate-float"
      style={{ left, top, animationDelay: `${delay}s` }}
    >
      {doodles[type]}
    </div>
  );
}

function DoodleWave({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="100" height="20" viewBox="0 0 100 20" fill="none">
      <path d="M0 10 Q25 0 50 10 T100 10" stroke="#a67040" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2" />
    </svg>
  );
}

export default function VisitPage() {
  return (
    <>
      <div className="grain fixed inset-0 z-50 pointer-events-none" />

      {/* Floating doodles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <FloatingDoodle type="pin" delay={0} left="5%" top="15%" />
        <FloatingDoodle type="clock" delay={2} left="90%" top="20%" />
        <FloatingDoodle type="sparkle" delay={4} left="10%" top="70%" />
        <FloatingDoodle type="pin" delay={1} left="85%" top="65%" />
        <FloatingDoodle type="clock" delay={3} left="50%" top="85%" />
      </div>

      <Nav />
      <main className="min-h-screen pt-20 pb-16 bg-[#f6f1ea] relative z-10">
        {/* Hero */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="text-center mb-16">
              <p className="text-sm tracking-[0.3em] uppercase text-[#a67040] mb-4 font-medium">Visit Us</p>
              <h1 className="serif text-4xl md:text-5xl lg:text-6xl text-[#2d1f1a] mb-6">
                Come find your seat.
              </h1>
              <div className="max-w-md mx-auto">
                <DoodleWave />
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-[#2d1f1a]/5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="mb-6 text-[#a67040]">
                  <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="18" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M24 26 L24 38" stroke="currentColor" strokeWidth="2" />
                    <path d="M20 34 L24 38 L28 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="serif text-2xl text-[#2d1f1a] mb-4">Location</h3>
                <div className="text-[#6b5b4f] leading-relaxed space-y-1">
                  <p className="text-[#2d1f1a]">142 Maple Street</p>
                  <p className="text-[#2d1f1a]">Brooklyn, NY 11201</p>
                  <p className="text-[#a67040] mt-3 text-sm font-medium">Corner of Maple and 5th</p>
                </div>
              </div>

              <div className="bg-white p-8 md:p-10 rounded-3xl border border-[#2d1f1a]/5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="mb-6 text-[#a67040]">
                  <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M24 14 L24 24 L32 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="serif text-2xl text-[#2d1f1a] mb-4">Hours</h3>
                <div className="text-[#6b5b4f] leading-relaxed space-y-2">
                  <div className="flex justify-between text-[#2d1f1a]">
                    <span>Mon - Fri</span>
                    <span className="font-medium">7am - 7pm</span>
                  </div>
                  <div className="flex justify-between text-[#2d1f1a]">
                    <span>Saturday</span>
                    <span className="font-medium">8am - 8pm</span>
                  </div>
                  <div className="flex justify-between text-[#2d1f1a]">
                    <span>Sunday</span>
                    <span className="font-medium">8am - 5pm</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 md:p-10 rounded-3xl border border-[#2d1f1a]/5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="mb-6 text-[#a67040]">
                  <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                    <rect x="6" y="12" width="36" height="24" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M6 16 L24 28 L42 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="serif text-2xl text-[#2d1f1a] mb-4">Contact</h3>
                <div className="text-[#6b5b4f] leading-relaxed space-y-2">
                  <a href="mailto:hello@brewandbean.co" className="block text-[#2d1f1a] hover:text-[#a67040] transition">
                    hello@brewandbean.co
                  </a>
                  <a href="tel:+15551234567" className="block text-[#2d1f1a] hover:text-[#a67040] transition">
                    (555) 123-4567
                  </a>
                  <p className="pt-2 text-sm text-[#a67040] font-medium">@brewandbean</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-16">
              <a
                href="mailto:hello@brewandbean.co"
                className="inline-block bg-[#2d1f1a] text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-[#a67040] transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Reserve a Table
              </a>
              <p className="text-[#6b5b4f] mt-4 text-sm">
                Or just walk in - we'll save you the seat by the window.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1f1612] text-[#f6f1ea]/60 py-10 relative z-20">
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

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-15px) rotate(3deg); }
          50% { transform: translateY(-5px) rotate(-2deg); }
          75% { transform: translateY(-20px) rotate(2deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}