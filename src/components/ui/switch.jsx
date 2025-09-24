import *as Reactfrom "react";
import *as SwitchPrimitivesfrom "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch=React.forwardRef<
React.ElementRef<typeofSwitchPrimitives.Root>,
React.ComponentPropsWithoutRef<typeofSwitchPrimitives.Root>
>(({clas sName,...props},ref)=>(
<SwitchPrimitives.Root
clas sName={cn(
"peerinline-flexh-6w-11shrink-0cursor-pointeritems-centerrounded-fullborder-2border-transparenttransition-colorsdata-[state=checked]:bg-primarydata-[state=unchecked]:bg-inputfocus-visible:outline-nonefocus-visible:ring-2focus-visible:ring-ringfocus-visible:ring-offset-2focus-visible:ring-offset-backgrounddisabled:cursor-not-alloweddisabled:opacity-50",
clas sName,
)}
{...props}
ref={ref}
>
<SwitchPrimitives.Thumb
clas sName={cn(
"pointer-events-noneblockh-5w-5rounded-fullbg-backgroundshadow-lgring-0transition-transformdata-[state=checked]:translate-x-5data-[state=unchecked]:translate-x-0",
)}
/>
</SwitchPrimitives.Root>
));
Switch.displayName=SwitchPrimitives.Root.displayName;

export{Switch};
