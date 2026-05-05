"use client";

import { use, useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";

interface MenuItem {
  _id: string;
  name: string;
  slug: { current: string };
  description: string;
  price: string;
  has3DModel: boolean;
  modelFileAndroid?: {
    asset: {
      url: string;
    };
  };
  modelFileIOS?: {
    asset: {
      url: string;
    };
  };
  category: { name: string; slug: { current: string } };
}

function useMenuItem(slug: string) {
  const [item, setItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/menu?slug=${slug}`)
      .then(res => res.json())
      .then(data => {
        setItem(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [slug]);

  return { item, loading };
}

function FloatingDoodle({ type, delay, left, top }: { type: 'bean' | 'cup' | 'steam' | 'sparkle'; delay: number; left: string; top: string }) {
  const doodles = {
    bean: (
      <svg width="25" height="25" viewBox="0 0 50 50" fill="none">
        <ellipse cx="25" cy="25" rx="14" ry="18" stroke="#a67040" strokeWidth="2" strokeDasharray="4 2" fill="none" />
        <path d="M25 10 Q28 25 25 40" stroke="#a67040" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    cup: (
      <svg width="25" height="25" viewBox="0 0 40 40" fill="none">
        <path d="M8 10h20a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4z" stroke="#a67040" strokeWidth="2" fill="none" />
        <path d="M28 16h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4" stroke="#a67040" strokeWidth="2" fill="none" />
      </svg>
    ),
    steam: (
      <svg width="15" height="35" viewBox="0 0 15 35" fill="none">
        <path d="M3 5 Q8 12 3 20" stroke="#a67040" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        <path d="M12 8 Q7 18 12 30" stroke="#a67040" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
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

function DoodleCup({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="60" height="60" viewBox="0 0 40 40" fill="none">
      <path d="M8 10h20a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4z" stroke="#a67040" strokeWidth="2" fill="none" />
      <path d="M28 16h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4" stroke="#a67040" strokeWidth="2" fill="none" />
      <path d="M12 6h12" stroke="#a67040" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

interface PageProps {
  params: Promise<{ item: string }>;
}

export default function ItemDetailPage({ params }: PageProps) {
  const { item: slug } = use(params);
  const { item, loading } = useMenuItem(slug);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelError, setModelError] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const isIOS = typeof window !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = typeof window !== "undefined" && /Android/.test(navigator.userAgent);

  useEffect(() => {
    window.scrollTo(0, 0);

    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(-15px) rotate(3deg); }
        50% { transform: translateY(-5px) rotate(-2deg); }
        75% { transform: translateY(-20px) rotate(2deg); }
      }
      .animate-float {
        animation: float 8s ease-in-out infinite;
      }
      model-viewer {
        --poster-color: transparent;
      }
      model-viewer.loaded .poster {
        opacity: 0;
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [slug]);

  // Handle model load/error events
  useEffect(() => {
    if (!isInView) return;

    const mv = document.querySelector("model-viewer");
    if (!mv) return;

    const onLoad = () => {
      setModelLoaded(true);
      setModelError(false);
    };
    const onError = () => {
      setModelError(true);
    };
    const onProgress = (e: Event) => {
      const target = e.target as HTMLElement;
      const progress = target.getAttribute("progress");
      if (progress) {
        setLoadProgress(parseFloat(progress));
      }
    };

    mv.addEventListener("load", onLoad);
    mv.addEventListener("error", onError);
    mv.addEventListener("progress", onProgress);

    // Check if already loaded
    const mvEl = mv as HTMLElement & { loaded?: boolean };
    if (mvEl.loaded) {
      setModelLoaded(true);
    }

    return () => {
      mv.removeEventListener("load", onLoad);
      mv.removeEventListener("error", onError);
      mv.removeEventListener("progress", onProgress);
    };
  }, [isInView]);

  if (loading) {
    return (
      <>
        <Nav />
        <div className="min-h-screen pt-24 flex items-center justify-center bg-[#f6f1ea]">
          <div className="text-[#2d1f1a]">Loading...</div>
        </div>
      </>
    );
  }

  if (!item) {
    notFound();
  }

  // Get model URLs from Sanity - these are the actual uploaded files
  const androidModelUrl = item.modelFileAndroid?.asset?.url;
  const iosModelUrl = item.modelFileIOS?.asset?.url;

  // Use .glb for everything - model-viewer supports Quick Look on iOS with .glb
  // This avoids the large .usdz file issue
  const modelSrc = androidModelUrl || iosModelUrl;
  const arSrc = isIOS ? androidModelUrl || iosModelUrl : androidModelUrl;

  const hasModel = item.has3DModel && (androidModelUrl || iosModelUrl);

  const handleARClick = () => {
    const modelViewer = document.querySelector("model-viewer") as any;
    if (modelViewer && modelViewer.activateAR) {
      modelViewer.activateAR();
    }
  };

  // Calculate model size (if available)
  const modelSizeKB = modelSrc ? 0 : 0; // Can't know size without fetching headers
  const displayProgress = modelLoaded ? 100 : loadProgress;

  return (
    <>
      <div className="grain fixed inset-0 z-50 pointer-events-none" />

      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <FloatingDoodle type="bean" delay={0} left="5%" top="10%" />
        <FloatingDoodle type="cup" delay={2} left="90%" top="15%" />
        <FloatingDoodle type="steam" delay={4} left="10%" top="70%" />
        <FloatingDoodle type="sparkle" delay={1} left="80%" top="60%" />
        <FloatingDoodle type="bean" delay={3} left="50%" top="85%" />
      </div>

      <Nav />
      <main className="min-h-screen pt-20 pb-16 bg-[#f6f1ea] relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-6">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-[#6b5b4f] hover:text-[#a67040] transition-colors bg-white px-4 py-2 rounded-full shadow-sm"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Menu
          </Link>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* 3D Viewer */}
            <div className="relative" ref={containerRef}>
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-[#faf6f0] to-[#f0ebe3] shadow-2xl border-2 border-[#a67040]/20">
                {!hasModel || modelError ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#faf6f0] to-[#f0ebe3]">
                    <div className="relative mb-6">
                      <div className="w-40 h-40 rounded-full bg-[#2d1f1a]/5 flex items-center justify-center">
                        <DoodleCup className="w-28 h-28" />
                      </div>
                    </div>
                    <p className="text-[#2d1f1a] font-medium text-xl mb-2">{item.name}</p>
                    <p className="text-[#a67040] text-lg font-semibold mb-1">{item.price}</p>
                    <p className="text-[#6b5b4f] text-sm">
                      {modelError ? "3D model unavailable" : (!item.has3DModel ? "3D coming soon" : "Upload a 3D model in Studio")}
                    </p>
                  </div>
                ) : (
                  <model-viewer
                    src={modelSrc || ''}
                    ios-src={isIOS ? arSrc || undefined : undefined}
                    alt={`${item.name} 3D model`}
                    ar
                    ar-modes="webxr scene-viewer quick-look"
                    camera-controls
                    auto-rotate
                    rotation-per-second="30deg"
                    shadow-intensity="1"
                    shadow-softness="1"
                    exposure="1"
                    environment-image="neutral"
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "transparent",
                    }}
                    render-scale="0.5"
                    loading="lazy"
                  />
                )}
                {/* Loading Overlay */}
                {hasModel && !modelError && !modelLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#faf6f0]/95 z-10">
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative w-20 h-20">
                        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                          <circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="none"
                            stroke="#f0e6d8"
                            strokeWidth="3"
                          />
                          <circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="none"
                            stroke="#a67040"
                            strokeWidth="3"
                            strokeDasharray={`${100} 100`}
                            strokeDashoffset={100 - displayProgress}
                            strokeLinecap="round"
                            className="transition-all duration-300"
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-[#a67040]">
                          {Math.round(loadProgress)}%
                        </span>
                      </div>
                      <p className="text-[#6b5b4f] text-sm">Loading 3D Model...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Status Badge */}
              {hasModel && !modelError && (
                <div className="absolute top-4 right-4 bg-[#2d1f1a] text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  </svg>
                  {modelLoaded ? "3D Ready" : "Loading..."}
                </div>
              )}
            </div>

            {/* Item Info */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-[#a67040]/10">
              <div className="mb-2">
                <span className="text-sm tracking-[0.2em] uppercase text-[#a67040] font-medium bg-[#a67040]/10 px-3 py-1 rounded-full">
                  {item.category?.name || 'Menu'}
                </span>
              </div>

              <h1 className="serif text-3xl md:text-4xl lg:text-5xl text-[#2d1f1a] mb-3">
                {item.name}
              </h1>

              <p className="text-lg text-[#6b5b4f] leading-relaxed mb-6">
                {item.description}
              </p>

              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#2d1f1a]/10">
                <div className="text-4xl md:text-5xl serif text-[#a67040] font-semibold">
                  {item.price}
                </div>
                {hasModel && (
                  <span className="inline-flex items-center text-sm bg-[#a67040]/10 text-[#a67040] px-3 py-1.5 rounded-full font-medium">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    </svg>
                    3D Available
                  </span>
                )}
              </div>

              {/* AR Button */}
              <div className="space-y-4">
                {hasModel && !modelError && (
                  isIOS ? (
                    iosModelUrl ? (
                      <a
                        href={iosModelUrl}
                        className="block w-full bg-[#2d1f1a] text-white py-4 rounded-2xl text-center font-medium text-lg hover:bg-[#a67040] transition-colors shadow-lg flex items-center justify-center gap-3"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        </svg>
                        View in Your Space (AR)
                      </a>
                    ) : (
                      <button
                        disabled
                        className="w-full bg-gray-400 text-white py-4 rounded-2xl text-center font-medium text-lg cursor-not-allowed"
                      >
                        iOS Model Not Available
                      </button>
                    )
                  ) : (
                    <button
                      onClick={handleARClick}
                      disabled={!modelLoaded}
                      className="w-full bg-[#2d1f1a] text-white py-4 rounded-2xl text-center font-medium text-lg hover:bg-[#a67040] transition-colors shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      </svg>
                      View in Your Space (AR)
                    </button>
                  )
                )}

                <div className="bg-[#faf6f0] rounded-2xl p-5 border border-[#2d1f1a]/5">
                  <h3 className="font-medium text-[#2d1f1a] mb-2 flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a67040" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                    How AR Works
                  </h3>
                  <p className="text-sm text-[#6b5b4f] leading-relaxed">
                    Tap the button above to open your camera. Point at a flat surface like a table or floor, then tap to place the item. You can walk around to view it from every angle.
                  </p>
                  <div className="mt-3 flex gap-2 text-xs text-[#a67040]">
                    <span className="bg-[#a67040]/10 px-2 py-1 rounded">Android: .glb</span>
                    <span className="bg-[#a67040]/10 px-2 py-1 rounded">iOS: .usdz</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

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
    </>
  );
}
