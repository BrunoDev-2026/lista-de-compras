"use client";

import { Plus, Wallet } from "lucide-react";

import { formatCurrency } from "@/lib/currency";

type MobileBottomBarProps = {
  total: number;
};

export function MobileBottomBar({ total }: MobileBottomBarProps) {
  return (
    <div className="fixed inset-x-3 bottom-3 z-40 rounded-2xl border border-zinc-200 bg-white/92 p-3 shadow-soft backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/92 lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
            <Wallet size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Total</p>
            <p className="truncate text-base font-semibold text-zinc-950 dark:text-zinc-50">{formatCurrency(total)}</p>
          </div>
        </div>
        <a
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white shadow-glow transition hover:bg-teal-500"
          href="#shopping-form"
          aria-label="Adicionar produto"
          title="Adicionar produto"
        >
          <Plus size={20} />
        </a>
      </div>
    </div>
  );
}
