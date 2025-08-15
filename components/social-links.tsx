import Link from "next/link";
import { Github, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialLinksProps {
  openPortal?: boolean;
}

export default function SocialLinks({ openPortal = false }: SocialLinksProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className={`rounded-full transition-colors duration-500 ${
          openPortal 
            ? "hover:bg-red-800/30 hover:text-red-300 text-red-200" 
            : "hover:bg-primary/10 hover:text-primary"
        }`}
        asChild
      >
        <Link
          href="https://www.linkedin.com/in/ricardogon%C3%A7alvesdafonseca/"
          target="_blank"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={`rounded-full transition-colors duration-500 ${
          openPortal 
            ? "hover:bg-red-800/30 hover:text-red-300 text-red-200" 
            : "hover:bg-primary/10 hover:text-primary"
        }`}
        asChild
      >
        <Link
          href="https://www.instagram.com/mad.rickk/"
          target="_blank"
          aria-label="Instagram"
        >
          <Instagram className="h-5 w-5" />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={`rounded-full transition-colors duration-500 ${
          openPortal 
            ? "hover:bg-red-800/30 hover:text-red-300 text-red-200" 
            : "hover:bg-primary/10 hover:text-primary"
        }`}
        asChild
      >
        <Link
          href="https://github.com/ricardogdf"
          target="_blank"
          aria-label="GitHub"
        >
          <Github className="h-5 w-5" />
        </Link>
      </Button>
    </div>
  );
}
