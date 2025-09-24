import*asReactfrom"react";
import*asContextMenuPrimitivefrom"@radix-ui/react-context-menu";
import { Check,ChevronRight,Circle } from"lucide-react";

import { cn } from"@/lib/utils";

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
>(({className,inset,children,...props},ref)=>(
<ContextMenuPrimitive.SubTrigger
ref={ref}
className={cn(
"flexcursor-defaultselect-noneitems-centerrounded-smpx-2py-1.5text-smoutline-nonedata-[state=open]:bg-accentdata-[state=open]:text-accent-foregroundfocus:bg-accentfocus:text-accent-foreground",
inset&&"pl-8",
className,
)}
{...props}
>
{children}
<ChevronRightclassName="ml-autoh-4w-4"/>
</ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName=ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent=React.forwardRef<
React.ElementRef<typeofContextMenuPrimitive.SubContent>,
React.ComponentPropsWithoutRef<typeofContextMenuPrimitive.SubContent>
>(({className,...props},ref)=>(
<ContextMenuPrimitive.SubContent
ref={ref}
className={cn(
"z-50min-w-[8rem]overflow-hiddenrounded-mdborderbg-popoverp-1text-popover-foregroundshadow-mddata-[state=open]:animate-indata-[state=closed]:animate-outdata-[state=closed]:fade-out-0data-[state=open]:fade-in-0data-[state=closed]:zoom-out-95data-[state=open]:zoom-in-95data-[side=bottom]:slide-in-from-top-2data-[side=left]:slide-in-from-right-2data-[side=right]:slide-in-from-left-2data-[side=top]:slide-in-from-bottom-2",
className,
)}
{...props}
/>
));
ContextMenuSubContent.displayName=ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent=React.forwardRef<
React.ElementRef<typeofContextMenuPrimitive.Content>,
React.ComponentPropsWithoutRef<typeofContextMenuPrimitive.Content>
>(({className,...props},ref)=>(
<ContextMenuPrimitive.Portal>
<ContextMenuPrimitive.Content
ref={ref}
className={cn(
"z-50min-w-[8rem]overflow-hiddenrounded-mdborderbg-popoverp-1text-popover-foregroundshadow-mdanimate-infade-in-80data-[state=open]:animate-indata-[state=closed]:animate-outdata-[state=closed]:fade-out-0data-[state=open]:fade-in-0data-[state=closed]:zoom-out-95data-[state=open]:zoom-in-95data-[side=bottom]:slide-in-from-top-2data-[side=left]:slide-in-from-right-2data-[side=right]:slide-in-from-left-2data-[side=top]:slide-in-from-bottom-2",
className,
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
>(({className,inset,...props},ref)=>(
<ContextMenuPrimitive.Item
ref={ref}
className={cn(
"relativeflexcursor-defaultselect-noneitems-centerrounded-smpx-2py-1.5text-smoutline-nonedata-[disabled]:pointer-events-nonedata-[disabled]:opacity-50focus:bg-accentfocus:text-accent-foreground",
inset&&"pl-8",
className,
)}
{...props}
/>
));
ContextMenuItem.displayName=ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem=React.forwardRef<
React.ElementRef<typeofContextMenuPrimitive.CheckboxItem>,
React.ComponentPropsWithoutRef<typeofContextMenuPrimitive.CheckboxItem>
>(({className,children,checked,...props},ref)=>(
<ContextMenuPrimitive.CheckboxItem
ref={ref}
className={cn(
"relativeflexcursor-defaultselect-noneitems-centerrounded-smpy-1.5pl-8pr-2text-smoutline-nonedata-[disabled]:pointer-events-nonedata-[disabled]:opacity-50focus:bg-accentfocus:text-accent-foreground",
className,
)}
checked={checked}
{...props}
>
<spanclassName="absoluteleft-2flexh-3.5w-3.5items-centerjustify-center">
<ContextMenuPrimitive.ItemIndicator>
<CheckclassName="h-4w-4"/>
</ContextMenuPrimitive.ItemIndicator>
</span>
{children}
</ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName=ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem=React.forwardRef<
React.ElementRef<typeofContextMenuPrimitive.RadioItem>,
React.ComponentPropsWithoutRef<typeofContextMenuPrimitive.RadioItem>
>(({className,children,...props},ref)=>(
<ContextMenuPrimitive.RadioItem
ref={ref}
className={cn(
"relativeflexcursor-defaultselect-noneitems-centerrounded-smpy-1.5pl-8pr-2text-smoutline-nonedata-[disabled]:pointer-events-nonedata-[disabled]:opacity-50focus:bg-accentfocus:text-accent-foreground",
className,
)}
{...props}
>
<spanclassName="absoluteleft-2flexh-3.5w-3.5items-centerjustify-center">
<ContextMenuPrimitive.ItemIndicator>
<CircleclassName="h-2w-2fill-current"/>
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
>(({className,inset,...props},ref)=>(
<ContextMenuPrimitive.Label
ref={ref}
className={cn("px-2py-1.5text-smfont-semiboldtext-foreground",inset&&"pl-8",className)}
{...props}
/>
));
ContextMenuLabel.displayName=ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator=React.forwardRef<
React.ElementRef<typeofContextMenuPrimitive.Separator>,
React.ComponentPropsWithoutRef<typeofContextMenuPrimitive.Separator>
>(({className,...props},ref)=>(
<ContextMenuPrimitive.Separatorref={ref}className={cn("-mx-1my-1h-pxbg-border",className)}{...props}/>
));
ContextMenuSeparator.displayName=ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut=({className,...props}:React.HTMLAttributes<HTMLSpanElement>)=>{
return<spanclassName={cn("ml-autotext-xstracking-widesttext-muted-foreground",className)}{...props}/>;
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
