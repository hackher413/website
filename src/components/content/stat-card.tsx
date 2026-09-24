import { cn } from "@/lib/utils";

export type Stat = {
  value: string;
  label: string;
};

/**
 * A single headline statistic. Large value, quiet label.
 */
export function StatCard({
  value,
  label,
  className,
}: Stat & { className?: string }) {
  return (
    <div className={cn("flex flex-col", className)}>
      <span className="text-display font-heading tabular-nums">{value}</span>
      <span className="mt-1 text-sm font-medium text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

/** Responsive grid of stats. */
export function StatGrid({
  stats,
  className,
}: {
  stats: Stat[];
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "grid list-none grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4",
        className,
      )}
    >
      {stats.map((s) => (
        <li key={s.label}>
          <StatCard value={s.value} label={s.label} />
        </li>
      ))}
    </ul>
  );
}
