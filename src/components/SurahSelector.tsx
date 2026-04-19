import { useState } from "react";
import { motion } from "framer-motion";
import { useChapters } from "../hooks/useApi";
import { SURAH_NAMES } from "../data/readingData";

export function SurahSelector({
  current, onSelect, onClose,
}: { current: number; onSelect: (n: number) => void; onClose: () => void }) {
  const { chapters } = useChapters();
  const [search, setSearch] = useState("");

  // Fallback to static data if API fails or no credentials
  const surahsList = chapters.length > 0 ? chapters : Array.from({ length: 114 }, (_, i) => ({
    number: i + 1,
    name: `Surah ${i + 1}`,
    englishName: SURAH_NAMES[i + 1] || `Surah ${i + 1}`,
  }));

  const filtered = surahsList.filter(s => {
    const name = s.englishName || SURAH_NAMES[s.number] || `Surah ${s.number}`;
    return name.toLowerCase().includes(search.toLowerCase()) || String(s.number).includes(search);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 280 }}
      className="fixed inset-x-0 bottom-0 z-50 rounded-t-[28px] max-w-[430px] mx-auto"
      style={{ background: "#162018", border: "1px solid rgba(255,255,255,0.08)", height: "70vh" }}
    >
      <div className="p-5">
        <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: "rgba(255,255,255,0.15)" }} />
        <p className="text-[16px] font-extrabold mb-4" style={{ color: "var(--text-primary)" }}>Select Surah</p>
        <input
          type="text"
          placeholder="Search surah..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-2.5 rounded-2xl text-[13px] outline-none border"
          style={{
            background: "rgba(255,255,255,0.05)",
            borderColor: "rgba(255,255,255,0.08)",
            color: "var(--text-primary)",
          }}
        />
      </div>
      <div className="overflow-y-auto px-5 pb-6" style={{ height: "calc(70vh - 130px)" }}>
        {filtered.map(s => {
          const name = s.englishName || SURAH_NAMES[s.number] || `Surah ${s.number}`;
          return (
            <button
              key={s.number}
              onClick={() => { onSelect(s.number); onClose(); }}
              className="w-full flex items-center gap-3 py-3 border-b text-left"
              style={{ borderColor: "rgba(255,255,255,0.04)" }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                style={{
                  background: s.number === current ? "var(--gold)" : "rgba(255,255,255,0.06)",
                  color: s.number === current ? "#0d1a0e" : "var(--text-muted)",
                }}>
                {s.number}
              </div>
              <span className="text-[14px] font-bold" style={{ color: s.number === current ? "var(--gold-light)" : "var(--text-primary)" }}>
                {name}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}