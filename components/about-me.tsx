import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AboutMe() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="h-screen flex items-center">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-start gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ willChange: 'transform, opacity' }}
        >

          {/* Texto */}
          <motion.div
            className="w-full text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            style={{ willChange: 'opacity' }}
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text mb-12">
              Hi, i'm Ricardo.
            </h1>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
