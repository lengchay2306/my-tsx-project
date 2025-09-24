import*asReactfrom"react";
import { ChevronLeft,ChevronRight,MoreHorizontal } from"lucide-react";

import { cn } from"@/lib/utils";
import { ButtonProps,buttonVariants } from"@/components/ui/button";

const Pagination=({className,...props}:React.ComponentProps<"nav">)=>(
<nav
role="navigation"
aria-label="pagination"
className={cn("mx-autoflexw-fulljustify-center",className)}
{...props}
/>
);
Pagination.displayName="Pagination";

const PaginationContent=React.forwardRef<HTMLUListElement,React.ComponentProps<"ul">>(
({className,...props},ref)=>(
<ulref={ref}className={cn("flexflex-rowitems-centergap-1",className)}{...props}/>
),
);
PaginationContent.displayName="PaginationContent";

const PaginationItem=React.forwardRef<HTMLLIElement,React.ComponentProps<"li">>(({className,...props},ref)=>(
<liref={ref}className={cn("",className)}{...props}/>
));
PaginationItem.displayName="PaginationItem";

typePaginationLinkProps={
isActive:boolean;
}&Pick<ButtonProps,"size">&
React.ComponentProps<"a">;

const PaginationLink=({className,isActive,size="icon",...props}:PaginationLinkProps)=>(
<a
aria-current={isActive"page":undefined}
className={cn(
buttonVariants({
variant:isActive"outline":"ghost",
size,
}),
className,
)}
{...props}
/>
);
PaginationLink.displayName="PaginationLink";

const PaginationPrevious=({className,...props}:React.ComponentProps<typeofPaginationLink>)=>(
<PaginationLinkaria-label="Gotopreviouspage"size="default"className={cn("gap-1pl-2.5",className)}{...props}>
<ChevronLeftclassName="h-4w-4"/>
<span>Previous</span>
</PaginationLink>
);
PaginationPrevious.displayName="PaginationPrevious";

const PaginationNext=({className,...props}:React.ComponentProps<typeofPaginationLink>)=>(
<PaginationLinkaria-label="Gotonextpage"size="default"className={cn("gap-1pr-2.5",className)}{...props}>
<span>Next</span>
<ChevronRightclassName="h-4w-4"/>
</PaginationLink>
);
PaginationNext.displayName="PaginationNext";

const PaginationEllipsis=({className,...props}:React.ComponentProps<"span">)=>(
<spanaria-hiddenclassName={cn("flexh-9w-9items-centerjustify-center",className)}{...props}>
<MoreHorizontalclassName="h-4w-4"/>
<spanclassName="sr-only">Morepages</span>
</span>
);
PaginationEllipsis.displayName="PaginationEllipsis";

export{
Pagination,
PaginationContent,
PaginationEllipsis,
PaginationItem,
PaginationLink,
PaginationNext,
PaginationPrevious,
};
