import type { NavTab } from "../components/ButtomNav";
import { Header } from "../components/Header";
import { DailyGoalCard } from "../components/DailyGoalCard";
import { ResumeReadingCard } from "../components/ResumeReadingCard";
import { QuickActions } from "../components/QuickActions";
import { ChallengesCarousel } from "../components/ChallengesCarousel";
import { AyahOfDayCard } from "../components/AyahOfDayCard";
import { SpiritualGrowthCard } from "../components/SpiritualGrowthCard";
import { ExtrasSection } from "../components/ExtrasSection";

import {
  mockUser,
  mockDailyGoal,
  mockLastReading,
  mockChallenges,
  mockStats,
} from "../data/mockData";
import { useAyahOfDay } from "../hooks/useApi";

interface HomePageProps {
  onNavigate?: (tab: NavTab) => void;
}

// ─── Replace mock data with your actual API hooks, e.g.:
// import { useHomeData } from "./hooks/useHomeData";
// const { user, dailyGoal, lastReading, challenges, ayah, stats } = useHomeData();

export default function HomePage({ onNavigate }: HomePageProps) {
  // Swap these with API data:
  const user = mockUser;
  const dailyGoal = mockDailyGoal;
  const lastReading = mockLastReading;
  const challenges = mockChallenges;
  const stats = mockStats;

  // Use API for ayah of the day
  const { ayah: apiAyah } = useAyahOfDay();
  const ayah = apiAyah || {
    arabicText: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا\nإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translation: '"For indeed, with hardship will be ease. Indeed, with hardship will be ease."',
    source: "[ Surah Ash-Sharh 94:5–6 ]",
  };

  return (
    <div className="min-h-screen pb-24" style={{ background: "var(--bg-deep)", fontFamily: "var(--font-body)" }}>
      <Header
        user={user}
        onProfileClick={() => onNavigate?.("settings")}
        onStreakClick={() => {/* show streak modal */}}
      />

      <main>
        <DailyGoalCard goal={dailyGoal} />
        <ResumeReadingCard reading={lastReading} onResume={() => onNavigate?.("read")} />
        <QuickActions
          actions={[
            { icon: "📖", label: "Explore Quran", onClick: () => onNavigate?.("explore") },
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
    </div>
  );
}