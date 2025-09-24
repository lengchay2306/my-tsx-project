import*asReactfrom"react";
import { "class-variance-authority";

import { cn } from"@/lib/utils";

const alertVariants=cva(
"relativew-fullrounded-lgborderp-4[&>svg~*]:pl-7[&>svg+div]:translate-y-[-3px][&>svg]:absolute[&>svg]:left-4[&>svg]:top-4[&>svg]:text-foreground",
{
variants:{
variant:{
default:"bg-backgroundtext-foreground",
destructive:"border-destructive/50text-destructivedark:border-destructive[&>svg]:text-destructive",
},
},
defaultVariants:{
variant:"default",
},
},
);

const Alert=React.forwardRef<
HTMLDivElement,
React.HTMLAttributes<HTMLDivElement>&VariantProps<typeofalertVariants>
>(({className,variant,...props},ref)=>(
<divref={ref}role="alert"className={cn(alertVariants({variant}),className)}{...props}/>
));
Alert.displayName="Alert";

const AlertTitle=React.forwardRef<HTMLParagraphElement,React.HTMLAttributes<HTMLHeadingElement>>(
({className,...props},ref)=>(
<h5ref={ref}className={cn("mb-1font-mediumleading-nonetracking-tight",className)}{...props}/>
),
);
AlertTitle.displayName="AlertTitle";

const AlertDescription=React.forwardRef<HTMLParagraphElement,React.HTMLAttributes<HTMLParagraphElement>>(
({className,...props},ref)=>(
<divref={ref}className={cn("text-sm[&_p]:leading-relaxed",className)}{...props}/>
),
);
AlertDescription.displayName="AlertDescription";

export{Alert,AlertTitle,AlertDescription};
