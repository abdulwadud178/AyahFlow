import { motion } from "framer-motion";
import type { LastReading } from "../types/types";

interface ResumeReadingCardProps {
  reading: LastReading;
  onResume?: () => void;
}

export function ResumeReadingCard({ reading, onResume }: ResumeReadingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onResume}
      className="mx-5 mb-4 rounded-[20px] p-5 flex justify-between items-center border cursor-pointer"
      style={{
        background: "linear-gradient(135deg, #1a2e1c, #243828)",
        borderColor: "rgba(201,168,76,0.2)",
      }}
    >
      <div>
        <p className="text-[10px] font-bold tracking-[2px] uppercase mb-1.5" style={{ color: "var(--gold-dim)" }}>
          Resume Reading
        </p>
        <p className="text-[22px] font-extrabold" style={{ color: "var(--text-primary)" }}>
          {reading.surahName}
        </p>
        <p className="text-[12px] mt-0.5" style={{ color: "var(--text-secondary)" }}>
          Verse {reading.verseNumber} · {reading.surahLabel}
        </p>
      </div>

      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border"
        style={{ background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.15)" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 3 }}>
          <path
            d="M8 5.14v13.72a1 1 0 001.47.88l11-6.86a1 1 0 000-1.76l-11-6.86A1 1 0 008 5.14z"
            fill="rgba(255,255,255,0.85)"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}