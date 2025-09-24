import*asReactfrom"react";

import { cn } from"@/lib/utils";

const Input=React.forwardRef<HTMLInputElement,React.ComponentProps<"input">>(
({className,type,...props},ref)=>{
return(
<input
type={type}
className={cn(
"flexh-10w-fullrounded-mdborderborder-inputbg-backgroundpx-3py-2text-basering-offset-backgroundfile:border-0file:bg-transparentfile:text-smfile:font-mediumfile:text-foregroundplaceholder:text-muted-foregroundfocus-visible:outline-nonefocus-visible:ring-2focus-visible:ring-ringfocus-visible:ring-offset-2disabled:cursor-not-alloweddisabled:opacity-50md:text-sm",
className,
)}
ref={ref}
{...props}
/>
);
},
);
Input.displayName="Input";

export{Input};
