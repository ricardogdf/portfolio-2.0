import { motion } from "framer-motion";
import SocialLinks from "./social-links";
import { ThemeToggle } from "./theme-toggle";

interface ActionsProps {
  disabled?: boolean;
  openPortal?: boolean;
}

export default function Actions({ disabled = false, openPortal = false }: ActionsProps) {
  return (
    <motion.div 
      className={`w-[220px] z-[999] border p-1 rounded-full fixed bottom-5 left-[calc(50vw-110px)] flex items-center justify-between transition-colors duration-500 ${
        openPortal 
          ? "border-red-500 bg-red-900/90" 
          : "border-slate-500 bg-white dark:bg-slate-900"
      }`}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ willChange: 'transform, opacity' }}>
      <SocialLinks openPortal={openPortal} />
      <div className={`h-4 w-px transition-colors duration-500 ${
        openPortal ? "bg-red-300" : "bg-slate-800 dark:bg-slate-100"
      }`} />
      <ThemeToggle disabled={disabled} openPortal={openPortal} />
    </motion.div>
  );
}
