const sizes = { navbar: 24, hero: 80, favicon: 16 } as const;

export function EcosystemLogo({
  size = "navbar",
}: {
  size?: "navbar" | "hero" | "favicon";
}) {
  const h = sizes[size];
  // viewBox is 60x32, maintain aspect ratio
  const w = (h * 60) / 32;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 60 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="SOFI Data Ecosystem"
    >
      <path
        d="M8,24 C8,24 8,16 16,16 C24,16 24,8 24,8 C24,8 24,0 32,0 C40,0 40,8 40,8 C40,8 40,16 48,16 C56,16 56,24 48,24 C40,24 40,16 32,16 C24,16 24,24 16,24 C8,24 8,24 8,24"
        stroke="#6366f1"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
        className="logo-draw"
      />
    </svg>
  );
}
