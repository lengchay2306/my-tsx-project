import { cn } from"@/lib/utils";

functionSkeleton({className,...props}:React.HTMLAttributes<HTMLDivElement>){
return<divclassName={cn("animate-pulserounded-mdbg-muted",className)}{...props}/>;
}

export{Skeleton};
