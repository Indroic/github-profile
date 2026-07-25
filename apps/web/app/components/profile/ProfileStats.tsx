import type { PublicGithubProfile } from "@/types/profile";

interface StatChipProps {
  label: string;
  value: number;
}

function StatChip({ label, value = 0 }: StatChipProps) {
  const formatted =
    value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toLocaleString("es");

  return (
    <div
      className="flex flex-col items-center gap-0.5 px-4 py-3 rounded-xl flex-1 min-w-[5rem]
                 bg-surface-secondary border border-border"
    >
      <span
        className="text-xl font-bold tabular-nums text-accent"
        style={{ fontFamily: "var(--font-mono)", letterSpacing: "-0.02em" }}
      >
        {formatted}
      </span>
      <span className="text-xs uppercase tracking-widest text-muted">
        {label}
      </span>
    </div>
  );
}

interface ProfileStatsProps {
  profile: PublicGithubProfile;
}

export function ProfileStats({ profile }: ProfileStatsProps) {
  return (
    <section aria-label="Estadísticas del perfil">
      <div className="flex gap-2 flex-wrap">
        <StatChip label="Repos"      value={profile.publicRepos} />
        <StatChip label="Gists"      value={profile.publicGists} />
        <StatChip label="Seguidores" value={profile.followers}   />
        <StatChip label="Siguiendo"  value={profile.following}   />
      </div>
    </section>
  );
}
