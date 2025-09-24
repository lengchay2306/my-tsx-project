import *as Reactfrom "react";
import *as AccordionPrimitivefrom "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion=AccordionPrimitive.Root;

const AccordionItem=React.forwardRef<
React.ElementRef<typeofAccordionPrimitive.Item>,
React.ComponentPropsWithoutRef<typeofAccordionPrimitive.Item>
>(({clas sName,...props},ref)=>(
<AccordionPrimitive.Itemref={ref}clas sName={cn("border-b",clas sName)}{...props}/>
));
AccordionItem.displayName="AccordionItem";

const AccordionTrigger=React.forwardRef<
React.ElementRef<typeofAccordionPrimitive.Trigger>,
React.ComponentPropsWithoutRef<typeofAccordionPrimitive.Trigger>
>(({clas sName,children,...props},ref)=>(
<AccordionPrimitive.Headerclas sName="flex">
<AccordionPrimitive.Trigger
ref={ref}
clas sName={cn(
"flexflex-1items-centerjustify-betweenpy-4font-mediumtransition-allhover:underline[&[data-state=open]>svg]:rotate-180",
clas sName,
)}
{...props}
>
{children}
<ChevronDownclas sName="h-4w-4shrink-0transition-transformduration-200"/>
</AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>
));
AccordionTrigger.displayName=AccordionPrimitive.Trigger.displayName;

const AccordionContent=React.forwardRef<
React.ElementRef<typeofAccordionPrimitive.Content>,
React.ComponentPropsWithoutRef<typeofAccordionPrimitive.Content>
>(({clas sName,children,...props},ref)=>(
<AccordionPrimitive.Content
ref={ref}
clas sName="overflow-hiddentext-smtransition-alldata-[state=closed]:animate-accordion-updata-[state=open]:animate-accordion-down"
{...props}
>
<divclas sName={cn("pb-4pt-0",clas sName)}>{children}</div>
</AccordionPrimitive.Content>
));

AccordionContent.displayName=AccordionPrimitive.Content.displayName;

export{Accordion,AccordionItem,AccordionTrigger,AccordionContent};
