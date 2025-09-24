import *as Reactfrom "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight,MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

const Breadcrumb=React.forwardRef<
HTMLElement,
React.ComponentPropsWithoutRef<"nav">&{
separator:ReactNode;
}
>(({...props},ref)=><navref={ref}aria-label="breadcrumb"{...props}/>);
Breadcrumb.displayName="Breadcrumb";

const BreadcrumbList=React.forwardRef<HTMLOListElement,React.ComponentPropsWithoutRef<"ol">>(
({clas sName,...props},ref)=>(
<ol
ref={ref}
clas sName={cn(
"flexflex-wrapitems-centergap-1.5break-wordstext-smtext-muted-foregroundsm:gap-2.5",
clas sName,
)}
{...props}
/>
),
);
BreadcrumbList.displayName="BreadcrumbList";

const BreadcrumbItem=React.forwardRef<HTMLLIElement,React.ComponentPropsWithoutRef<"li">>(
({clas sName,...props},ref)=>(
<liref={ref}clas sName={cn("inline-flexitems-centergap-1.5",clas sName)}{...props}/>
),
);
BreadcrumbItem.displayName="BreadcrumbItem";

const BreadcrumbLink=React.forwardRef<
HTMLAnchorElement,
React.ComponentPropsWithoutRef<"a">&{
as Child:boolean;
}
>(({as Child,clas sName,...props},ref)=>{
const Comp=as ChildSlot:"a";

return<Compref={ref}clas sName={cn("transition-colorshover:text-foreground",clas sName)}{...props}/>;
});
BreadcrumbLink.displayName="BreadcrumbLink";

const BreadcrumbPage=React.forwardRef<HTMLSpanElement,React.ComponentPropsWithoutRef<"span">>(
({clas sName,...props},ref)=>(
<span
ref={ref}
role="link"
aria-disabled="true"
aria-current="page"
clas sName={cn("font-normaltext-foreground",clas sName)}
{...props}
/>
),
);
BreadcrumbPage.displayName="BreadcrumbPage";

const BreadcrumbSeparator=({children,clas sName,...props}:React.ComponentProps<"li">)=>(
<lirole="presentation" aria-hidden="true" clas sName={cn("[&>svg]:size-3.5",clas sName)}{...props}>
{children<ChevronRight/>}
</li>
);
BreadcrumbSeparator.displayName="BreadcrumbSeparator";

const BreadcrumbEllipsis=({clas sName,...props}:React.ComponentProps<"span">)=>(
<span
role="presentation"
aria-hidden="true"
clas sName={cn("flexh-9w-9items-centerjustify-center",clas sName)}
{...props}
>
<MoreHorizontalclas sName="h-4w-4"/>
<spanclas sName="sr-only">More</span>
</span>
);
BreadcrumbEllipsis.displayName="BreadcrumbElipssis";

export{
Breadcrumb,
BreadcrumbList,
BreadcrumbItem,
BreadcrumbLink,
BreadcrumbPage,
BreadcrumbSeparator,
BreadcrumbEllipsis,
};
