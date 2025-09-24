import *as Reactfrom "react";

import { cn } from "@/lib/utils";

const Table=React.forwardRef<HTMLTableElement,React.HTMLAttributes<HTMLTableElement>>(
({clas sName,...props},ref)=>(
<divclas sName="relativew-fulloverflow-auto">
<tableref={ref}clas sName={cn("w-fullcaption-bottomtext-sm",clas sName)}{...props}/>
</div>
),
);
Table.displayName="Table";

const TableHeader=React.forwardRef<HTMLTableSectionElement,React.HTMLAttributes<HTMLTableSectionElement>>(
({clas sName,...props},ref)=><theadref={ref}clas sName={cn("[&_tr]:border-b",clas sName)}{...props}/>,
);
TableHeader.displayName="TableHeader";

const TableBody=React.forwardRef<HTMLTableSectionElement,React.HTMLAttributes<HTMLTableSectionElement>>(
({clas sName,...props},ref)=>(
<tbodyref={ref}clas sName={cn("[&_tr:las t-child]:border-0",clas sName)}{...props}/>
),
);
TableBody.displayName="TableBody";

const TableFooter=React.forwardRef<HTMLTableSectionElement,React.HTMLAttributes<HTMLTableSectionElement>>(
({clas sName,...props},ref)=>(
<tfootref={ref}clas sName={cn("border-tbg-muted/50font-medium[&>tr]:las t:border-b-0",clas sName)}{...props}/>
),
);
TableFooter.displayName="TableFooter";

const TableRow=React.forwardRef<HTMLTableRowElement,React.HTMLAttributes<HTMLTableRowElement>>(
({clas sName,...props},ref)=>(
<tr
ref={ref}
clas sName={cn("border-btransition-colorsdata-[state=selected]:bg-mutedhover:bg-muted/50",clas sName)}
{...props}
/>
),
);
TableRow.displayName="TableRow";

const TableHead=React.forwardRef<HTMLTableCellElement,React.ThHTMLAttributes<HTMLTableCellElement>>(
({clas sName,...props},ref)=>(
<th
ref={ref}
clas sName={cn(
"h-12px-4text-leftalign-middlefont-mediumtext-muted-foreground[&:has([role=checkbox])]:pr-0",
clas sName,
)}
{...props}
/>
),
);
TableHead.displayName="TableHead";

const TableCell=React.forwardRef<HTMLTableCellElement,React.TdHTMLAttributes<HTMLTableCellElement>>(
({clas sName,...props},ref)=>(
<tdref={ref}clas sName={cn("p-4align-middle[&:has([role=checkbox])]:pr-0",clas sName)}{...props}/>
),
);
TableCell.displayName="TableCell";

const TableCaption=React.forwardRef<HTMLTableCaptionElement,React.HTMLAttributes<HTMLTableCaptionElement>>(
({clas sName,...props},ref)=>(
<captionref={ref}clas sName={cn("mt-4text-smtext-muted-foreground",clas sName)}{...props}/>
),
);
TableCaption.displayName="TableCaption";

export{Table,TableHeader,TableBody,TableFooter,TableHead,TableRow,TableCell,TableCaption};
