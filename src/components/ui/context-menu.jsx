import *as Reactfrom "react";
import *as ContextMenuPrimitivefrom "@radix-ui/react-context-menu";
import { Check,ChevronRight,Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const ContextMenu=ContextMenuPrimitive.Root;

const ContextMenuTrigger=ContextMenuPrimitive.Trigger;

const ContextMenuGroup=ContextMenuPrimitive.Group;

const ContextMenuPortal=ContextMenuPrimitive.Portal;

const ContextMenuSub=ContextMenuPrimitive.Sub;

const ContextMenuRadioGroup=ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger=React.forwardRef<
React.ElementRef<typeofContextMenuPrimitive.SubTrigger>,
React.ComponentPropsWithoutRef<typeofContextMenuPrimitive.SubTrigger>&{
inset:boolean;
}
>(({clas sName,inset,children,...props},ref)=>(
<ContextMenuPrimitive.SubTrigger
ref={ref}
clas sName={cn(
"flexcursor-defaultselect-noneitems-centerrounded-smpx-2py-1.5text-smoutline-nonedata-[state=open]:bg-accentdata-[state=open]:text-accent-foregroundfocus:bg-accentfocus:text-accent-foreground",
inset&&"pl-8",
clas sName,
)}
{...props}
>
{children}
<ChevronRightclas sName="ml-autoh-4w-4"/>
</ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName=ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent=React.forwardRef<
React.ElementRef<typeofContextMenuPrimitive.SubContent>,
React.ComponentPropsWithoutRef<typeofContextMenuPrimitive.SubContent>
>(({clas sName,...props},ref)=>(
<ContextMenuPrimitive.SubContent
ref={ref}
clas sName={cn(
"z-50min-w-[8rem]overflow-hiddenrounded-mdborderbg-popoverp-1text-popover-foregroundshadow-mddata-[state=open]:animate-indata-[state=closed]:animate-outdata-[state=closed]:fade-out-0data-[state=open]:fade-in-0data-[state=closed]:zoom-out-95data-[state=open]:zoom-in-95data-[side=bottom]:slide-in-from-top-2data-[side=left]:slide-in-from-right-2data-[side=right]:slide-in-from-left-2data-[side=top]:slide-in-from-bottom-2",
clas sName,
)}
{...props}
/>
));
ContextMenuSubContent.displayName=ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent=React.forwardRef<
React.ElementRef<typeofContextMenuPrimitive.Content>,
React.ComponentPropsWithoutRef<typeofContextMenuPrimitive.Content>
>(({clas sName,...props},ref)=>(
<ContextMenuPrimitive.Portal>
<ContextMenuPrimitive.Content
ref={ref}
clas sName={cn(
"z-50min-w-[8rem]overflow-hiddenrounded-mdborderbg-popoverp-1text-popover-foregroundshadow-mdanimate-infade-in-80data-[state=open]:animate-indata-[state=closed]:animate-outdata-[state=closed]:fade-out-0data-[state=open]:fade-in-0data-[state=closed]:zoom-out-95data-[state=open]:zoom-in-95data-[side=bottom]:slide-in-from-top-2data-[side=left]:slide-in-from-right-2data-[side=right]:slide-in-from-left-2data-[side=top]:slide-in-from-bottom-2",
clas sName,
)}
{...props}
/>
</ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName=ContextMenuPrimitive.Content.displayName;

const ContextMenuItem=React.forwardRef<
React.ElementRef<typeofContextMenuPrimitive.Item>,
React.ComponentPropsWithoutRef<typeofContextMenuPrimitive.Item>&{
inset:boolean;
}
>(({clas sName,inset,...props},ref)=>(
<ContextMenuPrimitive.Item
ref={ref}
clas sName={cn(
"relativeflexcursor-defaultselect-noneitems-centerrounded-smpx-2py-1.5text-smoutline-nonedata-[disabled]:pointer-events-nonedata-[disabled]:opacity-50focus:bg-accentfocus:text-accent-foreground",
inset&&"pl-8",
clas sName,
)}
{...props}
/>
));
ContextMenuItem.displayName=ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem=React.forwardRef<
React.ElementRef<typeofContextMenuPrimitive.CheckboxItem>,
React.ComponentPropsWithoutRef<typeofContextMenuPrimitive.CheckboxItem>
>(({clas sName,children,checked,...props},ref)=>(
<ContextMenuPrimitive.CheckboxItem
ref={ref}
clas sName={cn(
"relativeflexcursor-defaultselect-noneitems-centerrounded-smpy-1.5pl-8pr-2text-smoutline-nonedata-[disabled]:pointer-events-nonedata-[disabled]:opacity-50focus:bg-accentfocus:text-accent-foreground",
clas sName,
)}
checked={checked}
{...props}
>
<spanclas sName="absoluteleft-2flexh-3.5w-3.5items-centerjustify-center">
<ContextMenuPrimitive.ItemIndicator>
<Checkclas sName="h-4w-4"/>
</ContextMenuPrimitive.ItemIndicator>
</span>
{children}
</ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName=ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem=React.forwardRef<
React.ElementRef<typeofContextMenuPrimitive.RadioItem>,
React.ComponentPropsWithoutRef<typeofContextMenuPrimitive.RadioItem>
>(({clas sName,children,...props},ref)=>(
<ContextMenuPrimitive.RadioItem
ref={ref}
clas sName={cn(
"relativeflexcursor-defaultselect-noneitems-centerrounded-smpy-1.5pl-8pr-2text-smoutline-nonedata-[disabled]:pointer-events-nonedata-[disabled]:opacity-50focus:bg-accentfocus:text-accent-foreground",
clas sName,
)}
{...props}
>
<spanclas sName="absoluteleft-2flexh-3.5w-3.5items-centerjustify-center">
<ContextMenuPrimitive.ItemIndicator>
<Circleclas sName="h-2w-2fill-current"/>
</ContextMenuPrimitive.ItemIndicator>
</span>
{children}
</ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName=ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel=React.forwardRef<
React.ElementRef<typeofContextMenuPrimitive.Label>,
React.ComponentPropsWithoutRef<typeofContextMenuPrimitive.Label>&{
inset:boolean;
}
>(({clas sName,inset,...props},ref)=>(
<ContextMenuPrimitive.Label
ref={ref}
clas sName={cn("px-2py-1.5text-smfont-semiboldtext-foreground",inset&&" pl-8",clas sName)}
{...props}
/>
));
ContextMenuLabel.displayName=ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator=React.forwardRef<
React.ElementRef<typeofContextMenuPrimitive.Separator>,
React.ComponentPropsWithoutRef<typeofContextMenuPrimitive.Separator>
>(({clas sName,...props},ref)=>(
<ContextMenuPrimitive.Separatorref={ref}clas sName={cn("-mx-1my-1h-pxbg-border",clas sName)}{...props}/>
));
ContextMenuSeparator.displayName=ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut=({clas sName,...props}:React.HTMLAttributes<HTMLSpanElement>)=>{
return<spanclas sName={cn("ml-autotext-xstracking-widesttext-muted-foreground",clas sName)}{...props}/>;
};
ContextMenuShortcut.displayName="ContextMenuShortcut";

export{
ContextMenu,
ContextMenuTrigger,
ContextMenuContent,
ContextMenuItem,
ContextMenuCheckboxItem,
ContextMenuRadioItem,
ContextMenuLabel,
ContextMenuSeparator,
ContextMenuShortcut,
ContextMenuGroup,
ContextMenuPortal,
ContextMenuSub,
ContextMenuSubContent,
ContextMenuSubTrigger,
ContextMenuRadioGroup,
};
