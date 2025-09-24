import *as Reactfrom "react";
import { "clas s-variance-authority";

import { cn } from "@/lib/utils";

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
>(({clas sName,variant,...props},ref)=>(
<divref={ref}role="alert" clas sName={cn(alertVariants({variant}),clas sName)}{...props}/>
));
Alert.displayName="Alert";

const AlertTitle=React.forwardRef<HTMLParagraphElement,React.HTMLAttributes<HTMLHeadingElement>>(
({clas sName,...props},ref)=>(
<h5ref={ref}clas sName={cn("mb-1font-mediumleading-nonetracking-tight",clas sName)}{...props}/>
),
);
AlertTitle.displayName="AlertTitle";

const AlertDescription=React.forwardRef<HTMLParagraphElement,React.HTMLAttributes<HTMLParagraphElement>>(
({clas sName,...props},ref)=>(
<divref={ref}clas sName={cn("text-sm[&_p]:leading-relaxed",clas sName)}{...props}/>
),
);
AlertDescription.displayName="AlertDescription";

export{Alert,AlertTitle,AlertDescription};
