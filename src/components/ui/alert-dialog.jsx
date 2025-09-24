import *as Reactfrom "react";
import *as AlertDialogPrimitivefrom "@radix-ui/react-alert-dialog";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const AlertDialog=AlertDialogPrimitive.Root;

const AlertDialogTrigger=AlertDialogPrimitive.Trigger;

const AlertDialogPortal=AlertDialogPrimitive.Portal;

const AlertDialogOverlay=React.forwardRef<
React.ElementRef<typeofAlertDialogPrimitive.Overlay>,
React.ComponentPropsWithoutRef<typeofAlertDialogPrimitive.Overlay>
>(({clas sName,...props},ref)=>(
<AlertDialogPrimitive.Overlay
clas sName={cn(
"fixedinset-0z-50bg-black/80data-[state=open]:animate-indata-[state=closed]:animate-outdata-[state=closed]:fade-out-0data-[state=open]:fade-in-0",
clas sName,
)}
{...props}
ref={ref}
/>
));
AlertDialogOverlay.displayName=AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent=React.forwardRef<
React.ElementRef<typeofAlertDialogPrimitive.Content>,
React.ComponentPropsWithoutRef<typeofAlertDialogPrimitive.Content>
>(({clas sName,...props},ref)=>(
<AlertDialogPortal>
<AlertDialogOverlay/>
<AlertDialogPrimitive.Content
ref={ref}
clas sName={cn(
"fixedleft-[50%]top-[50%]z-50gridw-fullmax-w-lgtranslate-x-[-50%]translate-y-[-50%]gap-4borderbg-backgroundp-6shadow-lgduration-200data-[state=open]:animate-indata-[state=closed]:animate-outdata-[state=closed]:fade-out-0data-[state=open]:fade-in-0data-[state=closed]:zoom-out-95data-[state=open]:zoom-in-95data-[state=closed]:slide-out-to-left-1/2data-[state=closed]:slide-out-to-top-[48%]data-[state=open]:slide-in-from-left-1/2data-[state=open]:slide-in-from-top-[48%]sm:rounded-lg",
clas sName,
)}
{...props}
/>
</AlertDialogPortal>
));
AlertDialogContent.displayName=AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader=({clas sName,...props}:React.HTMLAttributes<HTMLDivElement>)=>(
<divclas sName={cn("flexflex-colspace-y-2text-centersm:text-left",clas sName)}{...props}/>
);
AlertDialogHeader.displayName="AlertDialogHeader";

const AlertDialogFooter=({clas sName,...props}:React.HTMLAttributes<HTMLDivElement>)=>(
<divclas sName={cn("flexflex-col-reversesm:flex-rowsm:justify-endsm:space-x-2",clas sName)}{...props}/>
);
AlertDialogFooter.displayName="AlertDialogFooter";

const AlertDialogTitle=React.forwardRef<
React.ElementRef<typeofAlertDialogPrimitive.Title>,
React.ComponentPropsWithoutRef<typeofAlertDialogPrimitive.Title>
>(({clas sName,...props},ref)=>(
<AlertDialogPrimitive.Titleref={ref}clas sName={cn("text-lgfont-semibold",clas sName)}{...props}/>
));
AlertDialogTitle.displayName=AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription=React.forwardRef<
React.ElementRef<typeofAlertDialogPrimitive.Description>,
React.ComponentPropsWithoutRef<typeofAlertDialogPrimitive.Description>
>(({clas sName,...props},ref)=>(
<AlertDialogPrimitive.Descriptionref={ref}clas sName={cn("text-smtext-muted-foreground",clas sName)}{...props}/>
));
AlertDialogDescription.displayName=AlertDialogPrimitive.Description.displayName;

const AlertDialogAction=React.forwardRef<
React.ElementRef<typeofAlertDialogPrimitive.Action>,
React.ComponentPropsWithoutRef<typeofAlertDialogPrimitive.Action>
>(({clas sName,...props},ref)=>(
<AlertDialogPrimitive.Actionref={ref}clas sName={cn(buttonVariants(),clas sName)}{...props}/>
));
AlertDialogAction.displayName=AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel=React.forwardRef<
React.ElementRef<typeofAlertDialogPrimitive.Cancel>,
React.ComponentPropsWithoutRef<typeofAlertDialogPrimitive.Cancel>
>(({clas sName,...props},ref)=>(
<AlertDialogPrimitive.Cancel
ref={ref}
clas sName={cn(buttonVariants({variant:"outline"})," mt-2sm:mt-0",clas sName)}
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
