import *as Reactfrom "react";
import *as SliderPrimitivefrom "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider=React.forwardRef<
React.ElementRef<typeofSliderPrimitive.Root>,
React.ComponentPropsWithoutRef<typeofSliderPrimitive.Root>
>(({clas sName,...props},ref)=>(
<SliderPrimitive.Root
ref={ref}
clas sName={cn("relativeflexw-fulltouch-noneselect-noneitems-center",clas sName)}
{...props}
>
<SliderPrimitive.Trackclas sName="relativeh-2w-fullgrowoverflow-hiddenrounded-fullbg-secondary">
<SliderPrimitive.Rangeclas sName="absoluteh-fullbg-primary"/>
</SliderPrimitive.Track>
<SliderPrimitive.Thumbclas sName="blockh-5w-5rounded-fullborder-2border-primarybg-backgroundring-offset-backgroundtransition-colorsfocus-visible:outline-nonefocus-visible:ring-2focus-visible:ring-ringfocus-visible:ring-offset-2disabled:pointer-events-nonedisabled:opacity-50"/>
</SliderPrimitive.Root>
));
Slider.displayName=SliderPrimitive.Root.displayName;

export{Slider};
