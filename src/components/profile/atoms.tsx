import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { profileTheme as T } from "./theme";

export function Avatar({ url, name, size = 56 }: { url?: string; name: string; size?: number }) {
  if (url) {
    return <img src={url} alt={name} className="rounded-full object-cover" style={{ width: size, height: size }} />;
  }

  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="rounded-full flex items-center justify-center font-bold" style={{ width: size, height: size, background: T.surface2, color: T.gold, fontSize: size * 0.35 }}>
      {initials}
    </div>
  );
}

export function SettingRow({
  icon,
  label,
  sublabel,
  value,
  onClick,
  trailing,
}: {
  icon: ReactNode;
  label: string;
  sublabel?: string;
  value?: string;
  onClick?: () => void;
  trailing?: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full px-4 py-3.5 transition-colors text-left"
      style={{ background: "transparent" }}
    >
      <div className="rounded-xl flex items-center justify-center shrink-0" style={{ width: 40, height: 40, background: T.greenFaint, color: T.greenMid }}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold" style={{ color: T.text }}>{label}</p>
        {sublabel && <p className="text-xs mt-0.5 truncate" style={{ color: T.textMuted }}>{sublabel}</p>}
      </div>
      {trailing ?? (
        <div className="flex items-center gap-2">
          {value && <span className="text-xs" style={{ color: T.greenMid }}>{value}</span>}
          <ChevronRight size={16} color={T.textDim} />
        </div>
      )}
    </button>
  );
}

export function Divider() {
  return <div style={{ height: 1, background: T.border, margin: "0 16px" }} />;
}

export function SectionCard({ children }: { children: ReactNode }) {
  return (
    <div className="mx-4 rounded-2xl overflow-hidden" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
      {children}
    </div>
  );
}

export function SectionLabel({ label }: { label: string }) {
  return (
    <p className="px-4 pt-6 pb-2 text-xs tracking-widest font-bold" style={{ color: T.gold, letterSpacing: "0.12em" }}>
      {label}
    </p>
  );
}

export function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="relative rounded-full transition-colors duration-200 shrink-0"
      style={{
        width: 44,
        height: 26,
        background: value ? T.green : T.greenFaint,
        border: `1px solid ${value ? T.greenMid : T.border}`,
      }}
    >
      <motion.div
        animate={{ x: value ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-0.75 rounded-full"
        style={{ width: 18, height: 18, background: value ? T.bg : T.textDim }}
      />
    </button>
  );
}
