"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Experience() {
  const [openDetails, setOpenDetails] = useState<number | null>(null);

  const experiences = [
    {
      company: "Prime DB Solutions",
      logo: "/primedb.png",
      period: "2023 - Presente",
      role: "Desenvolvedor Full Stack",
      description:
        "Desenvolvimento de aplicações web utilizando React, TypeScript, Node JS e Java. Desenvolvedor solo responsável por todo o sistema.",
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
        "Express",
        "Redux",
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

  const handleToggle = (index: number) => {
    setOpenDetails(openDetails === index ? null : index);
  };

  return (
    <section className="py-12" id="experiencia">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="mb-8 text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Experiência Profissional
        </motion.h2>
        <div className="grid gap-4">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
              className="bg-card border border-primary/10 rounded-lg overflow-hidden"
            >
              <div
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() => handleToggle(index)}
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-md overflow-hidden bg-primary/5 flex-shrink-0">
                    <Image
                      src={exp.logo || "/placeholder.svg"}
                      alt={exp.company}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg">{exp.company}</h3>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground hidden sm:inline">
                    {exp.period}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-primary transition-transform duration-300 ${
                      openDetails === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              <AnimatePresence>
                {openDetails === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-2 border-t border-primary/10">
                      <div className="grid gap-4">
                        <div>
                          <h4 className="font-medium text-primary">
                            {exp.role}
                          </h4>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {exp.description}
                          </p>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">Realizações:</h5>
                          <ul className="list-disc pl-5 text-sm space-y-1">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i}>{achievement}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">Tecnologias:</h5>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, i) => (
                              <span
                                key={i}
                                className="skill-badge text-xs py-1"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
