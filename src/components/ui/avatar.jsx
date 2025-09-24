import *as Reactfrom "react";
import *as AvatarPrimitivefrom "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

const Avatar=React.forwardRef<
React.ElementRef<typeofAvatarPrimitive.Root>,
React.ComponentPropsWithoutRef<typeofAvatarPrimitive.Root>
>(({clas sName,...props},ref)=>(
<AvatarPrimitive.Root
ref={ref}
clas sName={cn("relativeflexh-10w-10shrink-0overflow-hiddenrounded-full",clas sName)}
{...props}
/>
));
Avatar.displayName=AvatarPrimitive.Root.displayName;

const AvatarImage=React.forwardRef<
React.ElementRef<typeofAvatarPrimitive.Image>,
React.ComponentPropsWithoutRef<typeofAvatarPrimitive.Image>
>(({clas sName,...props},ref)=>(
<AvatarPrimitive.Imageref={ref}clas sName={cn("as pect-squareh-fullw-full",clas sName)}{...props}/>
));
AvatarImage.displayName=AvatarPrimitive.Image.displayName;

const AvatarFallback=React.forwardRef<
React.ElementRef<typeofAvatarPrimitive.Fallback>,
React.ComponentPropsWithoutRef<typeofAvatarPrimitive.Fallback>
>(({clas sName,...props},ref)=>(
<AvatarPrimitive.Fallback
ref={ref}
clas sName={cn("flexh-fullw-fullitems-centerjustify-centerrounded-fullbg-muted",clas sName)}
{...props}
/>
));
AvatarFallback.displayName=AvatarPrimitive.Fallback.displayName;

export{Avatar,AvatarImage,AvatarFallback};
