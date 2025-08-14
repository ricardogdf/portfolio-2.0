"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  disabled?: boolean;
}

export function ThemeToggle({ disabled = false }: ThemeToggleProps) {
  const { setTheme, theme, resolvedTheme } = useTheme();
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
      className="rounded-full hover:bg-primary/10 hover:text-primary"
      aria-label="Alternar tema"
      disabled={isChanging || disabled}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
