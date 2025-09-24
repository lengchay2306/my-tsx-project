import*asReactfrom"react";
import*asSliderPrimitivefrom"@radix-ui/react-slider";

import { cn } from"@/lib/utils";

const Slider=React.forwardRef<
React.ElementRef<typeofSliderPrimitive.Root>,
React.ComponentPropsWithoutRef<typeofSliderPrimitive.Root>
>(({className,...props},ref)=>(
<SliderPrimitive.Root
ref={ref}
className={cn("relativeflexw-fulltouch-noneselect-noneitems-center",className)}
{...props}
>
<SliderPrimitive.TrackclassName="relativeh-2w-fullgrowoverflow-hiddenrounded-fullbg-secondary">
<SliderPrimitive.RangeclassName="absoluteh-fullbg-primary"/>
</SliderPrimitive.Track>
<SliderPrimitive.ThumbclassName="blockh-5w-5rounded-fullborder-2border-primarybg-backgroundring-offset-backgroundtransition-colorsfocus-visible:outline-nonefocus-visible:ring-2focus-visible:ring-ringfocus-visible:ring-offset-2disabled:pointer-events-nonedisabled:opacity-50"/>
</SliderPrimitive.Root>
));
Slider.displayName=SliderPrimitive.Root.displayName;

export{Slider};
