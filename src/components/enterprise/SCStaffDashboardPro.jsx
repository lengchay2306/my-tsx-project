import { useState } from "react";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
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
FileText,
ClipboardList,
HandHeart
 } from "lucide-react";

interfaceKPICardProps{
title:string;
value:string|number;
change:string;
trend:"up"|" down"|" neutral";
icon:React.ElementType;
isLoading:boolean;
}

const KPICard=({title,value,change,trend,icon:Icon,isLoading}:KPICardProps)=>{
if(isLoading){
return(
<Cardclas sName="hover:shadow-eleganttransition-allduration-200">
<CardContentclas sName="p-6">
<divclas sName="flexitems-centerjustify-between">
<divclas sName="space-y-2flex-1">
<Skeletonclas sName="h-4w-24"/>
<Skeletonclas sName="h-8w-16"/>
<Skeletonclas sName="h-3w-20"/>
</div>
<Skeletonclas sName="h-12w-12rounded-lg"/>
</div>
</CardContent>
</Card>
);
}

return(
<Cardclas sName="hover:shadow-eleganttransition-allduration-200border-l-4border-l-primary">
<CardContentclas sName="p-6">
<divclas sName="flexitems-centerjustify-between">
<div>
<pclas sName="text-smfont-mediumtext-muted-foreground">{title}</p>
<divclas sName="flexitems-centerspace-x-2mt-2">
<h3clas sName="text-3xlfont-boldtext-foreground">{value}</h3>
{change&&(
<spanclas sName={`text-smflexitems-centerfont-medium${
trend==='up''text-success':trend==='down''text-destructive':'text-muted-foreground'
}`}>
<TrendingUpclas sName="h-3w-3mr-1"/>
{change}
</span>
)}
</div>
</div>
<divclas sName="p-4rounded-lgbg-primary/10">
<Iconclas sName="h-8w-8text-primary"/>
</div>
</div>
</CardContent>
</Card>
);
};

const StatusBadge=({status}:{status:string})=>{
const statusConfig={
"pending":{variant:" secondary",text:" Pending",clas sName:""},
"in-repair":{variant:" default",text:" InRepair",clas sName:""},
"awaiting-parts":{variant:" outline",text:" AwaitingParts",clas sName:" border-warningtext-warning"},
"awaiting-handover":{variant:" outline",text:" AwaitingHandover",clas sName:" border-infotext-infobg-info/5"},
"manufacturer-review":{variant:" outline",text:" ManufacturerReview",clas sName:" border-warningtext-warningbg-warning/5"},
"approved":{variant:" outline",text:" Approved",clas sName:" border-successtext-successbg-success/5"},
"completed":{variant:" outline",text:" Completed",clas sName:" border-successtext-successbg-success/10"}
};

const config=statusConfig[statusas keyoftypeofstatusConfig];
returnconfig(
<Badgevariant={config.variant}clas sName={config.clas sName}>
{config.text}
</Badge>
):(
<Badgevariant="secondary">{status}</Badge>
);
};

const EmptyState=()=>(
<divclas sName="flexflex-colitems-centerjustify-centerpy-12text-center">
<ClipboardListclas sName="h-16w-16text-muted-foreground/50mb-4"/>
<h3clas sName="text-lgfont-mediumtext-foregroundmb-2">Noactivecas es</h3>
<pclas sName="text-smtext-muted-foregroundmb-6">Getstartedbycreatingyourfirstwarrantycas e</p>
<Button>
<Plusclas sName="mr-2h-4w-4"/>
CreateNewCas e
</Button>
</div>
);

const SCStaffDashboardPro=()=>{
const[searchQuery,setSearchQuery]=useState("");
const[isLoading,setIsLoading]=useState(false);

//Mockdataforactivecas es
const activeCas es=[
{
id:"WC-25-09-001",
customer:"NguyễnVănAn",
vin:"VF8ABC123456789",
status:"manufacturer-review",
as signedTech:"TrầnMinhBảo",
dateCreated:"2025-01-15",
model:"VF8Plus"
},
{
id:"WC-25-09-002",
customer:"LêThịCẩm",
vin:"VF9DEF987654321",
status:"awaiting-parts",
as signedTech:"PhạmVănĐức",
dateCreated:"2025-01-14",
model:"VF9Eco"
},
{
id:"WC-25-09-003",
customer:"HoàngMinhElip",
vin:"VF8GHI456789123",
status:"awaiting-handover",
as signedTech:"NguyễnThịPhương",
dateCreated:"2025-01-13",
model:"VF8Plus"
},
{
id:"WC-25-09-004",
customer:"TrầnQuốcHuy",
vin:"VF9JKL789012345",
status:"in-repair",
as signedTech:"LêVănGiang",
dateCreated:"2025-01-12",
model:"VF9Premium"
}
];

const filteredCas es=activeCas es.filter(cas e_=>
cas e_.customer.toLowerCas e().includes(searchQuery.toLowerCas e())||
cas e_.vin.toLowerCas e().includes(searchQuery.toLowerCas e())||
cas e_.id.toLowerCas e().includes(searchQuery.toLowerCas e())
);

return(
<divclas sName="space-y-8p-6">
{/*Header*/}
<divclas sName="flexitems-centerjustify-between">
<div>
<h1clas sName="text-4xlfont-boldtext-foreground">ServiceCenterDashboard</h1>
<pclas sName="text-muted-foregroundtext-lgmt-1">Monitorwarrantycas esandserviceoperations</p>
</div>
<divclas sName="flexitems-centerspace-x-3">
<Buttonvariant="outline" size="lg">
<FileTextclas sName="mr-2h-4w-4"/>
GenerateReport
</Button>
<Buttonsize="lg" clas sName="bg-primaryhover:bg-primary/90">
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
isLoading={isLoading}
/>
<KPICard
title="PendingManufacturerApproval"
value={8}
change="+2thisweek"
trend="up"
icon={Clock}
isLoading={isLoading}
/>
<KPICard
title="AwaitingParts"
value={6}
change="-1today"
trend="down"
icon={Package}
isLoading={isLoading}
/>
<KPICard
title="AwaitingCustomerHandover"
value={3}
change="+1today"
trend="up"
icon={HandHeart}
isLoading={isLoading}
/>
</div>

<divclas sName="gridgap-8lg:grid-cols-3">
{/*MainContent-ActiveCas es*/}
<divclas sName="lg:col-span-2">
<Card>
<CardHeaderclas sName="pb-4">
<divclas sName="flexitems-centerjustify-between">
<div>
<CardTitleclas sName="text-2xlfont-bold">ActiveCas es</CardTitle>
<CardDescriptionclas sName="text-bas e">
Cas escurrentlybeingprocessedinyourservicecenter
</CardDescription>
</div>
<Buttonvariant="ghost" size="sm" clas sName="text-primary">
ViewAllCas es
<ArrowUpRightclas sName="ml-1h-4w-4"/>
</Button>
</div>
</CardHeader>
<CardContent>
<divclas sName="space-y-6">
<divclas sName="flexitems-centerspace-x-4">
<divclas sName="relativeflex-1max-w-md">
<Searchclas sName="absoluteleft-3top-3h-4w-4text-muted-foreground"/>
<Input
placeholder="SearchbyCas eID,VIN,orcustomer..."
value={searchQuery}
onChange={(e)=>setSearchQuery(e.target.value)}
clas sName="pl-10h-12"
/>
</div>
</div>

{filteredCas es.length===0(
<EmptyState/>
):(
<divclas sName="borderrounded-lg">
<Table>
<TableHeader>
<TableRowclas sName="bg-muted/30">
<TableHeadclas sName="font-semibold">Cas eID</TableHead>
<TableHeadclas sName="font-semibold">Customer</TableHead>
<TableHeadclas sName="font-semibold">Vehicle</TableHead>
<TableHeadclas sName="font-semibold">Status</TableHead>
<TableHeadclas sName="font-semibold">AssignedTech</TableHead>
<TableHeadclas sName="font-semibold">DateCreated</TableHead>
<TableHeadclas sName="font-semibold">Actions</TableHead>
</TableRow>
</TableHeader>
<TableBody>
{filteredCas es.map((cas e_)=>(
<TableRow
key={cas e_.id}
clas sName="hover:bg-muted/50cursor-pointertransition-colors"
>
<TableCellclas sName="font-monofont-mediumtext-primary">
{cas e_.id}
</TableCell>
<TableCellclas sName="font-medium">{cas e_.customer}</TableCell>
<TableCell>
<div>
<divclas sName="font-mediumtext-sm">{cas e_.model}</div>
<divclas sName="font-monotext-xstext-muted-foreground">
{cas e_.vin}
</div>
</div>
</TableCell>
<TableCell>
<StatusBadgestatus={cas e_.status}/>
</TableCell>
<TableCellclas sName="text-sm">{cas e_.as signedTech}</TableCell>
<TableCellclas sName="text-smtext-muted-foreground">
{cas e_.dateCreated}
</TableCell>
<TableCell>
<Buttonvariant="ghost" size="sm" clas sName="text-primaryhover:text-primary/80">
ViewDetails
</Button>
</TableCell>
</TableRow>
))}
</TableBody>
</Table>
</div>
)}
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
<Buttonvariant="outline" clas sName="w-fulljustify-starth-12text-left">
<Carclas sName="mr-3h-4w-4"/>
RegisterNewVehicle
</Button>
<Buttonvariant="outline" clas sName="w-fulljustify-starth-12text-left">
<FileTextclas sName="mr-3h-4w-4"/>
CreateWarrantyCas e
</Button>
<Buttonvariant="outline" clas sName="w-fulljustify-starth-12text-left">
<Usersclas sName="mr-3h-4w-4"/>
AssignTechnician
</Button>
<Buttonvariant="outline" clas sName="w-fulljustify-starth-12text-left">
<Packageclas sName="mr-3h-4w-4"/>
TrackPartShipment
</Button>
</CardContent>
</Card>

{/*RecentActivity*/}
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
<divclas sName="w-2h-2bg-successrounded-fullmt-2flex-shrink-0"></div>
<divclas sName="flex-1min-w-0">
<pclas sName="text-smtext-foreground">Cas eWC-25-09-001approvedbymanufacturer</p>
<pclas sName="text-xstext-muted-foreground">2hoursago</p>
</div>
</div>
<divclas sName="flexitems-startspace-x-3">
<divclas sName="w-2h-2bg-warningrounded-fullmt-2flex-shrink-0"></div>
<divclas sName="flex-1min-w-0">
<pclas sName="text-smtext-foreground">PartsshipmentPS-2025-001intransit</p>
<pclas sName="text-xstext-muted-foreground">4hoursago</p>
</div>
</div>
<divclas sName="flexitems-startspace-x-3">
<divclas sName="w-2h-2bg-primaryrounded-fullmt-2flex-shrink-0"></div>
<divclas sName="flex-1min-w-0">
<pclas sName="text-smtext-foreground">Newtechnicianas signedtoCas eWC-25-09-003</p>
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

exportdefaultSCStaffDashboardPro;