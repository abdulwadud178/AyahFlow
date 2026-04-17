import { useState } from "react";
import { ChevronLeft, User, Mail, Target, Mic2, BookOpen, Eye, Palette, Globe, Bell, Info, FileText, Shield, LogOut, Moon, Sun, Monitor } from "lucide-react";
import type { UserSettings } from "./types";
import { profileTheme as T } from "./theme";
import { SettingRow, Divider, SectionLabel, SectionCard, Toggle } from "./atoms";

interface SettingsScreenProps {
  settings: UserSettings;
  onSave: (settings: UserSettings) => void;
  onBack: () => void;
}

export function SettingsScreen({ settings, onSave, onBack }: SettingsScreenProps) {
  const [s, setS] = useState<UserSettings>(settings);
  const update = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => setS(prev => ({ ...prev, [key]: value }));

  const handleBack = () => {
    onSave(s);
    onBack();
  };

  return (
    <div className="min-h-screen flex flex-col pb-28" style={{ background: T.bg, color: T.text }}>
      <div className="flex items-center gap-3 px-4 pt-12 pb-4 sticky top-0 z-10" style={{ background: T.bg, borderBottom: `1px solid ${T.border}` }}>
        <button onClick={handleBack} className="p-2 rounded-full" style={{ background: T.surface }}>
          <ChevronLeft size={20} color={T.text} />
        </button>
        <h1 className="text-lg font-bold" style={{ fontFamily: T.serif, color: T.text }}>Sanctuary Configuration</h1>
      </div>

      <div className="overflow-y-auto">
        <SectionLabel label="ACCOUNT SETTINGS" />
        <SectionCard>
          <SettingRow icon={<User size={18} />} label="Name" sublabel="Ibrahim Al-Farsi" onClick={() => {}} />
          <Divider />
          <SettingRow icon={<User size={18} />} label="Gender" value="Male" onClick={() => {}} />
          <Divider />
          <SettingRow icon={<Mail size={18} />} label="Email Address" sublabel="ibrahim@example.com" onClick={() => {}} />
          <Divider />
          <SettingRow icon={<Target size={18} />} label="Daily Goal" value={`${s.dailyGoalMinutes} min`} onClick={() => {}} />
          <Divider />
          <SettingRow icon={<Mic2 size={18} />} label="Reciter" value={s.reciter} onClick={() => {}} />
        </SectionCard>

        <SectionLabel label="READING EXPERIENCE" />
        <SectionCard>
          <SettingRow icon={<BookOpen size={18} />} label="Qur'an Script" value={s.quranScript === "uthmani" ? "Uthmani" : s.quranScript === "indopak" ? "Indo-Pak" : "Simple"} onClick={() => {}} />
          <Divider />
          <div className="px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl flex items-center justify-center" style={{ width: 40, height: 40, background: T.greenFaint, color: T.greenMid }}>
                <span style={{ fontSize: 16 }}>Aa</span>
              </div>
              <p className="text-sm font-semibold" style={{ color: T.text }}>Font Size</p>
            </div>
            <div className="flex gap-1">
              {(["small", "medium", "large", "xl"] as const).map(sz => (
                <button key={sz} onClick={() => update("fontSize", sz)}
                  className="px-2 py-1 rounded-lg text-xs font-semibold transition-colors"
                  style={{ background: s.fontSize === sz ? T.green : T.greenFaint, color: s.fontSize === sz ? T.bg : T.textMuted }}>
                  {sz === "xl" ? "XL" : sz[0].toUpperCase() + sz.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <Divider />
          <div className="px-4 py-3.5 flex items-center gap-3">
            <div className="rounded-xl flex items-center justify-center" style={{ width: 40, height: 40, background: T.greenFaint, color: T.greenMid }}><Eye size={18} /></div>
            <p className="flex-1 text-sm font-semibold" style={{ color: T.text }}>Translation</p>
            <Toggle value={s.showTranslation} onChange={v => update("showTranslation", v)} />
          </div>
          <Divider />
          <div className="px-4 py-3.5 flex items-center gap-3">
            <div className="rounded-xl flex items-center justify-center" style={{ width: 40, height: 40, background: T.greenFaint, color: T.greenMid }}><Eye size={18} /></div>
            <p className="flex-1 text-sm font-semibold" style={{ color: T.text }}>Transliteration</p>
            <Toggle value={s.showTransliteration} onChange={v => update("showTransliteration", v)} />
          </div>
          <Divider />
          <div className="px-4 py-3.5 flex items-center gap-3">
            <div className="rounded-xl flex items-center justify-center" style={{ width: 40, height: 40, background: T.greenFaint, color: T.greenMid }}><BookOpen size={18} /></div>
            <p className="flex-1 text-sm font-semibold" style={{ color: T.text }}>Tafseer</p>
            <Toggle value={s.showTafseer} onChange={v => update("showTafseer", v)} />
          </div>
        </SectionCard>

        <SectionLabel label="ATMOSPHERE" />
        <SectionCard>
          <div className="px-4 py-3.5">
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-xl flex items-center justify-center" style={{ width: 40, height: 40, background: T.greenFaint, color: T.greenMid }}><Palette size={18} /></div>
              <p className="text-sm font-semibold" style={{ color: T.text }}>Appearance Mode</p>
            </div>
            <div className="flex gap-2 ml-1">
              {([['dark', 'Dark', Moon], ['light', 'Light', Sun], ['system', 'System', Monitor]] as const).map(([val, label, Icon]) => (
                <button key={val} onClick={() => update("appearanceMode", val)}
                  className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl transition-colors"
                  style={{ background: s.appearanceMode === val ? T.green : T.greenFaint, color: s.appearanceMode === val ? T.bg : T.textMuted }}>
                  <Icon size={18} />
                  <span className="text-xs font-semibold">{label}</span>
                </button>
              ))}
            </div>
          </div>
          <Divider />
          <SettingRow icon={<Globe size={18} />} label="Language" value={s.language} onClick={() => {}} />
        </SectionCard>

        <SectionLabel label="SACRED REMINDERS" />
        <SectionCard>
          <div className="px-4 py-3.5 flex items-center gap-3">
            <div className="rounded-xl flex items-center justify-center" style={{ width: 40, height: 40, background: T.greenFaint, color: T.greenMid }}><Bell size={18} /></div>
            <p className="flex-1 text-sm font-semibold" style={{ color: T.text }}>Prayer & Reading Alerts</p>
            <Toggle value={s.notificationsEnabled} onChange={v => update("notificationsEnabled", v)} />
          </div>
          {s.notificationsEnabled && (
            <>
              <Divider />
              <SettingRow icon={<Bell size={18} />} label="Reminder Time" value={s.notificationTime} onClick={() => {}} />
            </>
          )}
        </SectionCard>

        <SectionLabel label="ABOUT & LEGAL" />
        <SectionCard>
          <SettingRow icon={<Info size={18} />} label="About the App" sublabel="Version 1.0.0" onClick={() => {}} />
          <Divider />
          <SettingRow icon={<FileText size={18} />} label="Terms & Conditions" onClick={() => {}} />
          <Divider />
          <SettingRow icon={<Shield size={18} />} label="Privacy Policy" onClick={() => {}} />
        </SectionCard>

        <div className="px-4 pt-6 pb-2">
          <button className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl transition-all active:scale-95"
            style={{ background: T.surface, border: `1px solid ${T.border}`, color: "#e05555" }}>
            <LogOut size={18} />
            <span className="text-sm font-semibold">Sign out of Sanctuary</span>
          </button>
        </div>
      </div>
    </div>
  );
}
