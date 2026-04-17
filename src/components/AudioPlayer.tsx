import { motion } from "framer-motion";
import type { Surah } from "../types/reading";

export function AudioPlayer({
  surah, currentVerse, totalVerses, isPlaying, progress,
  onPlayPause, onPrev, onNext,
}: {
  surah: Surah; currentVerse: number; totalVerses: number;
  isPlaying: boolean; progress: number;
  onPlayPause: () => void; onPrev: () => void; onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="fixed inset-x-0 mx-auto px-4 pb-6 pt-3 z-50"
      style={{ background: "linear-gradient(to top, var(--bg-deep) 70%, transparent)", maxWidth: 430, bottom: "86px" }}
    >
      <div className="rounded-[22px] px-5 py-4 border flex items-center gap-4"
        style={{ background: "rgba(22,32,24,0.97)", borderColor: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>

        {/* Prev */}
        <button onClick={onPrev} className="w-9 h-9 flex items-center justify-center rounded-full"
          style={{ background: "rgba(255,255,255,0.06)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M19 20L9 12l10-8v16zM5 4v16" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Play/Pause */}
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={onPlayPause}
          className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "var(--gold-light)" }}
        >
          {isPlaying ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="6" y="4" width="4" height="16" rx="1" fill="#0d1a0e" />
              <rect x="14" y="4" width="4" height="16" rx="1" fill="#0d1a0e" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 2 }}>
              <path d="M8 5.14v13.72a1 1 0 001.47.88l11-6.86a1 1 0 000-1.76l-11-6.86A1 1 0 008 5.14z" fill="#0d1a0e" />
            </svg>
          )}
        </motion.button>

        {/* Next */}
        <button onClick={onNext} className="w-9 h-9 flex items-center justify-center rounded-full"
          style={{ background: "rgba(255,255,255,0.06)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M5 4l10 8-10 8V4zM19 4v16" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Info + progress */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-baseline mb-1.5">
            <span className="text-[12px] font-bold" style={{ color: "var(--text-primary)" }}>
              Ayah {currentVerse} / {totalVerses}
            </span>
            <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
              {Math.floor(progress * 4 / 60).toString().padStart(2, "0")}:{Math.floor((progress * 4) % 60).toString().padStart(2, "0")} / 04:15
            </span>
          </div>
          <p className="text-[10px] text-right" style={{ color: "var(--text-muted)" }}>
            {surah.englishName}
          </p>
          <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
            <motion.div
              animate={{ width: `${progress}%` }}
              className="h-full rounded-full"
              style={{ background: "var(--gold)" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}