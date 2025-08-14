import { motion } from "framer-motion";
import SocialLinks from "./social-links";
import { ThemeToggle } from "./theme-toggle";

interface ActionsProps {
  disabled?: boolean;
}

export default function Actions({ disabled = false }: ActionsProps) {
  return (
    <motion.div className="w-[220px] z-[999] border border-slate-500 bg-white dark:bg-slate-900 p-1 rounded-full fixed bottom-5 left-[calc(50vw-110px)] flex items-center justify-between"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ willChange: 'transform, opacity' }}>
      <SocialLinks />
      <div className="h-4 w-px bg-slate-800 dark:bg-slate-100" />
      <ThemeToggle disabled={disabled} />
    </motion.div>
  );
}
