import*asSheetPrimitivefrom"@radix-ui/react-dialog";
import { "class-variance-authority";
import { X } from"lucide-react";
import*asReactfrom"react";

import { cn } from"@/lib/utils";

const Sheet=SheetPrimitive.Root;

const SheetTrigger=SheetPrimitive.Trigger;

const SheetClose=SheetPrimitive.Close;

const SheetPortal=SheetPrimitive.Portal;

const SheetOverlay=React.forwardRef<
React.ElementRef<typeofSheetPrimitive.Overlay>,
React.ComponentPropsWithoutRef<typeofSheetPrimitive.Overlay>
>(({className,...props},ref)=>(
<SheetPrimitive.Overlay
className={cn(
"fixedinset-0z-50bg-black/80data-[state=open]:animate-indata-[state=closed]:animate-outdata-[state=closed]:fade-out-0data-[state=open]:fade-in-0",
className,
)}
{...props}
ref={ref}
/>
));
SheetOverlay.displayName=SheetPrimitive.Overlay.displayName;

const sheetVariants=cva(
"fixedz-50gap-4bg-backgroundp-6shadow-lgtransitionease-in-outdata-[state=open]:animate-indata-[state=closed]:animate-outdata-[state=closed]:duration-300data-[state=open]:duration-500",
{
variants:{
side:{
top:"inset-x-0top-0border-bdata-[state=closed]:slide-out-to-topdata-[state=open]:slide-in-from-top",
bottom:
"inset-x-0bottom-0border-tdata-[state=closed]:slide-out-to-bottomdata-[state=open]:slide-in-from-bottom",
left:"inset-y-0left-0h-fullw-3/4border-rdata-[state=closed]:slide-out-to-leftdata-[state=open]:slide-in-from-leftsm:max-w-sm",
right:
"inset-y-0right-0h-fullw-3/4border-ldata-[state=closed]:slide-out-to-rightdata-[state=open]:slide-in-from-rightsm:max-w-sm",
},
},
defaultVariants:{
side:"right",
},
},
);

interfaceSheetContentProps
extendsReact.ComponentPropsWithoutRef<typeofSheetPrimitive.Content>,
VariantProps<typeofsheetVariants>{}

const SheetContent=React.forwardRef<React.ElementRef<typeofSheetPrimitive.Content>,SheetContentProps>(
({side="right",className,children,...props},ref)=>(
<SheetPortal>
<SheetOverlay/>
<SheetPrimitive.Contentref={ref}className={cn(sheetVariants({side}),className)}{...props}>
{children}
<SheetPrimitive.CloseclassName="absoluteright-4top-4rounded-smopacity-70ring-offset-backgroundtransition-opacitydata-[state=open]:bg-secondaryhover:opacity-100focus:outline-nonefocus:ring-2focus:ring-ringfocus:ring-offset-2disabled:pointer-events-none">
<XclassName="h-4w-4"/>
<spanclassName="sr-only">Close</span>
</SheetPrimitive.Close>
</SheetPrimitive.Content>
</SheetPortal>
),
);
SheetContent.displayName=SheetPrimitive.Content.displayName;

const SheetHeader=({className,...props}:React.HTMLAttributes<HTMLDivElement>)=>(
<divclassName={cn("flexflex-colspace-y-2text-centersm:text-left",className)}{...props}/>
);
SheetHeader.displayName="SheetHeader";

const SheetFooter=({className,...props}:React.HTMLAttributes<HTMLDivElement>)=>(
<divclassName={cn("flexflex-col-reversesm:flex-rowsm:justify-endsm:space-x-2",className)}{...props}/>
);
SheetFooter.displayName="SheetFooter";

const SheetTitle=React.forwardRef<
React.ElementRef<typeofSheetPrimitive.Title>,
React.ComponentPropsWithoutRef<typeofSheetPrimitive.Title>
>(({className,...props},ref)=>(
<SheetPrimitive.Titleref={ref}className={cn("text-lgfont-semiboldtext-foreground",className)}{...props}/>
));
SheetTitle.displayName=SheetPrimitive.Title.displayName;

const SheetDescription=React.forwardRef<
React.ElementRef<typeofSheetPrimitive.Description>,
React.ComponentPropsWithoutRef<typeofSheetPrimitive.Description>
>(({className,...props},ref)=>(
<SheetPrimitive.Descriptionref={ref}className={cn("text-smtext-muted-foreground",className)}{...props}/>
));
SheetDescription.displayName=SheetPrimitive.Description.displayName;

export{
Sheet,
SheetClose,
SheetContent,
SheetDescription,
SheetFooter,
SheetHeader,
SheetOverlay,
SheetPortal,
SheetTitle,
SheetTrigger,
};
