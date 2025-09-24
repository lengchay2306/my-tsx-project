import *as Reactfrom "react";
import *as LabelPrimitivefrom "@radix-ui/react-label";
import { "clas s-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants=cva("text-smfont-mediumleading-nonepeer-disabled:cursor-not-allowedpeer-disabled:opacity-70");

const Label=React.forwardRef<
React.ElementRef<typeofLabelPrimitive.Root>,
React.ComponentPropsWithoutRef<typeofLabelPrimitive.Root>&VariantProps<typeoflabelVariants>
>(({clas sName,...props},ref)=>(
<LabelPrimitive.Rootref={ref}clas sName={cn(labelVariants(),clas sName)}{...props}/>
));
Label.displayName=LabelPrimitive.Root.displayName;

export{Label};
