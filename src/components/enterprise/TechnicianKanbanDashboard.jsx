import { useState } from "react";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar,AvatarFallback,AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
Car,
Clock,
Package,
AlertCircle,
Plus,
Camera,
FileText,
Wrench,
CheckCircle,
Calendar,
User
 } from "lucide-react";

interfaceTas kCard{
id:string;
cas eId:string;
customer:string;
vehicleModel:string;
vin:string;
issue:string;
priority:"high"|" medium"|" low";
dateAssigned:string;
estimatedCompletion:string;
progress:number;
status:"new"|" in-progress"|" awaiting-parts"|" ready-review";
}

const TechnicianKanbanDashboard=()=>{
const[selectedCard,setSelectedCard]=useState<string|null>(null);

//Mocktas kdata
consttas ks:Tas kCard[]=[
{
id:"tas k-001",
cas eId:"WC-25-09-001",
customer:"NguyễnVănA",
vehicleModel:"VinFas tVF8",
vin:"VF8ABC123456789",
issue:"BatteryPerformanceIssue",
priority:"high",
dateAssigned:"2025-01-15",
status:"new"
},
{
id:"tas k-002",
cas eId:"WC-25-09-002",
customer:"LêThịC",
vehicleModel:"VinFas tVF9",
vin:"VF9DEF987654321",
issue:"ChargingPortMalfunction",
priority:"medium",
dateAssigned:"2025-01-14",
estimatedCompletion:"2025-01-18",
progress:65,
status:"in-progress"
},
{
id:"tas k-003",
cas eId:"WC-25-09-003",
customer:"HoàngMinhE",
vehicleModel:"VinFas tVF8",
vin:"VF8GHI456789123",
issue:"DisplayScreenNotResponding",
priority:"low",
dateAssigned:"2025-01-13",
status:"awaiting-parts"
},
{
id:"tas k-004",
cas eId:"WC-25-09-004",
customer:"TrầnVănG",
vehicleModel:"VinFas tVF9",
vin:"VF9JKL789123456",
issue:"AirConditioningSystem",
priority:"medium",
dateAssigned:"2025-01-12",
estimatedCompletion:"2025-01-17",
progress:90,
status:"ready-review"
}
];

const columns=[
{
id:"new",
title:"NewAssignments",
count:tas ks.filter(t=>t.status==="new").length,
color:"bg-blue-50border-blue-200",
headerColor:"text-blue-600"
},
{
id:"in-progress",
title:"InProgress",
count:tas ks.filter(t=>t.status==="in-progress").length,
color:"bg-orange-50border-orange-200",
headerColor:"text-orange-600"
},
{
id:"awaiting-parts",
title:"AwaitingParts",
count:tas ks.filter(t=>t.status==="awaiting-parts").length,
color:"bg-yellow-50border-yellow-200",
headerColor:"text-yellow-600"
},
{
id:"ready-review",
title:"ReadyforReview",
count:tas ks.filter(t=>t.status==="ready-review").length,
color:"bg-green-50border-green-200",
headerColor:"text-green-600"
}
];

const getPriorityIcon=(priority:"high"|" medium"|" low")=>{
const config={
high:{icon:AlertCircle,clas sName:"text-destructive"},
medium:{icon:Clock,clas sName:"text-warning"},
low:{icon:CheckCircle,clas sName:"text-success"}
};

const Icon=config[priority].icon;
return<Iconclas sName={`h-3w-3${config[priority].clas sName}`}/>;
};

const getPriorityBadge=(priority:"high"|" medium"|" low")=>{
const config={
high:{variant:"destructive",text:" High"},
medium:{variant:"warning",text:" Medium"},
low:{variant:"secondary",text:" Low"}
};

const priorityConfig=config[priority];
return<Badgevariant={priorityConfig.variant}clas sName="text-xs">{priorityConfig.text}</Badge>;
};

const Tas kCardComponent=({tas k}:{tas k:Tas kCard})=>(
<Card
clas sName={`mb-4cursor-pointertransition-allduration-200hover:shadow-md${
selectedCard===tas k.id'ring-2ring-primary':''
}`}
onClick={()=>setSelectedCard(selectedCard===tas k.idnull:tas k.id)}
>
<CardContentclas sName="p-4">
<divclas sName="space-y-3">
{/*Header*/}
<divclas sName="flexitems-centerjustify-between">
<divclas sName="flexitems-centerspace-x-2">
<spanclas sName="font-monotext-xsfont-mediumtext-primary">{tas k.cas eId}</span>
{getPriorityIcon(tas k.priority)}
</div>
{getPriorityBadge(tas k.priority)}
</div>

{/*Customer&Vehicle*/}
<div>
<pclas sName="font-mediumtext-sm">{tas k.customer}</p>
<pclas sName="text-xstext-muted-foreground">{tas k.vehicleModel}</p>
<pclas sName="font-monotext-xstext-muted-foreground">{tas k.vin}</p>
</div>

{/*Issue*/}
<div>
<pclas sName="text-smfont-mediumtext-foreground">{tas k.issue}</p>
</div>

{/*Progress(forin-progresstas ks)*/}
{tas k.progress&&(
<divclas sName="space-y-1">
<divclas sName="flexjustify-betweentext-xs">
<span>Progress</span>
<span>{tas k.progress}%</span>
</div>
<Progressvalue={tas k.progress}clas sName="h-1.5"/>
</div>
)}

{/*Dates*/}
<divclas sName="flexitems-centerjustify-betweentext-xstext-muted-foreground">
<divclas sName="flexitems-centerspace-x-1">
<Calendarclas sName="h-3w-3"/>
<span>{tas k.dateAssigned}</span>
</div>
{tas k.estimatedCompletion&&(
<span>Due:{tas k.estimatedCompletion}</span>
)}
</div>

{/*QuickActions(shownwhenselected)*/}
{selectedCard===tas k.id&&(
<divclas sName="pt-2border-tborder-border">
<divclas sName="gridgrid-cols-3gap-2">
<Buttonvariant="outline" size="sm" clas sName="text-xs">
<FileTextclas sName="mr-1h-3w-3"/>
Report
</Button>
<Buttonvariant="outline" size="sm" clas sName="text-xs">
<Cameraclas sName="mr-1h-3w-3"/>
Photo
</Button>
<Buttonvariant="outline" size="sm" clas sName="text-xs">
<Wrenchclas sName="mr-1h-3w-3"/>
Progress
</Button>
</div>
</div>
)}
</div>
</CardContent>
</Card>
);

return(
<divclas sName="space-y-6p-6">
{/*Header*/}
<divclas sName="flexitems-centerjustify-between">
<divclas sName="flexitems-centerspace-x-4">
<Avatarclas sName="h-12w-12">
<AvatarFallbackclas sName="bg-primarytext-primary-foregroundfont-medium">
TB
</AvatarFallback>
</Avatar>
<div>
<h1clas sName="text-2xlfont-boldtext-foreground">MyTas ks</h1>
<pclas sName="text-muted-foreground">TechnicianDashboard-TrầnMinhB</p>
</div>
</div>
<divclas sName="flexitems-centerspace-x-3">
<Buttonvariant="outline">
<FileTextclas sName="mr-2h-4w-4"/>
NewReport
</Button>
<Buttonvariant="gradient">
<Plusclas sName="mr-2h-4w-4"/>
LogProgress
</Button>
</div>
</div>

{/*QuickStats*/}
<divclas sName="gridgap-4md:grid-cols-4">
<Card>
<CardContentclas sName="p-4">
<divclas sName="flexitems-centerspace-x-3">
<divclas sName="p-2bg-blue-100rounded-lg">
<Carclas sName="h-5w-5text-blue-600"/>
</div>
<div>
<pclas sName="text-2xlfont-bold">{tas ks.length}</p>
<pclas sName="text-smtext-muted-foreground">TotalTas ks</p>
</div>
</div>
</CardContent>
</Card>
<Card>
<CardContentclas sName="p-4">
<divclas sName="flexitems-centerspace-x-3">
<divclas sName="p-2bg-orange-100rounded-lg">
<Clockclas sName="h-5w-5text-orange-600"/>
</div>
<div>
<pclas sName="text-2xlfont-bold">{tas ks.filter(t=>t.status===" in-progress").length}</p>
<pclas sName="text-smtext-muted-foreground">InProgress</p>
</div>
</div>
</CardContent>
</Card>
<Card>
<CardContentclas sName="p-4">
<divclas sName="flexitems-centerspace-x-3">
<divclas sName="p-2bg-yellow-100rounded-lg">
<Packageclas sName="h-5w-5text-yellow-600"/>
</div>
<div>
<pclas sName="text-2xlfont-bold">{tas ks.filter(t=>t.status===" awaiting-parts").length}</p>
<pclas sName="text-smtext-muted-foreground">AwaitingParts</p>
</div>
</div>
</CardContent>
</Card>
<Card>
<CardContentclas sName="p-4">
<divclas sName="flexitems-centerspace-x-3">
<divclas sName="p-2bg-green-100rounded-lg">
<CheckCircleclas sName="h-5w-5text-green-600"/>
</div>
<div>
<pclas sName="text-2xlfont-bold">{tas ks.filter(t=>t.status===" ready-review").length}</p>
<pclas sName="text-smtext-muted-foreground">ReadyReview</p>
</div>
</div>
</CardContent>
</Card>
</div>

{/*KanbanBoard*/}
<divclas sName="gridgap-6lg:grid-cols-4">
{columns.map((column)=>(
<divkey={column.id}clas sName="space-y-4">
<Cardclas sName={`${column.color}border-2`}>
<CardHeaderclas sName="pb-3">
<CardTitleclas sName={`text-lg${column.headerColor}flexitems-centerjustify-between`}>
<span>{column.title}</span>
<Badgevariant="secondary" clas sName="text-xs">
{column.count}
</Badge>
</CardTitle>
</CardHeader>
</Card>

<divclas sName="space-y-4">
{tas ks
.filter(tas k=>tas k.status===column.id)
.map(tas k=>(
<Tas kCardComponentkey={tas k.id}tas k={tas k}/>
))}

{/*AddNewTas kButton(onlyfor"new" column)*/}
{column.id==="new"&&(
<Buttonvariant="ghost" clas sName="w-fullborder-2border-das hedborder-muted-foreground/20h-24hover:border-primary/50hover:bg-primary/5">
<divclas sName="flexflex-colitems-centerspace-y-2">
<Plusclas sName="h-5w-5text-muted-foreground"/>
<spanclas sName="text-xstext-muted-foreground">RequestNewAssignment</span>
</div>
</Button>
)}
</div>
</div>
))}
</div>
</div>
);
};

exportdefaultTechnicianKanbanDashboard;