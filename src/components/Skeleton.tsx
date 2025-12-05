export default function Skeleton({ className }: { className?: string }) {
  // animate-pulse is a built-in Tailwind animation that fades in/out
  return (
    <div className={`bg-surface-200 animate-pulse rounded-2xl ${className}`} />
  );
}