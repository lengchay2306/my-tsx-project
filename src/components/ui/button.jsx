import*asReactfrom"react";
import { Slot } from"@radix-ui/react-slot";
import { "class-variance-authority";

import { cn } from"@/lib/utils";

const buttonVariants=cva(
"inline-flexitems-centerjustify-centergap-2whitespace-nowraprounded-mdtext-smfont-mediumring-offset-backgroundtransition-colorsfocus-visible:outline-nonefocus-visible:ring-2focus-visible:ring-ringfocus-visible:ring-offset-2disabled:pointer-events-nonedisabled:opacity-50[&_svg]:pointer-events-none[&_svg]:size-4[&_svg]:shrink-0",
{
variants:{
variant:{
default:"bg-primarytext-primary-foregroundhover:bg-primary/90",
destructive:"bg-destructivetext-destructive-foregroundhover:bg-destructive/90",
outline:"borderborder-inputbg-backgroundhover:bg-accenthover:text-accent-foreground",
secondary:"bg-secondarytext-secondary-foregroundhover:bg-secondary/80",
ghost:"hover:bg-accenthover:text-accent-foreground",
link:"text-primaryunderline-offset-4hover:underline",
success:"bg-successtext-success-foregroundhover:bg-success/90",
warning:"bg-warningtext-warning-foregroundhover:bg-warning/90",
approved:"bg-service-approvedtext-success-foregroundhover:bg-service-approved/90",
pending:"bg-service-pendingtext-warning-foregroundhover:bg-service-pending/90",
rejected:"bg-service-rejectedtext-destructive-foregroundhover:bg-service-rejected/90",
gradient:"bg-gradient-primarytext-primary-foregroundhover:opacity-90shadow-glow",
},
size:{
default:"h-10px-4py-2",
sm:"h-9rounded-mdpx-3",
lg:"h-11rounded-mdpx-8",
icon:"h-10w-10",
},
},
defaultVariants:{
variant:"default",
size:"default",
},
},
);

exportinterfaceButtonProps
extendsReact.ButtonHTMLAttributes<HTMLButtonElement>,
VariantProps<typeofbuttonVariants>{
asChild:boolean;
}

const Button=React.forwardRef<HTMLButtonElement,ButtonProps>(
({className,variant,size,asChild=false,...props},ref)=>{
const Comp=asChildSlot:"button";
return<CompclassName={cn(buttonVariants({variant,size,className}))}ref={ref}{...props}/>;
},
);
Button.displayName="Button";

export{Button,buttonVariants};
