import { motion } from "framer-motion";
import { RECITERS, SCRIPT_STYLES } from "../data/readingData";
import type { DisplayMode, ScriptStyle } from "../types/reading";

export function SettingsPanel({
  scriptStyle, setScriptStyle,
  selectedReciter, setSelectedReciter,
  displayMode, setDisplayMode,
  showTranslit, setShowTranslit,
  onClose,
}: {
  scriptStyle: ScriptStyle;
  setScriptStyle: (s: ScriptStyle) => void;
  selectedReciter: string;
  setSelectedReciter: (r: string) => void;
  displayMode: DisplayMode;
  setDisplayMode: (m: DisplayMode) => void;
  showTranslit: boolean;
  setShowTranslit: (v: boolean) => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 280 }}
      className="fixed inset-x-0 bottom-0 z-50 rounded-t-[28px] p-6 max-w-[430px] mx-auto max-h-[80vh] overflow-y-auto"
      style={{ background: "#162018", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="w-10 h-1 rounded-full mx-auto mb-6" style={{ background: "rgba(255,255,255,0.15)" }} />

      {/* Script Style */}
      <p className="text-[10px] font-bold tracking-[2px] uppercase mb-3" style={{ color: "var(--gold-dim)" }}>Script Style</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {SCRIPT_STYLES.map(s => (
          <button
            key={s.id}
            onClick={() => setScriptStyle(s.id)}
            className="px-3.5 py-1.5 rounded-full text-[12px] font-bold border transition-all"
            style={{
              background: scriptStyle === s.id ? "var(--gold-light)" : "rgba(255,255,255,0.05)",
              color: scriptStyle === s.id ? "#0d1a0e" : "var(--text-secondary)",
              borderColor: scriptStyle === s.id ? "var(--gold-light)" : "rgba(255,255,255,0.1)",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Display Mode */}
      <p className="text-[10px] font-bold tracking-[2px] uppercase mb-3" style={{ color: "var(--gold-dim)" }}>Display</p>
      <div className="flex gap-2 mb-6">
        {(["arabic", "translation", "both"] as DisplayMode[]).map(m => (
          <button
            key={m}
            onClick={() => setDisplayMode(m)}
            className="flex-1 py-2 rounded-xl text-[11px] font-bold border capitalize transition-all"
            style={{
              background: displayMode === m ? "rgba(201,168,76,0.2)" : "rgba(255,255,255,0.04)",
              color: displayMode === m ? "var(--gold-light)" : "var(--text-secondary)",
              borderColor: displayMode === m ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.08)",
            }}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Transliteration toggle */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>Transliteration</p>
        <button
          onClick={() => setShowTranslit(!showTranslit)}
          className="w-12 h-6 rounded-full relative transition-all"
          style={{ background: showTranslit ? "var(--gold)" : "rgba(255,255,255,0.1)" }}
        >
          <motion.div
            animate={{ x: showTranslit ? 24 : 2 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute top-[3px] w-[18px] h-[18px] rounded-full"
            style={{ background: "#fff" }}
          />
        </button>
      </div>

      {/* Reciter */}
      <p className="text-[10px] font-bold tracking-[2px] uppercase mb-3" style={{ color: "var(--gold-dim)" }}>Reciter</p>
      <div className="flex flex-col gap-2 mb-6">
        {RECITERS.map(r => (
          <button
            key={r.id}
            onClick={() => setSelectedReciter(r.id)}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl border text-left transition-all"
            style={{
              background: selectedReciter === r.id ? "rgba(201,168,76,0.1)" : "rgba(255,255,255,0.03)",
              borderColor: selectedReciter === r.id ? "rgba(201,168,76,0.3)" : "rgba(255,255,255,0.06)",
            }}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm"
              style={{ background: "rgba(255,255,255,0.08)" }}>
              🎙
            </div>
            <div>
              <p className="text-[13px] font-bold" style={{ color: selectedReciter === r.id ? "var(--gold-light)" : "var(--text-primary)" }}>
                {r.name}
              </p>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{r.style}</p>
            </div>
            {selectedReciter === r.id && (
              <div className="ml-auto w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: "var(--gold)" }}>
                <svg width="10" height="10" viewBox="0 0 12 10" fill="none">
                  <path d="M1 5l3.5 3.5L11 1" stroke="#0d1a0e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      <button
        onClick={onClose}
        className="w-full py-3.5 rounded-2xl font-bold text-[14px]"
        style={{ background: "rgba(201,168,76,0.15)", color: "var(--gold-light)" }}
      >
        Done
      </button>
    </motion.div>
  );
}