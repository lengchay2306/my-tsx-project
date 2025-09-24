import *as Reactfrom "react";
import *as ProgressPrimitivefrom "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress=React.forwardRef<
React.ElementRef<typeofProgressPrimitive.Root>,
React.ComponentPropsWithoutRef<typeofProgressPrimitive.Root>
>(({clas sName,value,...props},ref)=>(
<ProgressPrimitive.Root
ref={ref}
clas sName={cn("relativeh-4w-fulloverflow-hiddenrounded-fullbg-secondary",clas sName)}
{...props}
>
<ProgressPrimitive.Indicator
clas sName="h-fullw-fullflex-1bg-primarytransition-all"
style={{transform:`translateX(-${100-(value||0)}%)`}}
/>
</ProgressPrimitive.Root>
));
Progress.displayName=ProgressPrimitive.Root.displayName;

export{Progress};
