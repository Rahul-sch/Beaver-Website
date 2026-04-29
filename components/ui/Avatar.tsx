import { cn } from "@/lib/cn";

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export function Avatar({
  name,
  color = "#0A84FF",
  size = 28,
  className,
  ringClass,
}: {
  name: string;
  color?: string;
  size?: number;
  className?: string;
  ringClass?: string;
}) {
  return (
    <span
      aria-label={name}
      className={cn(
        "inline-grid place-items-center rounded-full text-white font-semibold tracking-tight",
        ringClass,
        className
      )}
      style={{
        width: size,
        height: size,
        background: color,
        fontSize: size * 0.42,
      }}
    >
      {initialsOf(name)}
    </span>
  );
}

export function AvatarCluster({
  people,
  size = 28,
  max = 4,
  className,
}: {
  people: { name: string; color?: string }[];
  size?: number;
  max?: number;
  className?: string;
}) {
  const shown = people.slice(0, max);
  const overlap = Math.round(size * 0.35);
  return (
    <div className={cn("flex items-center", className)}>
      {shown.map((p, i) => (
        <span
          key={i}
          className="rounded-full"
          style={{
            marginLeft: i === 0 ? 0 : -overlap,
            boxShadow: "0 0 0 2px #000",
          }}
        >
          <Avatar name={p.name} color={p.color} size={size} />
        </span>
      ))}
    </div>
  );
}
