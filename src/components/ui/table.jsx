import*asReactfrom"react";

import { cn } from"@/lib/utils";

const Table=React.forwardRef<HTMLTableElement,React.HTMLAttributes<HTMLTableElement>>(
({className,...props},ref)=>(
<divclassName="relativew-fulloverflow-auto">
<tableref={ref}className={cn("w-fullcaption-bottomtext-sm",className)}{...props}/>
</div>
),
);
Table.displayName="Table";

const TableHeader=React.forwardRef<HTMLTableSectionElement,React.HTMLAttributes<HTMLTableSectionElement>>(
({className,...props},ref)=><theadref={ref}className={cn("[&_tr]:border-b",className)}{...props}/>,
);
TableHeader.displayName="TableHeader";

const TableBody=React.forwardRef<HTMLTableSectionElement,React.HTMLAttributes<HTMLTableSectionElement>>(
({className,...props},ref)=>(
<tbodyref={ref}className={cn("[&_tr:last-child]:border-0",className)}{...props}/>
),
);
TableBody.displayName="TableBody";

const TableFooter=React.forwardRef<HTMLTableSectionElement,React.HTMLAttributes<HTMLTableSectionElement>>(
({className,...props},ref)=>(
<tfootref={ref}className={cn("border-tbg-muted/50font-medium[&>tr]:last:border-b-0",className)}{...props}/>
),
);
TableFooter.displayName="TableFooter";

const TableRow=React.forwardRef<HTMLTableRowElement,React.HTMLAttributes<HTMLTableRowElement>>(
({className,...props},ref)=>(
<tr
ref={ref}
className={cn("border-btransition-colorsdata-[state=selected]:bg-mutedhover:bg-muted/50",className)}
{...props}
/>
),
);
TableRow.displayName="TableRow";

const TableHead=React.forwardRef<HTMLTableCellElement,React.ThHTMLAttributes<HTMLTableCellElement>>(
({className,...props},ref)=>(
<th
ref={ref}
className={cn(
"h-12px-4text-leftalign-middlefont-mediumtext-muted-foreground[&:has([role=checkbox])]:pr-0",
className,
)}
{...props}
/>
),
);
TableHead.displayName="TableHead";

const TableCell=React.forwardRef<HTMLTableCellElement,React.TdHTMLAttributes<HTMLTableCellElement>>(
({className,...props},ref)=>(
<tdref={ref}className={cn("p-4align-middle[&:has([role=checkbox])]:pr-0",className)}{...props}/>
),
);
TableCell.displayName="TableCell";

const TableCaption=React.forwardRef<HTMLTableCaptionElement,React.HTMLAttributes<HTMLTableCaptionElement>>(
({className,...props},ref)=>(
<captionref={ref}className={cn("mt-4text-smtext-muted-foreground",className)}{...props}/>
),
);
TableCaption.displayName="TableCaption";

export{Table,TableHeader,TableBody,TableFooter,TableHead,TableRow,TableCell,TableCaption};
