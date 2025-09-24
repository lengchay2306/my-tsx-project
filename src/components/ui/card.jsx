import*asReactfrom"react";

import { cn } from"@/lib/utils";

const Card=React.forwardRef<HTMLDivElement,React.HTMLAttributes<HTMLDivElement>>(({className,...props},ref)=>(
<divref={ref}className={cn("rounded-lgborderbg-cardtext-card-foregroundshadow-sm",className)}{...props}/>
));
Card.displayName="Card";

const CardHeader=React.forwardRef<HTMLDivElement,React.HTMLAttributes<HTMLDivElement>>(
({className,...props},ref)=>(
<divref={ref}className={cn("flexflex-colspace-y-1.5p-6",className)}{...props}/>
),
);
CardHeader.displayName="CardHeader";

const CardTitle=React.forwardRef<HTMLParagraphElement,React.HTMLAttributes<HTMLHeadingElement>>(
({className,...props},ref)=>(
<h3ref={ref}className={cn("text-2xlfont-semiboldleading-nonetracking-tight",className)}{...props}/>
),
);
CardTitle.displayName="CardTitle";

const CardDescription=React.forwardRef<HTMLParagraphElement,React.HTMLAttributes<HTMLParagraphElement>>(
({className,...props},ref)=>(
<pref={ref}className={cn("text-smtext-muted-foreground",className)}{...props}/>
),
);
CardDescription.displayName="CardDescription";

const CardContent=React.forwardRef<HTMLDivElement,React.HTMLAttributes<HTMLDivElement>>(
({className,...props},ref)=><divref={ref}className={cn("p-6pt-0",className)}{...props}/>,
);
CardContent.displayName="CardContent";

const CardFooter=React.forwardRef<HTMLDivElement,React.HTMLAttributes<HTMLDivElement>>(
({className,...props},ref)=>(
<divref={ref}className={cn("flexitems-centerp-6pt-0",className)}{...props}/>
),
);
CardFooter.displayName="CardFooter";

export{Card,CardHeader,CardFooter,CardTitle,CardDescription,CardContent};
