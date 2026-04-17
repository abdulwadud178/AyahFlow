import { profileTheme as T } from "./theme";

type NavItem = "home" | "read" | "explore" | "profile" | "options";

export function ProfileBottomNav({ active }: { active: NavItem }) {
  const items: { id: NavItem; label: string; icon: React.ReactNode }[] = [
    { id: "home",    label: "HOME",    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg> },
    { id: "read",    label: "READ",    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg> },
    { id: "explore", label: "EXPLORE", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/></svg> },
    { id: "profile", label: "PROFILE", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg> },
    { id: "options", label: "OPTIONS", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93A10 10 0 0 0 4.93 19.07M19.07 19.07A10 10 0 0 0 4.93 4.93"/></svg> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center justify-around px-2" style={{ background: T.bg, borderTop: `1px solid ${T.border}`, paddingTop: 8, paddingBottom: 20 }}>
      {items.map(item => {
        const isActive = item.id === active;
        return (
          <button key={item.id} className="flex flex-col items-center gap-1 transition-all" style={{ color: isActive ? T.green : T.textDim }}>
            {isActive ? (
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-full" style={{ background: T.surface2 }}>
                {item.icon}
                <span className="text-[10px] font-bold tracking-wider">{item.label}</span>
              </div>
            ) : (
              <>
                {item.icon}
                <span className="text-[9px] tracking-wider">{item.label}</span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}
