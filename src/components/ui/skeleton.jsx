import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }act.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
}

export { Skeleton };
