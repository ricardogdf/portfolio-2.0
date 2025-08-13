"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function Experience() {
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
    <div className="mx-auto max-w-6xl">
      <motion.h2
        className="mb-8 text-center text-3xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{ willChange: "transform, opacity" }}
      >
        Work Experience
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Lista de empresas à esquerda */}
        <div className="flex flex-col gap-2">
          {experiences.map((exp, idx) => (
            <button
              key={idx}
              className={`flex items-center gap-3 p-4 rounded-lg border transition-all bg-primary/5 hover:bg-primary/10 border-primary/10 focus:outline-none ${
                selected === idx ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelected(idx)}
            >
              <div className="relative w-10 h-10 rounded-md overflow-hidden bg-primary/10 flex-shrink-0">
                <Image
                  src={exp.logo || "/placeholder.svg"}
                  alt={exp.company}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-semibold text-base">{exp.company}</span>
                <span className="text-xs text-muted-foreground">
                  {exp.period}
                </span>
              </div>
            </button>
          ))}
        </div>
        {/* Detalhes da empresa selecionada à direita */}
        <div className="col-span-2 bg-card border border-primary/10 rounded-lg p-6 flex flex-col justify-center">
          <h4 className="font-medium text-lg mb-2">
            {experiences[selected].role}
          </h4>
          <p className="text-sm text-muted-foreground mb-4">
            {experiences[selected].description}
          </p>
          <div className="grid gap-4">
            <div>
              <h5 className="font-medium mb-2">Realizações:</h5>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {experiences[selected].achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-2">Tecnologias:</h5>
              <div className="flex flex-wrap gap-2">
                {experiences[selected].technologies.map((tech, i) => (
                  <span key={i} className="skill-badge text-xs py-1">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
