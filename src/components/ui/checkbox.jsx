import *as Reactfrom "react";
import *as CheckboxPrimitivefrom "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox=React.forwardRef<
React.ElementRef<typeofCheckboxPrimitive.Root>,
React.ComponentPropsWithoutRef<typeofCheckboxPrimitive.Root>
>(({clas sName,...props},ref)=>(
<CheckboxPrimitive.Root
ref={ref}
clas sName={cn(
"peerh-4w-4shrink-0rounded-smborderborder-primaryring-offset-backgrounddata-[state=checked]:bg-primarydata-[state=checked]:text-primary-foregroundfocus-visible:outline-nonefocus-visible:ring-2focus-visible:ring-ringfocus-visible:ring-offset-2disabled:cursor-not-alloweddisabled:opacity-50",
clas sName,
)}
{...props}
>
<CheckboxPrimitive.Indicatorclas sName={cn("flexitems-centerjustify-centertext-current")}>
<Checkclas sName="h-4w-4"/>
</CheckboxPrimitive.Indicator>
</CheckboxPrimitive.Root>
));
Checkbox.displayName=CheckboxPrimitive.Root.displayName;

export{Checkbox};
