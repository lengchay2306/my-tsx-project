import*asReactfrom"react";
import { DrawerasDrawerPrimitive } from"vaul";

import { cn } from"@/lib/utils";

const Drawer=({shouldScaleBackground=true,...props}:React.ComponentProps<typeofDrawerPrimitive.Root>)=>(
<DrawerPrimitive.RootshouldScaleBackground={shouldScaleBackground}{...props}/>
);
Drawer.displayName="Drawer";

const DrawerTrigger=DrawerPrimitive.Trigger;

const DrawerPortal=DrawerPrimitive.Portal;

const DrawerClose=DrawerPrimitive.Close;

const DrawerOverlay=React.forwardRef<
React.ElementRef<typeofDrawerPrimitive.Overlay>,
React.ComponentPropsWithoutRef<typeofDrawerPrimitive.Overlay>
>(({className,...props},ref)=>(
<DrawerPrimitive.Overlayref={ref}className={cn("fixedinset-0z-50bg-black/80",className)}{...props}/>
));
DrawerOverlay.displayName=DrawerPrimitive.Overlay.displayName;

const DrawerContent=React.forwardRef<
React.ElementRef<typeofDrawerPrimitive.Content>,
React.ComponentPropsWithoutRef<typeofDrawerPrimitive.Content>
>(({className,children,...props},ref)=>(
<DrawerPortal>
<DrawerOverlay/>
<DrawerPrimitive.Content
ref={ref}
className={cn(
"fixedinset-x-0bottom-0z-50mt-24flexh-autoflex-colrounded-t-[10px]borderbg-background",
className,
)}
{...props}
>
<divclassName="mx-automt-4h-2w-[100px]rounded-fullbg-muted"/>
{children}
</DrawerPrimitive.Content>
</DrawerPortal>
));
DrawerContent.displayName="DrawerContent";

const DrawerHeader=({className,...props}:React.HTMLAttributes<HTMLDivElement>)=>(
<divclassName={cn("gridgap-1.5p-4text-centersm:text-left",className)}{...props}/>
);
DrawerHeader.displayName="DrawerHeader";

const DrawerFooter=({className,...props}:React.HTMLAttributes<HTMLDivElement>)=>(
<divclassName={cn("mt-autoflexflex-colgap-2p-4",className)}{...props}/>
);
DrawerFooter.displayName="DrawerFooter";

const DrawerTitle=React.forwardRef<
React.ElementRef<typeofDrawerPrimitive.Title>,
React.ComponentPropsWithoutRef<typeofDrawerPrimitive.Title>
>(({className,...props},ref)=>(
<DrawerPrimitive.Title
ref={ref}
className={cn("text-lgfont-semiboldleading-nonetracking-tight",className)}
{...props}
/>
));
DrawerTitle.displayName=DrawerPrimitive.Title.displayName;

const DrawerDescription=React.forwardRef<
React.ElementRef<typeofDrawerPrimitive.Description>,
React.ComponentPropsWithoutRef<typeofDrawerPrimitive.Description>
>(({className,...props},ref)=>(
<DrawerPrimitive.Descriptionref={ref}className={cn("text-smtext-muted-foreground",className)}{...props}/>
));
DrawerDescription.displayName=DrawerPrimitive.Description.displayName;

export{
Drawer,
DrawerPortal,
DrawerOverlay,
DrawerTrigger,
DrawerClose,
DrawerContent,
DrawerHeader,
DrawerFooter,
DrawerTitle,
DrawerDescription,
};
