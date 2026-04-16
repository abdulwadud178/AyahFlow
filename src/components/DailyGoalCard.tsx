import { motion } from "framer-motion";
import type { DailyGoal } from "../types/types";

interface DailyGoalCardProps {
  goal: DailyGoal;
}

export function DailyGoalCard({ goal }: DailyGoalCardProps) {
  const pct = Math.min(100, Math.round((goal.versesRead / goal.versesGoal) * 100));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="mx-5 my-4 rounded-[20px] p-5 relative overflow-hidden border"
      style={{ background: "var(--bg-card)", borderColor: "rgba(255,255,255,0.06)" }}
    >
      {/* Glow orb */}
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)" }} />

      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-[10px] font-bold tracking-[2px] uppercase mb-1" style={{ color: "var(--gold-dim)" }}>
            Daily Path
          </p>
          <p className="text-[19px] font-extrabold" style={{ color: "var(--text-primary)" }}>
            Today's Goal
          </p>
        </div>
        <div className="text-right">
          <span className="text-[22px] font-extrabold" style={{ color: "var(--gold-light)" }}>
            {goal.versesRead}
          </span>
          <span className="text-[13px]" style={{ color: "var(--text-muted)" }}>
            /{goal.versesGoal} verses
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-[7px] rounded-full mb-3 overflow-visible relative"
        style={{ background: "rgba(255,255,255,0.07)" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="h-full rounded-full relative"
          style={{ background: "linear-gradient(90deg, var(--gold-dim), var(--gold-light))" }}
        >
          {/* dot */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 0.2 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
            style={{
              background: "var(--gold-light)",
              boxShadow: "0 0 8px rgba(232,201,106,0.7)",
            }}
          />
        </motion.div>
      </div>

      {/* Tag */}
      <div className="inline-block rounded-full px-3.5 py-1 border text-[10px] font-bold tracking-[1.5px] uppercase"
        style={{ background: "rgba(201,168,76,0.1)", borderColor: "rgba(201,168,76,0.2)", color: "var(--gold-dim)" }}>
        ✦ {goal.tagline}
      </div>
    </motion.div>
  );
}