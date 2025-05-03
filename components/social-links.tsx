import Link from "next/link"
import { Github, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary" asChild>
        <Link href="https://linkedin.com/in/seu-perfil" target="_blank" aria-label="LinkedIn">
          <Linkedin className="h-5 w-5" />
        </Link>
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary" asChild>
        <Link href="https://instagram.com/seu-perfil" target="_blank" aria-label="Instagram">
          <Instagram className="h-5 w-5" />
        </Link>
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary" asChild>
        <Link href="https://github.com/seu-perfil" target="_blank" aria-label="GitHub">
          <Github className="h-5 w-5" />
        </Link>
      </Button>
    </div>
  )
}
