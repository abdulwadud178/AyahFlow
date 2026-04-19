import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CommunityHubScreen } from "../components/community/CommunityHubScreen";
import { LeaderboardScreen } from "../components/community/CommunityLeaderboardScreen";
import {
  DUMMY_TOP3,
  DUMMY_REST,
  DUMMY_CURRENT_USER,
  DUMMY_STATS,
} from "../data/communityData";
import type { CommunityPageView } from "../types/community";

export default function CommunityPage() {
  const [view, setView] = useState<CommunityPageView>("leaderboard");

  return (
    <div className="max-w-sm mx-auto relative" style={{ fontFamily: "'system-ui', sans-serif" }}>
      <div
        className="fixed top-3 right-3 z-50 flex rounded-full overflow-hidden text-xs font-semibold"
        style={{ background: "#1a2710", border: "1px solid #2e4a15" }}
      >
        {(["leaderboard", "hub"] as const).map((value) => (
          <button
            key={value}
            onClick={() => setView(value)}
            className="px-3 py-1.5 capitalize transition-colors"
            style={{
              background: view === value ? "#c8e68a" : "transparent",
              color: view === value ? "#1a2710" : "#6a8a44",
            }}
          >
            {value}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {view === "leaderboard" ? (
          <motion.div key="leaderboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LeaderboardScreen
              top3={DUMMY_TOP3}
              rest={DUMMY_REST}
              currentUser={DUMMY_CURRENT_USER}
              groupName="AyahFlow"
            />
          </motion.div>
        ) : (
          <motion.div key="hub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CommunityHubScreen currentUser={DUMMY_CURRENT_USER} stats={DUMMY_STATS} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
