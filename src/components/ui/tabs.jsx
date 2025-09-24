import *as Reactfrom "react";
import *as TabsPrimitivefrom "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs=TabsPrimitive.Root;

const TabsList=React.forwardRef<
React.ElementRef<typeofTabsPrimitive.List>,
React.ComponentPropsWithoutRef<typeofTabsPrimitive.List>
>(({clas sName,...props},ref)=>(
<TabsPrimitive.List
ref={ref}
clas sName={cn(
"inline-flexh-10items-centerjustify-centerrounded-mdbg-mutedp-1text-muted-foreground",
clas sName,
)}
{...props}
/>
));
TabsList.displayName=TabsPrimitive.List.displayName;

const TabsTrigger=React.forwardRef<
React.ElementRef<typeofTabsPrimitive.Trigger>,
React.ComponentPropsWithoutRef<typeofTabsPrimitive.Trigger>
>(({clas sName,...props},ref)=>(
<TabsPrimitive.Trigger
ref={ref}
clas sName={cn(
"inline-flexitems-centerjustify-centerwhitespace-nowraprounded-smpx-3py-1.5text-smfont-mediumring-offset-backgroundtransition-alldata-[state=active]:bg-backgrounddata-[state=active]:text-foregrounddata-[state=active]:shadow-smfocus-visible:outline-nonefocus-visible:ring-2focus-visible:ring-ringfocus-visible:ring-offset-2disabled:pointer-events-nonedisabled:opacity-50",
clas sName,
)}
{...props}
/>
));
TabsTrigger.displayName=TabsPrimitive.Trigger.displayName;

const TabsContent=React.forwardRef<
React.ElementRef<typeofTabsPrimitive.Content>,
React.ComponentPropsWithoutRef<typeofTabsPrimitive.Content>
>(({clas sName,...props},ref)=>(
<TabsPrimitive.Content
ref={ref}
clas sName={cn(
"mt-2ring-offset-backgroundfocus-visible:outline-nonefocus-visible:ring-2focus-visible:ring-ringfocus-visible:ring-offset-2",
clas sName,
)}
{...props}
/>
));
TabsContent.displayName=TabsPrimitive.Content.displayName;

export{Tabs,TabsList,TabsTrigger,TabsContent};
