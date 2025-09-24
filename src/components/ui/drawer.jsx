import *as Reactfrom "react";
import { Draweras DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils";

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
>(({clas sName,...props},ref)=>(
<DrawerPrimitive.Overlayref={ref}clas sName={cn("fixedinset-0z-50bg-black/80",clas sName)}{...props}/>
));
DrawerOverlay.displayName=DrawerPrimitive.Overlay.displayName;

const DrawerContent=React.forwardRef<
React.ElementRef<typeofDrawerPrimitive.Content>,
React.ComponentPropsWithoutRef<typeofDrawerPrimitive.Content>
>(({clas sName,children,...props},ref)=>(
<DrawerPortal>
<DrawerOverlay/>
<DrawerPrimitive.Content
ref={ref}
clas sName={cn(
"fixedinset-x-0bottom-0z-50mt-24flexh-autoflex-colrounded-t-[10px]borderbg-background",
clas sName,
)}
{...props}
>
<divclas sName="mx-automt-4h-2w-[100px]rounded-fullbg-muted"/>
{children}
</DrawerPrimitive.Content>
</DrawerPortal>
));
DrawerContent.displayName="DrawerContent";

const DrawerHeader=({clas sName,...props}:React.HTMLAttributes<HTMLDivElement>)=>(
<divclas sName={cn("gridgap-1.5p-4text-centersm:text-left",clas sName)}{...props}/>
);
DrawerHeader.displayName="DrawerHeader";

const DrawerFooter=({clas sName,...props}:React.HTMLAttributes<HTMLDivElement>)=>(
<divclas sName={cn("mt-autoflexflex-colgap-2p-4",clas sName)}{...props}/>
);
DrawerFooter.displayName="DrawerFooter";

const DrawerTitle=React.forwardRef<
React.ElementRef<typeofDrawerPrimitive.Title>,
React.ComponentPropsWithoutRef<typeofDrawerPrimitive.Title>
>(({clas sName,...props},ref)=>(
<DrawerPrimitive.Title
ref={ref}
clas sName={cn("text-lgfont-semiboldleading-nonetracking-tight",clas sName)}
{...props}
/>
));
DrawerTitle.displayName=DrawerPrimitive.Title.displayName;

const DrawerDescription=React.forwardRef<
React.ElementRef<typeofDrawerPrimitive.Description>,
React.ComponentPropsWithoutRef<typeofDrawerPrimitive.Description>
>(({clas sName,...props},ref)=>(
<DrawerPrimitive.Descriptionref={ref}clas sName={cn("text-smtext-muted-foreground",clas sName)}{...props}/>
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
