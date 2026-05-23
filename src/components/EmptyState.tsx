"use client";

import { motion } from "framer-motion";
import { PackageSearch, SearchX } from "lucide-react";

type EmptyStateProps = {
  variant: "empty" | "search";
};

export function EmptyState({ variant }: EmptyStateProps) {
  const isSearch = variant === "search";
  const Icon = isSearch ? SearchX : PackageSearch;

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel flex min-h-[360px] flex-col items-center justify-center rounded-3xl px-6 text-center"
    >
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
        <Icon size={28} />
      </div>
      <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
        {isSearch ? "Nenhum item encontrado" : "Sua lista esta vazia"}
      </h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {isSearch
          ? "Ajuste a busca, filtro ou ordenação para visualizar outros produtos."
          : "Adicione o primeiro produto para acompanhar quantidade, preço unitário e subtotal automaticamente."}
      </p>
    </motion.section>
  );
}
