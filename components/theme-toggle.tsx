"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  disabled?: boolean;
  openPortal?: boolean;
}

export function ThemeToggle({
  disabled = false,
  openPortal = false,
}: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  // Evita problemas de hidratação
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (isChanging || disabled) return; // Previne múltiplos cliques durante a transição

    setIsChanging(true);
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

    // Desabilita o botão durante a transição
    setTimeout(() => {
      setIsChanging(false);
    }, 2500); // Aumentado para 4s para corresponder à duração da transição
  };

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="rounded-full" disabled>
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`rounded-full transition-colors duration-500 ${
        openPortal
          ? "hover:bg-red-800/30 hover:text-red-300 text-red-200"
          : "hover:bg-primary/10 hover:text-primary"
      }`}
      aria-label="Alternar tema"
      disabled={isChanging || disabled}
    >
      <Sun className="h-5 w-5 rotate-0 scale-0 transition-all dark:scale-100" />
      <Moon className="absolute h-5 w-5 scale-100 transition-all dark:scale-0" />
    </Button>
  );
}
