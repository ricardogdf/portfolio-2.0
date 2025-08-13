"use client";

import AboutMe from "@/components/about-me";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import BackgroundScene from "@/components/background-scene";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Actions from "@/components/actions";
import DiamondNav from "@/components/diamond-nav";
import Me from "@/components/me";

const SECTIONS = [
  { id: "me", label: "Eu" },
  { id: "about", label: "Sobre" },
  { id: "experience", label: "Experiência" },
  { id: "projects", label: "Projetos" },
  { id: "final", label: "Final" },
];

export default function Home() {
  const [openPortal, setOpenPortal] = useState(false);
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const sectionRefs = SECTIONS.map(() => useRef<HTMLElement | null>(null));

  // Scroll snapping e detecção de seção visível
  useEffect(() => {
    const handleScroll = () => {
      const offsets = sectionRefs.map((ref) => {
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

  // Navegação global por scroll (wheel) mais fluída
  useEffect(() => {
    let isThrottled = false;
    const mainContainer = document.querySelector("main");
    const handleWheel = (e: WheelEvent) => {
      // Só navega se o mouse estiver sobre o container principal
      if (
        !mainContainer ||
        !(e.target instanceof Node) ||
        !mainContainer.contains(e.target)
      )
        return;
      if (isThrottled) return;
      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
      }, 400); // throttle menor para fluidez
      const currentIdx = SECTIONS.findIndex((s) => s.id === activeSection);
      if (e.deltaY > 0 && currentIdx < SECTIONS.length - 1) {
        e.preventDefault();
        handleNavigate(SECTIONS[currentIdx + 1].id);
      } else if (e.deltaY < 0 && currentIdx > 0) {
        e.preventDefault();
        handleNavigate(SECTIONS[currentIdx - 1].id);
      }
    };
    mainContainer?.addEventListener("wheel", handleWheel, { passive: false });
    return () => mainContainer?.removeEventListener("wheel", handleWheel);
  }, [activeSection]);

  const handleNavigate = (id: string) => {
    const idx = SECTIONS.findIndex((s) => s.id === id);
    const ref = sectionRefs[idx];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });

      setActiveSection(id);
    }
  };

  const handleButtonClick = () => {
    handleNavigate("me");

    setTimeout(() => {
      setOpenPortal(openPortal ? false : true);
    }, 1000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundScene openPortal={openPortal} />
      <DiamondNav
        SECTIONS={SECTIONS}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />
      <motion.div
        className="relative z-10"
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, ease: "easeIn" }}
      >
        <main className="container mx-auto px-4 snap-y snap-mandatory h-screen overflow-y-scroll scrollbar-hide">
          <section
            ref={sectionRefs[0]}
            id="me"
            className="snap-start min-h-screen flex items-center"
          >
            <Me openPortal={openPortal} />
          </section>
          <section
            ref={sectionRefs[1]}
            id="about"
            className="snap-start min-h-screen flex items-center"
          >
            <AboutMe />
          </section>
          <section
            ref={sectionRefs[2]}
            id="experience"
            className="snap-start min-h-screen flex items-center"
          >
            <Experience />
          </section>
          <section
            ref={sectionRefs[3]}
            id="projects"
            className="snap-start min-h-screen flex items-center"
          >
            <Projects />
          </section>
          <section
            ref={sectionRefs[4]}
            id="final"
            className="snap-start min-h-screen flex justify-center items-center"
          >
            <div className="flex flex-col items-center">
              <h2 className="flex gap-4 font-bold tracking-tight sm:text-3xl md:text-4xl bg-clip-text mb-4">
                Thank you, that's all.
              </h2>
              <p className="font-bold text-muted-foreground">For now.</p>
            </div>
          </section>
          <section className="snap-start min-h-screen flex justify-center items-center">
            <button
              onClick={handleButtonClick}
              className="text-2xl font-mono hover:scale-110 transition-transform duration-300"
            >
              []
            </button>
          </section>
        </main>
        <Actions />
      </motion.div>
    </div>
  );
}
