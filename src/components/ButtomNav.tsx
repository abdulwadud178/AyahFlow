import { motion } from "framer-motion";

export type NavTab = "home" | "read" | "explore" | "ranks" | "settings";

interface BottomNavProps {
  active: NavTab;
  onChange?: (tab: NavTab) => void;
}

const TABS: { id: NavTab; icon: string; label: string }[] = [
  { id: "home", icon: "🏠", label: "Home" },
  { id: "read", icon: "📖", label: "Read" },
  { id: "explore", icon: "🔍", label: "Explore" },
  { id: "ranks", icon: "🏆", label: "Ranks" },
  { id: "settings", icon: "⚙️", label: "Settings" },
];

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 flex justify-around items-center px-2.5 pt-2.5 pb-6 border-t"
      style={{
        background: "rgba(13,26,14,0.96)",
        backdropFilter: "blur(20px)",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      {TABS.map((tab) => {
        const isActive = tab.id === active;
        return (
          <motion.button
            key={tab.id}
            whileTap={{ scale: 0.9 }}
            onClick={() => onChange?.(tab.id)}
            className="flex flex-col items-center gap-1 px-3 py-1 rounded-[14px] min-w-[56px] cursor-pointer"
            style={{
              background: isActive ? "rgba(201,168,76,0.12)" : "transparent",
            }}
          >
            <span className="text-[20px] leading-none">{tab.icon}</span>
            <span
              className="text-[9px] font-bold tracking-[0.5px] uppercase"
              style={{ color: isActive ? "var(--gold-light)" : "var(--text-muted)" }}
            >
              {tab.label}
            </span>
          </motion.button>
        );
      })}
    </nav>
  );
}