import { cn } from "@/lib/utils";

functionSkeleton({clas sName,...props}:React.HTMLAttributes<HTMLDivElement>){
return<divclas sName={cn("animate-pulserounded-mdbg-muted",clas sName)}{...props}/>;
}

export{Skeleton};
