import { motion } from "framer-motion";
import type { Verse } from "../types/reading";

export function TafseerPanel({ verse, onClose }: { verse: Verse; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="fixed inset-0 z-50 max-w-[430px] mx-auto flex flex-col"
      style={{ background: "var(--bg-deep)" }}
    >
      <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.06)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 5l-7 7 7 7" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div>
          <p className="text-[10px] font-bold tracking-[2px] uppercase" style={{ color: "var(--gold-dim)" }}>Tafseer</p>
          <p className="text-[15px] font-extrabold" style={{ color: "var(--text-primary)" }}>Verse {verse.number}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <div className="rounded-2xl p-4 mb-5 border" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.06)" }}>
          <p className="text-right text-[24px] leading-[1.8] mb-3" dir="rtl"
            style={{ fontFamily: "'Lateef','Amiri',serif", color: "var(--text-primary)", fontWeight: 600 }}>
            {verse.arabic}
          </p>
          <p className="text-[13px] leading-[1.7] italic" style={{ color: "var(--text-secondary)" }}>
            {verse.translation}
          </p>
        </div>

        <p className="text-[10px] font-bold tracking-[2px] uppercase mb-3" style={{ color: "var(--gold-dim)" }}>
          Explanation
        </p>
        <p className="text-[15px] leading-[1.85]" style={{ color: "var(--text-secondary)", fontFamily: "'Nunito',serif" }}>
          {verse.tafseer}
        </p>

        {/* Insight card */}
        <div className="mt-6 rounded-2xl p-4 border relative overflow-hidden"
          style={{ background: "linear-gradient(135deg,#1a2e1c,#1f3322)", borderColor: "rgba(201,168,76,0.15)" }}>
          <p className="text-[10px] font-bold tracking-[2px] uppercase mb-2" style={{ color: "var(--gold-dim)" }}>
            Insight: Hadith
          </p>
          <p className="text-[13px] leading-[1.7] italic" style={{ color: "var(--text-secondary)" }}>
            "Whoever recites Surah Al-Kahf on Friday, light will shine for him between the two Fridays."
          </p>
          <div className="absolute -right-3 -top-3 text-[60px] opacity-20">⭐</div>
        </div>
      </div>
    </motion.div>
  );
}