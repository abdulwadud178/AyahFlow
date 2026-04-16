import { motion } from "framer-motion";
import type { AyahOfDay } from "../types/types";

interface AyahOfDayProps {
  ayah: AyahOfDay;
}

function IslamicGeoBg() {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className="w-4/5 h-4/5"
      aria-hidden="true"
    >
      <g fill="none" stroke="#c9a84c" strokeWidth="0.5">
        <circle cx="100" cy="100" r="90" />
        <circle cx="100" cy="100" r="70" />
        <circle cx="100" cy="100" r="50" />
        <polygon points="100,10 190,55 190,145 100,190 10,145 10,55" />
        <polygon points="100,30 175,62.5 175,137.5 100,170 25,137.5 25,62.5" />
        <line x1="100" y1="10" x2="100" y2="190" />
        <line x1="10" y1="55" x2="190" y2="145" />
        <line x1="10" y1="145" x2="190" y2="55" />
        <circle cx="100" cy="100" r="8" />
        <circle cx="100" cy="10" r="4" />
        <circle cx="190" cy="55" r="4" />
        <circle cx="190" cy="145" r="4" />
        <circle cx="100" cy="190" r="4" />
        <circle cx="10" cy="145" r="4" />
        <circle cx="10" cy="55" r="4" />
      </g>
    </svg>
  );
}

export function AyahOfDayCard({ ayah }: AyahOfDayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="mx-5 mb-5 rounded-[20px] border relative overflow-hidden"
      style={{ background: "var(--bg-card)", borderColor: "rgba(201,168,76,0.18)" }}
    >
      {/* Geometric background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
        <IslamicGeoBg />
      </div>

      <div className="relative p-6">
        {/* Label */}
        <div className="flex items-center gap-2 mb-5">
          <div className="w-[3px] h-4 rounded-sm" style={{ background: "var(--gold)" }} />
          <p className="text-[10px] font-bold tracking-[2px] uppercase" style={{ color: "var(--gold-dim)" }}>
            Ayah of the Day
          </p>
        </div>

        {/* Arabic text */}
        <p
          className="text-right leading-[1.7] mb-4 text-[28px]"
          dir="rtl"
          style={{
            fontFamily: "'Lateef', 'Amiri', serif",
            color: "var(--text-primary)",
            fontWeight: 600,
            whiteSpace: "pre-line",
          }}
        >
          {ayah.arabicText}
        </p>

        <div className="h-px mb-4" style={{ background: "rgba(255,255,255,0.06)" }} />

        {/* Translation */}
        <p
          className="text-[14px] italic leading-[1.7] mb-2.5"
          style={{ fontFamily: "'Nunito', serif", color: "var(--text-secondary)" }}
        >
          {ayah.translation}
        </p>

        <p className="text-[10px] font-bold tracking-[1.5px] uppercase" style={{ color: "var(--text-muted)" }}>
          {ayah.source}
        </p>
      </div>
    </motion.div>
  );
}