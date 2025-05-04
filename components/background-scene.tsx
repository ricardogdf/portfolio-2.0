"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackgroundScene({
  sendRocket,
}: {
  sendRocket: boolean;
}) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Gera estrelas aleatórias para o céu noturno
  const stars = useMemo(() => {
    const starsArray = [];
    for (let i = 0; i < 100; i++) {
      const size = Math.random() * 3 + 1;
      starsArray.push({
        id: i,
        size,
        top: Math.random() * 300,
        left: Math.random() * 100,
        delay: Math.random() * 3,
      });
    }
    return starsArray;
  }, []); // Array de estrelas será gerado apenas uma vez

  // Evita problemas de hidratação
  useEffect(() => {
    setMounted(true);
  }, []);

  // Detecta mudanças de tema para iniciar a transição
  useEffect(() => {
    if (!mounted || !resolvedTheme) return;
    
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [resolvedTheme, mounted]);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";
  const isChangingToDark = isTransitioning && resolvedTheme === "dark";
  const isChangingToLight = isTransitioning && resolvedTheme === "light";

  // Variantes de animação para o sol
  const sunVariants = {
    hidden: { 
      x: "400%",
      y: "400%",
      opacity: 0,
    },
    visible: { 
      x: 0,
      y: 0,
      opacity: 1,
      transition: { 
        duration: 2.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: { 
      x: "-400%",
      y: "-400%",
      opacity: 0,
      transition: { 
        duration: 2.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  // Variantes de animação para a lua
  const moonVariants = {
    hidden: { 
      x: "400%",
      y: "400%",
      opacity: 0,
    },
    visible: { 
      x: 0,
      y: 0,
      opacity: 1,
      transition: { 
        duration: 2.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: { 
      x: "-400%",
      y: "-400%",
      opacity: 0,
      transition: { 
        duration: 2.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden">
      {/* Fundo do céu com transição */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={false}
        animate={{
          background: isDark
            ? "linear-gradient(to bottom, #0c1445 0%, #1a2980 100%)"
            : "linear-gradient(to bottom, #87ceeb 0%, #e0f7ff 100%)",
        }}
        transition={{ duration: 2.5 }}
      />

      {/* Container para o sol e a lua */}
      <div className="relative w-full h-full">
        {/* Transição do Sol */}
        <AnimatePresence>
          {(!isDark || isChangingToLight) && (
            <motion.div
              className="sun"
              variants={sunVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            />
          )}
        </AnimatePresence>

        {/* Transição da Lua */}
        <AnimatePresence>
          {(isDark || isChangingToDark) && (
            <motion.div
              className="moon"
              variants={moonVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            />
          )}
        </AnimatePresence>

        {/* Nuvens (apenas no modo claro ou durante a transição para escuro na fase inicial) */}
        <AnimatePresence>
          {(!isDark || (isChangingToDark && !mounted)) && (
            <>
              <motion.div
                className="cloud cloud-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: isChangingToDark ? 0 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.5 }}
              />
              <motion.div
                className="cloud cloud-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: isChangingToDark ? 0 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.5, delay: 0.1 }}
              />
              <motion.div
                className="cloud cloud-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: isChangingToDark ? 0 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.5, delay: 0.2 }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Estrelas (apenas no modo escuro ou durante a transição para claro na fase inicial) */}
        <AnimatePresence>
          {(isDark || isChangingToLight) && (
            <>
              {stars.map((star) => (
                <motion.div
                  key={star.id}
                  className="star"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5 }}
                  style={{
                    position: "absolute",
                    width: `${star.size}px`,
                    height: `${star.size}px`,
                    top: `${star.top}px`,
                    left: `${star.left}%`,
                    animationDelay: `${star.delay}s`,
                    boxShadow: `0 0 ${star.size + 1}px white`,
                    borderRadius: "50%",
                    background: "white",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Gramado (presente em ambos os temas) */}
        <motion.div
          className="grass"
          animate={{
            background: isDark
              ? "linear-gradient(to bottom, #2c5218 0%, #1e3812 100%)"
              : "linear-gradient(to bottom, #4c8c2b 0%, #3a6d20 100%)",
          }}
          transition={{ duration: 2 }}
        />

        {/* Pessoa fazendo piquenique (modo claro) */}
        <AnimatePresence>
          {(!isDark || isChangingToDark) && (
            <motion.div
              className="picnic-scene"
              initial={{
                opacity: isChangingToLight ? 0 : 1,
                y: isChangingToLight ? 20 : 0,
              }}
              animate={{
                opacity: isChangingToDark ? 0 : 1,
                y: isChangingToDark ? 20 : 0,
              }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 1.5 }}
            >
              {/* Toalha de piquenique */}
              <div className="picnic-blanket" />

              {/* Pessoa */}
              <div className="picnic-person">
                <div className="person-head" />
                <div className="person-body" />
                <div className="person-arm-left" />
                <div className="person-arm-right" />
                <div className="person-leg-left" />
                <div className="person-leg-right" />
              </div>

              {/* Cesta de piquenique */}
              <div className="picnic-basket">
                <div className="basket-handle" />
                <div className="basket-body" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Barraca de acampamento (modo escuro) */}
        <AnimatePresence>
          {(isDark || isChangingToLight) && (
            <motion.div
              className="camping-scene"
              initial={{
                opacity: isChangingToDark ? 0 : 1,
                y: isChangingToDark ? 20 : 0,
              }}
              animate={{
                opacity: isChangingToLight ? 0 : 1,
                y: isChangingToLight ? 20 : 0,
              }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 1.5 }}
            >
              {/* Barraca */}
              <div className="tent">
                <div className="tent-body" />
                <div className="tent-door" />
                <div className="tent-window" />
              </div>

              {/* Fogueira */}
              <div className="campfire">
                <div className="fire-base" />
                <div className="fire-flame" />
                <div className="fire-glow" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Foguete */}
        <AnimatePresence>
          {sendRocket && (
            <motion.div
              className="rocket"
              initial={{ y: 0 }}
              animate={{ y: "-500%" }}
              exit={{ y: "-2000%" }}
              transition={{ duration: 2.0 }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
