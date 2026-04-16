import { motion } from "framer-motion";
import type { Challenge } from "../types/types";

interface ChallengesCarouselProps {
  challenges: Challenge[];
  onBegin?: (id: string) => void;
  onSeeAll?: () => void;
}

const tagStyles: Record<string, { bg: string; color: string }> = {
  friday: { bg: "rgba(201,168,76,0.15)", color: "var(--gold)" },
  night: { bg: "rgba(100,80,200,0.2)", color: "#a89de8" },
  weekly: { bg: "rgba(74,124,89,0.2)", color: "var(--green-light)" },
};

function ChallengeCard({ challenge, onBegin }: { challenge: Challenge; onBegin?: () => void }) {
  const style = tagStyles[challenge.tagType] ?? tagStyles.weekly;
  const isFriday = challenge.tagType === "friday";

  return (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      className="flex-shrink-0 w-[200px] rounded-[18px] p-4 border cursor-pointer"
      style={{
        background: isFriday ? "linear-gradient(135deg, #1f2e1a, #253523)" : "var(--bg-card)",
        borderColor: isFriday ? "rgba(201,168,76,0.3)" : "rgba(255,255,255,0.06)",
      }}
    >
      <span
        className="inline-block px-2.5 py-0.5 rounded-[10px] text-[9px] font-bold tracking-[1.5px] uppercase mb-2"
        style={{ background: style.bg, color: style.color }}
      >
        {challenge.tag}
      </span>

      <p className="text-[14px] font-extrabold leading-tight mb-1.5" style={{ color: "var(--text-primary)" }}>
        {challenge.name}
      </p>
      <p className="text-[11px] leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
        {challenge.description}
      </p>

      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex">
            {challenge.avatars.map((a, i) => (
              <div
                key={i}
                className="w-[22px] h-[22px] rounded-full border-[1.5px] flex items-center justify-center text-[9px] font-bold"
                style={{
                  background: a.bg,
                  borderColor: "var(--bg-deep)",
                  color: "var(--text-primary)",
                  marginRight: i < challenge.avatars.length - 1 ? -6 : 0,
                  zIndex: challenge.avatars.length - i,
                  position: "relative",
                }}
              >
                {a.initial}
              </div>
            ))}
          </div>
          <span className="text-[10px] ml-3" style={{ color: "var(--text-muted)" }}>
            {challenge.participants}
          </span>
        </div>

        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={(e) => { e.stopPropagation(); onBegin?.(); }}
          className="rounded-[10px] px-3 py-1.5 text-[11px] font-bold border"
          style={{
            background: "rgba(201,168,76,0.15)",
            borderColor: "rgba(201,168,76,0.3)",
            color: "var(--gold-light)",
          }}
        >
          Begin
        </motion.button>
      </div>
    </motion.div>
  );
}

export function ChallengesCarousel({ challenges, onBegin, onSeeAll }: ChallengesCarouselProps) {
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center px-5 mb-3">
        <h2 className="text-[18px] font-extrabold" style={{ color: "var(--text-primary)" }}>
          Inner Journeys
        </h2>
        <button
          onClick={onSeeAll}
          className="text-[10px] font-bold tracking-[1px] uppercase cursor-pointer"
          style={{ color: "var(--gold-dim)" }}
        >
          See all
        </button>
      </div>

      <div className="flex gap-3 px-5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {challenges.map((c) => (
          <ChallengeCard
            key={c.id}
            challenge={c}
            onBegin={() => onBegin?.(c.id)}
          />
        ))}
      </div>
    </div>
  );
}