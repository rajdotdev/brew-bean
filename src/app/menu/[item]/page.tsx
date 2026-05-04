"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getItemById, menuItems } from "@/data/menu";
import Nav from "@/components/Nav";

// model-viewer types
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          "ios-src"?: string;
          alt?: string;
          ar?: boolean;
          "ar-modes"?: string;
          "camera-controls"?: boolean;
          autoRotate?: boolean;
          shadowIntensity?: number;
          style?: React.CSSProperties;
        },
        HTMLElement
      >;
    }
  }
}

interface PageProps {
  params: Promise<{ item: string }>;
}

export default function ItemDetailPage({ params }: PageProps) {
  const { item: itemId } = use(params);
  const item = getItemById(itemId);
  const [modelLoaded, setModelLoaded] = useState(false);

  const isIOS = typeof window !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, [itemId]);

  if (!item) {
    notFound();
  }

  const modelSrc = item.modelPath ? `/models/${item.modelPath}` : null;
  const iosSrc = item.modelPath ? `/models/${item.modelPath.replace('.glb', '.usdz')}` : null;

  const handleARClick = () => {
    const modelViewer = document.querySelector("model-viewer");
    if (modelViewer && (modelViewer as any).activateAR) {
      (modelViewer as any).activateAR();
    }
  };

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-20 pb-16">
        {/* Back Button */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-6">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-coffee/60 hover:text-caramel transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Menu
          </Link>
        </div>

        {/* Item Detail */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* 3D Viewer */}
            <div className="relative">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[#faf6f0] to-[#f6f1ea] shadow-xl">
                {modelSrc ? (
                  <>
                    <model-viewer
                      src={modelSrc}
                      ios-src={iosSrc || undefined}
                      alt={`${item.name} 3D model`}
                      ar
                      ar-modes="webxr scene-viewer quick-look"
                      camera-controls
                      auto-rotate
                      shadow-intensity="1"
                      style={{ width: "100%", height: "100%", background: "transparent" }}
                      onLoad={() => setModelLoaded(true)}
                    />
                    {!modelLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#faf6f0]">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 border-4 border-[#b08456]/30 border-t-[#b08456] rounded-full animate-spin" />
                          <p className="text-coffee/50 text-sm">Loading 3D Model...</p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-40 h-40 rounded-full bg-[#3b2a20]/5 flex items-center justify-center mb-6">
                      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#b08456" strokeWidth="1.5" opacity="0.5">
                        <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" />
                      </svg>
                    </div>
                    <p className="text-coffee/40 text-center px-8">
                      This item is coming soon in 3D
                    </p>
                  </div>
                )}
              </div>

              {/* AR Badge */}
              {modelSrc && (
                <div className="absolute top-4 right-4 bg-[#3b2a20] text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                  3D View
                </div>
              )}
            </div>

            {/* Item Info */}
            <div className="reveal">
              <div className="mb-2">
                <span className="text-sm tracking-[0.2em] uppercase text-caramel">
                  {item.categoryLabel}
                </span>
              </div>

              <h1 className="serif text-4xl md:text-5xl lg:text-6xl text-coffee mb-6">
                {item.name}
              </h1>

              <p className="text-lg text-coffee/70 leading-relaxed mb-8">
                {item.desc}
              </p>

              <div className="text-4xl serif text-caramel mb-8">
                {item.price}
              </div>

              {/* AR Action Button */}
              <div className="space-y-4">
                {modelSrc ? (
                  isIOS && iosSrc ? (
                    <a
                      href={iosSrc}
                      className="block w-full bg-[#3b2a20] text-white py-5 rounded-2xl text-center font-medium text-lg hover:bg-[#b08456] transition-colors shadow-lg hover:shadow-xl"
                    >
                      View in Your Space (AR)
                    </a>
                  ) : (
                    <button
                      onClick={handleARClick}
                      className="w-full bg-[#3b2a20] text-white py-5 rounded-2xl text-center font-medium text-lg hover:bg-[#b08456] transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                        <line x1="12" y1="22.08" x2="12" y2="12" />
                      </svg>
                      View in Your Space (AR)
                    </button>
                  )
                ) : (
                  <div className="w-full bg-[#3b2a20]/10 text-coffee/40 py-5 rounded-2xl text-center font-medium text-lg cursor-not-allowed">
                    3D Model Coming Soon
                  </div>
                )}

                {/* Instructions */}
                <div className="bg-[#faf6f0] rounded-2xl p-6 border border-[#3b2a20]/5">
                  <h3 className="font-medium text-coffee mb-3 flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b08456" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                    How AR Works
                  </h3>
                  <p className="text-sm text-coffee/60 leading-relaxed">
                    Tap the button above to open your camera. Point at a flat surface like a table or floor, then tap to place the item. You can walk around to view it from every angle.
                  </p>
                </div>
              </div>

              {/* Other Items */}
              <div className="mt-12 pt-8 border-t border-[#3b2a20]/10">
                <h3 className="text-sm tracking-[0.2em] uppercase text-coffee/50 mb-4">
                  More in {item.categoryLabel}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {menuItems
                    .filter((i) => i.category === item.category && i.id !== item.id)
                    .slice(0, 4)
                    .map((otherItem) => (
                      <Link
                        key={otherItem.id}
                        href={`/menu/${otherItem.id}`}
                        className="px-4 py-2 bg-[#faf6f0] rounded-full text-sm text-coffee/70 hover:bg-[#b08456]/20 hover:text-caramel transition-colors"
                      >
                        {otherItem.name}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
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