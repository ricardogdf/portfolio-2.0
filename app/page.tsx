"use client";

import AboutMe from "@/components/about-me";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import BackgroundScene from "@/components/background-scene";
import { useState } from "react";
import { motion } from "framer-motion";
import Actions from "@/components/actions";

export default function Home() {
  const [openPortal, setOpenPortal] = useState(false);
  const [bugEffect, setBugEffect] = useState(false);

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
      <motion.div
        className="relative z-10"
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 2,
          ease: "easeIn",
        }}
      >
        <main className="container mx-auto px-4">
          <AboutMe bugEffect={bugEffect} openPortal={openPortal} />
          <Skills />
          <Experience />
          <Projects />
          <section className="h-screen flex justify-center">
            {!openPortal ?
              (<button
                onClick={handleButtonClick}
                className="text-2xl font-mono hover:scale-110 transition-transform duration-300"
              >
                []
              </button>)
              : ('bill')}
          </section>
        </main>
        <Actions />
      </motion.div>
    </div>
  );
}
