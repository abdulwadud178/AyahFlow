import { motion } from "framer-motion";
import { ChevronRight, Flame, BookOpen, Star, TrendingUp, Sparkles, Check, Lock } from "lucide-react";
import type { UserProfile } from "./types";
import { profileTheme as T } from "./theme";
import { ProfileBottomNav } from "./BottomNav";
import { Divider, SectionLabel } from "./atoms";
import { LEVELS } from "./profileData";

interface ProfileScreenProps {
  profile: UserProfile;
  onOpenSettings: () => void;
}

export function ProfileScreen({ profile, onOpenSettings }: ProfileScreenProps) {
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="min-h-screen flex flex-col pb-28" style={{ background: T.bg, color: T.text }}>
      <div className="flex items-center justify-between px-4 pt-12 pb-4">
        <div>
          <p className="text-xs tracking-widest font-semibold" style={{ color: T.gold }}>{profile.sanctuaryTitle.toUpperCase()}</p>
          <h2 className="text-xl font-bold mt-0.5" style={{ fontFamily: T.serif, color: T.text, fontStyle: "italic" }}>{profile.name}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onOpenSettings} className="rounded-full p-2.5 flex items-center justify-center transition-all active:scale-95"
            style={{ background: T.surface2, border: `1px solid ${T.border}` }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.8">
              <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="overflow-y-auto px-4 space-y-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="rounded-3xl p-6" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
          <p className="text-xs tracking-widest font-bold mb-3" style={{ color: T.gold }}>A SACRED SPACE FOR YOU</p>
          <h1 className="text-3xl font-extrabold leading-tight mb-4" style={{ fontFamily: T.serif, fontStyle: "italic", color: T.text }}>
            Peace be upon you,<br />{profile.name.split(" ")[0]}.
          </h1>
          <p className="text-sm leading-relaxed mb-6" style={{ color: T.textMuted }}>
            May your journey today bring clarity to your soul and light to your heart. Every step forward is a victory.
          </p>
          <div className="flex flex-col gap-3">
            <button className="w-full py-3.5 rounded-full font-bold text-sm transition-all active:scale-95"
              style={{ background: T.greenFaint, color: T.green, border: `1px solid ${T.border}` }}>
              Continue Your Journey
            </button>
            <button className="w-full py-3.5 rounded-full font-bold text-sm transition-all active:scale-95"
              style={{ background: T.surface2, color: T.text }}>
              Edit Profile
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "DAY STREAK", value: `${profile.streakDays}`, icon: <Flame size={20} color={T.gold} />, bg: T.surface },
            { label: "VERSES READ", value: profile.versesRead.toLocaleString(), icon: <BookOpen size={20} color={T.gold} />, bg: "#2d3e00" },
            { label: "COMPLETIONS", value: `${profile.quranCompletions}×`, icon: <Star size={20} color={T.gold} />, bg: T.surface },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07 }}
              className="rounded-2xl p-4 flex flex-col items-center justify-center gap-2"
              style={{ background: stat.bg, border: `1px solid ${T.border}`, minHeight: 96 }}>
              {stat.icon}
              <p className="text-xl font-extrabold" style={{ color: stat.bg === "#2d3e00" ? T.gold : T.text }}>{stat.value}</p>
              <p className="text-[9px] tracking-widest font-bold text-center" style={{ color: T.textDim }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-2xl p-4" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-bold" style={{ color: T.text }}>Weekly Activity</p>
              <p className="text-xs" style={{ color: T.textMuted }}>This week's reading consistency</p>
            </div>
            <TrendingUp size={18} color={T.greenMid} />
          </div>
          <div className="flex items-end gap-2 h-16">
            {profile.weeklyActivity.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${val}%` }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.5, ease: "easeOut" }}
                  className="w-full rounded-t-sm"
                  style={{ background: val > 80 ? T.gold : val > 50 ? T.greenMid : T.greenFaint, minHeight: 4 }}
                />
                <p className="text-[9px]" style={{ color: T.textDim }}>{days[i]}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="rounded-2xl p-4" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-bold" style={{ color: T.text }}>Spiritual Ranks</p>
              <p className="text-xs" style={{ color: T.textMuted }}>Your path of excellence</p>
            </div>
            <Sparkles size={18} color={T.gold} />
          </div>
          <div className="space-y-2">
            {LEVELS.map((lvl, i) => {
              const unlocked = i === 0 && profile.streakDays >= 12;
              const current = i === 0;
              return (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: unlocked ? T.greenFaint : "transparent", border: current ? `1px solid ${T.border}` : "none", opacity: unlocked ? 1 : 0.45 }}>
                  <span className="text-xl w-7 text-center">{lvl.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: unlocked ? T.text : T.textDim }}>
                      <span style={{ fontFamily: "serif", direction: "rtl" }}>{lvl.arabic}</span>
                      <span className="ml-2 text-xs font-normal" style={{ color: T.textMuted }}>· {lvl.title}</span>
                    </p>
                    <p className="text-[10px] mt-0.5 truncate" style={{ color: T.textDim }}>{lvl.req}</p>
                  </div>
                  {unlocked ? <Check size={14} color={T.greenMid} /> : <Lock size={12} color={T.textDim} />}
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="rounded-2xl p-4" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-bold" style={{ color: T.text }}>Spiritual Milestones</p>
              <p className="text-xs" style={{ color: T.textMuted }}>Honor your growth and consistency</p>
            </div>
            <button className="text-xs font-semibold flex items-center gap-1" style={{ color: T.gold }}>
              Full Gallery <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-1">
            {profile.milestones.map(m => (
              <div key={m.id} className="flex flex-col items-center gap-2 shrink-0">
                <div className="rounded-full flex items-center justify-center text-2xl"
                  style={{ width: 64, height: 64, background: m.unlocked ? T.gold : T.greenFaint, border: `2px solid ${m.unlocked ? T.goldLight : T.border}`, opacity: m.unlocked ? 1 : 0.5 }}>
                  {m.unlocked ? m.emoji : <Lock size={22} color={T.textDim} />}
                </div>
                <p className="text-[10px] text-center font-semibold" style={{ color: m.unlocked ? T.text : T.textDim, maxWidth: 64 }}>{m.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <SectionLabel label="IDENTITY & SOUL" />
          <div className="rounded-2xl overflow-hidden" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
            {[
              { label: "Country", value: profile.country },
              { label: "Gender", value: profile.gender === "male" ? "Male" : profile.gender === "female" ? "Female" : "Prefer not to say" },
              { label: "Member Since", value: new Date(profile.joinedDate).toLocaleDateString("en-US", { month: "long", year: "numeric" }) },
            ].map((row, i, arr) => (
              <div key={row.label}>
                <div className="flex items-center justify-between px-4 py-3.5">
                  <p className="text-sm" style={{ color: T.textMuted }}>{row.label}</p>
                  <p className="text-sm font-semibold" style={{ color: T.text }}>{row.value}</p>
                </div>
                {i < arr.length - 1 && <Divider />}
              </div>
            ))}
          </div>
        </motion.div>

        <div style={{ height: 8 }} />
      </div>

      <ProfileBottomNav active="profile" />
    </div>
  );
}
