// components/Hero.jsx

import React from "react";
import { ArrowRight } from "lucide-react";


export default function Hero() {
    return (
        <section className="min-h-dvh flex items-center justify-center px-4 pt-24 md:pt-28">
            <div className="max-w-5xl mx-auto p-8 rounded-2xl backdrop-blur-sm border border-white/10">
                <div className="mb-6 text-gray-500 font-mono text-xs tracking-[0.18em] md:text-sm">
                    DEVELOPER / VETERAN / BUILDER
                </div>


                <h1 className="font-bold leading-tight mb-8">
                    <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl">TYLER</span>
                    <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gray-700">THOMPSON</span>
                </h1>


                <p className="text-base sm:text-lg md:text-2xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
                    Crafting digital experiences at the intersection of design and technology.
                    Building the future, one line of code at a time.
                </p>


                <a
                    href="#work"
                    className="inline-flex items-center gap-3 text-white border rounded-2xl border-gray-700 px-6 py-3 sm:px-8 sm:py-4 hover:bg-white hover:text-black transition-all group"
                >
                    <span className="text-base sm:text-lg">Explore Work</span>
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </a>
            </div>
        </section>
    );
}