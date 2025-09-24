import*asReactfrom"react";
import*asNavigationMenuPrimitivefrom"@radix-ui/react-navigation-menu";
import { cva } from"class-variance-authority";
import { ChevronDown } from"lucide-react";

import { cn } from"@/lib/utils";

const NavigationMenu=React.forwardRef<
React.ElementRef<typeofNavigationMenuPrimitive.Root>,
React.ComponentPropsWithoutRef<typeofNavigationMenuPrimitive.Root>
>(({className,children,...props},ref)=>(
<NavigationMenuPrimitive.Root
ref={ref}
className={cn("relativez-10flexmax-w-maxflex-1items-centerjustify-center",className)}
{...props}
>
{children}
<NavigationMenuViewport/>
</NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName=NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList=React.forwardRef<
React.ElementRef<typeofNavigationMenuPrimitive.List>,
React.ComponentPropsWithoutRef<typeofNavigationMenuPrimitive.List>
>(({className,...props},ref)=>(
<NavigationMenuPrimitive.List
ref={ref}
className={cn("groupflexflex-1list-noneitems-centerjustify-centerspace-x-1",className)}
{...props}
/>
));
NavigationMenuList.displayName=NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem=NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle=cva(
"groupinline-flexh-10w-maxitems-centerjustify-centerrounded-mdbg-backgroundpx-4py-2text-smfont-mediumtransition-colorshover:bg-accenthover:text-accent-foregroundfocus:bg-accentfocus:text-accent-foregroundfocus:outline-nonedisabled:pointer-events-nonedisabled:opacity-50data-[active]:bg-accent/50data-[state=open]:bg-accent/50",
);

const NavigationMenuTrigger=React.forwardRef<
React.ElementRef<typeofNavigationMenuPrimitive.Trigger>,
React.ComponentPropsWithoutRef<typeofNavigationMenuPrimitive.Trigger>
>(({className,children,...props},ref)=>(
<NavigationMenuPrimitive.Trigger
ref={ref}
className={cn(navigationMenuTriggerStyle(),"group",className)}
{...props}
>
{children}{""}
<ChevronDown
className="relativetop-[1px]ml-1h-3w-3transitionduration-200group-data-[state=open]:rotate-180"
aria-hidden="true"
/>
</NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName=NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent=React.forwardRef<
React.ElementRef<typeofNavigationMenuPrimitive.Content>,
React.ComponentPropsWithoutRef<typeofNavigationMenuPrimitive.Content>
>(({className,...props},ref)=>(
<NavigationMenuPrimitive.Content
ref={ref}
className={cn(
"left-0top-0w-fulldata-[motion^=from-]:animate-indata-[motion^=to-]:animate-outdata-[motion^=from-]:fade-indata-[motion^=to-]:fade-outdata-[motion=from-end]:slide-in-from-right-52data-[motion=from-start]:slide-in-from-left-52data-[motion=to-end]:slide-out-to-right-52data-[motion=to-start]:slide-out-to-left-52md:absolutemd:w-auto",
className,
)}
{...props}
/>
));
NavigationMenuContent.displayName=NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink=NavigationMenuPrimitive.Link;

const NavigationMenuViewport=React.forwardRef<
React.ElementRef<typeofNavigationMenuPrimitive.Viewport>,
React.ComponentPropsWithoutRef<typeofNavigationMenuPrimitive.Viewport>
>(({className,...props},ref)=>(
<divclassName={cn("absoluteleft-0top-fullflexjustify-center")}>
<NavigationMenuPrimitive.Viewport
className={cn(
"origin-top-centerrelativemt-1.5h-[var(--radix-navigation-menu-viewport-height)]w-fulloverflow-hiddenrounded-mdborderbg-popovertext-popover-foregroundshadow-lgdata-[state=open]:animate-indata-[state=closed]:animate-outdata-[state=closed]:zoom-out-95data-[state=open]:zoom-in-90md:w-[var(--radix-navigation-menu-viewport-width)]",
className,
)}
ref={ref}
{...props}
/>
</div>
));
NavigationMenuViewport.displayName=NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator=React.forwardRef<
React.ElementRef<typeofNavigationMenuPrimitive.Indicator>,
React.ComponentPropsWithoutRef<typeofNavigationMenuPrimitive.Indicator>
>(({className,...props},ref)=>(
<NavigationMenuPrimitive.Indicator
ref={ref}
className={cn(
"top-fullz-[1]flexh-1.5items-endjustify-centeroverflow-hiddendata-[state=visible]:animate-indata-[state=hidden]:animate-outdata-[state=hidden]:fade-outdata-[state=visible]:fade-in",
className,
)}
{...props}
>
<divclassName="relativetop-[60%]h-2w-2rotate-45rounded-tl-smbg-bordershadow-md"/>
</NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName=NavigationMenuPrimitive.Indicator.displayName;

export{
navigationMenuTriggerStyle,
NavigationMenu,
NavigationMenuList,
NavigationMenuItem,
NavigationMenuContent,
NavigationMenuTrigger,
NavigationMenuLink,
NavigationMenuIndicator,
NavigationMenuViewport,
};
