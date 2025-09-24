import { useState } from"react";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Badge } from"@/components/ui/badge";
import { Input } from"@/components/ui/input";
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from"@/components/ui/select";
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from"@/components/ui/table";
import { Calendar } from"@/components/ui/calendar";
import { Popover,PopoverContent,PopoverTrigger } from"@/components/ui/popover";
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
 } from"lucide-react";
import { format } from"date-fns";
import { cn } from"@/lib/utils";

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
serviceCenter:"VinFastServiceCenterHCM",
serviceCenterCode:"VSC-HCM-01",
customerName:"NguyễnVănA",
vin:"1HGBH41JXMN109186",
vehicleModel:"VinFastVF82023",
issue:"BatteryPerformanceIssue",
status:"pending-review",
priority:"high",
dateSubmitted:"2024-01-16",
lastUpdated:"2024-01-1614:30",
estimatedCost:18500000,
reportsCount:2,
partsRequired:3,
warrantyValid:true,
daysInQueue:2
},
{
id:"WC-2024-003",
serviceCenter:"VinFastServiceCenterDaNang",
serviceCenterCode:"VSC-DN-01",
customerName:"HoàngMinhE",
vin:"1N4AL11D75C109151",
vehicleModel:"VinFastVF92023",
issue:"ChargingSystemError",
status:"pending-review",
priority:"medium",
dateSubmitted:"2024-01-15",
lastUpdated:"2024-01-1516:45",
estimatedCost:12000000,
reportsCount:1,
partsRequired:2,
warrantyValid:true,
daysInQueue:3
},
{
id:"WC-2024-007",
serviceCenter:"VinFastServiceCenterHanoi",
serviceCenterCode:"VSC-HN-01",
customerName:"TrầnThịB",
vin:"WVWZZZ1JZ3W987654",
vehicleModel:"VinFastVF82023",
issue:"MotorControllerMalfunction",
status:"under-review",
priority:"critical",
dateSubmitted:"2024-01-14",
lastUpdated:"2024-01-1610:20",
estimatedCost:25000000,
reportsCount:3,
partsRequired:1,
warrantyValid:true,
daysInQueue:4
},
{
id:"WC-2024-008",
serviceCenter:"VinFastServiceCenterCanTho",
serviceCenterCode:"VSC-CT-01",
customerName:"LêVănC",
vin:"JM1BK32F781111111",
vehicleModel:"VinFastVF92023",
issue:"SoftwareUpdateRequired",
status:"pending-review",
priority:"low",
dateSubmitted:"2024-01-13",
lastUpdated:"2024-01-1309:30",
estimatedCost:500000,
reportsCount:1,
partsRequired:0,
warrantyValid:true,
daysInQueue:5
},
{
id:"WC-2024-009",
serviceCenter:"VinFastServiceCenterHCM",
serviceCenterCode:"VSC-HCM-02",
customerName:"PhạmThịD",
vin:"WVWZZZ1JZ3W555555",
vehicleModel:"VinFastVF82023",
issue:"ClimateControlIssue",
status:"pending-review",
priority:"medium",
dateSubmitted:"2024-01-16",
lastUpdated:"2024-01-1608:15",
estimatedCost:3200000,
reportsCount:1,
partsRequired:2,
warrantyValid:false,
daysInQueue:2
}
];

const serviceCenters=[
"VinFastServiceCenterHCM",
"VinFastServiceCenterHanoi",
"VinFastServiceCenterDaNang",
"VinFastServiceCenterCanTho"
];

const getStatusBadge=(status))=>{
const statusConfig={
"pending-review":{variant:"warning",text:"Chờduyệt",icon:Clock},
"under-review":{variant:"secondary",text:"Đangduyệt",icon:Eye},
"approved":{variant:"success",text:"Đãduyệt",icon:CheckCircle},
"rejected":{variant:"destructive",text:"Từchối",icon:XCircle}
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
critical:{variant:"destructive",text:"Khẩncấp"},
high:{variant:"warning",text:"Cao"},
medium:{variant:"secondary",text:"Trungbình"},
low:{variant:"outline",text:"Thấp"}
};

const config=priorityConfig[priorityaskeyoftypeofpriorityConfig];
if(!config)returnnull;

return<Badgevariant={config.variant}className="text-xs">{config.text}</Badge>;
};

const formatCurrency=(amount))=>{
returnnewIntl.NumberFormat('vi-VN',{
style:'currency',
currency:'VND'
}).format(amount);
};

const filteredClaims=pendingClaims.filter(claim=>{
const matchesSearch=
claim.id.toLowerCase().includes(searchTerm.toLowerCase())||
claim.vin.toLowerCase().includes(searchTerm.toLowerCase())||
claim.customerName.toLowerCase().includes(searchTerm.toLowerCase())||
claim.serviceCenter.toLowerCase().includes(searchTerm.toLowerCase());

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
value:pendingClaims.filter(c=>c.priority==="critical"||c.priority==="high").length.toString(),
change:"Urgentattention",
icon:AlertCircle,
color:"text-destructive"
},
{
title:"TotalValue",
value:"₫"+(pendingClaims.reduce((sum,c)=>sum+c.estimatedCost,0)/1000000).toFixed(1)+"M",
change:"Estimatedcosts",
icon:FileText,
color:"text-success"
}
];

return(
<divclassName="space-y-6">
{/*Header*/}
<divclassName="flexitems-centerjustify-between">
<div>
<h1className="text-2xlfont-boldtext-foreground">ClaimReviewQueue</h1>
<pclassName="text-muted-foreground">
Reviewandapprovewarrantyclaimsfrom servicecenters
</p>
</div>
</div>

{/*StatisticsCards*/}
<divclassName="gridgap-4md:grid-cols-4">
{stats.map((stat)=>{
const Icon=stat.icon;
return(
<Cardkey={stat.title}className="shadow-elegant">
<CardContentclassName="p-4">
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

{/*Filters*/}
<CardclassName="shadow-elegant">
<CardHeader>
<CardTitleclassName="text-lg">Filters&Search</CardTitle>
</CardHeader>
<CardContent>
<divclassName="gridgap-4md:grid-cols-2lg:grid-cols-5">
{/*Search*/}
<divclassName="relative">
<SearchclassName="absoluteleft-3top-3h-4w-4text-muted-foreground"/>
<Input
placeholder="SearchCase,VIN,Customer..."
value={searchTerm}
onChange={(e)=>setSearchTerm(e.target.value)}
className="pl-10"
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
<PopoverTriggerasChild>
<Button
variant="outline"
className={cn(
"justify-starttext-leftfont-normal",
!dateFrom&&"text-muted-foreground"
)}
>
<CalendarIconclassName="mr-2h-4w-4"/>
{dateFromformat(dateFrom,"PPP"):"FromDate"}
</Button>
</PopoverTrigger>
<PopoverContentclassName="w-autop-0" align="start">
<Calendar
mode="single"
selected={dateFrom}
onSelect={setDateFrom}
initialFocus
className="pointer-events-auto"
/>
</PopoverContent>
</Popover>

{/*DateTo*/}
<Popover>
<PopoverTriggerasChild>
<Button
variant="outline"
className={cn(
"justify-starttext-leftfont-normal",
!dateTo&&"text-muted-foreground"
)}
>
<CalendarIconclassName="mr-2h-4w-4"/>
{dateToformat(dateTo,"PPP"):"ToDate"}
</Button>
</PopoverTrigger>
<PopoverContentclassName="w-autop-0" align="start">
<Calendar
mode="single"
selected={dateTo}
onSelect={setDateTo}
initialFocus
className="pointer-events-auto"
/>
</PopoverContent>
</Popover>
</div>
</CardContent>
</Card>

{/*ResultsSummary*/}
<divclassName="flexitems-centerjustify-betweentext-smtext-muted-foreground">
<span>
Showing{filteredClaims.length}of{pendingClaims.length}claims
</span>
<divclassName="flexitems-centerspace-x-2">
<FilterclassName="h-4w-4"/>
<span>Activefilters:{[statusFilter,serviceCenterFilter].filter(f=>f!=="all").length}</span>
</div>
</div>

{/*ClaimsTable*/}
<CardclassName="shadow-elegant">
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
<TableHead>CaseID</TableHead>
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
<TableRowkey={claim.id}className="hover:bg-muted/50">
<TableCellclassName="font-medium">{claim.id}</TableCell>
<TableCell>
<divclassName="flexitems-centerspace-x-2">
<BuildingclassName="h-4w-4text-muted-foreground"/>
<div>
<pclassName="text-smfont-medium">{claim.serviceCenterCode}</p>
<pclassName="text-xstext-muted-foreground">{claim.serviceCenter}</p>
</div>
</div>
</TableCell>
<TableCell>
<divclassName="flexitems-centerspace-x-2">
<div>
<pclassName="text-smfont-medium">{claim.customerName}</p>
<pclassName="text-xstext-muted-foregroundfont-mono">{claim.vin}</p>
</div>
</div>
</TableCell>
<TableCell>
<divclassName="flexitems-centerspace-x-2">
<CarclassName="h-4w-4text-muted-foreground"/>
<spanclassName="text-sm">{claim.vehicleModel}</span>
</div>
</TableCell>
<TableCell>
<div>
<pclassName="text-smfont-medium">{claim.issue}</p>
<pclassName="text-xstext-muted-foreground">
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
<Badgevariant={claim.warrantyValid"success":"destructive"}className="text-xs">
{claim.warrantyValid"Valid":"Expired"}
</Badge>
</TableCell>
<TableCellclassName="font-medium">
{formatCurrency(claim.estimatedCost)}
</TableCell>
<TableCell>
<Badgevariant={claim.daysInQueue>3"warning":"outline"}className="text-xs">
{claim.daysInQueue}days
</Badge>
</TableCell>
<TableCell>
<Button
variant="gradient"
size="sm"
onClick={()=>onReviewClaim.(claim.id)}
>
<EyeclassName="h-4w-4mr-1"/>
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