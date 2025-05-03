"use client"

import { useTheme } from "next-themes"

export default function BackgroundShapes() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Círculo gradiente superior direito */}
      <div
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20 animate-float"
        style={{
          background: `radial-gradient(circle, ${isDark ? "rgba(119, 68, 170, 0.4)" : "rgba(102, 51, 153, 0.2)"} 0%, transparent 70%)`,
          animationDelay: "0s",
        }}
      />

      {/* Círculo gradiente inferior esquerdo */}
      <div
        className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] rounded-full opacity-20 animate-float"
        style={{
          background: `radial-gradient(circle, ${isDark ? "rgba(119, 68, 170, 0.4)" : "rgba(102, 51, 153, 0.2)"} 0%, transparent 70%)`,
          animationDelay: "2s",
        }}
      />

      {/* Formas geométricas espalhadas */}
      <div
        className="absolute top-1/4 left-10 w-16 h-16 rotate-45 opacity-10 animate-float"
        style={{
          background: isDark ? "rgba(119, 68, 170, 0.5)" : "rgba(102, 51, 153, 0.3)",
          animationDelay: "1s",
        }}
      />

      <div
        className="absolute bottom-1/3 right-20 w-20 h-20 rounded-full opacity-10 animate-float"
        style={{
          background: isDark ? "rgba(119, 68, 170, 0.5)" : "rgba(102, 51, 153, 0.3)",
          animationDelay: "3s",
        }}
      />

      <div
        className="absolute top-2/3 left-1/3 w-12 h-12 rounded-lg opacity-10 animate-float"
        style={{
          background: isDark ? "rgba(119, 68, 170, 0.5)" : "rgba(102, 51, 153, 0.3)",
          animationDelay: "2.5s",
        }}
      />
    </div>
  )
}
