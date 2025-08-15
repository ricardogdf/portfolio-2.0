"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";

// Função para gerar elementos aleatórios de forma consistente
const generateElements = (seed: number) => {
  const random = (min: number, max: number) => {
    const x = Math.sin(seed++) * 10000;
    return min + (x - Math.floor(x)) * (max - min);
  };

  const stars = Array.from({ length: 500 }, (_, i) => ({
    id: i,
    size: random(0.5, 2.5),
    top: random(0, 100),
    left: random(0, 100),
    delay: random(0, 3),
  }));

  return { stars };
};

export default function BackgroundScene({
  openPortal,
  sunAnimation = false,
  eclipseAnimation = false,
}: {
  openPortal: boolean;
  sunAnimation?: boolean;
  eclipseAnimation?: boolean;
}) {
  const { resolvedTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const elementsRef = useRef<{ stars: any[] } | null>(null);

  // Gera elementos apenas uma vez no cliente
  useLayoutEffect(() => {
    if (!elementsRef.current) {
      elementsRef.current = generateElements(Date.now());
    }
  }, []);

  // Detecta mudanças de tema para iniciar a transição
  useEffect(() => {
    if (!resolvedTheme) return;

    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [resolvedTheme]);

  const isDark = resolvedTheme === "dark";
  const isChangingToDark = isTransitioning && resolvedTheme === "dark";
  const isChangingToLight = isTransitioning && resolvedTheme === "light";

  // Variantes de animação para o sol
  const eclipseVariants = {
    moon: {
      x: 0,
      y: [0, "calc(50vh + 180px)"],
      opacity: 1,
      scale: 1,
      transition: {
        duration: 12.5,
        ease: cubicBezier(0.1, 0, 0.1, 1),
      },
    },
    sun: {
      x: 0,
      y: [0, "calc(50vh + 220px)"],
      opacity: 1,
      scale: 1,
      transition: {
        duration: 10,
        ease: [0, 0.3, 0.4, 1],
        times: [0.25, 1],
      },
    },
  };

  // Variantes de animação para o sol
  const sunVariants = {
    hidden: {
      x: "400%",
      y: "400%",
      opacity: 0,
      scale: 1,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 2.5,
        ease: cubicBezier(0.4, 0, 0.2, 1),
      },
    },
    exit: {
      x: "-400%",
      y: "-400%",
      opacity: 0,
      scale: 1,
      transition: {
        duration: 2.5,
        ease: cubicBezier(0.4, 0, 0.2, 1),
      },
    },
    eclipse: {
      x: [0, "-400%"],
      y: [0, "-400%"],
      opacity: [1, 0],
      transition: {
        duration: 2.5,
        ease: cubicBezier(0.4, 0, 0.2, 1),
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
        ease: cubicBezier(0.4, 0, 0.2, 1),
      },
    },
    exit: {
      x: "-400%",
      y: "-400%",
      opacity: 0,
      transition: {
        duration: 2.5,
        ease: cubicBezier(0.4, 0, 0.2, 1),
      },
    },
  };

  // Se os elementos ainda não foram gerados, retorna null
  if (!elementsRef.current) return null;

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden">
      {/* Fundo do céu com transição */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={false}
        animate={{
          background: isDark
            ? "linear-gradient(to bottom, #000000 0%, #0c1445 100%)"
            : openPortal
            ? "#880808"
            : "linear-gradient(to bottom, #87ceeb 0%, #e0f7ff 100%)",
        }}
        transition={{ duration: openPortal ? 1 : 2.5 }}
        style={{ willChange: "background" }}
      />

      {/* Container para o sol e a lua */}
      <div className="relative w-full h-full">
        {/* Lua Eclipse */}
        <AnimatePresence>
          {eclipseAnimation && (
            <motion.div
              className="moon-eclipse"
              variants={eclipseVariants}
              animate="moon"
              style={{
                willChange: "transform, opacity",
              }}
            />
          )}
        </AnimatePresence>

        {/* Sol Eclipse */}
        <AnimatePresence>
          {sunAnimation && (
            <motion.div
              className="sun-eclipse"
              variants={eclipseVariants}
              animate="sun"
              style={{
                willChange: "transform, opacity",
                boxShadow: openPortal ? "0 0 10px white" : "0 0 70px #ffdd00",
              }}
            />
          )}
        </AnimatePresence>

        {/* Transição do Sol */}
        <AnimatePresence>
          {(!isDark || isChangingToLight) && (
            <motion.div
              className="sun"
              variants={sunVariants}
              initial="hidden"
              animate={sunAnimation ? "eclipse" : "visible"}
              exit="exit"
              style={{
                willChange: "transform, opacity",
              }}
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
              style={{ willChange: "transform, opacity" }}
            />
          )}
        </AnimatePresence>

        {/* Nuvens */}
        {!openPortal && (
          <AnimatePresence>
            {(!isDark || isChangingToDark) && !openPortal && (
              <>
                <motion.div
                  className="cloud cloud-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isChangingToDark ? 0 : 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.5 }}
                  style={{ willChange: "opacity" }}
                />
                <motion.div
                  className="cloud cloud-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isChangingToDark ? 0 : 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.5, delay: 0.1 }}
                  style={{ willChange: "opacity" }}
                />
                <motion.div
                  className="cloud cloud-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isChangingToDark ? 0 : 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.5, delay: 0.2 }}
                  style={{ willChange: "opacity" }}
                />
              </>
            )}
          </AnimatePresence>
        )}

        {/* Estrelas */}
        <AnimatePresence>
          {(isDark || isChangingToLight) && (
            <>
              {elementsRef.current.stars.map((star) => (
                <motion.div
                  key={star.id}
                  className="star"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 0.8,
                    scale: 1,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.0 }}
                  style={{
                    position: "absolute",
                    width: `${star.size}px`,
                    height: `${star.size}px`,
                    top: `${star.top}%`,
                    left: `${star.left}%`,
                    animationDelay: `${star.delay}s`,
                    boxShadow: `0 0 ${star.size + 1}px white`,
                    borderRadius: "50%",
                    background: "white",
                    opacity: Math.max(0, 2.5),
                    willChange: "transform, opacity",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
