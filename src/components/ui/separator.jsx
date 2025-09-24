import *as Reactfrom "react";
import *as SeparatorPrimitivefrom "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

const Separator=React.forwardRef<
React.ElementRef<typeofSeparatorPrimitive.Root>,
React.ComponentPropsWithoutRef<typeofSeparatorPrimitive.Root>
>(({clas sName,orientation="horizontal",decorative=true,...props},ref)=>(
<SeparatorPrimitive.Root
ref={ref}
decorative={decorative}
orientation={orientation}
clas sName={cn("shrink-0bg-border",orientation===" horizontal"" h-[1px]w-full":" h-fullw-[1px]",clas sName)}
{...props}
/>
));
Separator.displayName=SeparatorPrimitive.Root.displayName;

export{Separator};
