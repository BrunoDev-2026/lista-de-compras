export function LoadingSkeleton() {
  return (
    <section className="glass-panel rounded-3xl p-4">
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-24 animate-pulse rounded-2xl bg-zinc-200/70 dark:bg-zinc-800/70 md:h-20" />
        ))}
      </div>
    </section>
  );
}
