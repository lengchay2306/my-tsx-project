import*asReactfrom"react";
import*asRadioGroupPrimitivefrom"@radix-ui/react-radio-group";
import { Circle } from"lucide-react";

import { cn } from"@/lib/utils";

const RadioGroup=React.forwardRef<
React.ElementRef<typeofRadioGroupPrimitive.Root>,
React.ComponentPropsWithoutRef<typeofRadioGroupPrimitive.Root>
>(({className,...props},ref)=>{
return<RadioGroupPrimitive.RootclassName={cn("gridgap-2",className)}{...props}ref={ref}/>;
});
RadioGroup.displayName=RadioGroupPrimitive.Root.displayName;

const RadioGroupItem=React.forwardRef<
React.ElementRef<typeofRadioGroupPrimitive.Item>,
React.ComponentPropsWithoutRef<typeofRadioGroupPrimitive.Item>
>(({className,...props},ref)=>{
return(
<RadioGroupPrimitive.Item
ref={ref}
className={cn(
"aspect-squareh-4w-4rounded-fullborderborder-primarytext-primaryring-offset-backgroundfocus:outline-nonefocus-visible:ring-2focus-visible:ring-ringfocus-visible:ring-offset-2disabled:cursor-not-alloweddisabled:opacity-50",
className,
)}
{...props}
>
<RadioGroupPrimitive.IndicatorclassName="flexitems-centerjustify-center">
<CircleclassName="h-2.5w-2.5fill-currenttext-current"/>
</RadioGroupPrimitive.Indicator>
</RadioGroupPrimitive.Item>
);
});
RadioGroupItem.displayName=RadioGroupPrimitive.Item.displayName;

export{RadioGroup,RadioGroupItem};
