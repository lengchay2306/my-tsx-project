import { useState } from"react";
import { Card,CardContent,CardHeader,CardTitle } from"@/components/ui/card";
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
Plus,
Download,
CalendarasCalendarIcon,
Eye,
MoreHorizontal,
ArrowUpDown,
RefreshCw
 } from"lucide-react";
import { format } from"date-fns";

interfaceCaseData{
id:string;
customer:string;
vin:string;
status:string;
dateCreated:string;
lastUpdated:string;
assignedTech:string;
finalCost:number|null;
priority:"high"|"medium"|"low";
vehicleModel:string;
}

const EnhancedCaseManagement=()=>{
const[searchQuery,setSearchQuery]=useState("");
const[statusFilter,setStatusFilter]=useState("all");
const[techFilter,setTechFilter]=useState("all");
const[priorityFilter,setPriorityFilter]=useState("all");
const[dateFrom,setDateFrom]=useState<Date|undefined>();
const[dateTo,setDateTo]=useState<Date|undefined>();
const[sortField,setSortField]=useState("dateCreated");
const[sortOrder,setSortOrder]=useState<"asc"|"desc">("desc");

//Mockcasedata
constmockCases:CaseData[]=[
{
id:"WC-25-09-001",
customer:"NguyễnVănA",
vin:"VF8ABC123456789",
status:"pending-manufacturer",
dateCreated:"2025-01-15",
lastUpdated:"2025-01-1614:30",
assignedTech:"TrầnMinhB",
finalCost:null,
priority:"high",
vehicleModel:"VinFastVF8"
},
{
id:"WC-25-09-002",
customer:"LêThịC",
vin:"VF9DEF987654321",
status:"in-progress",
dateCreated:"2025-01-14",
lastUpdated:"2025-01-1516:45",
assignedTech:"PhạmVănD",
finalCost:null,
priority:"medium",
vehicleModel:"VinFastVF9"
},
{
id:"WC-25-09-003",
customer:"HoàngMinhE",
vin:"VF8GHI456789123",
status:"completed",
dateCreated:"2025-01-13",
lastUpdated:"2025-01-1610:20",
assignedTech:"NguyễnThịF",
finalCost:2500000,
priority:"low",
vehicleModel:"VinFastVF8"
},
{
id:"WC-25-09-004",
customer:"TrầnVănG",
vin:"VF9JKL789123456",
status:"awaiting-parts",
dateCreated:"2025-01-12",
lastUpdated:"2025-01-1409:15",
assignedTech:"LêMinhH",
finalCost:null,
priority:"high",
vehicleModel:"VinFastVF9"
},
{
id:"WC-25-09-005",
customer:"PhạmThịI",
vin:"VF8MNO123456789",
status:"rejected",
dateCreated:"2025-01-10",
lastUpdated:"2025-01-1111:30",
assignedTech:"VõVănJ",
finalCost:0,
priority:"medium",
vehicleModel:"VinFastVF8"
}
];

const getStatusBadge=(status))=>{
const statusConfig={
"pending-manufacturer":{variant:"pending",text:"PendingManufacturer"},
"awaiting-parts":{variant:"warning",text:"AwaitingParts"},
"in-progress":{variant:"default",text:"InProgress"},
"completed":{variant:"success",text:"Completed"},
"rejected":{variant:"destructive",text:"Rejected"}
};

const config=statusConfig[statusaskeyoftypeofstatusConfig];
returnconfig<Badgevariant={config.variant}>{config.text}</Badge>:null;
};

const getPriorityBadge=(priority:"high"|"medium"|"low")=>{
const priorityConfig={
high:{variant:"destructive",text:"High",className:"bg-destructive/10text-destructive"},
medium:{variant:"warning",text:"Medium",className:"bg-warning/10text-warning-foreground"},
low:{variant:"secondary",text:"Low",className:"bg-mutedtext-muted-foreground"}
};

const config=priorityConfig[priority];
return(
<Badgevariant="outline"className={`text-xs${config.className}`}>
{config.text}
</Badge>
);
};

const formatCurrency=(amount:number|null)=>{
if(amount===null)return"-";
returnnewIntl.NumberFormat('vi-VN',{
style:'currency',
currency:'VND'
}).format(amount);
};

const handleSort=(field))=>{
if(sortField===field){
setSortOrder(sortOrder==="asc""desc":"asc");
}else{
setSortField(field);
setSortOrder("asc");
}
};

const filteredAndSortedCases=mockCases
.filter(case_=>{
const matchesSearch=searchQuery===""||
case_.id.toLowerCase().includes(searchQuery.toLowerCase())||
case_.customer.toLowerCase().includes(searchQuery.toLowerCase())||
case_.vin.toLowerCase().includes(searchQuery.toLowerCase());

const matchesStatus=statusFilter==="all"||case_.status===statusFilter;
const matchesTech=techFilter==="all"||case_.assignedTech===techFilter;
const matchesPriority=priorityFilter==="all"||case_.priority===priorityFilter;

returnmatchesSearch&&matchesStatus&&matchesTech&&matchesPriority;
})
.sort((a,b)=>{
const aValue=a[sortFieldaskeyofCaseData];
const bValue=b[sortFieldaskeyofCaseData];

if(sortOrder==="asc"){
returnaValue<bValue-1:1;
}else{
returnaValue>bValue-1:1;
}
});

return(
<divclassName="space-y-6p-6">
{/*Header*/}
<divclassName="flexitems-centerjustify-between">
<div>
<h1className="text-3xlfont-boldtext-foreground">WarrantyCases</h1>
<pclassName="text-muted-foreground">Manageandtrackallwarrantycases</p>
</div>
<divclassName="flexitems-centerspace-x-3">
<Buttonvariant="outline">
<DownloadclassName="mr-2h-4w-4"/>
Export
</Button>
<Buttonvariant="outline">
<RefreshCwclassName="mr-2h-4w-4"/>
Refresh
</Button>
<Buttonvariant="gradient">
<PlusclassName="mr-2h-4w-4"/>
CreateNewCase
</Button>
</div>
</div>

{/*AdvancedFilters*/}
<Card>
<CardHeader>
<CardTitleclassName="flexitems-centerspace-x-2">
<FilterclassName="h-5w-5"/>
<span>AdvancedFilters</span>
</CardTitle>
</CardHeader>
<CardContent>
<divclassName="gridgap-4md:grid-cols-2lg:grid-cols-6">
{/*Search*/}
<divclassName="lg:col-span-2">
<divclassName="relative">
<SearchclassName="absoluteleft-3top-2.5h-4w-4text-muted-foreground"/>
<Input
placeholder="SearchCaseID,VIN,orCustomer..."
value={searchQuery}
onChange={(e)=>setSearchQuery(e.target.value)}
className="pl-9"
/>
</div>
</div>

{/*StatusFilter*/}
<div>
<Selectvalue={statusFilter}onValueChange={setStatusFilter}>
<SelectTrigger>
<SelectValueplaceholder="Status"/>
</SelectTrigger>
<SelectContent>
<SelectItemvalue="all">AllStatuses</SelectItem>
<SelectItemvalue="pending-manufacturer">PendingManufacturer</SelectItem>
<SelectItemvalue="awaiting-parts">AwaitingParts</SelectItem>
<SelectItemvalue="in-progress">InProgress</SelectItem>
<SelectItemvalue="completed">Completed</SelectItem>
<SelectItemvalue="rejected">Rejected</SelectItem>
</SelectContent>
</Select>
</div>

{/*TechFilter*/}
<div>
<Selectvalue={techFilter}onValueChange={setTechFilter}>
<SelectTrigger>
<SelectValueplaceholder="Technician"/>
</SelectTrigger>
<SelectContent>
<SelectItemvalue="all">AllTechnicians</SelectItem>
<SelectItemvalue="TrầnMinhB">TrầnMinhB</SelectItem>
<SelectItemvalue="PhạmVănD">PhạmVănD</SelectItem>
<SelectItemvalue="NguyễnThịF">NguyễnThịF</SelectItem>
<SelectItemvalue="LêMinhH">LêMinhH</SelectItem>
<SelectItemvalue="VõVănJ">VõVănJ</SelectItem>
</SelectContent>
</Select>
</div>

{/*PriorityFilter*/}
<div>
<Selectvalue={priorityFilter}onValueChange={setPriorityFilter}>
<SelectTrigger>
<SelectValueplaceholder="Priority"/>
</SelectTrigger>
<SelectContent>
<SelectItemvalue="all">AllPriority</SelectItem>
<SelectItemvalue="high">HighPriority</SelectItem>
<SelectItemvalue="medium">MediumPriority</SelectItem>
<SelectItemvalue="low">LowPriority</SelectItem>
</SelectContent>
</Select>
</div>

{/*DateRange*/}
<div>
<Popover>
<PopoverTriggerasChild>
<Buttonvariant="outline"className="w-fulljustify-starttext-leftfont-normal">
<CalendarIconclassName="mr-2h-4w-4"/>
{dateFromformat(dateFrom,"PPP"):"DateRange"}
</Button>
</PopoverTrigger>
<PopoverContentclassName="w-autop-0" align="start">
<Calendar
mode="single"
selected={dateFrom}
onSelect={setDateFrom}
initialFocus
className="p-3pointer-events-auto"
/>
</PopoverContent>
</Popover>
</div>
</div>
</CardContent>
</Card>

{/*CasesTable*/}
<Card>
<CardHeader>
<divclassName="flexitems-centerjustify-between">
<CardTitle>Cases({filteredAndSortedCases.length})</CardTitle>
<divclassName="flexitems-centerspace-x-2text-smtext-muted-foreground">
<span>Showing{filteredAndSortedCases.length}of{mockCases.length}cases</span>
</div>
</div>
</CardHeader>
<CardContent>
<Table>
<TableHeader>
<TableRow>
<TableHead
className="cursor-pointerhover:bg-muted/50"
onClick={()=>handleSort("id")}
>
<divclassName="flexitems-centerspace-x-1">
<span>CaseID</span>
<ArrowUpDownclassName="h-3w-3"/>
</div>
</TableHead>
<TableHead
className="cursor-pointerhover:bg-muted/50"
onClick={()=>handleSort("customer")}
>
<divclassName="flexitems-centerspace-x-1">
<span>Customer</span>
<ArrowUpDownclassName="h-3w-3"/>
</div>
</TableHead>
<TableHead>Vehicle&VIN</TableHead>
<TableHead>Status</TableHead>
<TableHead>Priority</TableHead>
<TableHead
className="cursor-pointerhover:bg-muted/50"
onClick={()=>handleSort("dateCreated")}
>
<divclassName="flexitems-centerspace-x-1">
<span>DateCreated</span>
<ArrowUpDownclassName="h-3w-3"/>
</div>
</TableHead>
<TableHead
className="cursor-pointerhover:bg-muted/50"
onClick={()=>handleSort("lastUpdated")}
>
<divclassName="flexitems-centerspace-x-1">
<span>LastUpdated</span>
<ArrowUpDownclassName="h-3w-3"/>
</div>
</TableHead>
<TableHead>AssignedTech</TableHead>
<TableHeadclassName="text-right">FinalCost</TableHead>
<TableHead>Actions</TableHead>
</TableRow>
</TableHeader>
<TableBody>
{filteredAndSortedCases.map((case_)=>(
<TableRowkey={case_.id}className="hover:bg-muted/50cursor-pointer">
<TableCellclassName="font-mediumfont-mono">{case_.id}</TableCell>
<TableCellclassName="font-medium">{case_.customer}</TableCell>
<TableCell>
<div>
<pclassName="font-mediumtext-sm">{case_.vehicleModel}</p>
<pclassName="font-monotext-xstext-muted-foreground">{case_.vin}</p>
</div>
</TableCell>
<TableCell>{getStatusBadge(case_.status)}</TableCell>
<TableCell>{getPriorityBadge(case_.priority)}</TableCell>
<TableCell>{case_.dateCreated}</TableCell>
<TableCellclassName="text-smtext-muted-foreground">{case_.lastUpdated}</TableCell>
<TableCell>{case_.assignedTech}</TableCell>
<TableCellclassName="text-rightfont-mono">
{formatCurrency(case_.finalCost)}
</TableCell>
<TableCell>
<divclassName="flexitems-centerspace-x-1">
<Buttonvariant="ghost"size="sm">
<EyeclassName="h-4w-4"/>
</Button>
<Buttonvariant="ghost"size="sm">
<MoreHorizontalclassName="h-4w-4"/>
</Button>
</div>
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

exportdefaultEnhancedCaseManagement;