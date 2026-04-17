import { motion } from "framer-motion";
import type { ScriptStyle, DisplayMode, Verse } from "../types/reading";

export function VerseCard({
  verse, scriptStyle, displayMode, showTranslit,
  isFav, onFav, onTafseer, onNote,
}: {
  verse: Verse;
  scriptStyle: ScriptStyle;
  displayMode: DisplayMode;
  showTranslit: boolean;
  isFav: boolean;
  onFav: () => void;
  onTafseer: () => void;
  onNote: () => void;
}) {
  const arabicSize = verse.arabic.length < 60 ? "text-[32px]" : verse.arabic.length < 120 ? "text-[26px]" : "text-[22px]";
  const isCardStyle = verse.number % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: verse.number * 0.05 }}
      className="mb-8"
    >
      {/* Verse number divider */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px" style={{ background: "rgba(201,168,76,0.2)" }} />
        <div className="flex items-center gap-2.5">
          <button onClick={onFav} className="text-sm" aria-label="Favourite">
            {isFav ? "⭐" : "☆"}
          </button>
          <span className="text-[11px] font-bold tracking-[2px] uppercase" style={{ color: "var(--gold)" }}>
            Verse {verse.number}
          </span>
          <button onClick={onFav} className="text-sm opacity-0 pointer-events-none">☆</button>
        </div>
        <div className="flex-1 h-px" style={{ background: "rgba(201,168,76,0.2)" }} />
      </div>

      <div
        className={`${isCardStyle ? "rounded-3xl p-5 border" : ""}`}
        style={isCardStyle ? {
          background: "var(--bg-card)",
          borderColor: "rgba(255,255,255,0.06)",
        } : {}}
      >
        {/* Arabic */}
        {(displayMode === "arabic" || displayMode === "both") && (
          <p
            className={`text-center leading-[1.9] mb-4 ${arabicSize}`}
            dir="rtl"
            style={{
              fontFamily: "'Lateef','Amiri',serif",
              color: "var(--text-primary)",
              fontWeight: scriptStyle === "kitab-tajweed" ? 700 : 600,
              letterSpacing: scriptStyle === "madina" ? "0.02em" : "normal",
            }}
          >
            {verse.arabic}
          </p>
        )}

        {/* Word-by-word hint */}
        {scriptStyle === "word-by-word" && (displayMode === "arabic" || displayMode === "both") && (
          <p className="text-center text-[10px] mb-3 italic" style={{ color: "var(--text-muted)" }}>
            Tap any word to see its meaning
          </p>
        )}

        {/* Transliteration */}
        {showTranslit && (
          <p className="text-center text-[12px] italic leading-relaxed mb-3 px-2"
            style={{ color: "var(--text-muted)", fontFamily: "'Nunito',serif" }}>
            {verse.transliteration}
          </p>
        )}

        {/* Divider */}
        {displayMode === "both" && (
          <div className="h-px mb-4" style={{ background: "rgba(255,255,255,0.05)" }} />
        )}

        {/* Translation */}
        {(displayMode === "translation" || displayMode === "both") && (
          <p className="text-[15px] leading-[1.75] text-center px-1"
            style={{ color: "var(--text-secondary)", fontFamily: "'Nunito',serif" }}>
            {verse.translation}
          </p>
        )}

        {/* Actions */}
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={onFav}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all"
            style={{
              background: isFav ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.04)",
              borderColor: isFav ? "rgba(201,168,76,0.3)" : "rgba(255,255,255,0.08)",
              color: isFav ? "var(--gold-light)" : "var(--text-muted)",
            }}
          >
            {isFav ? "⭐" : "☆"} Favourite
          </button>
          <button
            onClick={onNote}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold border"
            style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)", color: "var(--text-muted)" }}
          >
            ✏️ Note
          </button>
          <button
            onClick={onTafseer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold border"
            style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)", color: "var(--text-muted)" }}
          >
            📚 Tafseer
          </button>
        </div>
      </div>
    </motion.div>
  );
}