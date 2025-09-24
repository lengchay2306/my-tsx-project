import *as Reactfrom "react";
import *as DropdownMenuPrimitivefrom "@radix-ui/react-dropdown-menu";
import { Check,ChevronRight,Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const DropdownMenu=DropdownMenuPrimitive.Root;

const DropdownMenuTrigger=DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup=DropdownMenuPrimitive.Group;

const DropdownMenuPortal=DropdownMenuPrimitive.Portal;

const DropdownMenuSub=DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup=DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger=React.forwardRef<
React.ElementRef<typeofDropdownMenuPrimitive.SubTrigger>,
React.ComponentPropsWithoutRef<typeofDropdownMenuPrimitive.SubTrigger>&{
inset:boolean;
}
>(({clas sName,inset,children,...props},ref)=>(
<DropdownMenuPrimitive.SubTrigger
ref={ref}
clas sName={cn(
"flexcursor-defaultselect-noneitems-centerrounded-smpx-2py-1.5text-smoutline-nonedata-[state=open]:bg-accentfocus:bg-accent",
inset&&"pl-8",
clas sName,
)}
{...props}
>
{children}
<ChevronRightclas sName="ml-autoh-4w-4"/>
</DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName=DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent=React.forwardRef<
React.ElementRef<typeofDropdownMenuPrimitive.SubContent>,
React.ComponentPropsWithoutRef<typeofDropdownMenuPrimitive.SubContent>
>(({clas sName,...props},ref)=>(
<DropdownMenuPrimitive.SubContent
ref={ref}
clas sName={cn(
"z-50min-w-[8rem]overflow-hiddenrounded-mdborderbg-popoverp-1text-popover-foregroundshadow-lgdata-[state=open]:animate-indata-[state=closed]:animate-outdata-[state=closed]:fade-out-0data-[state=open]:fade-in-0data-[state=closed]:zoom-out-95data-[state=open]:zoom-in-95data-[side=bottom]:slide-in-from-top-2data-[side=left]:slide-in-from-right-2data-[side=right]:slide-in-from-left-2data-[side=top]:slide-in-from-bottom-2",
clas sName,
)}
{...props}
/>
));
DropdownMenuSubContent.displayName=DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent=React.forwardRef<
React.ElementRef<typeofDropdownMenuPrimitive.Content>,
React.ComponentPropsWithoutRef<typeofDropdownMenuPrimitive.Content>
>(({clas sName,sideOffset=4,...props},ref)=>(
<DropdownMenuPrimitive.Portal>
<DropdownMenuPrimitive.Content
ref={ref}
sideOffset={sideOffset}
clas sName={cn(
"z-50min-w-[8rem]overflow-hiddenrounded-mdborderbg-popoverp-1text-popover-foregroundshadow-mddata-[state=open]:animate-indata-[state=closed]:animate-outdata-[state=closed]:fade-out-0data-[state=open]:fade-in-0data-[state=closed]:zoom-out-95data-[state=open]:zoom-in-95data-[side=bottom]:slide-in-from-top-2data-[side=left]:slide-in-from-right-2data-[side=right]:slide-in-from-left-2data-[side=top]:slide-in-from-bottom-2",
clas sName,
)}
{...props}
/>
</DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName=DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem=React.forwardRef<
React.ElementRef<typeofDropdownMenuPrimitive.Item>,
React.ComponentPropsWithoutRef<typeofDropdownMenuPrimitive.Item>&{
inset:boolean;
}
>(({clas sName,inset,...props},ref)=>(
<DropdownMenuPrimitive.Item
ref={ref}
clas sName={cn(
"relativeflexcursor-defaultselect-noneitems-centerrounded-smpx-2py-1.5text-smoutline-nonetransition-colorsdata-[disabled]:pointer-events-nonedata-[disabled]:opacity-50focus:bg-accentfocus:text-accent-foreground",
inset&&"pl-8",
clas sName,
)}
{...props}
/>
));
DropdownMenuItem.displayName=DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem=React.forwardRef<
React.ElementRef<typeofDropdownMenuPrimitive.CheckboxItem>,
React.ComponentPropsWithoutRef<typeofDropdownMenuPrimitive.CheckboxItem>
>(({clas sName,children,checked,...props},ref)=>(
<DropdownMenuPrimitive.CheckboxItem
ref={ref}
clas sName={cn(
"relativeflexcursor-defaultselect-noneitems-centerrounded-smpy-1.5pl-8pr-2text-smoutline-nonetransition-colorsdata-[disabled]:pointer-events-nonedata-[disabled]:opacity-50focus:bg-accentfocus:text-accent-foreground",
clas sName,
)}
checked={checked}
{...props}
>
<spanclas sName="absoluteleft-2flexh-3.5w-3.5items-centerjustify-center">
<DropdownMenuPrimitive.ItemIndicator>
<Checkclas sName="h-4w-4"/>
</DropdownMenuPrimitive.ItemIndicator>
</span>
{children}
</DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName=DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem=React.forwardRef<
React.ElementRef<typeofDropdownMenuPrimitive.RadioItem>,
React.ComponentPropsWithoutRef<typeofDropdownMenuPrimitive.RadioItem>
>(({clas sName,children,...props},ref)=>(
<DropdownMenuPrimitive.RadioItem
ref={ref}
clas sName={cn(
"relativeflexcursor-defaultselect-noneitems-centerrounded-smpy-1.5pl-8pr-2text-smoutline-nonetransition-colorsdata-[disabled]:pointer-events-nonedata-[disabled]:opacity-50focus:bg-accentfocus:text-accent-foreground",
clas sName,
)}
{...props}
>
<spanclas sName="absoluteleft-2flexh-3.5w-3.5items-centerjustify-center">
<DropdownMenuPrimitive.ItemIndicator>
<Circleclas sName="h-2w-2fill-current"/>
</DropdownMenuPrimitive.ItemIndicator>
</span>
{children}
</DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName=DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel=React.forwardRef<
React.ElementRef<typeofDropdownMenuPrimitive.Label>,
React.ComponentPropsWithoutRef<typeofDropdownMenuPrimitive.Label>&{
inset:boolean;
}
>(({clas sName,inset,...props},ref)=>(
<DropdownMenuPrimitive.Label
ref={ref}
clas sName={cn("px-2py-1.5text-smfont-semibold",inset&&" pl-8",clas sName)}
{...props}
/>
));
DropdownMenuLabel.displayName=DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator=React.forwardRef<
React.ElementRef<typeofDropdownMenuPrimitive.Separator>,
React.ComponentPropsWithoutRef<typeofDropdownMenuPrimitive.Separator>
>(({clas sName,...props},ref)=>(
<DropdownMenuPrimitive.Separatorref={ref}clas sName={cn("-mx-1my-1h-pxbg-muted",clas sName)}{...props}/>
));
DropdownMenuSeparator.displayName=DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut=({clas sName,...props}:React.HTMLAttributes<HTMLSpanElement>)=>{
return<spanclas sName={cn("ml-autotext-xstracking-widestopacity-60",clas sName)}{...props}/>;
};
DropdownMenuShortcut.displayName="DropdownMenuShortcut";

export{
DropdownMenu,
DropdownMenuTrigger,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuCheckboxItem,
DropdownMenuRadioItem,
DropdownMenuLabel,
DropdownMenuSeparator,
DropdownMenuShortcut,
DropdownMenuGroup,
DropdownMenuPortal,
DropdownMenuSub,
DropdownMenuSubContent,
DropdownMenuSubTrigger,
DropdownMenuRadioGroup,
};
