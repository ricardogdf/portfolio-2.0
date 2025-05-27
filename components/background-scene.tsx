"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BlackHole from "./black-hole";
import Crosshair from "./crosshair";

export default function BackgroundScene({
  sendRocket,
  isSucking,
}: {
  sendRocket: boolean;
  isSucking: boolean;
}) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isInSpace, setIsInSpace] = useState(false);
  const [showBlackHole, setShowBlackHole] = useState(false);
  const [showSpeedLines, setShowSpeedLines] = useState(false);
  const [spaceDepth, setSpaceDepth] = useState(0);
  const [isSpeedLinesExiting, setIsSpeedLinesExiting] = useState(false);

  // Gera linhas de velocidade
  const speedLines = useMemo(() => {
    const lines = [];
    for (let i = 0; i < 30; i++) {
      lines.push({
        id: i,
        left: Math.random() * 100,
        height: Math.random() * 100 + 50,
        delay: Math.random() * 3,
      });
    }
    return lines;
  }, []);

  // Gera estrelas aleatórias para o céu noturno
  const stars = useMemo(() => {
    const starsArray = [];
    for (let i = 0; i < 300; i++) {
      const size = Math.random() * 3 + 1;
      starsArray.push({
        id: i,
        size,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 3,
      });
    }
    return starsArray;
  }, []);

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

  // Monitora o scroll e controla o efeito de sucção
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollPosition(currentScroll);

      if (sendRocket) {
        // Calcula a profundidade do espaço baseada na posição do scroll
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = 1 - currentScroll / maxScroll;

        // Ajusta a progressão para ser gradual
        const adjustedProgress = Math.pow(scrollProgress, 1.5);
        setSpaceDepth(adjustedProgress);

        // Ativa o efeito espacial quando chegar ao topo
        if (currentScroll < 10) {
          setIsInSpace(true);
          setTheme("dark"); // Força o tema escuro

          // Desabilita o scroll
          document.body.style.overflow = "hidden";

          // Mostra as linhas de velocidade
          setShowSpeedLines(true);

          // Continua a transição para o espaço profundo
          const spaceTransition = setInterval(() => {
            setSpaceDepth((prev) => {
              if (prev >= 1) {
                clearInterval(spaceTransition);
                // Inicia o efeito de saída das linhas de velocidade
                setIsSpeedLinesExiting(true);
                // Mostra o buraco negro quando atingir o espaço profundo
                setTimeout(() => {
                  setTimeout(() => {
                    setShowBlackHole(true);
                  }, 1000);
                  setShowSpeedLines(false);
                }, 6000);
                return 1;
              }
              return prev + 0.0005; // Mantém a velocidade original
            });
          }, 50);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "auto";
    };
  }, [sendRocket, setTheme]);

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
          background: isInSpace
            ? "linear-gradient(to bottom, #000000 100%, #0c1445 100%)"
            : isDark
            ? "linear-gradient(to bottom, #0c1445 0%, #1a2980 100%)"
            : "linear-gradient(to bottom, #87ceeb 0%, #e0f7ff 100%)",
        }}
        transition={{ duration: isInSpace ? 3.5 : 2.5 }}
      />

      {/* Container para o sol e a lua */}
      <div className="relative w-full h-full">
        {/* Linhas de velocidade */}
        <AnimatePresence>
          {showSpeedLines && (
            <>
              {speedLines.map((line) => (
                <motion.div
                  key={line.id}
                  className="absolute w-1 bg-white/30"
                  initial={{
                    top: -100,
                    left: `${line.left}%`,
                    height: line.height,
                    opacity: 0,
                  }}
                  animate={{
                    top: "100%",
                    opacity: [0, 1, 0],
                  }}
                  exit={{
                    top: "200%",
                    opacity: 0,
                    transition: {
                      duration: 0.5,
                      ease: "linear",
                    },
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: isSpeedLinesExiting ? 0 : Infinity,
                    delay: line.delay,
                    ease: "linear",
                  }}
                  style={{
                    opacity: Math.min(1, spaceDepth * 2) * (1 - spaceDepth),
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Transição do Sol */}
        <AnimatePresence>
          {(!isDark || isChangingToLight) && !isInSpace && (
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
          {(isDark || isChangingToDark) && !isInSpace && (
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
          {(!isDark || (isChangingToDark && !mounted)) && !isInSpace && (
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
          {(isDark || isChangingToLight || isInSpace) && (
            <>
              {stars.map((star) => (
                <motion.div
                  key={star.id}
                  className="star"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: isInSpace ? 0 : 0.8,
                    scale: isInSpace ? 0 : 1,
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
                    opacity: isInSpace ? 0 : Math.max(0, 1 - spaceDepth * 2.5), // Aumentado para 2.5 para sumir mais cedo
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
            y: isSucking ? 1000 : 0,
            opacity: isSucking ? 0 : 1,
          }}
          transition={{ duration: 4.0 }}
        />

        {/* Foguete */}
        <AnimatePresence>
          {sendRocket && (
            <motion.div
              className="rocket"
              initial={{ y: 0 }}
              animate={{
                y: isInSpace ? -2000 : -scrollPosition,
                opacity: [1, 1, 0],
                scale: [1, 1.2, 0.8],
              }}
              transition={{
                duration: showBlackHole ? 0.5 : 4.0,
                times: [0, 0.7, 1],
                ease: showBlackHole ? "easeOut" : "easeInOut",
              }}
            />
          )}
        </AnimatePresence>

        {/* Buraco Negro */}
        <AnimatePresence>
          {showBlackHole && (
            <motion.div
              initial={{ y: 0, x: 0, scale: 0.1, opacity: 0.1 }}
              animate={{
                y: [0, 0, "50vh", 0],
                x: [0, 0, "-25vw", 0],
                scale: [0.1, 0.1, 0.2, 1],
                opacity: [0.1, 1, 1, 1],
              }}
              transition={{
                duration: 8.0,
                times: [0, 0.5, 0.75, 1],
                ease: "easeInOut",
              }}
            >
              <BlackHole />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mira */}
        <AnimatePresence>
          {showBlackHole && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ y: 0, x: 0, scale: 0, opacity: 0 }}
                animate={{
                  y: [0, 0, "-45vh", "10vh", "-150vh", "-150vh"],
                  x: [0, 0, 0, "-25vw", 0, 0],
                  scale: [0, 1, 1, 1, 4, 4],
                  opacity: [0, 1, 1, 1, 1, 0],
                }}
                transition={{
                  duration: 10.0,
                  times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                  ease: "easeInOut",
                }}
              >
                <Crosshair />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
