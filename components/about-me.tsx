import { motion } from "framer-motion";
import { Button } from "./ui/button";
import MagicAnimation from "./magic-animation";
import { useState } from "react";

export default function AboutMe({ openPortal }: { openPortal?: boolean }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    setIsAnimating(true);
  };

  return (
    <div className="flex flex-col items-center mx-auto w-full">
      {!isAnimating && (
        <>
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
            {openPortal
              ? "A gamer focused on achievements, platinums and ranks. Passionate about souls-like, metroidvania and FPS games."
              : "Web developer interested in design, security, artificial intelligence and animated websites."}
          </motion.p>
          <Button onClick={startAnimation}>See a magic</Button>
        </>
      )}
      {isAnimating && (
        <MagicAnimation
          isAnimating={isAnimating}
          setIsAnimating={setIsAnimating}
        />
      )}
    </div>
  );
}
