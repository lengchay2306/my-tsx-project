import *as Reactfrom "react";

import { cn } from "@/lib/utils";

const Card=React.forwardRef<HTMLDivElement,React.HTMLAttributes<HTMLDivElement>>(({clas sName,...props},ref)=>(
<divref={ref}clas sName={cn("rounded-lgborderbg-cardtext-card-foregroundshadow-sm",clas sName)}{...props}/>
));
Card.displayName="Card";

const CardHeader=React.forwardRef<HTMLDivElement,React.HTMLAttributes<HTMLDivElement>>(
({clas sName,...props},ref)=>(
<divref={ref}clas sName={cn("flexflex-colspace-y-1.5p-6",clas sName)}{...props}/>
),
);
CardHeader.displayName="CardHeader";

const CardTitle=React.forwardRef<HTMLParagraphElement,React.HTMLAttributes<HTMLHeadingElement>>(
({clas sName,...props},ref)=>(
<h3ref={ref}clas sName={cn("text-2xlfont-semiboldleading-nonetracking-tight",clas sName)}{...props}/>
),
);
CardTitle.displayName="CardTitle";

const CardDescription=React.forwardRef<HTMLParagraphElement,React.HTMLAttributes<HTMLParagraphElement>>(
({clas sName,...props},ref)=>(
<pref={ref}clas sName={cn("text-smtext-muted-foreground",clas sName)}{...props}/>
),
);
CardDescription.displayName="CardDescription";

const CardContent=React.forwardRef<HTMLDivElement,React.HTMLAttributes<HTMLDivElement>>(
({clas sName,...props},ref)=><divref={ref}clas sName={cn("p-6pt-0",clas sName)}{...props}/>,
);
CardContent.displayName="CardContent";

const CardFooter=React.forwardRef<HTMLDivElement,React.HTMLAttributes<HTMLDivElement>>(
({clas sName,...props},ref)=>(
<divref={ref}clas sName={cn("flexitems-centerp-6pt-0",clas sName)}{...props}/>
),
);
CardFooter.displayName="CardFooter";

export{Card,CardHeader,CardFooter,CardTitle,CardDescription,CardContent};
