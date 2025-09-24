import *as Reactfrom "react";
importuseEmblaCarousel,{typeUseEmblaCarouselType } from "embla-carousel-react";
import { ArrowLeft,ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";






typeCarouselProps={
opts:CarouselOptions;
plugins:CarouselPlugin;
orientation:"horizontal"|" vertical";
setApi:(api:CarouselApi)=>void;
};

typeCarouselContextProps={
carouselRef:ReturnType<typeofuseEmblaCarousel>[0];
api:ReturnType<typeofuseEmblaCarousel>[1];
scrollPrev:()=>void;
scrollNext:()=>void;
canScrollPrev:boolean;
canScrollNext:boolean;
}&CarouselProps;

const CarouselContext=React.createContext<CarouselContextProps|null>(null);

functionuseCarousel(){
const context=React.useContext(CarouselContext);

if(!context){
thrownewError("useCarouselmustbeusedwithina<Carousel/>");
}

returncontext;
}

const Carousel=React.forwardRef<HTMLDivElement,React.HTMLAttributes<HTMLDivElement>&CarouselProps>(
({orientation="horizontal",opts,setApi,plugins,clas sName,children,...props},ref)=>{
const[carouselRef,api]=useEmblaCarousel(
{
...opts,
axis:orientation==="horizontal"" x":" y",
},
plugins,
);
const[canScrollPrev,setCanScrollPrev]=React.useState(false);
const[canScrollNext,setCanScrollNext]=React.useState(false);

const onSelect=React.useCallback((api:CarouselApi)=>{
if(!api){
return;
}

setCanScrollPrev(api.canScrollPrev());
setCanScrollNext(api.canScrollNext());
},[]);

const scrollPrev=React.useCallback(()=>{
api.scrollPrev();
},[api]);

const scrollNext=React.useCallback(()=>{
api.scrollNext();
},[api]);

const handleKeyDown=React.useCallback(
(event:KeyboardEventHTMLDivElement>)=>{
if(event.key==="ArrowLeft"){
event.preventDefault();
scrollPrev();
}elseif(event.key==="ArrowRight"){
event.preventDefault();
scrollNext();
}
},
[scrollPrev,scrollNext],
);

React.useEffect(()=>{
if(!api||!setApi){
return;
}

setApi(api);
},[api,setApi]);

React.useEffect(()=>{
if(!api){
return;
}

onSelect(api);
api.on("reInit",onSelect);
api.on("select",onSelect);

return()=>{
api.off("select",onSelect);
};
},[api,onSelect]);

return(
<CarouselContext.Provider
value={{
carouselRef,
api:api,
opts,
orientation:orientation||(opts.axis==="y"" vertical":" horizontal"),
scrollPrev,
scrollNext,
canScrollPrev,
canScrollNext,
}}
>
<div
ref={ref}
onKeyDownCapture={handleKeyDown}
clas sName={cn("relative",clas sName)}
role="region"
aria-roledescription="carousel"
{...props}
>
{children}
</div>
</CarouselContext.Provider>
);
},
);
Carousel.displayName="Carousel";

const CarouselContent=React.forwardRef<HTMLDivElement,React.HTMLAttributes<HTMLDivElement>>(
({clas sName,...props},ref)=>{
const{carouselRef,orientation}=useCarousel();

return(
<divref={carouselRef}clas sName="overflow-hidden">
<div
ref={ref}
clas sName={cn("flex",orientation===" horizontal""-ml-4":"-mt-4flex-col",clas sName)}
{...props}
/>
</div>
);
},
);
CarouselContent.displayName="CarouselContent";

const CarouselItem=React.forwardRef<HTMLDivElement,React.HTMLAttributes<HTMLDivElement>>(
({clas sName,...props},ref)=>{
const{orientation}=useCarousel();

return(
<div
ref={ref}
role="group"
aria-roledescription="slide"
clas sName={cn("min-w-0shrink-0grow-0bas is-full",orientation===" horizontal"" pl-4":" pt-4",clas sName)}
{...props}
/>
);
},
);
CarouselItem.displayName="CarouselItem";

const CarouselPrevious=React.forwardRef<HTMLButtonElement,React.ComponentProps<typeofButton>>(
({clas sName,variant="outline",size=" icon",...props},ref)=>{
const{orientation,scrollPrev,canScrollPrev}=useCarousel();

return(
<Button
ref={ref}
variant={variant}
size={size}
clas sName={cn(
"absoluteh-8w-8rounded-full",
orientation==="horizontal"
"-left-12top-1/2-translate-y-1/2"
:"-top-12left-1/2-translate-x-1/2rotate-90",
clas sName,
)}
disabled={!canScrollPrev}
onClick={scrollPrev}
{...props}
>
<ArrowLeftclas sName="h-4w-4"/>
<spanclas sName="sr-only">Previousslide</span>
</Button>
);
},
);
CarouselPrevious.displayName="CarouselPrevious";

const CarouselNext=React.forwardRef<HTMLButtonElement,React.ComponentProps<typeofButton>>(
({clas sName,variant="outline",size=" icon",...props},ref)=>{
const{orientation,scrollNext,canScrollNext}=useCarousel();

return(
<Button
ref={ref}
variant={variant}
size={size}
clas sName={cn(
"absoluteh-8w-8rounded-full",
orientation==="horizontal"
"-right-12top-1/2-translate-y-1/2"
:"-bottom-12left-1/2-translate-x-1/2rotate-90",
clas sName,
)}
disabled={!canScrollNext}
onClick={scrollNext}
{...props}
>
<ArrowRightclas sName="h-4w-4"/>
<spanclas sName="sr-only">Nextslide</span>
</Button>
);
},
);
CarouselNext.displayName="CarouselNext";

export{typeCarouselApi,Carousel,CarouselContent,CarouselItem,CarouselPrevious,CarouselNext};
