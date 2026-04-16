import { useState } from "react";
import { Header } from "../components/Header";
import { DailyGoalCard } from "../components/DailyGoalCard";
import { ResumeReadingCard } from "../components/ResumeReadingCard";
import { QuickActions } from "../components/QuickActions";
import { ChallengesCarousel } from "../components/ChallengesCarousel";
import { AyahOfDayCard } from "../components/AyahOfDayCard";
import { SpiritualGrowthCard } from "../components/SpiritualGrowthCard";
import { ExtrasSection } from "../components/ExtrasSection";
import { BottomNav } from "../components/ButtomNav";

import type { NavTab } from "../components/ButtomNav";
import {
  mockUser,
  mockDailyGoal,
  mockLastReading,
  mockChallenges,
  mockAyah,
  mockStats,
} from "../data/mockData";

// ─── Replace mock data with your actual API hooks, e.g.:
// import { useHomeData } from "./hooks/useHomeData";
// const { user, dailyGoal, lastReading, challenges, ayah, stats } = useHomeData();

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<NavTab>("home");

  // Swap these with API data:
  const user = mockUser;
  const dailyGoal = mockDailyGoal;
  const lastReading = mockLastReading;
  const challenges = mockChallenges;
  const ayah = mockAyah;
  const stats = mockStats;

  return (
    <div className="min-h-screen pb-24" style={{ background: "var(--bg-deep)", fontFamily: "var(--font-body)" }}>
      <Header
        user={user}
        onProfileClick={() => setActiveTab("settings")}
        onStreakClick={() => {/* show streak modal */}}
      />

      <main>
        <DailyGoalCard goal={dailyGoal} />
        <ResumeReadingCard reading={lastReading} onResume={() => setActiveTab("read")} />
        <QuickActions
          actions={[
            { icon: "📖", label: "Explore Quran", onClick: () => setActiveTab("explore") },
            { icon: "🔖", label: "Saved Verses", onClick: () => {/* navigate to saved */} },
          ]}
        />
        <ChallengesCarousel
          challenges={challenges}
          onBegin={(id) => console.log("Begin challenge:", id)}
          onSeeAll={() => console.log("See all challenges")}
        />
        <AyahOfDayCard ayah={ayah} />
        <SpiritualGrowthCard
          stats={stats}
          onInsightDetails={() => console.log("Show insight details")}
        />
        <ExtrasSection
          items={[
            { icon: "🤲", label: "Donate", desc: "Support the cause", onClick: () => {} },
            { icon: "👥", label: "Invite Friends", desc: "Earn together", onClick: () => {} },
          ]}
        />
      </main>

      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  );
}