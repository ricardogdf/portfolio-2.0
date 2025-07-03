"use client";

import AboutMe from "@/components/about-me";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import BackgroundScene from "@/components/background-scene";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Actions from "@/components/actions";

const SECTIONS = [
  { id: "about", label: "Sobre" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experiência" },
  { id: "projects", label: "Projetos" },
  { id: "final", label: "Final" },
];

function DiamondNav({ activeSection, onNavigate }: { activeSection: string; onNavigate: (id: string) => void }) {
  return (
    <div className="fixed right-6 top-1/2 z-50 flex flex-col gap-4 -translate-y-1/2">
      {SECTIONS.map((section) => (
        <button
          key={section.id}
          aria-label={section.label}
          onClick={() => onNavigate(section.id)}
          className={`w-6 h-6 rotate-45 border-2 transition-all duration-300 ${
            activeSection === section.id
              ? "bg-primary border-primary shadow-lg scale-110"
              : "bg-background border-muted opacity-60 hover:scale-105"
          }`}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [openPortal, setOpenPortal] = useState(false);
  const [bugEffect, setBugEffect] = useState(false);
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const sectionRefs = SECTIONS.map(() => useRef<HTMLElement | null>(null));

  // Scroll snapping e detecção de seção visível
  useEffect(() => {
    const handleScroll = () => {
      const offsets = sectionRefs.map(ref => {
        if (!ref.current) return Infinity;
        const rect = ref.current.getBoundingClientRect();
        return Math.abs(rect.top - window.innerHeight / 4);
      });
      const minIdx = offsets.indexOf(Math.min(...offsets));
      setActiveSection(SECTIONS[minIdx].id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (id: string) => {
    const idx = SECTIONS.findIndex(s => s.id === id);
    const ref = sectionRefs[idx];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleButtonClick = () => {
    setOpenPortal(true);
    // Scroll mais lento para o topo
    const scrollToTop = () => {
      const currentPosition = window.scrollY;
      if (currentPosition > 0) {
        window.scrollTo(0, currentPosition - 25);
        requestAnimationFrame(scrollToTop);
      } else {
        // Inicia o efeito de sucção quando chegar ao topo
        setTimeout(() => {
          setBugEffect(true);
          setTimeout(() => setBugEffect(false), 1000);
          setTimeout(() => setBugEffect(true), 2000);
          setTimeout(() => setBugEffect(false), 2500);
          setTimeout(() => setBugEffect(true), 3000);
          setTimeout(() => setBugEffect(false), 3300);
          setTimeout(() => setBugEffect(true), 3500);
        }, 1000);
      }
    };
    scrollToTop();
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundScene bugEffect={bugEffect}/>
      <DiamondNav activeSection={activeSection} onNavigate={handleNavigate} />
      <motion.div
        className="relative z-10"
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, ease: "easeIn" }}
      >
        <main className="container mx-auto px-4 snap-y snap-mandatory h-screen overflow-y-scroll scrollbar-hide">
          <section ref={sectionRefs[0]} id="about" className="snap-start min-h-screen flex items-center"><AboutMe bugEffect={bugEffect} openPortal={openPortal} /></section>
          <section ref={sectionRefs[1]} id="skills" className="snap-start min-h-screen flex items-center"><Skills /></section>
          <section ref={sectionRefs[2]} id="experience" className="snap-start min-h-screen flex items-center"><Experience /></section>
          <section ref={sectionRefs[3]} id="projects" className="snap-start min-h-screen flex items-center"><Projects /></section>
          <section ref={sectionRefs[4]} id="final" className="snap-start min-h-screen flex justify-center items-center">
            {!openPortal ? (
              <button
                onClick={handleButtonClick}
                className="text-2xl font-mono hover:scale-110 transition-transform duration-300"
              >
                []
              </button>
            ) : ("bill")}
          </section>
        </main>
        <Actions />
      </motion.div>
    </div>
  );
}
