"use client";

import Nav from "@/components/Nav";

function DoodlePin({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="18" r="8" stroke="#b08456" strokeWidth="2" fill="none" />
      <path d="M24 26 L24 38" stroke="#b08456" strokeWidth="2" />
      <path d="M20 34 L24 38 L28 34" stroke="#b08456" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DoodleClock({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="18" stroke="#b08456" strokeWidth="2" fill="none" />
      <path d="M24 14 L24 24 L32 28" stroke="#b08456" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DoodleEnvelope({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="6" y="12" width="36" height="24" rx="4" stroke="#b08456" strokeWidth="2" fill="none" />
      <path d="M6 16 L24 28 L42 16" stroke="#b08456" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DoodleWave({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="100" height="20" viewBox="0 0 100 20" fill="none">
      <path d="M0 10 Q25 0 50 10 T100 10" stroke="#b08456" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2" />
    </svg>
  );
}

export default function VisitPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-20 pb-16">
        {/* Hero */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <DoodlePin className="absolute top-20 right-10 opacity-20" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
            <div className="text-center mb-16 reveal">
              <p className="text-sm tracking-[0.3em] uppercase text-[#b08456] mb-4">Visit Us</p>
              <h1 className="serif text-5xl md:text-6xl lg:text-7xl text-[#3b2a20] mb-6">
                Come find your seat.
              </h1>
              <div className="max-w-md mx-auto">
                <DoodleWave />
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
              <div className="reveal bg-white p-8 md:p-10 rounded-3xl border border-[#3b2a20]/5 shadow-sm hover:shadow-lg transition-shadow">
                <div className="mb-6">
                  <DoodlePin />
                </div>
                <h3 className="serif text-2xl text-[#3b2a20] mb-4">Location</h3>
                <div className="text-[#3b2a20]/70 leading-relaxed space-y-1">
                  <p>142 Maple Street</p>
                  <p>Brooklyn, NY 11201</p>
                  <p className="text-[#b08456] mt-3 text-sm">Corner of Maple and 5th</p>
                </div>
              </div>

              <div className="reveal bg-white p-8 md:p-10 rounded-3xl border border-[#3b2a20]/5 shadow-sm hover:shadow-lg transition-shadow">
                <div className="mb-6">
                  <DoodleClock />
                </div>
                <h3 className="serif text-2xl text-[#3b2a20] mb-4">Hours</h3>
                <div className="text-[#3b2a20]/70 leading-relaxed space-y-2">
                  <div className="flex justify-between">
                    <span>Mon - Fri</span>
                    <span className="font-medium">7am - 7pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">8am - 8pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">8am - 5pm</span>
                  </div>
                </div>
              </div>

              <div className="reveal bg-white p-8 md:p-10 rounded-3xl border border-[#3b2a20]/5 shadow-sm hover:shadow-lg transition-shadow">
                <div className="mb-6">
                  <DoodleEnvelope />
                </div>
                <h3 className="serif text-2xl text-[#3b2a20] mb-4">Contact</h3>
                <div className="text-[#3b2a20]/70 leading-relaxed space-y-2">
                  <a href="mailto:hello@brewandbean.co" className="block hover:text-[#b08456] transition">
                    hello@brewandbean.co
                  </a>
                  <a href="tel:+15551234567" className="block hover:text-[#b08456] transition">
                    (555) 123-4567
                  </a>
                  <p className="pt-2 text-sm text-[#b08456]">@brewandbean</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-16 reveal">
              <a
                href="mailto:hello@brewandbean.co"
                className="inline-block bg-[#3b2a20] text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-[#b08456] transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Reserve a Table
              </a>
              <p className="text-[#3b2a20]/50 mt-4 text-sm">
                Or just walk in - well save you the seat by the window.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1f1612] text-[#f6f1ea]/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="serif text-xl text-[#f6f1ea]">
            Brew<span className="text-[#b08456]">&</span>Bean
          </div>
          <p className="text-xs tracking-widest uppercase">2024 - Made with care in Brooklyn</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-[#b08456] transition">Instagram</a>
            <a href="#" className="hover:text-[#b08456] transition">Twitter</a>
            <a href="#" className="hover:text-[#b08456] transition">Spotify</a>
          </div>
        </div>
      </footer>
    </>
  );
}