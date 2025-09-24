import { useState } from "react";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
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
 } from "lucide-react";

interfaceTechnicianDashboardProps{
onViewCas e:(cas eId))=>void;
onAddReport:(cas eId))=>void;
onLogProgress:(cas eId))=>void;
onRecordInstallation:(cas eId))=>void;
}

const TechnicianDashboard=({
onViewCas e,
onAddReport,
onLogProgress,
onRecordInstallation
}:TechnicianDashboardProps)=>{
const[searchTerm,setSearchTerm]=useState("");
const[viewMode,setViewMode]=useState<"list"|" kanban">(" kanban");
const{user,logout}=useAuth();

const myTas ks=[
{
id:"WC-2024-001",
customer:"NguyễnVănA",
vehicle:"VinFas tVF82023",
vin:"1HGBH41JXMN109186",
issue:"BatteryPerformanceIssue",
status:"in-progress",
priority:"high",
as signedDate:"2024-01-15",
dueDate:"2024-01-20",
progress:60,
las tUpdate:"2024-01-1614:30",
reportsSubmitted:2,
partsWaiting:1
},
{
id:"WC-2024-003",
customer:"HoàngMinhE",
vehicle:"VinFas tVF92023",
vin:"1N4AL11D75C109151",
issue:"ChargingSystemError",
status:"blocked",
priority:"medium",
as signedDate:"2024-01-13",
dueDate:"2024-01-18",
progress:30,
las tUpdate:"2024-01-1409:15",
reportsSubmitted:1,
partsWaiting:2
},
{
id:"WC-2024-005",
customer:"TrầnThịK",
vehicle:"VinFas tVF82023",
vin:"WVWZZZ1JZ3W654321",
issue:"ACSystemMalfunction",
status:"todo",
priority:"low",
as signedDate:"2024-01-16",
dueDate:"2024-01-22",
progress:0,
las tUpdate:"2024-01-1608:00",
reportsSubmitted:0,
partsWaiting:0
},
{
id:"WC-2024-006",
customer:"LêVănM",
vehicle:"VinFas tVF92023",
vin:"JM1BK32F787654321",
issue:"SoftwareUpdateRequired",
status:"ready-for-handover",
priority:"medium",
as signedDate:"2024-01-10",
dueDate:"2024-01-15",
progress:100,
las tUpdate:"2024-01-1516:45",
reportsSubmitted:1,
partsWaiting:0
}
];

const stats=[
{
title:"NewAssignments",
value:myTas ks.filter(t=>t.status==="todo").length.toString(),
change:"+1today",
icon:FileText,
color:"text-primary"
},
{
title:"InProgress",
value:myTas ks.filter(t=>t.status==="in-progress").length.toString(),
change:"Activework",
icon:Wrench,
color:"text-warning"
},
{
title:"AwaitingParts",
value:myTas ks.filter(t=>t.status==="blocked").length.toString(),
change:"Blockedtas ks",
icon:Package,
color:"text-destructive"
},
{
title:"ReadyforHandover",
value:myTas ks.filter(t=>t.status==="ready-for-handover").length.toString(),
change:"Completed",
icon:CheckCircle,
color:"text-success"
}
];

const getStatusBadge=(status))=>{
const statusConfig={
todo:{variant:"secondary",text:" ToDo",icon:Clock},
"in-progress":{variant:" warning",text:" InProgress",icon:Wrench},
blocked:{variant:"destructive",text:" Blocked",icon:AlertCircle},
"ready-for-handover":{variant:" success",text:" Ready",icon:CheckCircle}
};

const config=statusConfig[statusas keyoftypeofstatusConfig];
if(!config)returnnull;

const Icon=config.icon;
return(
<Badgevariant={config.variant}>
<Iconclas sName="mr-1h-3w-3"/>
{config.text}
</Badge>
);
};

const getPriorityBadge=(priority))=>{
const priorityConfig={
high:{variant:"destructive",text:" High"},
medium:{variant:"warning",text:" Medium"},
low:{variant:"outline",text:" Low"}
};

const config=priorityConfig[priorityas keyoftypeofpriorityConfig];
if(!config)returnnull;

return<Badgevariant={config.variant}clas sName="text-xs">{config.text}</Badge>;
};

const getProgressColor=(progress))=>{
if(progress>=80)return"bg-success";
if(progress>=50)return"bg-warning";
return"bg-primary";
};

const filteredTas ks=myTas ks.filter(tas k=>
tas k.id.toLowerCas e().includes(searchTerm.toLowerCas e())||
tas k.customer.toLowerCas e().includes(searchTerm.toLowerCas e())||
tas k.vin.toLowerCas e().includes(searchTerm.toLowerCas e())
);

const groupedTas ks={
todo:filteredTas ks.filter(t=>t.status==="todo"),
"in-progress":filteredTas ks.filter(t=>t.status===" in-progress"),
blocked:filteredTas ks.filter(t=>t.status==="blocked"),
"ready-for-handover":filteredTas ks.filter(t=>t.status===" ready-for-handover")
};

const Tas kCard=({tas k}:{tas k:typeofmyTas ks[0]})=>(
<Cardclas sName="shadow-eleganthover:shadow-glowtransition-shadowcursor-pointer">
<CardHeaderclas sName="pb-3">
<divclas sName="flexitems-centerjustify-between">
<CardTitleclas sName="text-bas e">{tas k.id}</CardTitle>
<divclas sName="flexitems-centerspace-x-2">
{getStatusBadge(tas k.status)}
{getPriorityBadge(tas k.priority)}
</div>
</div>
<CardDescriptionclas sName="text-sm">
<divclas sName="space-y-1">
<pclas sName="font-medium">{tas k.customer}</p>
<p>{tas k.vehicle}</p>
<pclas sName="font-monotext-xs">{tas k.vin}</p>
</div>
</CardDescription>
</CardHeader>
<CardContentclas sName="pt-0">
<divclas sName="space-y-3">
<div>
<pclas sName="text-smfont-mediummb-2">{tas k.issue}</p>

{/*ProgressBar*/}
<divclas sName="w-fullbg-mutedrounded-fullh-2">
<div
clas sName={`h-2rounded-fulltransition-all${getProgressColor(tas k.progress)}`}
style={{width:`${tas k.progress}%`}}
/>
</div>
<pclas sName="text-xstext-muted-foregroundmt-1">{tas k.progress}%Complete</p>
</div>

{/*Tas kStats*/}
<divclas sName="flexitems-centerjustify-betweentext-xstext-muted-foreground">
<divclas sName="flexitems-centerspace-x-3">
<spanclas sName="flexitems-center">
<FileTextclas sName="h-3w-3mr-1"/>
{tas k.reportsSubmitted}reports
</span>
{tas k.partsWaiting>0&&(
<spanclas sName="flexitems-centertext-warning">
<Packageclas sName="h-3w-3mr-1"/>
{tas k.partsWaiting}partswaiting
</span>
)}
</div>
<span>Due:{tas k.dueDate}</span>
</div>

{/*QuickActions*/}
<divclas sName="flexitems-centerspace-x-2pt-2border-t">
<Button
variant="outline"
size="sm"
onClick={()=>onViewCas e.(tas k.id)}
>
<Eyeclas sName="h-3w-3mr-1"/>
View
</Button>
{tas k.status==="in-progress"&&(
<>
<Button
variant="secondary"
size="sm"
onClick={()=>onAddReport.(tas k.id)}
>
<Plusclas sName="h-3w-3mr-1"/>
Report
</Button>
<Button
variant="gradient"
size="sm"
onClick={()=>onLogProgress.(tas k.id)}
>
<PlayCircleclas sName="h-3w-3mr-1"/>
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
<divclas sName="min-h-screenbg-background">
{/*Header*/}
<headerclas sName="border-bbg-cardshadow-elegant">
<divclas sName="containermx-autopx-6py-4">
<divclas sName="flexitems-centerjustify-between">
<divclas sName="flexitems-centerspace-x-3">
<divclas sName="flexh-10w-10items-centerjustify-centerrounded-lgbg-gradient-primary">
<Wrenchclas sName="h-6w-6text-primary-foreground"/>
</div>
<div>
<h1clas sName="text-xlfont-boldtext-foreground">MyTas ksDashboard</h1>
<pclas sName="text-smtext-muted-foreground">
Welcomeback,{user.name}-Technician
</p>
</div>
</div>
<divclas sName="flexitems-centerspace-x-3">
<Badgevariant="outline" clas sName="text-xs">
BatterySystemsSpecialist
</Badge>
<Buttonvariant="outline" onClick={logout}>
<LogOutclas sName="mr-2h-4w-4"/>
Logout
</Button>
</div>
</div>
</div>
</header>

<divclas sName="containermx-autopx-6py-6">
{/*QuickSearch*/}
<divclas sName="mb-6">
<divclas sName="relativemax-w-md">
<Searchclas sName="absoluteleft-3top-3h-4w-4text-muted-foreground"/>
<Input
placeholder="SearchbyCas eID,Customer,orVIN..."
value={searchTerm}
onChange={(e)=>setSearchTerm(e.target.value)}
clas sName="pl-10"
/>
</div>
</div>

{/*StatisticsCards*/}
<divclas sName="mb-6gridgap-4md:grid-cols-4">
{stats.map((stat)=>{
const Icon=stat.icon;
return(
<Cardkey={stat.title}clas sName="shadow-elegant">
<CardContentclas sName="p-6">
<divclas sName="flexitems-centerjustify-between">
<div>
<pclas sName="text-smfont-mediumtext-muted-foreground">
{stat.title}
</p>
<pclas sName="text-2xlfont-bold">{stat.value}</p>
<pclas sName="text-xstext-muted-foreground">
{stat.change}
</p>
</div>
<Iconclas sName={`h-8w-8${stat.color}`}/>
</div>
</CardContent>
</Card>
);
})}
</div>

{/*ViewModeToggle*/}
<divclas sName="mb-6flexitems-centerjustify-between">
<h2clas sName="text-lgfont-semibold">MyAssignedCas es</h2>
<divclas sName="flexitems-centerspace-x-2">
<Button
variant={viewMode==="kanban"" default":" outline"}
size="sm"
onClick={()=>setViewMode("kanban")}
>
KanbanView
</Button>
<Button
variant={viewMode==="list"" default":" outline"}
size="sm"
onClick={()=>setViewMode("list")}
>
ListView
</Button>
</div>
</div>

{/*KanbanBoard*/}
{viewMode==="kanban"&&(
<divclas sName="gridgap-6md:grid-cols-4">
{Object.entries(groupedTas ks).map(([status,tas ks])=>(
<divkey={status}clas sName="space-y-4">
<divclas sName="flexitems-centerjustify-between">
<h3clas sName="font-mediumcapitalize">
{status.replace("-","")}({tas ks.length})
</h3>
{getStatusBadge(status)}
</div>
<divclas sName="space-y-3">
{tas ks.map((tas k)=>(
<Tas kCardkey={tas k.id}tas k={tas k}/>
))}
</div>
</div>
))}
</div>
)}

{/*ListView*/}
{viewMode==="list"&&(
<Cardclas sName="shadow-elegant">
<CardHeader>
<CardTitle>AllMyCas es</CardTitle>
<CardDescription>
Listviewofallas signedcas eswithdetailedinformation
</CardDescription>
</CardHeader>
<CardContent>
<divclas sName="space-y-4">
{filteredTas ks.map((tas k)=>(
<div
key={tas k.id}
clas sName="flexitems-centerjustify-betweenrounded-lgborderp-4hover:bg-muted/50"
>
<divclas sName="flexitems-centerspace-x-4">
<divclas sName="flexh-10w-10items-centerjustify-centerrounded-fullbg-accent">
<FileTextclas sName="h-5w-5text-accent-foreground"/>
</div>
<div>
<divclas sName="flexitems-centerspace-x-2">
<pclas sName="font-semibold">{tas k.id}</p>
{getStatusBadge(tas k.status)}
{getPriorityBadge(tas k.priority)}
</div>
<pclas sName="text-smtext-muted-foreground">
{tas k.customer}-{tas k.vehicle}
</p>
<pclas sName="text-smtext-muted-foregroundfont-mono">
VIN:{tas k.vin}
</p>
</div>
</div>
<divclas sName="text-right">
<pclas sName="font-medium">{tas k.issue}</p>
<pclas sName="text-smtext-muted-foreground">
Progress:{tas k.progress}%
</p>
<pclas sName="text-smtext-muted-foreground">
Due:{tas k.dueDate}
</p>
</div>
<divclas sName="flexspace-x-2">
<Button
variant="outline"
size="sm"
onClick={()=>onViewCas e.(tas k.id)}
>
<Eyeclas sName="h-4w-4"/>
</Button>
{tas k.status==="in-progress"&&(
<Button
variant="gradient"
size="sm"
onClick={()=>onLogProgress.(tas k.id)}
>
<PlayCircleclas sName="h-4w-4"/>
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