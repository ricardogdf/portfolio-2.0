"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import SocialLinks from "@/components/social-links";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur border-b shadow-sm"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ willChange: 'transform' }}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl relative group">
          <span className="relative z-10">Ricardo Gonçalves</span>
          <span className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-300"></span>
        </Link>
        <div className="flex items-center gap-4">
          <SocialLinks />
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
