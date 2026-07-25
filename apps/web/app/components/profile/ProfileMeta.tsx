import { GeoPin, Briefcase, Globe } from "@gravity-ui/icons";
import type { PublicGithubProfile } from "@/types/profile";

interface MetaItemProps {
  icon:   React.ReactNode;
  label:  string;
  href?:  string;
}

function MetaItem({ icon, label, href }: MetaItemProps) {
  const inner = (
    <span className="flex items-center gap-2.5">
      <span className="shrink-0 text-accent/70">{icon}</span>
      <span
        className="text-sm truncate text-foreground"
        style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem" }}
      >
        {label}
      </span>
    </span>
  );

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-75 transition-opacity"
      aria-label={label}
    >
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  );
}

/** Logo X/Twitter como SVG inline */
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

interface ProfileMetaProps {
  profile: PublicGithubProfile;
}

function normalizeBlog(url: string) {
  return url.startsWith("http") ? url : `https://${url}`;
}

export function ProfileMeta({ profile }: ProfileMetaProps) {
  const items: MetaItemProps[] = [
    ...(profile.location
      ? [{ icon: <GeoPin className="size-4" />, label: profile.location }]
      : []),
    ...(profile.company
      ? [{ icon: <Briefcase className="size-4" />, label: profile.company }]
      : []),
    ...(profile.blog
      ? [{ icon: <Globe className="size-4" />, label: profile.blog, href: normalizeBlog(profile.blog) }]
      : []),
    ...(profile.twitterUsername
      ? [{ icon: <XIcon className="size-4" />, label: `@${profile.twitterUsername}`, href: `https://x.com/${profile.twitterUsername}` }]
      : []),
  ];

  if (items.length === 0) return null;

  return (
    <section className="flex flex-col gap-2.5" aria-label="Información de contacto">
      {items.map((item, i) => (
        <MetaItem key={i} {...item} />
      ))}
    </section>
  );
}
