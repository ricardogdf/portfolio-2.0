"use client";

import { motion } from "framer-motion";

export default function Skills() {
  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "HTML",
    "CSS",
    "Tailwind",
    "Git",
    "PostgreSQL",
    "GraphQL",
    "Redux",
  ];

  return (
    <section className="pb-12" id="habilidades">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="mb-8 text-center text-3xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ willChange: 'transform, opacity' }}
        >
          Habilidades Técnicas
        </motion.h2>
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ willChange: 'opacity' }}
        >
          {skills.map((skill, index) => (
            <motion.span
              key={index}
              className="skill-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03, duration: 0.2 }}
              whileHover={{ y: -4 }}
              style={{ willChange: 'transform, opacity' }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
