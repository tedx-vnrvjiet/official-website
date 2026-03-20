"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { siteData } from "@/data/site-data";
import { Twitter, Linkedin, Instagram, X } from "lucide-react";

export const Speakers = () => {
  const [activeSpeaker, setActiveSpeaker] = useState<typeof siteData.speakers[0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.05 });

  return (
    <section id="speakers" ref={containerRef} className="relative py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0"
        >
          <div>
            <h4 className="text-ted-red font-bold text-xs tracking-[0.5em] uppercase mb-4">Meet the Visionaries</h4>
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-white">
              The <span className="text-white/20">Numina</span> <br /> Speakers
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-lg text-white/50 leading-relaxed font-medium">
              A curated group of thinkers, makers, and dreamers who have peered behind the curtain of the obvious to reveal the hidden forces that shape our world.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scrollable Carousel */}
      <div className="relative w-full overflow-x-auto no-scrollbar py-12 snap-x snap-mandatory px-6 lg:px-[10%]">
        <div className="flex space-x-6 md:space-x-8 w-max pb-8 after:content-[''] after:w-[1px] after:pr-6 lg:after:pr-[10%]">
          {siteData.speakers.map((speaker, i) => (
            <motion.div
              key={speaker.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => setActiveSpeaker(speaker)}
              className="relative group snap-center shrink-0 w-[85vw] sm:w-[300px] md:w-[400px] aspect-[3/4] rounded-3xl overflow-hidden bg-white/5 border border-white/10 cursor-pointer"
            >
              {/* Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  style={{ objectPosition: (speaker as any).imagePosition || "center" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-10 flex flex-col items-start">
                <div className="mb-2 px-3 py-1 bg-ted-red text-[10px] font-black tracking-widest rounded-full text-white uppercase transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                  {speaker.talk}
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-2 leading-none uppercase">
                  {speaker.name}
                </h3>
                <p className="text-xs sm:text-sm font-bold tracking-wider text-white/50 uppercase italic">
                  {speaker.title}
                </p>
              </div>

              {/* Spotlight Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(230,43,30,0.15)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Speaker Modal */}
      <AnimatePresence>
        {activeSpeaker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-3xl"
            onClick={() => setActiveSpeaker(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-zinc-900/50 rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveSpeaker(null)}
                className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-ted-red transition-colors text-white"
              >
                <X size={24} />
              </button>

              {/* Left Side: Image/Info */}
              <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                <img
                  src={activeSpeaker.image}
                  alt={activeSpeaker.name}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: (activeSpeaker as any).imagePosition || "center" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-10 left-10">
                  <h3 className="text-4xl font-black text-white uppercase tracking-tight">{activeSpeaker.name}</h3>
                  <p className="text-ted-red font-bold tracking-widest uppercase text-xs">{activeSpeaker.title}</p>
                </div>
              </div>

              {/* Right Side: Details */}
              <div className="md:w-3/5 p-10 md:p-16 overflow-y-auto custom-scrollbar">
                <div className="mb-8">
                  <h4 className="text-xs font-black tracking-[0.4em] text-white/30 uppercase mb-4">The Talk</h4>
                  <h2 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase tracking-tighter mb-4">
                    {activeSpeaker.talk}
                  </h2>
                  {/* <p className="text-lg text-white/70 leading-relaxed font-medium italic">
                    &quot;{activeSpeaker.quote}&quot;
                  </p> */}
                </div>

                <div className="mb-12">
                  <h4 className="text-xs font-black tracking-[0.4em] text-white/30 uppercase mb-4">Biography</h4>
                  <p className="text-white/60 leading-relaxed text-lg">
                    {activeSpeaker.bio}
                  </p>
                </div>

                <div className="flex space-x-6 items-center">
                  {activeSpeaker.social?.instagram && activeSpeaker.social.instagram !== "#" && (
                    <a href={activeSpeaker.social.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:text-ted-red transition-colors border border-white/10">
                      <Instagram size={20} />
                    </a>
                  )}
                  {activeSpeaker.social?.twitter && activeSpeaker.social.twitter !== "#" && (
                    <a href={activeSpeaker.social.twitter} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:text-ted-red transition-colors border border-white/10">
                      <Twitter size={20} />
                    </a>
                  )}
                  {activeSpeaker.social?.linkedin && activeSpeaker.social.linkedin !== "#" && (
                    <a href={activeSpeaker.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:text-ted-red transition-colors border border-white/10">
                      <Linkedin size={20} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
