"use client";

import { motion } from "framer-motion";
import { Eraser, NotebookPen, Save } from "lucide-react";

type NotesPadProps = {
  content: string;
  isLoading: boolean;
  isSaving: boolean;
  onChange: (value: string) => void;
  onClear: () => void;
};

export function NotesPad({ content, isLoading, isSaving, onChange, onClear }: NotesPadProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel rounded-3xl p-5 lg:p-6"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-teal-600 dark:text-teal-400">
            <NotebookPen size={15} />
            Bloco de notas
          </p>
          <h2 className="mt-2 text-xl font-semibold text-zinc-950 dark:text-zinc-50">Não esquecer</h2>
        </div>

        <button
          className="icon-button"
          type="button"
          onClick={onClear}
          disabled={!content.trim()}
          title="Limpar anotação"
          aria-label="Limpar anotação"
        >
          <Eraser size={18} />
        </button>
      </div>

      <textarea
        className="min-h-44 w-full resize-y rounded-2xl border border-zinc-200 bg-white/90 p-4 text-sm leading-6 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 disabled:cursor-wait dark:border-zinc-800 dark:bg-zinc-950/90 dark:text-zinc-100 dark:focus:border-teal-400"
        value={content}
        maxLength={5000}
        disabled={isLoading}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Anote marcas, observações, cupons, itens para lembrar depois..."
      />

      <div className="mt-3 flex items-center justify-between gap-3 text-xs text-zinc-500 dark:text-zinc-400">
        <span>{content.length}/5000 caracteres</span>
        <span className="inline-flex items-center gap-1.5">
          <Save size={14} />
          {isLoading ? "Carregando..." : isSaving ? "Salvando..." : "Salvo automaticamente"}
        </span>
      </div>
    </motion.section>
  );
}
