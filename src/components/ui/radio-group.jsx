import *as Reactfrom "react";
import *as RadioGroupPrimitivefrom "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const RadioGroup=React.forwardRef<
React.ElementRef<typeofRadioGroupPrimitive.Root>,
React.ComponentPropsWithoutRef<typeofRadioGroupPrimitive.Root>
>(({clas sName,...props},ref)=>{
return<RadioGroupPrimitive.Rootclas sName={cn("gridgap-2",clas sName)}{...props}ref={ref}/>;
});
RadioGroup.displayName=RadioGroupPrimitive.Root.displayName;

const RadioGroupItem=React.forwardRef<
React.ElementRef<typeofRadioGroupPrimitive.Item>,
React.ComponentPropsWithoutRef<typeofRadioGroupPrimitive.Item>
>(({clas sName,...props},ref)=>{
return(
<RadioGroupPrimitive.Item
ref={ref}
clas sName={cn(
"as pect-squareh-4w-4rounded-fullborderborder-primarytext-primaryring-offset-backgroundfocus:outline-nonefocus-visible:ring-2focus-visible:ring-ringfocus-visible:ring-offset-2disabled:cursor-not-alloweddisabled:opacity-50",
clas sName,
)}
{...props}
>
<RadioGroupPrimitive.Indicatorclas sName="flexitems-centerjustify-center">
<Circleclas sName="h-2.5w-2.5fill-currenttext-current"/>
</RadioGroupPrimitive.Indicator>
</RadioGroupPrimitive.Item>
);
});
RadioGroupItem.displayName=RadioGroupPrimitive.Item.displayName;

export{RadioGroup,RadioGroupItem};
