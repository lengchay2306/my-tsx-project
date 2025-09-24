import*asReactfrom"react";
import*asCheckboxPrimitivefrom"@radix-ui/react-checkbox";
import { Check } from"lucide-react";

import { cn } from"@/lib/utils";

const Checkbox=React.forwardRef<
React.ElementRef<typeofCheckboxPrimitive.Root>,
React.ComponentPropsWithoutRef<typeofCheckboxPrimitive.Root>
>(({className,...props},ref)=>(
<CheckboxPrimitive.Root
ref={ref}
className={cn(
"peerh-4w-4shrink-0rounded-smborderborder-primaryring-offset-backgrounddata-[state=checked]:bg-primarydata-[state=checked]:text-primary-foregroundfocus-visible:outline-nonefocus-visible:ring-2focus-visible:ring-ringfocus-visible:ring-offset-2disabled:cursor-not-alloweddisabled:opacity-50",
className,
)}
{...props}
>
<CheckboxPrimitive.IndicatorclassName={cn("flexitems-centerjustify-centertext-current")}>
<CheckclassName="h-4w-4"/>
</CheckboxPrimitive.Indicator>
</CheckboxPrimitive.Root>
));
Checkbox.displayName=CheckboxPrimitive.Root.displayName;

export{Checkbox};
