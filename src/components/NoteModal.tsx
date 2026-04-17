import { useState } from "react";
import { motion } from "framer-motion";
import type { Verse } from "../types/reading";

type NoteModalProps = {
  verse: Verse;
  onClose: () => void;
  onSave: (note: string) => void;
};

export function NoteModal({ verse, onClose, onSave }: NoteModalProps) {
  const [note, setNote] = useState("");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center mx-auto"
      style={{ background: "rgba(0,0,0,0.6)", maxWidth: 430 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60 }}
        animate={{ y: 0 }}
        exit={{ y: 60 }}
        onClick={e => e.stopPropagation()}
        className="w-full rounded-t-[28px] p-6"
        style={{ background: "#162018" }}
      >
        <p className="text-[15px] font-extrabold mb-1" style={{ color: "var(--text-primary)" }}>
          Add Reflection
        </p>
        <p className="text-[12px] mb-4" style={{ color: "var(--text-muted)" }}>Verse {verse.number}</p>
        <textarea
          autoFocus
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="Write your personal reflection..."
          rows={4}
          className="w-full px-4 py-3 rounded-2xl text-[13px] leading-relaxed outline-none border resize-none"
          style={{
            background: "rgba(255,255,255,0.05)",
            borderColor: "rgba(255,255,255,0.08)",
            color: "var(--text-primary)",
          }}
        />
        <div className="flex gap-3 mt-4">
          <button onClick={onClose} className="flex-1 py-3 rounded-2xl text-[13px] font-bold"
            style={{ background: "rgba(255,255,255,0.06)", color: "var(--text-secondary)" }}>
            Cancel
          </button>
          <button onClick={() => { onSave(note); onClose(); }}
            className="flex-1 py-3 rounded-2xl text-[13px] font-bold"
            style={{ background: "rgba(201,168,76,0.2)", color: "var(--gold-light)" }}>
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
