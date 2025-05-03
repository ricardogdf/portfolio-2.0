import Header from "@/components/header"
import AboutMe from "@/components/about-me"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import BackgroundScene from "@/components/background-scene"

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundScene />
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <AboutMe />
          <Skills />
          <Experience />
          <Projects />
        </main>
        <footer className="border-t py-6 bg-background/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} - Todos os direitos reservados
          </div>
        </footer>
      </div>
    </div>
  )
}
