import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame } from "lucide-react";
import { Avatar, TabBar, PodiumCard, LeaderboardRow, CommunityBottomNav } from "./CommunityUi";
import type { LeaderboardUser, CurrentUserMeta, LeaderboardTab } from "../../types/community";

export function LeaderboardScreen({
  top3,
  rest,
  currentUser,
  groupName,
}: {
  top3: LeaderboardUser[];
  rest: LeaderboardUser[];
  currentUser: CurrentUserMeta;
  groupName?: string;
}) {
  const [activeTab, setActiveTab] = useState<LeaderboardTab>("Global");

  const currentUserRow: LeaderboardUser = {
    rank: currentUser.rank,
    id: "me",
    name: "You",
    xp: currentUser.points,
    points: currentUser.points,
    streak: currentUser.streakDays,
    avatarUrl: currentUser.avatarUrl,
    isCurrentUser: true,
  };

  const [left, center, right] = [top3[1], top3[0], top3[2]];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#141f0a", color: "#e8f0d0" }}>
      <div className="flex items-center justify-between px-4 pt-12 pb-2">
        <div className="flex items-center gap-2">
          <Avatar url={currentUser.avatarUrl} name={currentUser.name} size={36} />
          <span className="text-sm font-semibold" style={{ color: "#c8dfaa" }}>
            {groupName ?? "The Sanctuary"}
          </span>
        </div>
        <Flame size={22} color="#d4a84b" />
      </div>

      <div className="px-4 pt-4 pb-2 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold tracking-tight"
          style={{ color: "#c8dfaa", fontFamily: "'Georgia', serif" }}
        >
          Community
        </motion.h1>
        <p className="text-sm mt-1" style={{ color: "#6a8a44" }}>
          Race towards good deeds with your companions.
        </p>
      </div>

      <div className="flex justify-center items-end gap-4 px-8 py-6">
        {left && <PodiumCard user={left} position="left" />}
        {center && <PodiumCard user={center} position="center" />}
        {right && <PodiumCard user={right} position="right" />}
      </div>

      <TabBar active={activeTab} onChange={setActiveTab} />

      <div className="flex-1 overflow-y-auto px-2 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {rest.map((u, i) => (
              <LeaderboardRow key={u.id} user={u} delay={i * 0.06} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="fixed bottom-16 left-0 right-0 px-4 pb-2" style={{ background: "linear-gradient(to top, #141f0a 80%, transparent)" }}>
        <LeaderboardRow user={currentUserRow} delay={0} />
      </div>

      <CommunityBottomNav active="community" />
    </div>
  );
}
