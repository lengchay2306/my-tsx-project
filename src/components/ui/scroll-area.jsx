import *as Reactfrom "react";
import *as ScrollAreaPrimitivefrom "@radix-ui/react-scroll-area";

import { cn } from "@/lib/utils";

const ScrollArea=React.forwardRef<
React.ElementRef<typeofScrollAreaPrimitive.Root>,
React.ComponentPropsWithoutRef<typeofScrollAreaPrimitive.Root>
>(({clas sName,children,...props},ref)=>(
<ScrollAreaPrimitive.Rootref={ref}clas sName={cn("relativeoverflow-hidden",clas sName)}{...props}>
<ScrollAreaPrimitive.Viewportclas sName="h-fullw-fullrounded-[inherit]">{children}</ScrollAreaPrimitive.Viewport>
<ScrollBar/>
<ScrollAreaPrimitive.Corner/>
</ScrollAreaPrimitive.Root>
));
ScrollArea.displayName=ScrollAreaPrimitive.Root.displayName;

const ScrollBar=React.forwardRef<
React.ElementRef<typeofScrollAreaPrimitive.ScrollAreaScrollbar>,
React.ComponentPropsWithoutRef<typeofScrollAreaPrimitive.ScrollAreaScrollbar>
>(({clas sName,orientation="vertical",...props},ref)=>(
<ScrollAreaPrimitive.ScrollAreaScrollbar
ref={ref}
orientation={orientation}
clas sName={cn(
"flextouch-noneselect-nonetransition-colors",
orientation==="vertical"&&" h-fullw-2.5border-lborder-l-transparentp-[1px]",
orientation==="horizontal"&&" h-2.5flex-colborder-tborder-t-transparentp-[1px]",
clas sName,
)}
{...props}
>
<ScrollAreaPrimitive.ScrollAreaThumbclas sName="relativeflex-1rounded-fullbg-border"/>
</ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName=ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export{ScrollArea,ScrollBar};
