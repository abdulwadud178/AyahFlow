import { motion } from "framer-motion";

interface ExtraItem {
  icon: string;
  label: string;
  desc: string;
  onClick?: () => void;
}

interface ExtrasSectionProps {
  items?: ExtraItem[];
}

const defaultItems: ExtraItem[] = [
  { icon: "🤲", label: "Donate", desc: "Support the cause" },
  { icon: "👥", label: "Invite Friends", desc: "Earn together" },
];

export function ExtrasSection({ items = defaultItems }: ExtrasSectionProps) {
  return (
    <div className="mb-6">
      <div className="px-5 mb-3">
        <h2 className="text-[18px] font-extrabold" style={{ color: "var(--text-primary)" }}>
          More
        </h2>
      </div>
      <div className="mx-5 grid grid-cols-2 gap-3">
        {items.map((item, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            onClick={item.onClick}
            className="rounded-[18px] p-4 text-left border cursor-pointer"
            style={{ background: "var(--bg-card)", borderColor: "rgba(255,255,255,0.06)" }}
          >
            <div className="text-[24px] mb-2">{item.icon}</div>
            <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>
              {item.label}
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)" }}>
              {item.desc}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}