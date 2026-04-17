import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProfileScreen } from "../components/profile/ProfileScreen";
import { SettingsScreen } from "../components/profile/SettingsScreen";
import { DUMMY_PROFILE, DUMMY_SETTINGS } from "../components/profile/profileData";
import type { UserSettings } from "../components/profile/types";

export default function ProfilePage() {
  const [view, setView] = useState<"profile" | "settings">("profile");
  const [settings, setSettings] = useState<UserSettings>(DUMMY_SETTINGS);

  return (
    <div className="max-w-sm mx-auto relative" style={{ fontFamily: "'system-ui', sans-serif" }}>
      <AnimatePresence mode="wait">
        {view === "profile" ? (
          <motion.div key="profile" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
            <ProfileScreen profile={DUMMY_PROFILE} onOpenSettings={() => setView("settings")} />
          </motion.div>
        ) : (
          <motion.div key="settings" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.25 }}>
            <SettingsScreen settings={settings} onSave={setSettings} onBack={() => setView("profile")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
