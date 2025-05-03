"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutMe() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-5xl px-4">
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-start gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Foto */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full md:w-1/3 flex justify-center"
          >
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary/20">
              <Image
                src="/profile.jpg"
                alt="Sua foto"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Texto */}
          <motion.div
            className="w-full md:w-2/3 text-center md:text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400 animate-gradient-x mb-6">
              Olá, eu sou o Ricardo
            </h1>
            <div className="text-lg text-muted-foreground">
              <p className="mb-4">
                Sou um desenvolvedor apaixonado por criar soluções inovadoras e
                experiências digitais incríveis.
              </p>
              <p>
                Com experiência em desenvolvimento web, estou sempre em busca de
                novos desafios e oportunidades para expandir meus conhecimentos
                e habilidades.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
