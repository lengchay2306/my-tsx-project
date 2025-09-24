import { useState } from"react";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Badge } from"@/components/ui/badge";
import { Avatar,AvatarFallback,AvatarImage } from"@/components/ui/avatar";
import { Progress } from"@/components/ui/progress";
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
 } from"lucide-react";

interfaceTaskCard{
id:string;
caseId:string;
customer:string;
vehicleModel:string;
vin:string;
issue:string;
priority:"high"|"medium"|"low";
dateAssigned:string;
estimatedCompletion:string;
progress:number;
status:"new"|"in-progress"|"awaiting-parts"|"ready-review";
}

const TechnicianKanbanDashboard=()=>{
const[selectedCard,setSelectedCard]=useState<string|null>(null);

//Mocktaskdata
consttasks:TaskCard[]=[
{
id:"task-001",
caseId:"WC-25-09-001",
customer:"NguyễnVănA",
vehicleModel:"VinFastVF8",
vin:"VF8ABC123456789",
issue:"BatteryPerformanceIssue",
priority:"high",
dateAssigned:"2025-01-15",
status:"new"
},
{
id:"task-002",
caseId:"WC-25-09-002",
customer:"LêThịC",
vehicleModel:"VinFastVF9",
vin:"VF9DEF987654321",
issue:"ChargingPortMalfunction",
priority:"medium",
dateAssigned:"2025-01-14",
estimatedCompletion:"2025-01-18",
progress:65,
status:"in-progress"
},
{
id:"task-003",
caseId:"WC-25-09-003",
customer:"HoàngMinhE",
vehicleModel:"VinFastVF8",
vin:"VF8GHI456789123",
issue:"DisplayScreenNotResponding",
priority:"low",
dateAssigned:"2025-01-13",
status:"awaiting-parts"
},
{
id:"task-004",
caseId:"WC-25-09-004",
customer:"TrầnVănG",
vehicleModel:"VinFastVF9",
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
count:tasks.filter(t=>t.status==="new").length,
color:"bg-blue-50border-blue-200",
headerColor:"text-blue-600"
},
{
id:"in-progress",
title:"InProgress",
count:tasks.filter(t=>t.status==="in-progress").length,
color:"bg-orange-50border-orange-200",
headerColor:"text-orange-600"
},
{
id:"awaiting-parts",
title:"AwaitingParts",
count:tasks.filter(t=>t.status==="awaiting-parts").length,
color:"bg-yellow-50border-yellow-200",
headerColor:"text-yellow-600"
},
{
id:"ready-review",
title:"ReadyforReview",
count:tasks.filter(t=>t.status==="ready-review").length,
color:"bg-green-50border-green-200",
headerColor:"text-green-600"
}
];

const getPriorityIcon=(priority:"high"|"medium"|"low")=>{
const config={
high:{icon:AlertCircle,className:"text-destructive"},
medium:{icon:Clock,className:"text-warning"},
low:{icon:CheckCircle,className:"text-success"}
};

const Icon=config[priority].icon;
return<IconclassName={`h-3w-3${config[priority].className}`}/>;
};

const getPriorityBadge=(priority:"high"|"medium"|"low")=>{
const config={
high:{variant:"destructive",text:"High"},
medium:{variant:"warning",text:"Medium"},
low:{variant:"secondary",text:"Low"}
};

const priorityConfig=config[priority];
return<Badgevariant={priorityConfig.variant}className="text-xs">{priorityConfig.text}</Badge>;
};

const TaskCardComponent=({task}:{task:TaskCard})=>(
<Card
className={`mb-4cursor-pointertransition-allduration-200hover:shadow-md${
selectedCard===task.id'ring-2ring-primary':''
}`}
onClick={()=>setSelectedCard(selectedCard===task.idnull:task.id)}
>
<CardContentclassName="p-4">
<divclassName="space-y-3">
{/*Header*/}
<divclassName="flexitems-centerjustify-between">
<divclassName="flexitems-centerspace-x-2">
<spanclassName="font-monotext-xsfont-mediumtext-primary">{task.caseId}</span>
{getPriorityIcon(task.priority)}
</div>
{getPriorityBadge(task.priority)}
</div>

{/*Customer&Vehicle*/}
<div>
<pclassName="font-mediumtext-sm">{task.customer}</p>
<pclassName="text-xstext-muted-foreground">{task.vehicleModel}</p>
<pclassName="font-monotext-xstext-muted-foreground">{task.vin}</p>
</div>

{/*Issue*/}
<div>
<pclassName="text-smfont-mediumtext-foreground">{task.issue}</p>
</div>

{/*Progress(forin-progresstasks)*/}
{task.progress&&(
<divclassName="space-y-1">
<divclassName="flexjustify-betweentext-xs">
<span>Progress</span>
<span>{task.progress}%</span>
</div>
<Progressvalue={task.progress}className="h-1.5"/>
</div>
)}

{/*Dates*/}
<divclassName="flexitems-centerjustify-betweentext-xstext-muted-foreground">
<divclassName="flexitems-centerspace-x-1">
<CalendarclassName="h-3w-3"/>
<span>{task.dateAssigned}</span>
</div>
{task.estimatedCompletion&&(
<span>Due:{task.estimatedCompletion}</span>
)}
</div>

{/*QuickActions(shownwhenselected)*/}
{selectedCard===task.id&&(
<divclassName="pt-2border-tborder-border">
<divclassName="gridgrid-cols-3gap-2">
<Buttonvariant="outline"size="sm"className="text-xs">
<FileTextclassName="mr-1h-3w-3"/>
Report
</Button>
<Buttonvariant="outline"size="sm"className="text-xs">
<CameraclassName="mr-1h-3w-3"/>
Photo
</Button>
<Buttonvariant="outline"size="sm"className="text-xs">
<WrenchclassName="mr-1h-3w-3"/>
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
<divclassName="space-y-6p-6">
{/*Header*/}
<divclassName="flexitems-centerjustify-between">
<divclassName="flexitems-centerspace-x-4">
<AvatarclassName="h-12w-12">
<AvatarFallbackclassName="bg-primarytext-primary-foregroundfont-medium">
TB
</AvatarFallback>
</Avatar>
<div>
<h1className="text-2xlfont-boldtext-foreground">MyTasks</h1>
<pclassName="text-muted-foreground">TechnicianDashboard-TrầnMinhB</p>
</div>
</div>
<divclassName="flexitems-centerspace-x-3">
<Buttonvariant="outline">
<FileTextclassName="mr-2h-4w-4"/>
NewReport
</Button>
<Buttonvariant="gradient">
<PlusclassName="mr-2h-4w-4"/>
LogProgress
</Button>
</div>
</div>

{/*QuickStats*/}
<divclassName="gridgap-4md:grid-cols-4">
<Card>
<CardContentclassName="p-4">
<divclassName="flexitems-centerspace-x-3">
<divclassName="p-2bg-blue-100rounded-lg">
<CarclassName="h-5w-5text-blue-600"/>
</div>
<div>
<pclassName="text-2xlfont-bold">{tasks.length}</p>
<pclassName="text-smtext-muted-foreground">TotalTasks</p>
</div>
</div>
</CardContent>
</Card>
<Card>
<CardContentclassName="p-4">
<divclassName="flexitems-centerspace-x-3">
<divclassName="p-2bg-orange-100rounded-lg">
<ClockclassName="h-5w-5text-orange-600"/>
</div>
<div>
<pclassName="text-2xlfont-bold">{tasks.filter(t=>t.status==="in-progress").length}</p>
<pclassName="text-smtext-muted-foreground">InProgress</p>
</div>
</div>
</CardContent>
</Card>
<Card>
<CardContentclassName="p-4">
<divclassName="flexitems-centerspace-x-3">
<divclassName="p-2bg-yellow-100rounded-lg">
<PackageclassName="h-5w-5text-yellow-600"/>
</div>
<div>
<pclassName="text-2xlfont-bold">{tasks.filter(t=>t.status==="awaiting-parts").length}</p>
<pclassName="text-smtext-muted-foreground">AwaitingParts</p>
</div>
</div>
</CardContent>
</Card>
<Card>
<CardContentclassName="p-4">
<divclassName="flexitems-centerspace-x-3">
<divclassName="p-2bg-green-100rounded-lg">
<CheckCircleclassName="h-5w-5text-green-600"/>
</div>
<div>
<pclassName="text-2xlfont-bold">{tasks.filter(t=>t.status==="ready-review").length}</p>
<pclassName="text-smtext-muted-foreground">ReadyReview</p>
</div>
</div>
</CardContent>
</Card>
</div>

{/*KanbanBoard*/}
<divclassName="gridgap-6lg:grid-cols-4">
{columns.map((column)=>(
<divkey={column.id}className="space-y-4">
<CardclassName={`${column.color}border-2`}>
<CardHeaderclassName="pb-3">
<CardTitleclassName={`text-lg${column.headerColor}flexitems-centerjustify-between`}>
<span>{column.title}</span>
<Badgevariant="secondary"className="text-xs">
{column.count}
</Badge>
</CardTitle>
</CardHeader>
</Card>

<divclassName="space-y-4">
{tasks
.filter(task=>task.status===column.id)
.map(task=>(
<TaskCardComponentkey={task.id}task={task}/>
))}

{/*AddNewTaskButton(onlyfor"new"column)*/}
{column.id==="new"&&(
<Buttonvariant="ghost"className="w-fullborder-2border-dashedborder-muted-foreground/20h-24hover:border-primary/50hover:bg-primary/5">
<divclassName="flexflex-colitems-centerspace-y-2">
<PlusclassName="h-5w-5text-muted-foreground"/>
<spanclassName="text-xstext-muted-foreground">RequestNewAssignment</span>
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