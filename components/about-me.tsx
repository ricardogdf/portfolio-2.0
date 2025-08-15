"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";

export default function AboutMe() {
  const [selected, setSelected] = useState<number>(0);

  const experiences = [
    {
      company: "Prime DB Solutions",
      logo: "/primedb.png",
      period: "2023 - Presente",
      role: "Desenvolvedor Full Stack",
      description:
        "Desenvolvimento de aplicações web utilizando React, TypeScript, Node JS e Java. Desenvolvedor solo responsável pelo sistema ITSM da empresa.",
      achievements: [
        "Migração de sistema legado para stack atualizada e moderna (React)",
        "Implementação de integração com API de terceiros",
        "Desenvolvimento de um design system para padronizar a UI do sistema",
      ],
      technologies: [
        "React",
        "Node.js",
        "TypeScript",
        "JavaScript",
        "Java",
        "Oracle",
      ],
    },
    {
      company: "Madeira Madeira",
      logo: "/madeira-madeira.jpg",
      period: "2021 - 2023",
      role: "Desenvolvedor Frontend",
      description:
        "Desenvolvimento componentes e telas utilizando Next.js. Participava do time responsável pela home, página de produto e listagem de produtos.",
      achievements: [
        "Desenvolvimento de componentes reutilizáveis para a biblioteca de UI",
        "Trabalho em equipe com designers para garantir a melhor experiência do usuário",
        "Trabalho em melhorias de performance e acessibilidade",
      ],
      technologies: ["Next.js", "React", "TypeScript", "Git", "GraphQL"],
    },
  ];

  return (
    <div className="flex flex-col items-center mx-auto max-w-6xl">
      <motion.h2
        className="mb-8 text-center text-3xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{ willChange: "transform, opacity" }}
      >
        About Me
      </motion.h2>
      <motion.p
        className="mb-8 text-center text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{ willChange: "transform, opacity" }}
      >
        Web developer interested in design, security, artificial intelligence,
        and animated websites.
      </motion.p>
      <Button>See the magic</Button>
    </div>
  );
}
