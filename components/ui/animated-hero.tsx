"use client";

import React from 'react';
import { Phone } from 'lucide-react';
import Link from 'next/link';

function Hero() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-nourx-blue/20 relative">

      {/* Fond subtil */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-50/50 rounded-full blur-[100px] opacity-60" />
      </div>

      {/* --- HERO CONTENT --- */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-24 pb-12 text-center max-w-5xl mx-auto">

        {/* Titre Principal */}
        <div className="space-y-4 max-w-4xl animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-nourx-black">
            Votre transformation <br className="hidden md:block" />
            <span className="text-nourx-blue inline-block relative">
              digitale
              {/* Soulignement créatif */}
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>
        </div>

        {/* Paragraphe de description */}
        <p className="mt-8 text-lg md:text-xl text-nourx-gray-600 max-w-2xl leading-relaxed animate-fade-in-up delay-100">
          Du conseil stratégique à l'exploitation 24/7, nous accompagnons les entreprises africaines dans leur transformation digitale avec des solutions sur-mesure et une expertise locale reconnue.
        </p>

        {/* Section Statistiques */}
        <div className="mt-10 md:mt-12 flex flex-wrap justify-center gap-8 md:gap-16 items-center animate-fade-in-up delay-200">
          <StatItem number="80+" label="Projets livrés" />
          <div className="hidden md:block w-px h-8 bg-nourx-gray-200"></div>
          <StatItem number="35+" label="Clients satisfaits" />
          <div className="hidden md:block w-px h-8 bg-nourx-gray-200"></div>
          <StatItem number="4" label="Pays couverts" />
        </div>

        {/* Bouton d'action (CTA) */}
        <div className="mt-12 flex items-center justify-center animate-fade-in-up delay-300">

          {/* Bouton Contact */}
          <Link href="/contact">
            <button className="group px-6 py-3.5 rounded-xl border border-nourx-gray-200 bg-white text-nourx-gray-700 font-medium hover:border-nourx-gray-300 hover:bg-nourx-gray-50 hover:text-nourx-black transition-all flex items-center gap-2 shadow-sm">
              <span>Discuter de votre projet</span>
              <Phone className="w-4 h-4 text-nourx-gray-400 group-hover:text-nourx-gray-600 transition-colors" />
            </button>
          </Link>

        </div>

      </main>

      {/* Badge Flottant en bas à gauche */}
      <div className="fixed bottom-6 left-6 z-40">
        <div className="w-10 h-10 bg-nourx-black rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg cursor-pointer hover:scale-110 transition-transform">
          N
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>
    </div>
  );
}

// Composant Helper pour les stats
const StatItem = ({ number, label }: { number: string; label: string }) => (
  <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
    <span className="text-3xl font-bold text-nourx-blue tracking-tight">{number}</span>
    <span className="text-sm font-medium text-nourx-gray-500 uppercase tracking-wide mt-1">{label}</span>
  </div>
);

export { Hero };