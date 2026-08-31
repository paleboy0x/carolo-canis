// Placeholder until the official Facebook page URL is available.
export const FACEBOOK_URL = "#";

type FacebookLinkProps = {
  className?: string;
};

export function FacebookLink({ className = "" }: FacebookLinkProps) {
  const isPlaceholder = FACEBOOK_URL === "#";

  return (
    <a
      href={FACEBOOK_URL}
      className={`fb-link ${className}`.trim()}
      aria-label="Facebook"
      title="Facebook"
      target={isPlaceholder ? undefined : "_blank"}
      rel={isPlaceholder ? undefined : "noopener noreferrer"}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M13.5 21v-8.25h2.77l.41-3.22h-3.18V7.47c0-.93.26-1.57 1.6-1.57h1.7V3.02c-.3-.04-1.31-.13-2.49-.13-2.46 0-4.15 1.5-4.15 4.27v2.37H7.38v3.22h2.78V21h3.34z" />
      </svg>
    </a>
  );
}
