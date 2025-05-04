"use client";

import Header from "@/components/header";
import AboutMe from "@/components/about-me";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import BackgroundScene from "@/components/background-scene";
import { useState } from "react";

export default function Home() {
  const [sendRocket, setSendRocket] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundScene sendRocket={sendRocket} />
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <AboutMe />
          <Skills />
          <Experience />
          <Projects />
          <div className="flex justify-center">
            <button onClick={() => setSendRocket(true)}>[ ]</button>
          </div>
        </main>
        <footer className="border-t py-6 bg-background/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} - Todos os direitos reservados
          </div>
        </footer>
      </div>
    </div>
  );
}
