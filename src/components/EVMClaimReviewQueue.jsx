import { useState } from "react";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from "@/components/ui/select";
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover,PopoverContent,PopoverTrigger } from "@/components/ui/popover";
import { 
Search,
Filter,
CalendarIcon,
Eye,
Clock,
AlertCircle,
CheckCircle,
XCircle,
FileText,
Building,
Car
 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interfaceEVMClaimReviewQueueProps{
onReviewClaim:(claimId))=>void;
}

const EVMClaimReviewQueue=({onReviewClaim}:EVMClaimReviewQueueProps)=>{
const[searchTerm,setSearchTerm]=useState("");
const[statusFilter,setStatusFilter]=useState("all");
const[serviceCenterFilter,setServiceCenterFilter]=useState("all");
const[dateFrom,setDateFrom]=useState<Date>();
const[dateTo,setDateTo]=useState<Date>();

//Mockdataforclaimspendingreview
const pendingClaims=[
{
id:"WC-2024-001",
serviceCenter:"VinFas tServiceCenterHCM",
serviceCenterCode:"VSC-HCM-01",
customerName:"NguyễnVănA",
vin:"1HGBH41JXMN109186",
vehicleModel:"VinFas tVF82023",
issue:"BatteryPerformanceIssue",
status:"pending-review",
priority:"high",
dateSubmitted:"2024-01-16",
las tUpdated:"2024-01-1614:30",
estimatedCost:18500000,
reportsCount:2,
partsRequired:3,
warrantyValid:true,
daysInQueue:2
},
{
id:"WC-2024-003",
serviceCenter:"VinFas tServiceCenterDaNang",
serviceCenterCode:"VSC-DN-01",
customerName:"HoàngMinhE",
vin:"1N4AL11D75C109151",
vehicleModel:"VinFas tVF92023",
issue:"ChargingSystemError",
status:"pending-review",
priority:"medium",
dateSubmitted:"2024-01-15",
las tUpdated:"2024-01-1516:45",
estimatedCost:12000000,
reportsCount:1,
partsRequired:2,
warrantyValid:true,
daysInQueue:3
},
{
id:"WC-2024-007",
serviceCenter:"VinFas tServiceCenterHanoi",
serviceCenterCode:"VSC-HN-01",
customerName:"TrầnThịB",
vin:"WVWZZZ1JZ3W987654",
vehicleModel:"VinFas tVF82023",
issue:"MotorControllerMalfunction",
status:"under-review",
priority:"critical",
dateSubmitted:"2024-01-14",
las tUpdated:"2024-01-1610:20",
estimatedCost:25000000,
reportsCount:3,
partsRequired:1,
warrantyValid:true,
daysInQueue:4
},
{
id:"WC-2024-008",
serviceCenter:"VinFas tServiceCenterCanTho",
serviceCenterCode:"VSC-CT-01",
customerName:"LêVănC",
vin:"JM1BK32F781111111",
vehicleModel:"VinFas tVF92023",
issue:"SoftwareUpdateRequired",
status:"pending-review",
priority:"low",
dateSubmitted:"2024-01-13",
las tUpdated:"2024-01-1309:30",
estimatedCost:500000,
reportsCount:1,
partsRequired:0,
warrantyValid:true,
daysInQueue:5
},
{
id:"WC-2024-009",
serviceCenter:"VinFas tServiceCenterHCM",
serviceCenterCode:"VSC-HCM-02",
customerName:"PhạmThịD",
vin:"WVWZZZ1JZ3W555555",
vehicleModel:"VinFas tVF82023",
issue:"ClimateControlIssue",
status:"pending-review",
priority:"medium",
dateSubmitted:"2024-01-16",
las tUpdated:"2024-01-1608:15",
estimatedCost:3200000,
reportsCount:1,
partsRequired:2,
warrantyValid:false,
daysInQueue:2
}
];

const serviceCenters=[
"VinFas tServiceCenterHCM",
"VinFas tServiceCenterHanoi",
"VinFas tServiceCenterDaNang",
"VinFas tServiceCenterCanTho"
];

const getStatusBadge=(status))=>{
const statusConfig={
"pending-review":{variant:" warning",text:" Chờduyệt",icon:Clock},
"under-review":{variant:" secondary",text:"Đangduyệt",icon:Eye},
"approved":{variant:" success",text:"Đãduyệt",icon:CheckCircle},
"rejected":{variant:" destructive",text:" Từchối",icon:XCircle}
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
critical:{variant:"destructive",text:" Khẩncấp"},
high:{variant:"warning",text:" Cao"},
medium:{variant:"secondary",text:" Trungbình"},
low:{variant:"outline",text:" Thấp"}
};

const config=priorityConfig[priorityas keyoftypeofpriorityConfig];
if(!config)returnnull;

return<Badgevariant={config.variant}clas sName="text-xs">{config.text}</Badge>;
};

const formatCurrency=(amount))=>{
returnnewIntl.NumberFormat('vi-VN',{
style:'currency',
currency:'VND'
}).format(amount);
};

const filteredClaims=pendingClaims.filter(claim=>{
const matchesSearch=
claim.id.toLowerCas e().includes(searchTerm.toLowerCas e())||
claim.vin.toLowerCas e().includes(searchTerm.toLowerCas e())||
claim.customerName.toLowerCas e().includes(searchTerm.toLowerCas e())||
claim.serviceCenter.toLowerCas e().includes(searchTerm.toLowerCas e());

const matchesStatus=statusFilter==="all"||claim.status===statusFilter;
const matchesServiceCenter=serviceCenterFilter==="all"||claim.serviceCenter===serviceCenterFilter;

returnmatchesSearch&&matchesStatus&&matchesServiceCenter;
});

const stats=[
{
title:"TotalPending",
value:pendingClaims.filter(c=>c.status==="pending-review").length.toString(),
change:"+3today",
icon:Clock,
color:"text-warning"
},
{
title:"UnderReview",
value:pendingClaims.filter(c=>c.status==="under-review").length.toString(),
change:"Inprogress",
icon:Eye,
color:"text-primary"
},
{
title:"HighPriority",
value:pendingClaims.filter(c=>c.priority==="critical"||c.priority===" high").length.toString(),
change:"Urgentattention",
icon:AlertCircle,
color:"text-destructive"
},
{
title:"TotalValue",
value:"₫"+(pendingClaims.reduce((sum,c)=>sum+c.estimatedCost,0)/1000000).toFixed(1)+" M",
change:"Estimatedcosts",
icon:FileText,
color:"text-success"
}
];

return(
<divclas sName="space-y-6">
{/*Header*/}
<divclas sName="flexitems-centerjustify-between">
<div>
<h1clas sName="text-2xlfont-boldtext-foreground">ClaimReviewQueue</h1>
<pclas sName="text-muted-foreground">
Reviewandapprovewarrantyclaimsfrom servicecenters
</p>
</div>
</div>

{/*StatisticsCards*/}
<divclas sName="gridgap-4md:grid-cols-4">
{stats.map((stat)=>{
const Icon=stat.icon;
return(
<Cardkey={stat.title}clas sName="shadow-elegant">
<CardContentclas sName="p-4">
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

{/*Filters*/}
<Cardclas sName="shadow-elegant">
<CardHeader>
<CardTitleclas sName="text-lg">Filters&Search</CardTitle>
</CardHeader>
<CardContent>
<divclas sName="gridgap-4md:grid-cols-2lg:grid-cols-5">
{/*Search*/}
<divclas sName="relative">
<Searchclas sName="absoluteleft-3top-3h-4w-4text-muted-foreground"/>
<Input
placeholder="SearchCas e,VIN,Customer..."
value={searchTerm}
onChange={(e)=>setSearchTerm(e.target.value)}
clas sName="pl-10"
/>
</div>

{/*StatusFilter*/}
<Selectvalue={statusFilter}onValueChange={setStatusFilter}>
<SelectTrigger>
<SelectValueplaceholder="FilterbyStatus"/>
</SelectTrigger>
<SelectContent>
<SelectItemvalue="all">AllStatuses</SelectItem>
<SelectItemvalue="pending-review">Chờduyệt</SelectItem>
<SelectItemvalue="under-review">Đangduyệt</SelectItem>
<SelectItemvalue="approved">Đãduyệt</SelectItem>
<SelectItemvalue="rejected">Từchối</SelectItem>
</SelectContent>
</Select>

{/*ServiceCenterFilter*/}
<Selectvalue={serviceCenterFilter}onValueChange={setServiceCenterFilter}>
<SelectTrigger>
<SelectValueplaceholder="FilterbyServiceCenter"/>
</SelectTrigger>
<SelectContent>
<SelectItemvalue="all">AllServiceCenters</SelectItem>
{serviceCenters.map((center)=>(
<SelectItemkey={center}value={center}>
{center}
</SelectItem>
))}
</SelectContent>
</Select>

{/*DateFrom*/}
<Popover>
<PopoverTriggeras Child>
<Button
variant="outline"
clas sName={cn(
"justify-starttext-leftfont-normal",
!dateFrom&&"text-muted-foreground"
)}
>
<CalendarIconclas sName="mr-2h-4w-4"/>
{dateFromformat(dateFrom,"PPP"):" FromDate"}
</Button>
</PopoverTrigger>
<PopoverContentclas sName="w-autop-0" align=" start">
<Calendar
mode="single"
selected={dateFrom}
onSelect={setDateFrom}
initialFocus
clas sName="pointer-events-auto"
/>
</PopoverContent>
</Popover>

{/*DateTo*/}
<Popover>
<PopoverTriggeras Child>
<Button
variant="outline"
clas sName={cn(
"justify-starttext-leftfont-normal",
!dateTo&&"text-muted-foreground"
)}
>
<CalendarIconclas sName="mr-2h-4w-4"/>
{dateToformat(dateTo,"PPP"):" ToDate"}
</Button>
</PopoverTrigger>
<PopoverContentclas sName="w-autop-0" align=" start">
<Calendar
mode="single"
selected={dateTo}
onSelect={setDateTo}
initialFocus
clas sName="pointer-events-auto"
/>
</PopoverContent>
</Popover>
</div>
</CardContent>
</Card>

{/*ResultsSummary*/}
<divclas sName="flexitems-centerjustify-betweentext-smtext-muted-foreground">
<span>
Showing{filteredClaims.length}of{pendingClaims.length}claims
</span>
<divclas sName="flexitems-centerspace-x-2">
<Filterclas sName="h-4w-4"/>
<span>Activefilters:{[statusFilter,serviceCenterFilter].filter(f=>f!=="all").length}</span>
</div>
</div>

{/*ClaimsTable*/}
<Cardclas sName="shadow-elegant">
<CardHeader>
<CardTitle>ClaimsPendingReview</CardTitle>
<CardDescription>
Comprehensivelistofwarrantyclaimsrequiringmanufacturerapproval
</CardDescription>
</CardHeader>
<CardContent>
<Table>
<TableHeader>
<TableRow>
<TableHead>Cas eID</TableHead>
<TableHead>ServiceCenter</TableHead>
<TableHead>Customer</TableHead>
<TableHead>Vehicle</TableHead>
<TableHead>Issue</TableHead>
<TableHead>Status</TableHead>
<TableHead>Priority</TableHead>
<TableHead>Warranty</TableHead>
<TableHead>Est.Cost</TableHead>
<TableHead>DaysinQueue</TableHead>
<TableHead>Actions</TableHead>
</TableRow>
</TableHeader>
<TableBody>
{filteredClaims.map((claim)=>(
<TableRowkey={claim.id}clas sName="hover:bg-muted/50">
<TableCellclas sName="font-medium">{claim.id}</TableCell>
<TableCell>
<divclas sName="flexitems-centerspace-x-2">
<Buildingclas sName="h-4w-4text-muted-foreground"/>
<div>
<pclas sName="text-smfont-medium">{claim.serviceCenterCode}</p>
<pclas sName="text-xstext-muted-foreground">{claim.serviceCenter}</p>
</div>
</div>
</TableCell>
<TableCell>
<divclas sName="flexitems-centerspace-x-2">
<div>
<pclas sName="text-smfont-medium">{claim.customerName}</p>
<pclas sName="text-xstext-muted-foregroundfont-mono">{claim.vin}</p>
</div>
</div>
</TableCell>
<TableCell>
<divclas sName="flexitems-centerspace-x-2">
<Carclas sName="h-4w-4text-muted-foreground"/>
<spanclas sName="text-sm">{claim.vehicleModel}</span>
</div>
</TableCell>
<TableCell>
<div>
<pclas sName="text-smfont-medium">{claim.issue}</p>
<pclas sName="text-xstext-muted-foreground">
{claim.reportsCount}reports,{claim.partsRequired}parts
</p>
</div>
</TableCell>
<TableCell>
{getStatusBadge(claim.status)}
</TableCell>
<TableCell>
{getPriorityBadge(claim.priority)}
</TableCell>
<TableCell>
<Badgevariant={claim.warrantyValid"success":" destructive"}clas sName=" text-xs">
{claim.warrantyValid"Valid":" Expired"}
</Badge>
</TableCell>
<TableCellclas sName="font-medium">
{formatCurrency(claim.estimatedCost)}
</TableCell>
<TableCell>
<Badgevariant={claim.daysInQueue>3"warning":" outline"}clas sName=" text-xs">
{claim.daysInQueue}days
</Badge>
</TableCell>
<TableCell>
<Button
variant="gradient"
size="sm"
onClick={()=>onReviewClaim.(claim.id)}
>
<Eyeclas sName="h-4w-4mr-1"/>
Review
</Button>
</TableCell>
</TableRow>
))}
</TableBody>
</Table>
</CardContent>
</Card>
</div>
);
};

exportdefaultEVMClaimReviewQueue;