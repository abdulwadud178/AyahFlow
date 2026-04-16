import { motion } from "framer-motion";
import type { SpiritualStats } from "../types/types";

interface SpiritualGrowthCardProps {
  stats: SpiritualStats;
  todayIndex?: number; // 0=Mon … 6=Sun, defaults to current day
  onInsightDetails?: () => void;
}

export function SpiritualGrowthCard({
  stats,
  todayIndex,
  onInsightDetails,
}: SpiritualGrowthCardProps) {
  const today =
    todayIndex !== undefined
      ? todayIndex
      : (new Date().getDay() + 6) % 7; // JS: 0=Sun → shift to 0=Mon

  const maxVal = Math.max(...stats.weeklyData.map((d) => d.value), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mx-5 mb-5 rounded-[20px] border p-5"
      style={{ background: "var(--bg-card)", borderColor: "rgba(255,255,255,0.06)" }}
    >
      {/* Header */}
      <div className="flex justify-between items-baseline mb-4">
        <h2 className="text-[18px] font-extrabold" style={{ color: "var(--text-primary)" }}>
          Spiritual Growth
        </h2>
        <button
          onClick={onInsightDetails}
          className="text-[10px] font-bold tracking-[1px] uppercase cursor-pointer"
          style={{ color: "var(--gold-dim)" }}
        >
          Insight Details
        </button>
      </div>

      {/* Stat chips */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        <div className="rounded-[14px] p-3.5" style={{ background: "rgba(255,255,255,0.03)" }}>
          <p className="text-[10px] font-bold tracking-[1.5px] uppercase mb-1.5" style={{ color: "var(--text-muted)" }}>
            Total Hasanat
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-base leading-none">⭐</span>
            <span className="text-[20px] font-extrabold" style={{ color: "var(--text-primary)" }}>
              {stats.totalHasanat.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="rounded-[14px] p-3.5" style={{ background: "rgba(255,255,255,0.03)" }}>
          <p className="text-[10px] font-bold tracking-[1.5px] uppercase mb-1.5" style={{ color: "var(--text-muted)" }}>
            Divine Time
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-base leading-none">🕐</span>
            <span className="text-[20px] font-extrabold" style={{ color: "var(--text-primary)" }}>
              {stats.divineTimeHours.toFixed(1)}
            </span>
            <span className="text-[12px] font-semibold" style={{ color: "var(--text-muted)" }}>h</span>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="flex items-end gap-1.5 h-16">
        {stats.weeklyData.map((d, i) => {
          const barH = Math.round((d.value / maxVal) * 52);
          const isToday = i === today;

          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: barH }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.06, ease: "easeOut" }}
                className="w-full rounded-t-[5px]"
                style={{
                  background: isToday
                    ? "linear-gradient(180deg, var(--gold-light), var(--gold-dim))"
                    : "rgba(255,255,255,0.1)",
                }}
              />
              <span
                className="text-[9px] font-bold tracking-[0.5px]"
                style={{ color: isToday ? "var(--gold-light)" : "var(--text-muted)" }}
              >
                {d.day}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}