import { useState } from"react";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Badge } from"@/components/ui/badge";
import { Input } from"@/components/ui/input";
import { useAuth } from"@/contexts/AuthContext";
import { 
Wrench,
Clock,
CheckCircle,
AlertCircle,
FileText,
Package,
User,
Search,
LogOut,
Camera,
Plus,
Eye,
PlayCircle
 } from"lucide-react";

interfaceTechnicianDashboardProps{
onViewCase:(caseId))=>void;
onAddReport:(caseId))=>void;
onLogProgress:(caseId))=>void;
onRecordInstallation:(caseId))=>void;
}

const TechnicianDashboard=({
onViewCase,
onAddReport,
onLogProgress,
onRecordInstallation
}:TechnicianDashboardProps)=>{
const[searchTerm,setSearchTerm]=useState("");
const[viewMode,setViewMode]=useState<"list"|"kanban">("kanban");
const{user,logout}=useAuth();

const myTasks=[
{
id:"WC-2024-001",
customer:"NguyễnVănA",
vehicle:"VinFastVF82023",
vin:"1HGBH41JXMN109186",
issue:"BatteryPerformanceIssue",
status:"in-progress",
priority:"high",
assignedDate:"2024-01-15",
dueDate:"2024-01-20",
progress:60,
lastUpdate:"2024-01-1614:30",
reportsSubmitted:2,
partsWaiting:1
},
{
id:"WC-2024-003",
customer:"HoàngMinhE",
vehicle:"VinFastVF92023",
vin:"1N4AL11D75C109151",
issue:"ChargingSystemError",
status:"blocked",
priority:"medium",
assignedDate:"2024-01-13",
dueDate:"2024-01-18",
progress:30,
lastUpdate:"2024-01-1409:15",
reportsSubmitted:1,
partsWaiting:2
},
{
id:"WC-2024-005",
customer:"TrầnThịK",
vehicle:"VinFastVF82023",
vin:"WVWZZZ1JZ3W654321",
issue:"ACSystemMalfunction",
status:"todo",
priority:"low",
assignedDate:"2024-01-16",
dueDate:"2024-01-22",
progress:0,
lastUpdate:"2024-01-1608:00",
reportsSubmitted:0,
partsWaiting:0
},
{
id:"WC-2024-006",
customer:"LêVănM",
vehicle:"VinFastVF92023",
vin:"JM1BK32F787654321",
issue:"SoftwareUpdateRequired",
status:"ready-for-handover",
priority:"medium",
assignedDate:"2024-01-10",
dueDate:"2024-01-15",
progress:100,
lastUpdate:"2024-01-1516:45",
reportsSubmitted:1,
partsWaiting:0
}
];

const stats=[
{
title:"NewAssignments",
value:myTasks.filter(t=>t.status==="todo").length.toString(),
change:"+1today",
icon:FileText,
color:"text-primary"
},
{
title:"InProgress",
value:myTasks.filter(t=>t.status==="in-progress").length.toString(),
change:"Activework",
icon:Wrench,
color:"text-warning"
},
{
title:"AwaitingParts",
value:myTasks.filter(t=>t.status==="blocked").length.toString(),
change:"Blockedtasks",
icon:Package,
color:"text-destructive"
},
{
title:"ReadyforHandover",
value:myTasks.filter(t=>t.status==="ready-for-handover").length.toString(),
change:"Completed",
icon:CheckCircle,
color:"text-success"
}
];

const getStatusBadge=(status))=>{
const statusConfig={
todo:{variant:"secondary",text:"ToDo",icon:Clock},
"in-progress":{variant:"warning",text:"InProgress",icon:Wrench},
blocked:{variant:"destructive",text:"Blocked",icon:AlertCircle},
"ready-for-handover":{variant:"success",text:"Ready",icon:CheckCircle}
};

const config=statusConfig[statusaskeyoftypeofstatusConfig];
if(!config)returnnull;

const Icon=config.icon;
return(
<Badgevariant={config.variant}>
<IconclassName="mr-1h-3w-3"/>
{config.text}
</Badge>
);
};

const getPriorityBadge=(priority))=>{
const priorityConfig={
high:{variant:"destructive",text:"High"},
medium:{variant:"warning",text:"Medium"},
low:{variant:"outline",text:"Low"}
};

const config=priorityConfig[priorityaskeyoftypeofpriorityConfig];
if(!config)returnnull;

return<Badgevariant={config.variant}className="text-xs">{config.text}</Badge>;
};

const getProgressColor=(progress))=>{
if(progress>=80)return"bg-success";
if(progress>=50)return"bg-warning";
return"bg-primary";
};

const filteredTasks=myTasks.filter(task=>
task.id.toLowerCase().includes(searchTerm.toLowerCase())||
task.customer.toLowerCase().includes(searchTerm.toLowerCase())||
task.vin.toLowerCase().includes(searchTerm.toLowerCase())
);

const groupedTasks={
todo:filteredTasks.filter(t=>t.status==="todo"),
"in-progress":filteredTasks.filter(t=>t.status==="in-progress"),
blocked:filteredTasks.filter(t=>t.status==="blocked"),
"ready-for-handover":filteredTasks.filter(t=>t.status==="ready-for-handover")
};

const TaskCard=({task}:{task:typeofmyTasks[0]})=>(
<CardclassName="shadow-eleganthover:shadow-glowtransition-shadowcursor-pointer">
<CardHeaderclassName="pb-3">
<divclassName="flexitems-centerjustify-between">
<CardTitleclassName="text-base">{task.id}</CardTitle>
<divclassName="flexitems-centerspace-x-2">
{getStatusBadge(task.status)}
{getPriorityBadge(task.priority)}
</div>
</div>
<CardDescriptionclassName="text-sm">
<divclassName="space-y-1">
<pclassName="font-medium">{task.customer}</p>
<p>{task.vehicle}</p>
<pclassName="font-monotext-xs">{task.vin}</p>
</div>
</CardDescription>
</CardHeader>
<CardContentclassName="pt-0">
<divclassName="space-y-3">
<div>
<pclassName="text-smfont-mediummb-2">{task.issue}</p>

{/*ProgressBar*/}
<divclassName="w-fullbg-mutedrounded-fullh-2">
<div
className={`h-2rounded-fulltransition-all${getProgressColor(task.progress)}`}
style={{width:`${task.progress}%`}}
/>
</div>
<pclassName="text-xstext-muted-foregroundmt-1">{task.progress}%Complete</p>
</div>

{/*TaskStats*/}
<divclassName="flexitems-centerjustify-betweentext-xstext-muted-foreground">
<divclassName="flexitems-centerspace-x-3">
<spanclassName="flexitems-center">
<FileTextclassName="h-3w-3mr-1"/>
{task.reportsSubmitted}reports
</span>
{task.partsWaiting>0&&(
<spanclassName="flexitems-centertext-warning">
<PackageclassName="h-3w-3mr-1"/>
{task.partsWaiting}partswaiting
</span>
)}
</div>
<span>Due:{task.dueDate}</span>
</div>

{/*QuickActions*/}
<divclassName="flexitems-centerspace-x-2pt-2border-t">
<Button
variant="outline"
size="sm"
onClick={()=>onViewCase.(task.id)}
>
<EyeclassName="h-3w-3mr-1"/>
View
</Button>
{task.status==="in-progress"&&(
<>
<Button
variant="secondary"
size="sm"
onClick={()=>onAddReport.(task.id)}
>
<PlusclassName="h-3w-3mr-1"/>
Report
</Button>
<Button
variant="gradient"
size="sm"
onClick={()=>onLogProgress.(task.id)}
>
<PlayCircleclassName="h-3w-3mr-1"/>
Update
</Button>
</>
)}
</div>
</div>
</CardContent>
</Card>
);

return(
<divclassName="min-h-screenbg-background">
{/*Header*/}
<headerclassName="border-bbg-cardshadow-elegant">
<divclassName="containermx-autopx-6py-4">
<divclassName="flexitems-centerjustify-between">
<divclassName="flexitems-centerspace-x-3">
<divclassName="flexh-10w-10items-centerjustify-centerrounded-lgbg-gradient-primary">
<WrenchclassName="h-6w-6text-primary-foreground"/>
</div>
<div>
<h1className="text-xlfont-boldtext-foreground">MyTasksDashboard</h1>
<pclassName="text-smtext-muted-foreground">
Welcomeback,{user.name}-Technician
</p>
</div>
</div>
<divclassName="flexitems-centerspace-x-3">
<Badgevariant="outline"className="text-xs">
BatterySystemsSpecialist
</Badge>
<Buttonvariant="outline"onClick={logout}>
<LogOutclassName="mr-2h-4w-4"/>
Logout
</Button>
</div>
</div>
</div>
</header>

<divclassName="containermx-autopx-6py-6">
{/*QuickSearch*/}
<divclassName="mb-6">
<divclassName="relativemax-w-md">
<SearchclassName="absoluteleft-3top-3h-4w-4text-muted-foreground"/>
<Input
placeholder="SearchbyCaseID,Customer,orVIN..."
value={searchTerm}
onChange={(e)=>setSearchTerm(e.target.value)}
className="pl-10"
/>
</div>
</div>

{/*StatisticsCards*/}
<divclassName="mb-6gridgap-4md:grid-cols-4">
{stats.map((stat)=>{
const Icon=stat.icon;
return(
<Cardkey={stat.title}className="shadow-elegant">
<CardContentclassName="p-6">
<divclassName="flexitems-centerjustify-between">
<div>
<pclassName="text-smfont-mediumtext-muted-foreground">
{stat.title}
</p>
<pclassName="text-2xlfont-bold">{stat.value}</p>
<pclassName="text-xstext-muted-foreground">
{stat.change}
</p>
</div>
<IconclassName={`h-8w-8${stat.color}`}/>
</div>
</CardContent>
</Card>
);
})}
</div>

{/*ViewModeToggle*/}
<divclassName="mb-6flexitems-centerjustify-between">
<h2className="text-lgfont-semibold">MyAssignedCases</h2>
<divclassName="flexitems-centerspace-x-2">
<Button
variant={viewMode==="kanban""default":"outline"}
size="sm"
onClick={()=>setViewMode("kanban")}
>
KanbanView
</Button>
<Button
variant={viewMode==="list""default":"outline"}
size="sm"
onClick={()=>setViewMode("list")}
>
ListView
</Button>
</div>
</div>

{/*KanbanBoard*/}
{viewMode==="kanban"&&(
<divclassName="gridgap-6md:grid-cols-4">
{Object.entries(groupedTasks).map(([status,tasks])=>(
<divkey={status}className="space-y-4">
<divclassName="flexitems-centerjustify-between">
<h3className="font-mediumcapitalize">
{status.replace("-","")}({tasks.length})
</h3>
{getStatusBadge(status)}
</div>
<divclassName="space-y-3">
{tasks.map((task)=>(
<TaskCardkey={task.id}task={task}/>
))}
</div>
</div>
))}
</div>
)}

{/*ListView*/}
{viewMode==="list"&&(
<CardclassName="shadow-elegant">
<CardHeader>
<CardTitle>AllMyCases</CardTitle>
<CardDescription>
Listviewofallassignedcaseswithdetailedinformation
</CardDescription>
</CardHeader>
<CardContent>
<divclassName="space-y-4">
{filteredTasks.map((task)=>(
<div
key={task.id}
className="flexitems-centerjustify-betweenrounded-lgborderp-4hover:bg-muted/50"
>
<divclassName="flexitems-centerspace-x-4">
<divclassName="flexh-10w-10items-centerjustify-centerrounded-fullbg-accent">
<FileTextclassName="h-5w-5text-accent-foreground"/>
</div>
<div>
<divclassName="flexitems-centerspace-x-2">
<pclassName="font-semibold">{task.id}</p>
{getStatusBadge(task.status)}
{getPriorityBadge(task.priority)}
</div>
<pclassName="text-smtext-muted-foreground">
{task.customer}-{task.vehicle}
</p>
<pclassName="text-smtext-muted-foregroundfont-mono">
VIN:{task.vin}
</p>
</div>
</div>
<divclassName="text-right">
<pclassName="font-medium">{task.issue}</p>
<pclassName="text-smtext-muted-foreground">
Progress:{task.progress}%
</p>
<pclassName="text-smtext-muted-foreground">
Due:{task.dueDate}
</p>
</div>
<divclassName="flexspace-x-2">
<Button
variant="outline"
size="sm"
onClick={()=>onViewCase.(task.id)}
>
<EyeclassName="h-4w-4"/>
</Button>
{task.status==="in-progress"&&(
<Button
variant="gradient"
size="sm"
onClick={()=>onLogProgress.(task.id)}
>
<PlayCircleclassName="h-4w-4"/>
</Button>
)}
</div>
</div>
))}
</div>
</CardContent>
</Card>
)}
</div>
</div>
);
};

exportdefaultTechnicianDashboard;