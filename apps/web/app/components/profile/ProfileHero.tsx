import { Avatar } from "@repo/ui/avatar";
import { Badge }  from "@repo/ui/badge";
import type { PublicGithubProfile } from "@/types/profile";

interface ProfileHeroProps {
  profile: PublicGithubProfile;
}

export function ProfileHero({ profile }: ProfileHeroProps) {
  const joinYear = new Date(profile.createdAt).getFullYear();

  const initials = (profile.name ?? profile.username)
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className="relative flex flex-col sm:flex-row items-center sm:items-start
                 gap-6 px-6 py-8 bg-surface-secondary"
    >
      {/* Grid decorativo — usa clase global del globals.css */}
      <div className="absolute inset-0 pointer-events-none grid-overlay" aria-hidden="true" />

      {/* ── Avatar ──────────────────────────────────────────── */}
      <div className="relative shrink-0 z-10">
        <Badge.Anchor>
          <Avatar
            size="lg"
            className="size-24 sm:size-28 ring-2 ring-accent/40 ring-offset-2 ring-offset-surface-secondary"
          >
            <Avatar.Image
              src={profile.avatarUrl}
              alt={`Avatar de ${profile.username}`}
            />
            <Avatar.Fallback>{initials}</Avatar.Fallback>
          </Avatar>

          {profile.hireable && (
            <Badge
              color="success"
              placement="bottom-right"
              size="sm"
              aria-label="Disponible para contratar"
            />
          )}
        </Badge.Anchor>
      </div>

      {/* ── Información textual ──────────────────────────────── */}
      <div className="flex flex-col gap-1.5 text-center sm:text-left z-10 min-w-0">
        {profile.name && (
          <h2
            className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
            style={{ letterSpacing: "-0.03em" }}
          >
            {profile.name}
          </h2>
        )}

        <p
          className="text-base text-accent"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          @{profile.username}
        </p>

        {profile.bio && (
          <p className="text-sm mt-1 max-w-sm leading-relaxed text-muted">
            {profile.bio}
          </p>
        )}

        <p
          className="text-xs mt-2 text-muted/60"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          En GitHub desde {joinYear}
        </p>
      </div>
    </div>
  );
}
