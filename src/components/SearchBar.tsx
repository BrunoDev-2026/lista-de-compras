"use client";

import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useRef } from "react";

import type { FilterOption, SortOption } from "@/types/shopping";

type SearchBarProps = {
  search: string;
  sort: SortOption;
  filter: FilterOption;
  onSearch: (value: string) => void;
  onSort: (value: SortOption) => void;
  onFilter: (value: FilterOption) => void;
};

export function SearchBar({ search, sort, filter, onSearch, onSort, onFilter }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="glass-panel rounded-2xl p-3">
      <div className="grid gap-3 lg:grid-cols-[1fr_180px_160px]">
        <label className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input
            ref={inputRef}
            className="field"
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Buscar produto"
          />
        </label>

        <label className="relative">
          <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <select className="field appearance-none" value={sort} onChange={(event) => onSort(event.target.value as SortOption)}>
            <option value="recent">Recentes</option>
            <option value="name">Nome</option>
            <option value="highest">Maior subtotal</option>
            <option value="lowest">Menor subtotal</option>
          </select>
        </label>

        <label className="relative">
          <Filter className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <select className="field appearance-none" value={filter} onChange={(event) => onFilter(event.target.value as FilterOption)}>
            <option value="all">Todos</option>
            <option value="essentials">Até R$ 50</option>
            <option value="bulk">Quantidade 3+</option>
          </select>
        </label>
      </div>
    </div>
  );
}
