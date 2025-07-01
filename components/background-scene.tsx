"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BlackHole from "./black-hole";
import Crosshair from "./crosshair";

// Função para gerar elementos aleatórios de forma consistente
const generateElements = (seed: number) => {
  const random = (min: number, max: number) => {
    const x = Math.sin(seed++) * 10000;
    return min + (x - Math.floor(x)) * (max - min);
  };

  const speedLines = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: random(0, 100),
    height: random(50, 150),
    delay: random(0, 3),
  }));

  const stars = Array.from({ length: 150 }, (_, i) => ({
    id: i,
    size: random(1, 4),
    top: random(0, 100),
    left: random(0, 100),
    delay: random(0, 3),
  }));

  return { speedLines, stars };
};

export default function BackgroundScene({
  sendRocket,
  isSucking,
}: {
  sendRocket: boolean;
  isSucking: boolean;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isInSpace, setIsInSpace] = useState(false);
  const [showBlackHole, setShowBlackHole] = useState(false);
  const [showSpeedLines, setShowSpeedLines] = useState(false);
  const [spaceDepth, setSpaceDepth] = useState(0);
  const [isSpeedLinesExiting, setIsSpeedLinesExiting] = useState(false);
  const elementsRef = useRef<{ speedLines: any[], stars: any[] } | null>(null);

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

  // Monitora o scroll e controla o efeito de sucção
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollPosition(currentScroll);

      if (sendRocket) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = 1 - currentScroll / maxScroll;
        const adjustedProgress = Math.pow(scrollProgress, 1.5);
        setSpaceDepth(adjustedProgress);

        if (currentScroll < 10) {
          setIsInSpace(true);
          setTheme("dark");
          document.body.style.overflow = "hidden";
          setShowSpeedLines(true);

          const spaceTransition = setInterval(() => {
            setSpaceDepth((prev) => {
              if (prev >= 1) {
                clearInterval(spaceTransition);
                setIsSpeedLinesExiting(true);
                setTimeout(() => {
                  setTimeout(() => {
                    setShowBlackHole(true);
                  }, 1000);
                  setShowSpeedLines(false);
                }, 6000);
                return 1;
              }
              return prev + 0.0005;
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

  // Se os elementos ainda não foram gerados, retorna null
  if (!elementsRef.current) return null;

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
        style={{ willChange: 'background' }}
      />

      {/* Container para o sol e a lua */}
      <div className="relative w-full h-full">
        {/* Linhas de velocidade */}
        <AnimatePresence>
          {showSpeedLines && (
            <>
              {elementsRef.current.speedLines.map((line) => (
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
                    willChange: 'transform, opacity'
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
              style={{ willChange: 'transform, opacity' }}
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
              style={{ willChange: 'transform, opacity' }}
            />
          )}
        </AnimatePresence>

        {/* Nuvens */}
        <AnimatePresence>
          {(!isDark || (isChangingToDark)) && !isInSpace && (
            <>
              <motion.div
                className="cloud cloud-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: isChangingToDark ? 0 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.5 }}
                style={{ willChange: 'opacity' }}
              />
              <motion.div
                className="cloud cloud-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: isChangingToDark ? 0 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.5, delay: 0.1 }}
                style={{ willChange: 'opacity' }}
              />
              <motion.div
                className="cloud cloud-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: isChangingToDark ? 0 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.5, delay: 0.2 }}
                style={{ willChange: 'opacity' }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Estrelas */}
        <AnimatePresence>
          {(isDark || isChangingToLight || isInSpace) && (
            <>
              {elementsRef.current.stars.map((star) => (
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
                    opacity: isInSpace ? 0 : Math.max(0, 1 - spaceDepth * 2.5),
                    willChange: 'transform, opacity'
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Foguete */}
        <AnimatePresence>
          {sendRocket && (
            <motion.div
              className="rocket"
              initial={{ y: 100 }}
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
              style={{ willChange: 'transform, opacity' }}
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
              style={{ willChange: 'transform, opacity' }}
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
              style={{ willChange: 'opacity' }}
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
                style={{ willChange: 'transform, opacity' }}
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
