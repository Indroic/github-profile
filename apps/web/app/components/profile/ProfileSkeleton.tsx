export function ProfileSkeleton() {
  return (
    <div
      className="rounded-3xl overflow-hidden bg-surface border border-border"
      aria-busy="true"
      aria-label="Cargando perfil…"
    >
      {/* ── Hero skeleton ────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start
                      gap-6 px-6 py-8 bg-surface-secondary">
        {/* Avatar placeholder */}
        <div className="size-24 sm:size-28 rounded-full shrink-0 skeleton-shimmer" />

        {/* Líneas de texto */}
        <div className="flex flex-col gap-3 flex-1 w-full items-center sm:items-start">
          <div className="h-7 w-48 rounded-lg skeleton-shimmer" />
          <div className="h-4 w-28 rounded-md skeleton-shimmer" />
          <div className="h-3 w-64 rounded-md skeleton-shimmer" />
          <div className="h-3 w-44 rounded-md skeleton-shimmer" />
        </div>
      </div>

      {/* ── Body skeleton ────────────────────────────────────── */}
      <div className="px-6 py-5 flex flex-col gap-5 border-t border-border">
        {/* Stats */}
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex-1 h-16 rounded-xl skeleton-shimmer" />
          ))}
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-2.5">
          {[70, 55, 80].map((w, i) => (
            <div
              key={i}
              className="h-4 rounded-md skeleton-shimmer"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>

        {/* Button */}
        <div className="h-9 w-36 rounded-xl skeleton-shimmer" />
      </div>
    </div>
  );
}
