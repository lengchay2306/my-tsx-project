import*asReactfrom"react";
import { "class-variance-authority";

import { cn } from"@/lib/utils";

const badgeVariants=cva(
"inline-flexitems-centerrounded-fullborderpx-2.5py-0.5text-xsfont-semiboldtransition-colorsfocus:outline-nonefocus:ring-2focus:ring-ringfocus:ring-offset-2",
{
variants:{
variant:{
default:"border-transparentbg-primarytext-primary-foregroundhover:bg-primary/80",
secondary:"border-transparentbg-secondarytext-secondary-foregroundhover:bg-secondary/80",
destructive:"border-transparentbg-destructivetext-destructive-foregroundhover:bg-destructive/80",
outline:"text-foreground",
success:"border-transparentbg-successtext-success-foregroundhover:bg-success/80",
warning:"border-transparentbg-warningtext-warning-foregroundhover:bg-warning/80",
approved:"border-transparentbg-service-approvedtext-success-foregroundhover:bg-service-approved/80",
pending:"border-transparentbg-service-pendingtext-warning-foregroundhover:bg-service-pending/80",
rejected:"border-transparentbg-service-rejectedtext-destructive-foregroundhover:bg-service-rejected/80",
},
},
defaultVariants:{
variant:"default",
},
},
);

exportinterfaceBadgePropsextendsReact.HTMLAttributes<HTMLDivElement>,VariantProps<typeofbadgeVariants>{}

functionBadge({className,variant,...props}:BadgeProps){
return<divclassName={cn(badgeVariants({variant}),className)}{...props}/>;
}

export{Badge,badgeVariants};
