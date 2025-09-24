import { useState } from"react";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Badge } from"@/components/ui/badge";
import { Input } from"@/components/ui/input";
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from"@/components/ui/table";
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
 } from"lucide-react";

interfaceKPICardProps{
title:string;
value:string|number;
change:string;
trend:"up"|"down"|"neutral";
icon:React.ElementType;
}

const KPICard=({title,value,change,trend,icon:Icon}:KPICardProps)=>(
<CardclassName="hover:shadow-eleganttransition-allduration-200">
<CardContentclassName="p-6">
<divclassName="flexitems-centerjustify-between">
<div>
<pclassName="text-smfont-mediumtext-muted-foreground">{title}</p>
<divclassName="flexitems-centerspace-x-2">
<h3className="text-3xlfont-boldtext-foreground">{value}</h3>
{change&&(
<spanclassName={`text-smflexitems-center${
trend==='up''text-success':trend==='down''text-destructive':'text-muted-foreground'
}`}>
<TrendingUpclassName="h-3w-3mr-1"/>
{change}
</span>
)}
</div>
</div>
<divclassName="p-3rounded-lgbg-primary/10">
<IconclassName="h-6w-6text-primary"/>
</div>
</div>
</CardContent>
</Card>
);

const SCStaffDashboard=()=>{
const[searchQuery,setSearchQuery]=useState("");

//Mockdataforattentionrequiredcases
const attentionCases=[
{
id:"WC-25-09-001",
customer:"NguyễnVănA",
vin:"VF8ABC123456789",
status:"pending-manufacturer",
assignedTech:"TrầnMinhB",
dateCreated:"2025-01-15",
priority:"high"
},
{
id:"WC-25-09-002",
customer:"LêThịC",
vin:"VF9DEF987654321",
status:"awaiting-parts",
assignedTech:"PhạmVănD",
dateCreated:"2025-01-14",
priority:"medium"
},
{
id:"WC-25-09-003",
customer:"HoàngMinhE",
vin:"VF8GHI456789123",
status:"ready-handover",
assignedTech:"NguyễnThịF",
dateCreated:"2025-01-13",
priority:"low"
}
];

const getStatusBadge=(status))=>{
const statusConfig={
"pending-manufacturer":{variant:"pending",text:"PendingManufacturer"},
"awaiting-parts":{variant:"warning",text:"AwaitingParts"},
"ready-handover":{variant:"success",text:"ReadyforHandover"},
"in-progress":{variant:"default",text:"InProgress"}
};

const config=statusConfig[statusaskeyoftypeofstatusConfig];
returnconfig<Badgevariant={config.variant}>{config.text}</Badge>:null;
};

const getPriorityBadge=(priority))=>{
const priorityConfig={
high:{variant:"destructive",text:"High"},
medium:{variant:"warning",text:"Medium"},
low:{variant:"secondary",text:"Low"}
};

const config=priorityConfig[priorityaskeyoftypeofpriorityConfig];
returnconfig<Badgevariant={config.variant}className="text-xs">{config.text}</Badge>:null;
};

return(
<divclassName="space-y-6p-6">
{/*Header*/}
<divclassName="flexitems-centerjustify-between">
<div>
<h1className="text-3xlfont-boldtext-foreground">ServiceCenterDashboard</h1>
<pclassName="text-muted-foreground">Monitorwarrantycasesandserviceoperations</p>
</div>
<divclassName="flexitems-centerspace-x-3">
<Buttonvariant="outline">
<FileTextclassName="mr-2h-4w-4"/>
GenerateReport
</Button>
<Buttonvariant="gradient">
<PlusclassName="mr-2h-4w-4"/>
CreateNewCase
</Button>
</div>
</div>

{/*KPICards*/}
<divclassName="gridgap-6md:grid-cols-2lg:grid-cols-4">
<KPICard
title="OpenCases"
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

<divclassName="gridgap-6lg:grid-cols-3">
{/*MainContent-AttentionRequiredCases*/}
<divclassName="lg:col-span-2">
<Card>
<CardHeader>
<divclassName="flexitems-centerjustify-between">
<div>
<CardTitleclassName="flexitems-centerspace-x-2">
<AlertTriangleclassName="h-5w-5text-warning"/>
<span>CasesRequiringAttention</span>
</CardTitle>
<CardDescription>
Highprioritycasesneedingimmediateaction
</CardDescription>
</div>
<Buttonvariant="ghost"size="sm">
ViewAll
<ArrowUpRightclassName="ml-1h-3w-3"/>
</Button>
</div>
</CardHeader>
<CardContent>
<divclassName="space-y-4">
<divclassName="flexitems-centerspace-x-2">
<divclassName="relativeflex-1">
<SearchclassName="absoluteleft-3top-2.5h-4w-4text-muted-foreground"/>
<Input
placeholder="Searchcases,VIN,orcustomer..."
value={searchQuery}
onChange={(e)=>setSearchQuery(e.target.value)}
className="pl-9"
/>
</div>
</div>

<Table>
<TableHeader>
<TableRow>
<TableHead>CaseID</TableHead>
<TableHead>Customer</TableHead>
<TableHead>VIN</TableHead>
<TableHead>Status</TableHead>
<TableHead>Priority</TableHead>
<TableHead>AssignedTech</TableHead>
<TableHead>Actions</TableHead>
</TableRow>
</TableHeader>
<TableBody>
{attentionCases.map((case_)=>(
<TableRowkey={case_.id}className="hover:bg-muted/50cursor-pointer">
<TableCellclassName="font-mediumfont-mono">{case_.id}</TableCell>
<TableCell>{case_.customer}</TableCell>
<TableCellclassName="font-monotext-xs">{case_.vin}</TableCell>
<TableCell>{getStatusBadge(case_.status)}</TableCell>
<TableCell>{getPriorityBadge(case_.priority)}</TableCell>
<TableCell>{case_.assignedTech}</TableCell>
<TableCell>
<Buttonvariant="ghost"size="sm">
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
<divclassName="space-y-6">
{/*QuickActions*/}
<Card>
<CardHeader>
<CardTitleclassName="text-lg">QuickActions</CardTitle>
</CardHeader>
<CardContentclassName="space-y-3">
<Buttonvariant="outline"className="w-fulljustify-start">
<CarclassName="mr-2h-4w-4"/>
RegisterNewVehicle
</Button>
<Buttonvariant="outline"className="w-fulljustify-start">
<FileTextclassName="mr-2h-4w-4"/>
CreateWarrantyCase
</Button>
<Buttonvariant="outline"className="w-fulljustify-start">
<UsersclassName="mr-2h-4w-4"/>
AssignTechnician
</Button>
<Buttonvariant="outline"className="w-fulljustify-start">
<PackageclassName="mr-2h-4w-4"/>
TrackPartShipment
</Button>
</CardContent>
</Card>

{/*ActivityFeed*/}
<Card>
<CardHeader>
<CardTitleclassName="text-lgflexitems-centerspace-x-2">
<ActivityclassName="h-4w-4"/>
<span>RecentActivity</span>
</CardTitle>
</CardHeader>
<CardContent>
<divclassName="space-y-4">
<divclassName="flexitems-startspace-x-3">
<divclassName="w-2h-2bg-successrounded-fullmt-2"></div>
<divclassName="flex-1">
<pclassName="text-sm">CaseWC-25-09-001approvedbymanufacturer</p>
<pclassName="text-xstext-muted-foreground">2hoursago</p>
</div>
</div>
<divclassName="flexitems-startspace-x-3">
<divclassName="w-2h-2bg-warningrounded-fullmt-2"></div>
<divclassName="flex-1">
<pclassName="text-sm">PartsshipmentPS-2025-001intransit</p>
<pclassName="text-xstext-muted-foreground">4hoursago</p>
</div>
</div>
<divclassName="flexitems-startspace-x-3">
<divclassName="w-2h-2bg-primaryrounded-fullmt-2"></div>
<divclassName="flex-1">
<pclassName="text-sm">NewtechnicianassignedtoCaseWC-25-09-003</p>
<pclassName="text-xstext-muted-foreground">6hoursago</p>
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