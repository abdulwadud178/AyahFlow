import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SettingsPanel } from "../components/SettingsPannel";
import { SurahSelector } from "../components/SurahSelector";
import { TafseerPanel } from "../components/TafseerPanel";
import { NoteModal } from "../components/NoteModal";
import { VerseCard } from "../components/VerseCard";
import { AudioPlayer } from "../components/AudioPlayer";
import type { DisplayMode, ScriptStyle, Surah, Verse } from "../types/reading";
import { MOCK_SURAH, MOCK_VERSES, RECITERS, SCRIPT_STYLES } from "../data/readingData";



export default function ReadingPage() {
  // State
  const [surah] = useState<Surah>(MOCK_SURAH);
  const [verses] = useState<Verse[]>(MOCK_VERSES);
  const [scriptStyle, setScriptStyle] = useState<ScriptStyle>("indo-pak");
  const [selectedReciter, setSelectedReciter] = useState("mishary");
  const [displayMode, setDisplayMode] = useState<DisplayMode>("both");
  const [showTranslit, setShowTranslit] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSurahPicker, setShowSurahPicker] = useState(false);
  const [tafseerVerse, setTafseerVerse] = useState<Verse | null>(null);
  const [noteVerse, setNoteVerse] = useState<Verse | null>(null);
  const [favs, setFavs] = useState<Set<number>>(new Set());
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioVerse, setCurrentAudioVerse] = useState(1);
  const [audioProgress, setAudioProgress] = useState(30);
  const [recitationState, setRecitationState] = useState<"idle" | "listening" | "done">("idle");
  const contentRef = useRef<HTMLDivElement>(null);

  // Simulate audio progress
  useEffect(() => {
    if (!isPlaying) return;
    const t = setInterval(() => {
      setAudioProgress(p => {
        if (p >= 100) { setIsPlaying(false); return 0; }
        return p + 0.5;
      });
    }, 100);
    return () => clearInterval(t);
  }, [isPlaying]);

  const toggleFav = (n: number) => setFavs(prev => {
    const next = new Set(prev);
    next.has(n) ? next.delete(n) : next.add(n);
    return next;
  });

  const reciterName = RECITERS.find(r => r.id === selectedReciter)?.name ?? "";

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-deep)", fontFamily: "var(--font-body)" }}>

      {/* HEADER */}
      <header className="sticky top-0 z-30 flex items-center gap-3 px-5 py-4 border-b"
        style={{ background: "var(--bg-deep)", borderColor: "rgba(255,255,255,0.05)" }}>

        <button className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.06)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 5l-7 7 7 7" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Surah selector */}
        <button onClick={() => setShowSurahPicker(true)}
          className="flex-1 flex items-center gap-2 px-3 py-2 rounded-2xl border"
          style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}>
          <div>
            <p className="text-[13px] font-extrabold text-left" style={{ color: "var(--gold-light)" }}>
              {surah.englishName}
            </p>
            <p className="text-[10px] text-left" style={{ color: "var(--text-muted)" }}>
              {surah.totalVerses} verses · {surah.revelationType}
            </p>
          </div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="ml-auto shrink-0">
            <path d="M6 9l6 6 6-6" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Settings */}
        <button onClick={() => setShowSettings(true)}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.06)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" stroke="var(--text-primary)" strokeWidth="2" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
              stroke="var(--text-primary)" strokeWidth="2" />
          </svg>
        </button>
      </header>

      {/* SETTINGS BAR — script + reciter quick info */}
      <div className="px-5 py-3 border-b flex gap-2 items-center overflow-x-auto"
        style={{ borderColor: "rgba(255,255,255,0.05)", scrollbarWidth: "none" }}>

        {/* Script pills */}
        {SCRIPT_STYLES.map(s => (
          <button key={s.id} onClick={() => setScriptStyle(s.id)}
            className="shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all"
            style={{
              background: scriptStyle === s.id ? "var(--gold-light)" : "rgba(255,255,255,0.05)",
              color: scriptStyle === s.id ? "#0d1a0e" : "var(--text-secondary)",
              borderColor: scriptStyle === s.id ? "var(--gold-light)" : "rgba(255,255,255,0.08)",
            }}>
            {s.label}
          </button>
        ))}

        {/* Reciter chip */}
        <button onClick={() => setShowSettings(true)}
          className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border ml-1"
          style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}>
          <span className="text-[12px]">🎙</span>
          <span className="text-[11px] font-bold max-w-25 truncate" style={{ color: "var(--text-secondary)" }}>
            {reciterName.split(" ").slice(0, 2).join(" ")}
          </span>
        </button>
      </div>

      {/* RECITATION CHECKER */}
      <div className="mx-5 my-4">
        <div
          className="rounded-[20px] p-4 border"
          style={{ background: "var(--bg-card)", borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-[15px] font-extrabold" style={{ color: "var(--gold-light)" }}>Recitation Checker</p>
              <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>AI-Powered Tajweed</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => {
                setRecitationState(s => s === "idle" ? "listening" : s === "listening" ? "done" : "idle");
              }}
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: recitationState === "listening" ? "var(--gold-light)" : "rgba(160,210,160,0.25)" }}
            >
              <motion.span
                animate={recitationState === "listening" ? { scale: [1, 1.15, 1] } : {}}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="text-xl"
              >
                🎙
              </motion.span>
            </motion.button>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.04)" }}>
            <motion.div
              animate={recitationState === "listening" ? { scale: [1, 1.4, 1] } : {}}
              transition={{ repeat: Infinity, duration: 0.6 }}
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: recitationState === "listening" ? "var(--green-glow)" : "rgba(255,255,255,0.2)" }}
            />
            <span className="text-[12px]" style={{ color: "var(--text-muted)" }}>
              {recitationState === "idle" ? "Ready to listen..." : recitationState === "listening" ? "Listening... recite now" : "✓ Great recitation! Masha'Allah"}
            </span>
          </div>
        </div>
      </div>

      {/* VERSES */}
      <div ref={contentRef} className="px-5 pb-32">
        {verses.map(verse => (
          <VerseCard
            key={verse.number}
            verse={verse}
            scriptStyle={scriptStyle}
            displayMode={displayMode}
            showTranslit={showTranslit}
            isFav={favs.has(verse.number)}
            onFav={() => toggleFav(verse.number)}
            onTafseer={() => setTafseerVerse(verse)}
            onNote={() => setNoteVerse(verse)}
          />
        ))}

        {/* Personal Reflections */}
        {Object.keys(notes).length > 0 && (
          <div className="mt-2 mb-6">
            <p className="text-[16px] font-extrabold mb-3 flex items-center justify-between"
              style={{ color: "var(--text-primary)" }}>
              Personal Reflections
              <button className="w-7 h-7 rounded-full flex items-center justify-center border text-lg"
                style={{ borderColor: "rgba(255,255,255,0.15)", color: "var(--text-muted)" }}>+</button>
            </p>
            {Object.entries(notes).map(([num, note]) => (
              <div key={num} className="rounded-2xl p-4 border mb-3"
                style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.06)" }}>
                <p className="text-[13px] leading-relaxed mb-2" style={{ color: "var(--text-secondary)" }}>{note}</p>
                <p className="text-[10px] font-bold tracking-[1px] uppercase" style={{ color: "var(--text-muted)" }}>
                  Verse {num} · Added just now
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Historical context card */}
        <div className="rounded-[20px] overflow-hidden border mb-6"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="relative h-36 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-[80px]"
              style={{ background: "linear-gradient(135deg,#2a1a0a,#3d2b10)" }}>
              📜
            </div>
            <div className="absolute bottom-0 inset-x-0 px-4 py-3"
              style={{ background: "linear-gradient(to top, rgba(13,26,14,0.95), transparent)" }}>
              <p className="text-[13px] italic" style={{ color: "var(--text-secondary)" }}>
                Historical context: The revelation period in Makkah and the three questions from the Quraysh.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AUDIO PLAYER */}
      <AudioPlayer
        surah={surah}
        currentVerse={currentAudioVerse}
        totalVerses={surah.totalVerses}
        isPlaying={isPlaying}
        progress={audioProgress}
        onPlayPause={() => setIsPlaying(p => !p)}
        onPrev={() => setCurrentAudioVerse(v => Math.max(1, v - 1))}
        onNext={() => setCurrentAudioVerse(v => Math.min(surah.totalVerses, v + 1))}
      />

      {/* OVERLAYS */}
      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40" style={{ background: "rgba(0,0,0,0.5)" }}
              onClick={() => setShowSettings(false)} />
            <SettingsPanel
              scriptStyle={scriptStyle} setScriptStyle={setScriptStyle}
              selectedReciter={selectedReciter} setSelectedReciter={setSelectedReciter}
              displayMode={displayMode} setDisplayMode={setDisplayMode}
              showTranslit={showTranslit} setShowTranslit={setShowTranslit}
              onClose={() => setShowSettings(false)}
            />
          </>
        )}

        {showSurahPicker && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40" style={{ background: "rgba(0,0,0,0.5)" }}
              onClick={() => setShowSurahPicker(false)} />
            <SurahSelector
              current={surah.number}
              onSelect={(n) => console.log("Selected surah:", n)}
              onClose={() => setShowSurahPicker(false)}
            />
          </>
        )}

        {tafseerVerse && (
          <TafseerPanel verse={tafseerVerse} onClose={() => setTafseerVerse(null)} />
        )}

        {noteVerse && (
          <NoteModal
            verse={noteVerse}
            onClose={() => setNoteVerse(null)}
            onSave={(note) => setNotes(prev => ({ ...prev, [noteVerse.number]: note }))}
          />
        )}
      </AnimatePresence>
    </div>
  );
}