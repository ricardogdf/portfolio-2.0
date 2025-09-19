import { motion } from "framer-motion";
import Balloon from "./balloon";
import Image from "next/image";

export default function AboutMe({ openPortal }: { openPortal?: boolean }) {
  return (
    <div className="flex flex-col items-center mx-auto w-full">
      <>
        <motion.h2
          className="mb-8 text-center text-3xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ willChange: "transform, opacity" }}
        >
          About Me
        </motion.h2>
        <motion.p
          className="mb-8 text-center text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ willChange: "transform, opacity" }}
        >
          {openPortal
            ? "A gamer focused on achievements, platinums and ranks. Passionate about souls-like, metroidvania and FPS games."
            : "Web developer interested in design, origamis, artificial intelligence and animated websites."}
        </motion.p>
        <Image
          className="object-cover"
          width={200}
          height={200}
          src={"/tsuru.svg"}
          alt={"tsuru"}
        />
      </>
      {/*<Balloon />*/}
    </div>
  );
}
