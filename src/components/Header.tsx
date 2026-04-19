import { motion } from "framer-motion";
import type { UserProfile } from "../types/types";

interface HeaderProps {
  user: UserProfile;
  onProfileClick?: () => void;
  onStreakClick?: () => void;
}

export function Header({ user, onProfileClick, onStreakClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-5 py-4 border-b border-white/5"
      style={{ background: "var(--bg-deep)" }}>

      {/* Avatar / Profile */}
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={onProfileClick}
        className="w-11 h-11 rounded-full border-2 flex items-center justify-center overflow-hidden cursor-pointer"
        style={{ borderColor: "var(--gold-dim)", background: "linear-gradient(135deg, #2d5016, #4a7c3f)" }}
        aria-label="Profile"
      >
        <span className="text-lg">🧕</span>
      </motion.button>

      {/* App Name */}
      <span className="font-extrabold text-[17px] tracking-tight" style={{ color: "var(--gold-light)", fontFamily: "var(--font-display)" }}>
        AyahFlow
      </span>

      {/* Streak Badge */}
      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={onStreakClick}
        className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 border cursor-pointer"
        style={{
          background: "rgba(201,168,76,0.12)",
          borderColor: "rgba(201,168,76,0.3)",
        }}
        aria-label={`Streak: ${user.streakCount} days`}
      >
        <motion.span
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          className="text-base leading-none"
        >
          🔥
        </motion.span>
        <span className="font-extrabold text-[15px]" style={{ color: "var(--gold-light)" }}>
          {user.streakCount}
        </span>
      </motion.button>
    </header>
  );
}