"use client";

import { motion } from "framer-motion";
import { CalendarDays, Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type HeaderProps = {
  isDark: boolean;
  onToggleTheme: () => void;
};

export function Header({ isDark, onToggleTheme }: HeaderProps) {
  const [today, setToday] = useState("Hoje");

  useEffect(() => {
    setToday(
      new Intl.DateTimeFormat("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long"
      }).format(new Date())
    );
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-start gap-4">
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-950 shadow-glow dark:border-zinc-800">
          <Image
            src="/brand/logo.png"
            alt="MB Tech"
            fill
            priority
            sizes="64px"
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50 sm:text-4xl">
            Lista de Compras
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Planeje produtos, acompanhe subtotais e mantenha o gasto total sempre visível.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-2xl border border-zinc-200 bg-white/70 px-4 py-3 text-sm text-zinc-600 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-300 sm:flex">
          <CalendarDays size={17} />
          <span className="capitalize">{today}</span>
        </div>
        <button
          className="icon-button"
          type="button"
          onClick={onToggleTheme}
          title={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
          aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </motion.header>
  );
}
