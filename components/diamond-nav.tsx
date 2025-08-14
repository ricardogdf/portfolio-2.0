import { useTheme } from "next-themes";

export default function DiamondNav({
  SECTIONS,
  activeSection,
  onNavigate,
}: {
  SECTIONS: { id: string; label: string }[];
  activeSection: string;
  onNavigate: (id: string) => void;
}) {
  const { resolvedTheme } = useTheme();
  console.log("resolvedTheme", resolvedTheme === "dark");

  return (
    <div className="fixed right-6 top-1/2 z-50 flex flex-col gap-4 -translate-y-1/2">
      {SECTIONS.map((section) => {
        return (
          <button
            key={section.id}
            aria-label={section.label}
            onClick={() => onNavigate(section.id)}
            className={`w-3 h-3 rotate-45 transition-all duration-300 ${
              activeSection === section.id
                ? "bg-white dark:bg-purple-500 rotate-90 scale-110"
                : "bg-black dark:bg-white"
            } hover:bg-white hover:scale-110`}
          />
        );
      })}
    </div>
  );
}
