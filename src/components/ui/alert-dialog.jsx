import*asReactfrom"react";
import*asAlertDialogPrimitivefrom"@radix-ui/react-alert-dialog";

import { cn } from"@/lib/utils";
import { buttonVariants } from"@/components/ui/button";

const AlertDialog=AlertDialogPrimitive.Root;

const AlertDialogTrigger=AlertDialogPrimitive.Trigger;

const AlertDialogPortal=AlertDialogPrimitive.Portal;

const AlertDialogOverlay=React.forwardRef<
React.ElementRef<typeofAlertDialogPrimitive.Overlay>,
React.ComponentPropsWithoutRef<typeofAlertDialogPrimitive.Overlay>
>(({className,...props},ref)=>(
<AlertDialogPrimitive.Overlay
className={cn(
"fixedinset-0z-50bg-black/80data-[state=open]:animate-indata-[state=closed]:animate-outdata-[state=closed]:fade-out-0data-[state=open]:fade-in-0",
className,
)}
{...props}
ref={ref}
/>
));
AlertDialogOverlay.displayName=AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent=React.forwardRef<
React.ElementRef<typeofAlertDialogPrimitive.Content>,
React.ComponentPropsWithoutRef<typeofAlertDialogPrimitive.Content>
>(({className,...props},ref)=>(
<AlertDialogPortal>
<AlertDialogOverlay/>
<AlertDialogPrimitive.Content
ref={ref}
className={cn(
"fixedleft-[50%]top-[50%]z-50gridw-fullmax-w-lgtranslate-x-[-50%]translate-y-[-50%]gap-4borderbg-backgroundp-6shadow-lgduration-200data-[state=open]:animate-indata-[state=closed]:animate-outdata-[state=closed]:fade-out-0data-[state=open]:fade-in-0data-[state=closed]:zoom-out-95data-[state=open]:zoom-in-95data-[state=closed]:slide-out-to-left-1/2data-[state=closed]:slide-out-to-top-[48%]data-[state=open]:slide-in-from-left-1/2data-[state=open]:slide-in-from-top-[48%]sm:rounded-lg",
className,
)}
{...props}
/>
</AlertDialogPortal>
));
AlertDialogContent.displayName=AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader=({className,...props}:React.HTMLAttributes<HTMLDivElement>)=>(
<divclassName={cn("flexflex-colspace-y-2text-centersm:text-left",className)}{...props}/>
);
AlertDialogHeader.displayName="AlertDialogHeader";

const AlertDialogFooter=({className,...props}:React.HTMLAttributes<HTMLDivElement>)=>(
<divclassName={cn("flexflex-col-reversesm:flex-rowsm:justify-endsm:space-x-2",className)}{...props}/>
);
AlertDialogFooter.displayName="AlertDialogFooter";

const AlertDialogTitle=React.forwardRef<
React.ElementRef<typeofAlertDialogPrimitive.Title>,
React.ComponentPropsWithoutRef<typeofAlertDialogPrimitive.Title>
>(({className,...props},ref)=>(
<AlertDialogPrimitive.Titleref={ref}className={cn("text-lgfont-semibold",className)}{...props}/>
));
AlertDialogTitle.displayName=AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription=React.forwardRef<
React.ElementRef<typeofAlertDialogPrimitive.Description>,
React.ComponentPropsWithoutRef<typeofAlertDialogPrimitive.Description>
>(({className,...props},ref)=>(
<AlertDialogPrimitive.Descriptionref={ref}className={cn("text-smtext-muted-foreground",className)}{...props}/>
));
AlertDialogDescription.displayName=AlertDialogPrimitive.Description.displayName;

const AlertDialogAction=React.forwardRef<
React.ElementRef<typeofAlertDialogPrimitive.Action>,
React.ComponentPropsWithoutRef<typeofAlertDialogPrimitive.Action>
>(({className,...props},ref)=>(
<AlertDialogPrimitive.Actionref={ref}className={cn(buttonVariants(),className)}{...props}/>
));
AlertDialogAction.displayName=AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel=React.forwardRef<
React.ElementRef<typeofAlertDialogPrimitive.Cancel>,
React.ComponentPropsWithoutRef<typeofAlertDialogPrimitive.Cancel>
>(({className,...props},ref)=>(
<AlertDialogPrimitive.Cancel
ref={ref}
className={cn(buttonVariants({variant:"outline"}),"mt-2sm:mt-0",className)}
{...props}
/>
));
AlertDialogCancel.displayName=AlertDialogPrimitive.Cancel.displayName;

export{
AlertDialog,
AlertDialogPortal,
AlertDialogOverlay,
AlertDialogTrigger,
AlertDialogContent,
AlertDialogHeader,
AlertDialogFooter,
AlertDialogTitle,
AlertDialogDescription,
AlertDialogAction,
AlertDialogCancel,
};
