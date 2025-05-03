"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackgroundScene() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [previousTheme, setPreviousTheme] = useState<string | undefined>(
    undefined
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState<
    "initial" | "middle" | "final"
  >("initial");

  // Evita problemas de hidratação
  useEffect(() => {
    setMounted(true);
  }, []);

  // Detecta mudanças de tema para iniciar a transição
  useEffect(() => {
    if (
      mounted &&
      previousTheme !== undefined &&
      previousTheme !== resolvedTheme
    ) {
      setIsTransitioning(true);
      setTransitionPhase("initial");

      // Fase intermediária (quando um astro saiu e o outro ainda não entrou)
      const middleTimer = setTimeout(() => {
        setTransitionPhase("middle");
      }, 1500);

      // Fase final (quando o novo astro está entrando)
      const finalTimer = setTimeout(() => {
        setTransitionPhase("final");
      }, 2000);

      // Fim da transição
      const endTimer = setTimeout(() => {
        setIsTransitioning(false);
        setTransitionPhase("initial");
      }, 4000);

      return () => {
        clearTimeout(middleTimer);
        clearTimeout(finalTimer);
        clearTimeout(endTimer);
      };
    }

    if (mounted && resolvedTheme) {
      setPreviousTheme(resolvedTheme);
    }
  }, [resolvedTheme, mounted, previousTheme]);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";
  const isChangingToDark = isTransitioning && resolvedTheme === "dark";
  const isChangingToLight = isTransitioning && resolvedTheme === "light";

  // Gera estrelas aleatórias para o céu noturno
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 100; i++) {
      const size = Math.random() * 3 + 1;
      stars.push(
        <motion.div
          key={i}
          className="star"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${Math.random() * 300}px`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            boxShadow: `0 0 ${size + 1}px white`,
          }}
        />
      );
    }
    return stars;
  };

  // Determina se o sol deve ser visível
  const isSunVisible = () => {
    if (!isTransitioning) return !isDark;
    if (isChangingToDark) return transitionPhase === "initial";
    if (isChangingToLight) return transitionPhase === "final";
    return false;
  };

  // Determina se a lua deve ser visível
  const isMoonVisible = () => {
    if (!isTransitioning) return isDark;
    if (isChangingToDark) return transitionPhase === "final";
    if (isChangingToLight) return transitionPhase === "initial";
    return false;
  };

  // Variantes de animação para o sol
  const sunVariants = {
    visible: { top: 60, right: 120, opacity: 1 }, // posição fixa no céu (canto superior direito)
    sunrise: { top: 60, left: "100%", opacity: 0.8 }, // nasce da direita
    sunset: { top: 60, left: "0%", opacity: 0 }, // se põe à esquerda
    hidden: { top: 60, left: "100%", opacity: 0 }, // fora da tela à direita
  };

  // Variantes de animação para a lua
  const moonVariants = {
    visible: { top: 60, right: 120, opacity: 1 },
    moonrise: { top: 60, left: "100%", opacity: 0.8 },
    moonset: { top: 60, left: "0%", opacity: 0 },
    hidden: { top: 60, left: "100%", opacity: 0 },
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

      {/* Transição do Sol */}
      <AnimatePresence>
        {isSunVisible() && (
          <motion.div
            className="sun"
            initial={
              isChangingToLight && transitionPhase === "final"
                ? sunVariants.sunrise
                : sunVariants.visible
            }
            animate={
              isChangingToDark && transitionPhase === "initial"
                ? sunVariants.sunset
                : sunVariants.visible
            }
            exit={sunVariants.hidden}
            transition={{
              duration: 2,
              ease: "easeInOut",
              opacity: { duration: 1.5 },
            }}
          />
        )}
      </AnimatePresence>

      {/* Transição da Lua */}
      <AnimatePresence>
        {isMoonVisible() && (
          <motion.div
            className="moon"
            initial={
              isChangingToDark && transitionPhase === "initial"
                ? moonVariants.moonrise
                : moonVariants.visible
            }
            animate={
              isChangingToLight && transitionPhase === "final"
                ? moonVariants.moonset
                : moonVariants.visible
            }
            exit={moonVariants.hidden}
            transition={{
              duration: 2,
              ease: "easeInOut",
              opacity: { duration: 1.5 },
            }}
          />
        )}
      </AnimatePresence>

      {/* Nuvens (apenas no modo claro ou durante a transição para escuro na fase inicial) */}
      <AnimatePresence>
        {(!isDark || (isChangingToDark && transitionPhase === "initial")) && (
          <>
            <motion.div
              className="cloud cloud-1"
              initial={{
                opacity:
                  isChangingToLight && transitionPhase === "final" ? 0 : 1,
              }}
              animate={{ opacity: isChangingToDark ? 0 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
            />
            <motion.div
              className="cloud cloud-2"
              initial={{
                opacity:
                  isChangingToLight && transitionPhase === "final" ? 0 : 1,
              }}
              animate={{ opacity: isChangingToDark ? 0 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, delay: 0.1 }}
            />
            <motion.div
              className="cloud cloud-3"
              initial={{
                opacity:
                  isChangingToLight && transitionPhase === "final" ? 0 : 1,
              }}
              animate={{ opacity: isChangingToDark ? 0 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, delay: 0.2 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Estrelas (apenas no modo escuro ou durante a transição para claro na fase inicial) */}
      <AnimatePresence>
        {(isDark || (isChangingToLight && transitionPhase === "initial")) &&
          generateStars()}
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
    </div>
  );
}
