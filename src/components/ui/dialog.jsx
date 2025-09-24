import*asReactfrom"react";
import*asDialogPrimitivefrom"@radix-ui/react-dialog";
import { X } from"lucide-react";

import { cn } from"@/lib/utils";

const Dialog=DialogPrimitive.Root;

const DialogTrigger=DialogPrimitive.Trigger;

const DialogPortal=DialogPrimitive.Portal;

const DialogClose=DialogPrimitive.Close;

const DialogOverlay=React.forwardRef<
React.ElementRef<typeofDialogPrimitive.Overlay>,
React.ComponentPropsWithoutRef<typeofDialogPrimitive.Overlay>
>(({className,...props},ref)=>(
<DialogPrimitive.Overlay
ref={ref}
className={cn(
"fixedinset-0z-50bg-black/80data-[state=open]:animate-indata-[state=closed]:animate-outdata-[state=closed]:fade-out-0data-[state=open]:fade-in-0",
className,
)}
{...props}
/>
));
DialogOverlay.displayName=DialogPrimitive.Overlay.displayName;

const DialogContent=React.forwardRef<
React.ElementRef<typeofDialogPrimitive.Content>,
React.ComponentPropsWithoutRef<typeofDialogPrimitive.Content>
>(({className,children,...props},ref)=>(
<DialogPortal>
<DialogOverlay/>
<DialogPrimitive.Content
ref={ref}
className={cn(
"fixedleft-[50%]top-[50%]z-50gridw-fullmax-w-lgtranslate-x-[-50%]translate-y-[-50%]gap-4borderbg-backgroundp-6shadow-lgduration-200data-[state=open]:animate-indata-[state=closed]:animate-outdata-[state=closed]:fade-out-0data-[state=open]:fade-in-0data-[state=closed]:zoom-out-95data-[state=open]:zoom-in-95data-[state=closed]:slide-out-to-left-1/2data-[state=closed]:slide-out-to-top-[48%]data-[state=open]:slide-in-from-left-1/2data-[state=open]:slide-in-from-top-[48%]sm:rounded-lg",
className,
)}
{...props}
>
{children}
<DialogPrimitive.CloseclassName="absoluteright-4top-4rounded-smopacity-70ring-offset-backgroundtransition-opacitydata-[state=open]:bg-accentdata-[state=open]:text-muted-foregroundhover:opacity-100focus:outline-nonefocus:ring-2focus:ring-ringfocus:ring-offset-2disabled:pointer-events-none">
<XclassName="h-4w-4"/>
<spanclassName="sr-only">Close</span>
</DialogPrimitive.Close>
</DialogPrimitive.Content>
</DialogPortal>
));
DialogContent.displayName=DialogPrimitive.Content.displayName;

const DialogHeader=({className,...props}:React.HTMLAttributes<HTMLDivElement>)=>(
<divclassName={cn("flexflex-colspace-y-1.5text-centersm:text-left",className)}{...props}/>
);
DialogHeader.displayName="DialogHeader";

const DialogFooter=({className,...props}:React.HTMLAttributes<HTMLDivElement>)=>(
<divclassName={cn("flexflex-col-reversesm:flex-rowsm:justify-endsm:space-x-2",className)}{...props}/>
);
DialogFooter.displayName="DialogFooter";

const DialogTitle=React.forwardRef<
React.ElementRef<typeofDialogPrimitive.Title>,
React.ComponentPropsWithoutRef<typeofDialogPrimitive.Title>
>(({className,...props},ref)=>(
<DialogPrimitive.Title
ref={ref}
className={cn("text-lgfont-semiboldleading-nonetracking-tight",className)}
{...props}
/>
));
DialogTitle.displayName=DialogPrimitive.Title.displayName;

const DialogDescription=React.forwardRef<
React.ElementRef<typeofDialogPrimitive.Description>,
React.ComponentPropsWithoutRef<typeofDialogPrimitive.Description>
>(({className,...props},ref)=>(
<DialogPrimitive.Descriptionref={ref}className={cn("text-smtext-muted-foreground",className)}{...props}/>
));
DialogDescription.displayName=DialogPrimitive.Description.displayName;

export{
Dialog,
DialogPortal,
DialogOverlay,
DialogClose,
DialogTrigger,
DialogContent,
DialogHeader,
DialogFooter,
DialogTitle,
DialogDescription,
};
