"use client";

import AboutMe from "@/components/about-me";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import BackgroundScene from "@/components/background-scene";
import { useState } from "react";
import { motion } from "framer-motion";
import SocialLinks from "@/components/social-links";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const [sendRocket, setSendRocket] = useState(false);
  const [isSucking, setIsSucking] = useState(false);

  const handleButtonClick = () => {
    setSendRocket(true);
    // Scroll mais lento para o topo
    const scrollToTop = () => {
      const currentPosition = window.scrollY;
      if (currentPosition > 0) {
        window.scrollTo(0, currentPosition - 25);
        requestAnimationFrame(scrollToTop);
      } else {
        // Inicia o efeito de sucção quando chegar ao topo
        setTimeout(() => {
          setIsSucking(true);
        }, 1000);
      }
    };
    scrollToTop();
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundScene sendRocket={sendRocket} isSucking={isSucking} />
      <motion.div
        className="relative z-10"
        animate={{
          y: isSucking ? 1000 : 0,
          opacity: isSucking ? 0 : 1,
        }}
        transition={{
          duration: 2,
          ease: "easeIn",
        }}
      >
        <main className="container mx-auto px-4">
          <motion.div className="w-[220px] z-[999] border border-slate-500 bg-white dark:bg-slate-900 p-1 rounded-full fixed bottom-5 left-[calc(50vw-110px)] flex items-center justify-between"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ willChange: 'transform, opacity' }}>
            <SocialLinks />
            <div className="h-4 w-px bg-slate-800 dark:bg-slate-100" />
            <ThemeToggle />
          </motion.div>
          <AboutMe />
          <Skills />
          <Experience />
          <Projects />
          <div className="h-screen flex justify-center">
            <button
              onClick={handleButtonClick}
              className="text-2xl font-mono hover:scale-110 transition-transform duration-300"
              disabled={sendRocket}
            >
              []
            </button>
          </div>
        </main>
      </motion.div>
    </div>
  );
}
