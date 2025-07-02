"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Projects() {
  const projects = [
    {
      title: "Yuli UI",
      description: "Design system com opções de animações.",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["React JS", "Motion", "Tailwind CSS"],
      demoUrl: "#",
      repoUrl: "#",
    },
    {
      title: "Go themes",
      description: "Marketplace de templates visuais para sites.",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Next JS", "Tailwind CSS", "Shadcn UI"],
      demoUrl: "#",
      repoUrl: "#",
    },
    {
      title: "Codefier",
      description: "Codificador de mensagens.",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["React JS", "Node.js", "PostgreSQL"],
      demoUrl: "#",
      repoUrl: "#",
    },
  ];

  return (
    <section className="py-12" id="projetos">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="mb-8 text-center text-3xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ willChange: 'transform, opacity' }}
        >
          Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              style={{ willChange: 'transform, opacity' }}
            >
              <Card className="card-hover border border-primary/10 h-full flex flex-col overflow-hidden">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-primary/10 hover:bg-primary/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </CardContent>
                <CardFooter className="mt-auto pt-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" /> Demo
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" /> Código
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
