import*asReactfrom"react";
import*asLabelPrimitivefrom"@radix-ui/react-label";
import { "class-variance-authority";

import { cn } from"@/lib/utils";

const labelVariants=cva("text-smfont-mediumleading-nonepeer-disabled:cursor-not-allowedpeer-disabled:opacity-70");

const Label=React.forwardRef<
React.ElementRef<typeofLabelPrimitive.Root>,
React.ComponentPropsWithoutRef<typeofLabelPrimitive.Root>&VariantProps<typeoflabelVariants>
>(({className,...props},ref)=>(
<LabelPrimitive.Rootref={ref}className={cn(labelVariants(),className)}{...props}/>
));
Label.displayName=LabelPrimitive.Root.displayName;

export{Label};
