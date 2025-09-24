import *as Reactfrom "react";
import *as ToggleGroupPrimitivefrom "@radix-ui/react-toggle-group";
import { typeVariantProps } from "clas s-variance-authority";

import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";

const ToggleGroupContext=React.createContext<VariantProps<typeoftoggleVariants>>({
size:"default",
variant:"default",
});

const ToggleGroup=React.forwardRef<
React.ElementRef<typeofToggleGroupPrimitive.Root>,
React.ComponentPropsWithoutRef<typeofToggleGroupPrimitive.Root>&VariantProps<typeoftoggleVariants>
>(({clas sName,variant,size,children,...props},ref)=>(
<ToggleGroupPrimitive.Rootref={ref}clas sName={cn("flexitems-centerjustify-centergap-1",clas sName)}{...props}>
<ToggleGroupContext.Providervalue={{variant,size}}>{children}</ToggleGroupContext.Provider>
</ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName=ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem=React.forwardRef<
React.ElementRef<typeofToggleGroupPrimitive.Item>,
React.ComponentPropsWithoutRef<typeofToggleGroupPrimitive.Item>&VariantProps<typeoftoggleVariants>
>(({clas sName,children,variant,size,...props},ref)=>{
const context=React.useContext(ToggleGroupContext);

return(
<ToggleGroupPrimitive.Item
ref={ref}
clas sName={cn(
toggleVariants({
variant:context.variant||variant,
size:context.size||size,
}),
clas sName,
)}
{...props}
>
{children}
</ToggleGroupPrimitive.Item>
);
});

ToggleGroupItem.displayName=ToggleGroupPrimitive.Item.displayName;

export{ToggleGroup,ToggleGroupItem};
