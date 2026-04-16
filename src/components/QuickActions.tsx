import { motion } from "framer-motion";

interface QuickAction {
  icon: string;
  label: string;
  onClick?: () => void;
}

interface QuickActionsProps {
  actions?: QuickAction[];
}

const defaultActions: QuickAction[] = [
  { icon: "📖", label: "Explore Quran" },
  { icon: "🔖", label: "Saved Verses" },
];

export function QuickActions({ actions = defaultActions }: QuickActionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="mx-5 mb-5 grid grid-cols-2 gap-3"
    >
      {actions.map((action, i) => (
        <motion.button
          key={i}
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          onClick={action.onClick}
          className="rounded-[18px] p-4 text-center border cursor-pointer"
          style={{ background: "var(--bg-card)", borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div
            className="w-11 h-11 rounded-[14px] flex items-center justify-center mx-auto mb-2.5 text-xl"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            {action.icon}
          </div>
          <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>
            {action.label}
          </p>
        </motion.button>
      ))}
    </motion.div>
  );
}