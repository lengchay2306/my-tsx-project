import *as Reactfrom "react";
import *as TooltipPrimitivefrom "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

const TooltipProvider=TooltipPrimitive.Provider;

const Tooltip=TooltipPrimitive.Root;

const TooltipTrigger=TooltipPrimitive.Trigger;

const TooltipContent=React.forwardRef<
React.ElementRef<typeofTooltipPrimitive.Content>,
React.ComponentPropsWithoutRef<typeofTooltipPrimitive.Content>
>(({clas sName,sideOffset=4,...props},ref)=>(
<TooltipPrimitive.Content
ref={ref}
sideOffset={sideOffset}
clas sName={cn(
"z-50overflow-hiddenrounded-mdborderbg-popoverpx-3py-1.5text-smtext-popover-foregroundshadow-mdanimate-infade-in-0zoom-in-95data-[state=closed]:animate-outdata-[state=closed]:fade-out-0data-[state=closed]:zoom-out-95data-[side=bottom]:slide-in-from-top-2data-[side=left]:slide-in-from-right-2data-[side=right]:slide-in-from-left-2data-[side=top]:slide-in-from-bottom-2",
clas sName,
)}
{...props}
/>
));
TooltipContent.displayName=TooltipPrimitive.Content.displayName;

export{Tooltip,TooltipTrigger,TooltipContent,TooltipProvider};
