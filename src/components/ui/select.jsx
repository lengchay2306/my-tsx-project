import *as Reactfrom "react";
import *as SelectPrimitivefrom "@radix-ui/react-select";
import { Check,ChevronDown,ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

const Select=SelectPrimitive.Root;

const SelectGroup=SelectPrimitive.Group;

const SelectValue=SelectPrimitive.Value;

const SelectTrigger=React.forwardRef<
React.ElementRef<typeofSelectPrimitive.Trigger>,
React.ComponentPropsWithoutRef<typeofSelectPrimitive.Trigger>
>(({clas sName,children,...props},ref)=>(
<SelectPrimitive.Trigger
ref={ref}
clas sName={cn(
"flexh-10w-fullitems-centerjustify-betweenrounded-mdborderborder-inputbg-backgroundpx-3py-2text-smring-offset-backgroundplaceholder:text-muted-foregroundfocus:outline-nonefocus:ring-2focus:ring-ringfocus:ring-offset-2disabled:cursor-not-alloweddisabled:opacity-50[&>span]:line-clamp-1",
clas sName,
)}
{...props}
>
{children}
<SelectPrimitive.Iconas Child>
<ChevronDownclas sName="h-4w-4opacity-50"/>
</SelectPrimitive.Icon>
</SelectPrimitive.Trigger>
));
SelectTrigger.displayName=SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton=React.forwardRef<
React.ElementRef<typeofSelectPrimitive.ScrollUpButton>,
React.ComponentPropsWithoutRef<typeofSelectPrimitive.ScrollUpButton>
>(({clas sName,...props},ref)=>(
<SelectPrimitive.ScrollUpButton
ref={ref}
clas sName={cn("flexcursor-defaultitems-centerjustify-centerpy-1",clas sName)}
{...props}
>
<ChevronUpclas sName="h-4w-4"/>
</SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName=SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton=React.forwardRef<
React.ElementRef<typeofSelectPrimitive.ScrollDownButton>,
React.ComponentPropsWithoutRef<typeofSelectPrimitive.ScrollDownButton>
>(({clas sName,...props},ref)=>(
<SelectPrimitive.ScrollDownButton
ref={ref}
clas sName={cn("flexcursor-defaultitems-centerjustify-centerpy-1",clas sName)}
{...props}
>
<ChevronDownclas sName="h-4w-4"/>
</SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName=SelectPrimitive.ScrollDownButton.displayName;

const SelectContent=React.forwardRef<
React.ElementRef<typeofSelectPrimitive.Content>,
React.ComponentPropsWithoutRef<typeofSelectPrimitive.Content>
>(({clas sName,children,position="popper",...props},ref)=>(
<SelectPrimitive.Portal>
<SelectPrimitive.Content
ref={ref}
clas sName={cn(
"relativez-50max-h-96min-w-[8rem]overflow-hiddenrounded-mdborderbg-popovertext-popover-foregroundshadow-mddata-[state=open]:animate-indata-[state=closed]:animate-outdata-[state=closed]:fade-out-0data-[state=open]:fade-in-0data-[state=closed]:zoom-out-95data-[state=open]:zoom-in-95data-[side=bottom]:slide-in-from-top-2data-[side=left]:slide-in-from-right-2data-[side=right]:slide-in-from-left-2data-[side=top]:slide-in-from-bottom-2",
position==="popper"&&
"data-[side=bottom]:translate-y-1data-[side=left]:-translate-x-1data-[side=right]:translate-x-1data-[side=top]:-translate-y-1",
clas sName,
)}
position={position}
{...props}
>
<SelectScrollUpButton/>
<SelectPrimitive.Viewport
clas sName={cn(
"p-1",
position==="popper"&&
"h-[var(--radix-select-trigger-height)]w-fullmin-w-[var(--radix-select-trigger-width)]",
)}
>
{children}
</SelectPrimitive.Viewport>
<SelectScrollDownButton/>
</SelectPrimitive.Content>
</SelectPrimitive.Portal>
));
SelectContent.displayName=SelectPrimitive.Content.displayName;

const SelectLabel=React.forwardRef<
React.ElementRef<typeofSelectPrimitive.Label>,
React.ComponentPropsWithoutRef<typeofSelectPrimitive.Label>
>(({clas sName,...props},ref)=>(
<SelectPrimitive.Labelref={ref}clas sName={cn("py-1.5pl-8pr-2text-smfont-semibold",clas sName)}{...props}/>
));
SelectLabel.displayName=SelectPrimitive.Label.displayName;

const SelectItem=React.forwardRef<
React.ElementRef<typeofSelectPrimitive.Item>,
React.ComponentPropsWithoutRef<typeofSelectPrimitive.Item>
>(({clas sName,children,...props},ref)=>(
<SelectPrimitive.Item
ref={ref}
clas sName={cn(
"relativeflexw-fullcursor-defaultselect-noneitems-centerrounded-smpy-1.5pl-8pr-2text-smoutline-nonedata-[disabled]:pointer-events-nonedata-[disabled]:opacity-50focus:bg-accentfocus:text-accent-foreground",
clas sName,
)}
{...props}
>
<spanclas sName="absoluteleft-2flexh-3.5w-3.5items-centerjustify-center">
<SelectPrimitive.ItemIndicator>
<Checkclas sName="h-4w-4"/>
</SelectPrimitive.ItemIndicator>
</span>

<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
</SelectPrimitive.Item>
));
SelectItem.displayName=SelectPrimitive.Item.displayName;

const SelectSeparator=React.forwardRef<
React.ElementRef<typeofSelectPrimitive.Separator>,
React.ComponentPropsWithoutRef<typeofSelectPrimitive.Separator>
>(({clas sName,...props},ref)=>(
<SelectPrimitive.Separatorref={ref}clas sName={cn("-mx-1my-1h-pxbg-muted",clas sName)}{...props}/>
));
SelectSeparator.displayName=SelectPrimitive.Separator.displayName;

export{
Select,
SelectGroup,
SelectValue,
SelectTrigger,
SelectContent,
SelectLabel,
SelectItem,
SelectSeparator,
SelectScrollUpButton,
SelectScrollDownButton,
};
