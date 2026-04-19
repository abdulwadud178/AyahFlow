import React from "react";
import { motion } from "framer-motion";
import { Star, Flame } from "lucide-react";
import type { LeaderboardUser, LeaderboardTab, NavItem } from "../../types/community";

const TABS: LeaderboardTab[] = ["Global", "Local", "Friends"];

export function Avatar({ url, name, size = 48 }: { url?: string; name: string; size?: number }) {
  if (url) {
    return (
      <img
        src={url}
        alt={name}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div
      className="rounded-full flex items-center justify-center font-semibold text-[#d4a84b] bg-[#2a3a1f] text-sm"
      style={{ width: size, height: size }}
    >
      {initials}
    </div>
  );
}

export function formatCount(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K+` : `${n}+`;
}

export function TabBar({ active, onChange }: { active: LeaderboardTab; onChange: (t: LeaderboardTab) => void }) {
  return (
    <div className="flex rounded-full p-1 mx-4 mt-4 mb-2" style={{ background: "#1a2710" }}>
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className="flex-1 py-2 text-sm font-semibold rounded-full transition-all duration-200"
          style={{
            background: active === tab ? "#c8e68a" : "transparent",
            color: active === tab ? "#1a2710" : "#8aab5c",
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export function PodiumCard({ user, position }: { user: LeaderboardUser; position: "left" | "center" | "right" }) {
  const isCenter = position === "center";
  const avatarSize = isCenter ? 68 : 52;

  return (
    <motion.div
      initial={{ opacity: 0, y: isCenter ? 30 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: isCenter ? 0.1 : 0.2, duration: 0.4 }}
      className={`flex flex-col items-center ${isCenter ? "mt-0" : "mt-8"}`}
    >
      <div className="relative mb-1">
        {isCenter && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
            <Star size={20} fill="#d4a84b" color="#d4a84b" />
          </div>
        )}
        <div
          className="rounded-full p-[3px]"
          style={{
            background: isCenter
              ? "linear-gradient(135deg, #d4a84b 0%, #f0d080 50%, #d4a84b 100%)"
              : "#2a3a1f",
          }}
        >
          <Avatar url={user.avatarUrl} name={user.name} size={avatarSize} />
        </div>
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full flex items-center justify-center text-xs font-bold"
          style={{
            width: isCenter ? 24 : 20,
            height: isCenter ? 24 : 20,
            background: isCenter ? "#d4a84b" : "#2a3a1f",
            color: isCenter ? "#1a2710" : "#8aab5c",
            border: "1.5px solid #1a2710",
            fontSize: isCenter ? 13 : 11,
          }}
        >
          {user.rank}
        </div>
      </div>
      <p className="mt-4 text-sm font-semibold" style={{ color: isCenter ? "#d4a84b" : "#c8dfaa" }}>
        {user.name}
      </p>
      <p className="text-xs" style={{ color: isCenter ? "#d4a84b" : "#6a8a44" }}>
        {user.xp.toLocaleString()} XP
      </p>
    </motion.div>
  );
}

export function LeaderboardRow({ user, delay }: { user: LeaderboardUser; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="flex items-center gap-3 px-4 py-3 rounded-2xl"
      style={{
        background: user.isCurrentUser ? "#1f2f10" : "transparent",
        border: user.isCurrentUser ? "1px solid #2e4a15" : "none",
      }}
    >
      <span className="w-6 text-center text-sm font-semibold" style={{ color: "#6a8a44" }}>
        {user.rank}
      </span>
      <Avatar url={user.avatarUrl} name={user.name} size={42} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold truncate" style={{ color: "#e8f0d0" }}>
            {user.name}
          </p>
          {user.isCurrentUser && (
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
              style={{ background: "#2a3a1f", color: "#8aab5c" }}
            >
              CURRENT
            </span>
          )}
        </div>
        {user.streak > 0 && (
          <div className="flex items-center gap-1 mt-0.5">
            <Flame size={11} color="#d4a84b" />
            <span className="text-xs font-semibold" style={{ color: "#d4a84b" }}>
              {user.streak} DAY STREAK
            </span>
          </div>
        )}
      </div>
      <div className="text-right">
        <p className="font-bold text-base" style={{ color: "#e8f0d0" }}>
          {user.points.toLocaleString()}
        </p>
        <p className="text-[10px]" style={{ color: "#5a7a35" }}>
          POINTS
        </p>
      </div>
    </motion.div>
  );
}

export function CommunityBottomNav({ active }: { active: NavItem }) {
  const items: { id: NavItem; label: string; icon: React.ReactNode }[] = [
    { id: "home", label: "Home", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg> },
    { id: "read", label: "Read", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg> },
    { id: "search", label: "Search", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/></svg> },
    { id: "community", label: "Community", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="7" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="7" r="3"/><path d="M21 20c0-3.3-1.8-5-5-5"/></svg> },
    { id: "profile", label: "Profile", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg> },
  ];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 flex items-center justify-around px-2 pb-safe"
      style={{
        background: "#141f0a",
        borderTop: "1px solid #1e2f12",
        paddingTop: 8,
        paddingBottom: 20,
      }}
    >
      {items.map((item) => {
        const isActive = item.id === active;
        return (
          <button
            key={item.id}
            className="flex flex-col items-center gap-1 transition-all duration-150"
            style={{ color: isActive ? "#c8e68a" : "#4a6a2a" }}
          >
            {isActive ? (
              <div
                className="flex items-center gap-1.5 px-4 py-2 rounded-full"
                style={{ background: "#1f3010" }}
              >
                {item.icon}
                <span className="text-xs font-semibold">{item.label}</span>
              </div>
            ) : (
              <>
                {item.icon}
                <span className="text-[10px]">{item.label}</span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}
