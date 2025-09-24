import*asReactfrom"react";
import*asTogglePrimitivefrom"@radix-ui/react-toggle";
import { "class-variance-authority";

import { cn } from"@/lib/utils";

const toggleVariants=cva(
"inline-flexitems-centerjustify-centerrounded-mdtext-smfont-mediumring-offset-backgroundtransition-colorshover:bg-mutedhover:text-muted-foregroundfocus-visible:outline-nonefocus-visible:ring-2focus-visible:ring-ringfocus-visible:ring-offset-2disabled:pointer-events-nonedisabled:opacity-50data-[state=on]:bg-accentdata-[state=on]:text-accent-foreground",
{
variants:{
variant:{
default:"bg-transparent",
outline:"borderborder-inputbg-transparenthover:bg-accenthover:text-accent-foreground",
},
size:{
default:"h-10px-3",
sm:"h-9px-2.5",
lg:"h-11px-5",
},
},
defaultVariants:{
variant:"default",
size:"default",
},
},
);

const Toggle=React.forwardRef<
React.ElementRef<typeofTogglePrimitive.Root>,
React.ComponentPropsWithoutRef<typeofTogglePrimitive.Root>&VariantProps<typeoftoggleVariants>
>(({className,variant,size,...props},ref)=>(
<TogglePrimitive.Rootref={ref}className={cn(toggleVariants({variant,size,className}))}{...props}/>
));

Toggle.displayName=TogglePrimitive.Root.displayName;

export{Toggle,toggleVariants};
