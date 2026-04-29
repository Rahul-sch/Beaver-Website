import { cn } from "@/lib/cn";

export function BeaverMark({
  className,
  size = 32,
  withSquare = true,
}: {
  className?: string;
  size?: number;
  withSquare?: boolean;
}) {
  if (withSquare) {
    return (
      <div
        className={cn(
          "grid place-items-center rounded-[8px] bg-accent text-white",
          className
        )}
        style={{ width: size, height: size }}
      >
        <BeaverGlyph size={size * 0.7} />
      </div>
    );
  }
  return <BeaverGlyph className={className} size={size} />;
}

export function BeaverGlyph({
  className,
  size = 24,
  stroke = "currentColor",
}: {
  className?: string;
  size?: number;
  stroke?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 48"
      width={size}
      height={(size * 48) / 64}
      className={className}
      fill="none"
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* logs */}
      <ellipse cx="12" cy="34" rx="10" ry="6" />
      <line x1="6" y1="32" x2="8" y2="36" />
      <line x1="14" y1="30" x2="16" y2="38" />
      <ellipse cx="52" cy="34" rx="10" ry="6" />
      <line x1="48" y1="30" x2="50" y2="38" />
      <line x1="56" y1="30" x2="58" y2="38" />
      {/* head */}
      <path d="M22 30 c0 -10 8 -16 10 -16 s10 6 10 16" />
      {/* ears */}
      <circle cx="24" cy="16" r="2.5" />
      <circle cx="40" cy="16" r="2.5" />
      {/* eyes */}
      <circle cx="28" cy="22" r="1.4" fill={stroke} />
      <circle cx="36" cy="22" r="1.4" fill={stroke} />
      {/* nose */}
      <path d="M30 27 q2 1.4 4 0" />
      {/* teeth */}
      <rect x="30.5" y="29" width="3" height="3" rx="0.6" fill={stroke} />
    </svg>
  );
}
