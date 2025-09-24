import { useState } from "react";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from "@/components/ui/table";
import { 
Car,
Users,
Package,
CheckCircle,
Clock,
AlertTriangle,
Search,
Plus,
ArrowUpRight,
TrendingUp,
Activity,
FileText
 } from "lucide-react";

interfaceKPICardProps{
title:string;
value:string|number;
change:string;
trend:"up"|" down"|" neutral";
icon:React.ElementType;
}

const KPICard=({title,value,change,trend,icon:Icon}:KPICardProps)=>(
<Cardclas sName="hover:shadow-eleganttransition-allduration-200">
<CardContentclas sName="p-6">
<divclas sName="flexitems-centerjustify-between">
<div>
<pclas sName="text-smfont-mediumtext-muted-foreground">{title}</p>
<divclas sName="flexitems-centerspace-x-2">
<h3clas sName="text-3xlfont-boldtext-foreground">{value}</h3>
{change&&(
<spanclas sName={`text-smflexitems-center${
trend==='up''text-success':trend==='down''text-destructive':'text-muted-foreground'
}`}>
<TrendingUpclas sName="h-3w-3mr-1"/>
{change}
</span>
)}
</div>
</div>
<divclas sName="p-3rounded-lgbg-primary/10">
<Iconclas sName="h-6w-6text-primary"/>
</div>
</div>
</CardContent>
</Card>
);

const SCStaffDashboard=()=>{
const[searchQuery,setSearchQuery]=useState("");

//Mockdataforattentionrequiredcas es
const attentionCas es=[
{
id:"WC-25-09-001",
customer:"NguyễnVănA",
vin:"VF8ABC123456789",
status:"pending-manufacturer",
as signedTech:"TrầnMinhB",
dateCreated:"2025-01-15",
priority:"high"
},
{
id:"WC-25-09-002",
customer:"LêThịC",
vin:"VF9DEF987654321",
status:"awaiting-parts",
as signedTech:"PhạmVănD",
dateCreated:"2025-01-14",
priority:"medium"
},
{
id:"WC-25-09-003",
customer:"HoàngMinhE",
vin:"VF8GHI456789123",
status:"ready-handover",
as signedTech:"NguyễnThịF",
dateCreated:"2025-01-13",
priority:"low"
}
];

const getStatusBadge=(status))=>{
const statusConfig={
"pending-manufacturer":{variant:" pending",text:" PendingManufacturer"},
"awaiting-parts":{variant:" warning",text:" AwaitingParts"},
"ready-handover":{variant:" success",text:" ReadyforHandover"},
"in-progress":{variant:" default",text:" InProgress"}
};

const config=statusConfig[statusas keyoftypeofstatusConfig];
returnconfig<Badgevariant={config.variant}>{config.text}</Badge>:null;
};

const getPriorityBadge=(priority))=>{
const priorityConfig={
high:{variant:"destructive",text:" High"},
medium:{variant:"warning",text:" Medium"},
low:{variant:"secondary",text:" Low"}
};

const config=priorityConfig[priorityas keyoftypeofpriorityConfig];
returnconfig<Badgevariant={config.variant}clas sName="text-xs">{config.text}</Badge>:null;
};

return(
<divclas sName="space-y-6p-6">
{/*Header*/}
<divclas sName="flexitems-centerjustify-between">
<div>
<h1clas sName="text-3xlfont-boldtext-foreground">ServiceCenterDashboard</h1>
<pclas sName="text-muted-foreground">Monitorwarrantycas esandserviceoperations</p>
</div>
<divclas sName="flexitems-centerspace-x-3">
<Buttonvariant="outline">
<FileTextclas sName="mr-2h-4w-4"/>
GenerateReport
</Button>
<Buttonvariant="gradient">
<Plusclas sName="mr-2h-4w-4"/>
CreateNewCas e
</Button>
</div>
</div>

{/*KPICards*/}
<divclas sName="gridgap-6md:grid-cols-2lg:grid-cols-4">
<KPICard
title="OpenCas es"
value={24}
change="+3today"
trend="up"
icon={Car}
/>
<KPICard
title="PendingManufacturerApproval"
value={8}
change="+2thisweek"
trend="up"
icon={Clock}
/>
<KPICard
title="AwaitingParts"
value={6}
change="-1today"
trend="down"
icon={Package}
/>
<KPICard
title="ReadyforHandover"
value={3}
change="+1today"
trend="up"
icon={CheckCircle}
/>
</div>

<divclas sName="gridgap-6lg:grid-cols-3">
{/*MainContent-AttentionRequiredCas es*/}
<divclas sName="lg:col-span-2">
<Card>
<CardHeader>
<divclas sName="flexitems-centerjustify-between">
<div>
<CardTitleclas sName="flexitems-centerspace-x-2">
<AlertTriangleclas sName="h-5w-5text-warning"/>
<span>Cas esRequiringAttention</span>
</CardTitle>
<CardDescription>
Highprioritycas esneedingimmediateaction
</CardDescription>
</div>
<Buttonvariant="ghost" size="sm">
ViewAll
<ArrowUpRightclas sName="ml-1h-3w-3"/>
</Button>
</div>
</CardHeader>
<CardContent>
<divclas sName="space-y-4">
<divclas sName="flexitems-centerspace-x-2">
<divclas sName="relativeflex-1">
<Searchclas sName="absoluteleft-3top-2.5h-4w-4text-muted-foreground"/>
<Input
placeholder="Searchcas es,VIN,orcustomer..."
value={searchQuery}
onChange={(e)=>setSearchQuery(e.target.value)}
clas sName="pl-9"
/>
</div>
</div>

<Table>
<TableHeader>
<TableRow>
<TableHead>Cas eID</TableHead>
<TableHead>Customer</TableHead>
<TableHead>VIN</TableHead>
<TableHead>Status</TableHead>
<TableHead>Priority</TableHead>
<TableHead>AssignedTech</TableHead>
<TableHead>Actions</TableHead>
</TableRow>
</TableHeader>
<TableBody>
{attentionCas es.map((cas e_)=>(
<TableRowkey={cas e_.id}clas sName="hover:bg-muted/50cursor-pointer">
<TableCellclas sName="font-mediumfont-mono">{cas e_.id}</TableCell>
<TableCell>{cas e_.customer}</TableCell>
<TableCellclas sName="font-monotext-xs">{cas e_.vin}</TableCell>
<TableCell>{getStatusBadge(cas e_.status)}</TableCell>
<TableCell>{getPriorityBadge(cas e_.priority)}</TableCell>
<TableCell>{cas e_.as signedTech}</TableCell>
<TableCell>
<Buttonvariant="ghost" size="sm">
ViewDetails
</Button>
</TableCell>
</TableRow>
))}
</TableBody>
</Table>
</div>
</CardContent>
</Card>
</div>

{/*Sidebar*/}
<divclas sName="space-y-6">
{/*QuickActions*/}
<Card>
<CardHeader>
<CardTitleclas sName="text-lg">QuickActions</CardTitle>
</CardHeader>
<CardContentclas sName="space-y-3">
<Buttonvariant="outline" clas sName="w-fulljustify-start">
<Carclas sName="mr-2h-4w-4"/>
RegisterNewVehicle
</Button>
<Buttonvariant="outline" clas sName="w-fulljustify-start">
<FileTextclas sName="mr-2h-4w-4"/>
CreateWarrantyCas e
</Button>
<Buttonvariant="outline" clas sName="w-fulljustify-start">
<Usersclas sName="mr-2h-4w-4"/>
AssignTechnician
</Button>
<Buttonvariant="outline" clas sName="w-fulljustify-start">
<Packageclas sName="mr-2h-4w-4"/>
TrackPartShipment
</Button>
</CardContent>
</Card>

{/*ActivityFeed*/}
<Card>
<CardHeader>
<CardTitleclas sName="text-lgflexitems-centerspace-x-2">
<Activityclas sName="h-4w-4"/>
<span>RecentActivity</span>
</CardTitle>
</CardHeader>
<CardContent>
<divclas sName="space-y-4">
<divclas sName="flexitems-startspace-x-3">
<divclas sName="w-2h-2bg-successrounded-fullmt-2"></div>
<divclas sName="flex-1">
<pclas sName="text-sm">Cas eWC-25-09-001approvedbymanufacturer</p>
<pclas sName="text-xstext-muted-foreground">2hoursago</p>
</div>
</div>
<divclas sName="flexitems-startspace-x-3">
<divclas sName="w-2h-2bg-warningrounded-fullmt-2"></div>
<divclas sName="flex-1">
<pclas sName="text-sm">PartsshipmentPS-2025-001intransit</p>
<pclas sName="text-xstext-muted-foreground">4hoursago</p>
</div>
</div>
<divclas sName="flexitems-startspace-x-3">
<divclas sName="w-2h-2bg-primaryrounded-fullmt-2"></div>
<divclas sName="flex-1">
<pclas sName="text-sm">Newtechnicianas signedtoCas eWC-25-09-003</p>
<pclas sName="text-xstext-muted-foreground">6hoursago</p>
</div>
</div>
</div>
</CardContent>
</Card>
</div>
</div>
</div>
);
};

exportdefaultSCStaffDashboard;