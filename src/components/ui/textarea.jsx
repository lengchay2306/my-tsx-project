import*asReactfrom"react";

import { cn } from"@/lib/utils";

exportinterfaceTextareaPropsextendsReact.TextareaHTMLAttributes<HTMLTextAreaElement>{}

const Textarea=React.forwardRef<HTMLTextAreaElement,TextareaProps>(({className,...props},ref)=>{
return(
<textarea
className={cn(
"flexmin-h-[80px]w-fullrounded-mdborderborder-inputbg-backgroundpx-3py-2text-smring-offset-backgroundplaceholder:text-muted-foregroundfocus-visible:outline-nonefocus-visible:ring-2focus-visible:ring-ringfocus-visible:ring-offset-2disabled:cursor-not-alloweddisabled:opacity-50",
className,
)}
ref={ref}
{...props}
/>
);
});
Textarea.displayName="Textarea";

export{Textarea};
