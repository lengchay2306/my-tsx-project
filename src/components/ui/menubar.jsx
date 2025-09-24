import*asReactfrom"react";
import*asMenubarPrimitivefrom"@radix-ui/react-menubar";
import { Check,ChevronRight,Circle } from"lucide-react";

import { cn } from"@/lib/utils";

const MenubarMenu=MenubarPrimitive.Menu;

const MenubarGroup=MenubarPrimitive.Group;

const MenubarPortal=MenubarPrimitive.Portal;

const MenubarSub=MenubarPrimitive.Sub;

const MenubarRadioGroup=MenubarPrimitive.RadioGroup;

const Menubar=React.forwardRef<
React.ElementRef<typeofMenubarPrimitive.Root>,
React.ComponentPropsWithoutRef<typeofMenubarPrimitive.Root>
>(({className,...props},ref)=>(
<MenubarPrimitive.Root
ref={ref}
className={cn("flexh-10items-centerspace-x-1rounded-mdborderbg-backgroundp-1",className)}
{...props}
/>
));
Menubar.displayName=MenubarPrimitive.Root.displayName;

const MenubarTrigger=React.forwardRef<
React.ElementRef<typeofMenubarPrimitive.Trigger>,
React.ComponentPropsWithoutRef<typeofMenubarPrimitive.Trigger>
>(({className,...props},ref)=>(
<MenubarPrimitive.Trigger
ref={ref}
className={cn(
"flexcursor-defaultselect-noneitems-centerrounded-smpx-3py-1.5text-smfont-mediumoutline-nonedata-[state=open]:bg-accentdata-[state=open]:text-accent-foregroundfocus:bg-accentfocus:text-accent-foreground",
className,
)}
{...props}
/>
));
MenubarTrigger.displayName=MenubarPrimitive.Trigger.displayName;

const MenubarSubTrigger=React.forwardRef<
React.ElementRef<typeofMenubarPrimitive.SubTrigger>,
React.ComponentPropsWithoutRef<typeofMenubarPrimitive.SubTrigger>&{
inset:boolean;
}
>(({className,inset,children,...props},ref)=>(
<MenubarPrimitive.SubTrigger
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
</MenubarPrimitive.SubTrigger>
));
MenubarSubTrigger.displayName=MenubarPrimitive.SubTrigger.displayName;

const MenubarSubContent=React.forwardRef<
React.ElementRef<typeofMenubarPrimitive.SubContent>,
React.ComponentPropsWithoutRef<typeofMenubarPrimitive.SubContent>
>(({className,...props},ref)=>(
<MenubarPrimitive.SubContent
ref={ref}
className={cn(
"z-50min-w-[8rem]overflow-hiddenrounded-mdborderbg-popoverp-1text-popover-foregrounddata-[state=open]:animate-indata-[state=closed]:animate-outdata-[state=closed]:fade-out-0data-[state=open]:fade-in-0data-[state=closed]:zoom-out-95data-[state=open]:zoom-in-95data-[side=bottom]:slide-in-from-top-2data-[side=left]:slide-in-from-right-2data-[side=right]:slide-in-from-left-2data-[side=top]:slide-in-from-bottom-2",
className,
)}
{...props}
/>
));
MenubarSubContent.displayName=MenubarPrimitive.SubContent.displayName;

const MenubarContent=React.forwardRef<
React.ElementRef<typeofMenubarPrimitive.Content>,
React.ComponentPropsWithoutRef<typeofMenubarPrimitive.Content>
>(({className,align="start",alignOffset=-4,sideOffset=8,...props},ref)=>(
<MenubarPrimitive.Portal>
<MenubarPrimitive.Content
ref={ref}
align={align}
alignOffset={alignOffset}
sideOffset={sideOffset}
className={cn(
"z-50min-w-[12rem]overflow-hiddenrounded-mdborderbg-popoverp-1text-popover-foregroundshadow-mddata-[state=open]:animate-indata-[state=closed]:fade-out-0data-[state=open]:fade-in-0data-[state=closed]:zoom-out-95data-[state=open]:zoom-in-95data-[side=bottom]:slide-in-from-top-2data-[side=left]:slide-in-from-right-2data-[side=right]:slide-in-from-left-2data-[side=top]:slide-in-from-bottom-2",
className,
)}
{...props}
/>
</MenubarPrimitive.Portal>
));
MenubarContent.displayName=MenubarPrimitive.Content.displayName;

const MenubarItem=React.forwardRef<
React.ElementRef<typeofMenubarPrimitive.Item>,
React.ComponentPropsWithoutRef<typeofMenubarPrimitive.Item>&{
inset:boolean;
}
>(({className,inset,...props},ref)=>(
<MenubarPrimitive.Item
ref={ref}
className={cn(
"relativeflexcursor-defaultselect-noneitems-centerrounded-smpx-2py-1.5text-smoutline-nonedata-[disabled]:pointer-events-nonedata-[disabled]:opacity-50focus:bg-accentfocus:text-accent-foreground",
inset&&"pl-8",
className,
)}
{...props}
/>
));
MenubarItem.displayName=MenubarPrimitive.Item.displayName;

const MenubarCheckboxItem=React.forwardRef<
React.ElementRef<typeofMenubarPrimitive.CheckboxItem>,
React.ComponentPropsWithoutRef<typeofMenubarPrimitive.CheckboxItem>
>(({className,children,checked,...props},ref)=>(
<MenubarPrimitive.CheckboxItem
ref={ref}
className={cn(
"relativeflexcursor-defaultselect-noneitems-centerrounded-smpy-1.5pl-8pr-2text-smoutline-nonedata-[disabled]:pointer-events-nonedata-[disabled]:opacity-50focus:bg-accentfocus:text-accent-foreground",
className,
)}
checked={checked}
{...props}
>
<spanclassName="absoluteleft-2flexh-3.5w-3.5items-centerjustify-center">
<MenubarPrimitive.ItemIndicator>
<CheckclassName="h-4w-4"/>
</MenubarPrimitive.ItemIndicator>
</span>
{children}
</MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName=MenubarPrimitive.CheckboxItem.displayName;

const MenubarRadioItem=React.forwardRef<
React.ElementRef<typeofMenubarPrimitive.RadioItem>,
React.ComponentPropsWithoutRef<typeofMenubarPrimitive.RadioItem>
>(({className,children,...props},ref)=>(
<MenubarPrimitive.RadioItem
ref={ref}
className={cn(
"relativeflexcursor-defaultselect-noneitems-centerrounded-smpy-1.5pl-8pr-2text-smoutline-nonedata-[disabled]:pointer-events-nonedata-[disabled]:opacity-50focus:bg-accentfocus:text-accent-foreground",
className,
)}
{...props}
>
<spanclassName="absoluteleft-2flexh-3.5w-3.5items-centerjustify-center">
<MenubarPrimitive.ItemIndicator>
<CircleclassName="h-2w-2fill-current"/>
</MenubarPrimitive.ItemIndicator>
</span>
{children}
</MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName=MenubarPrimitive.RadioItem.displayName;

const MenubarLabel=React.forwardRef<
React.ElementRef<typeofMenubarPrimitive.Label>,
React.ComponentPropsWithoutRef<typeofMenubarPrimitive.Label>&{
inset:boolean;
}
>(({className,inset,...props},ref)=>(
<MenubarPrimitive.Label
ref={ref}
className={cn("px-2py-1.5text-smfont-semibold",inset&&"pl-8",className)}
{...props}
/>
));
MenubarLabel.displayName=MenubarPrimitive.Label.displayName;

const MenubarSeparator=React.forwardRef<
React.ElementRef<typeofMenubarPrimitive.Separator>,
React.ComponentPropsWithoutRef<typeofMenubarPrimitive.Separator>
>(({className,...props},ref)=>(
<MenubarPrimitive.Separatorref={ref}className={cn("-mx-1my-1h-pxbg-muted",className)}{...props}/>
));
MenubarSeparator.displayName=MenubarPrimitive.Separator.displayName;

const MenubarShortcut=({className,...props}:React.HTMLAttributes<HTMLSpanElement>)=>{
return<spanclassName={cn("ml-autotext-xstracking-widesttext-muted-foreground",className)}{...props}/>;
};
MenubarShortcut.displayname="MenubarShortcut";

export{
Menubar,
MenubarMenu,
MenubarTrigger,
MenubarContent,
MenubarItem,
MenubarSeparator,
MenubarLabel,
MenubarCheckboxItem,
MenubarRadioGroup,
MenubarRadioItem,
MenubarPortal,
MenubarSubContent,
MenubarSubTrigger,
MenubarGroup,
MenubarSub,
MenubarShortcut,
};
