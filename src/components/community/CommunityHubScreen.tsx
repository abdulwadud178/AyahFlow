import { motion } from "framer-motion";
import { Share2, Users, TrendingUp, Heart, Flame } from "lucide-react";
import { Avatar, CommunityBottomNav, formatCount } from "./CommunityUi";
import type { CurrentUserMeta, CommunityStats } from "../../types/community";

export function CommunityHubScreen({
  currentUser,
  stats,
  onInvite,
}: {
  currentUser: CurrentUserMeta;
  stats: CommunityStats;
  onInvite?: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#141f0a", color: "#e8f0d0" }}>
      <div className="flex items-center justify-between px-4 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium" style={{ color: "#6a8a44" }}>
            {currentUser.rank}
          </span>
          <Avatar url={currentUser.avatarUrl} name={currentUser.name} size={42} />
          <div>
            <p className="font-semibold text-sm" style={{ color: "#e8f0d0" }}>
              {currentUser.name}
            </p>
            <div className="flex items-center gap-1">
              <Flame size={11} color="#d4a84b" />
              <span className="text-xs font-semibold" style={{ color: "#d4a84b" }}>
                {currentUser.streakDays} DAY STREAK
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold" style={{ color: "#c8dfaa" }}>
            {currentUser.points}
          </p>
          <p className="text-[10px] tracking-widest" style={{ color: "#5a7a35" }}>
            POINTS
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-28 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl p-6 relative overflow-hidden"
          style={{ background: "#1a2710" }}
        >
          <div
            className="absolute right-4 top-4 opacity-10"
            style={{ transform: "scale(3.5)", transformOrigin: "top right" }}
          >
            <Users size={40} color="#8aab5c" />
          </div>

          <h2
            className="text-3xl font-extrabold leading-tight mb-3"
            style={{ color: "#c8dfaa", fontFamily: "'Georgia', serif", maxWidth: "65%" }}
          >
            Strengthen Your Circle
          </h2>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "#7aaa50", maxWidth: "70%" }}>
            Invite friends to join your path. Companionship makes the journey easier and more rewarding.
          </p>
          <button
            onClick={onInvite}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-150 active:scale-95"
            style={{ background: "#c8e68a", color: "#1a2710" }}
          >
            <Share2 size={16} />
            Invite Friends
          </button>
        </motion.div>

        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="rounded-2xl p-4"
            style={{ background: "#1a2710" }}
          >
            <div className="mb-3">
              <TrendingUp size={20} color="#d4a84b" />
            </div>
            <p className="font-bold text-base mb-1" style={{ color: "#c8dfaa" }}>
              vs. Average
            </p>
            <p className="text-xs leading-snug mb-3" style={{ color: "#6a8a44" }}>
              You are doing <span className="font-semibold" style={{ color: "#c8dfaa" }}>{stats.vsAveragePercent}%</span> better than your local average.
            </p>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "#2a3a1f" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(stats.vsAveragePercent * 2, 100)}%` }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: "#8aab5c" }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="rounded-2xl p-4"
            style={{ background: "#1a2710" }}
          >
            <div className="mb-3">
              <Heart size={20} color="#d4a84b" />
            </div>
            <p className="font-bold text-base mb-1" style={{ color: "#c8dfaa" }}>
              Barakah Pool
            </p>
            <p className="text-xs leading-snug mb-3" style={{ color: "#6a8a44" }}>
              {stats.barakahPoolLabel}
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-2xl font-extrabold"
              style={{ color: "#d4a84b" }}
            >
              {formatCount(stats.barakahPoolCount)}
            </motion.p>
          </motion.div>
        </div>
      </div>

      <CommunityBottomNav active="community" />
    </div>
  );
}
