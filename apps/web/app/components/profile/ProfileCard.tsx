"use client";

import { useTRPC } from "@repo/api";
import { useQuery } from "@tanstack/react-query";
import { ProfileHero }     from "./ProfileHero";
import { ProfileStats }    from "./ProfileStats";
import { ProfileMeta }     from "./ProfileMeta";
import { ProfileActions }  from "./ProfileActions";
import { ProfileSkeleton } from "./ProfileSkeleton";
import { ProfileError }    from "./ProfileError";

interface ProfileCardProps {
  username: string;
}

export function ProfileCard({ username }: ProfileCardProps) {
  const trpc = useTRPC();

  const { data, isLoading, isError, error } = useQuery(
    trpc.githubProfileRouter.getGithubProfile.queryOptions({ username })
  );

  if (isLoading) return <ProfileSkeleton />;

  if (isError) {
    return (
      <ProfileError
        message={
          error instanceof Error ? error.message : "No se pudo cargar el perfil."
        }
        username={username}
      />
    );
  }

  if (!data) return null;

  return (
    <article
      className="rounded-3xl overflow-hidden animate-fade-up
                 bg-surface border border-border shadow-surface"
      aria-label={`Perfil de GitHub de ${data.name ?? data.username}`}
    >
      <ProfileHero profile={data} />
      <div className="px-6 py-5 flex flex-col gap-5 border-t border-border">
        <ProfileStats   profile={data} />
        <ProfileMeta    profile={data} />
        <ProfileActions profile={data} />
      </div>
    </article>
  );
}
