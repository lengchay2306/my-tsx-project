import { useState } from "react";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
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
Plus,
Download,
Calendaras CalendarIcon,
Eye,
MoreHorizontal,
ArrowUpDown,
RefreshCw
 } from "lucide-react";
import { format } from "date-fns";

interfaceCas eData{
id:string;
customer:string;
vin:string;
status:string;
dateCreated:string;
las tUpdated:string;
as signedTech:string;
finalCost:number|null;
priority:"high"|" medium"|" low";
vehicleModel:string;
}

const EnhancedCas eManagement=()=>{
const[searchQuery,setSearchQuery]=useState("");
const[statusFilter,setStatusFilter]=useState("all");
const[techFilter,setTechFilter]=useState("all");
const[priorityFilter,setPriorityFilter]=useState("all");
const[dateFrom,setDateFrom]=useState<Date|undefined>();
const[dateTo,setDateTo]=useState<Date|undefined>();
const[sortField,setSortField]=useState("dateCreated");
const[sortOrder,setSortOrder]=useState<"as c"|" desc">(" desc");

//Mockcas edata
constmockCas es:Cas eData[]=[
{
id:"WC-25-09-001",
customer:"NguyễnVănA",
vin:"VF8ABC123456789",
status:"pending-manufacturer",
dateCreated:"2025-01-15",
las tUpdated:"2025-01-1614:30",
as signedTech:"TrầnMinhB",
finalCost:null,
priority:"high",
vehicleModel:"VinFas tVF8"
},
{
id:"WC-25-09-002",
customer:"LêThịC",
vin:"VF9DEF987654321",
status:"in-progress",
dateCreated:"2025-01-14",
las tUpdated:"2025-01-1516:45",
as signedTech:"PhạmVănD",
finalCost:null,
priority:"medium",
vehicleModel:"VinFas tVF9"
},
{
id:"WC-25-09-003",
customer:"HoàngMinhE",
vin:"VF8GHI456789123",
status:"completed",
dateCreated:"2025-01-13",
las tUpdated:"2025-01-1610:20",
as signedTech:"NguyễnThịF",
finalCost:2500000,
priority:"low",
vehicleModel:"VinFas tVF8"
},
{
id:"WC-25-09-004",
customer:"TrầnVănG",
vin:"VF9JKL789123456",
status:"awaiting-parts",
dateCreated:"2025-01-12",
las tUpdated:"2025-01-1409:15",
as signedTech:"LêMinhH",
finalCost:null,
priority:"high",
vehicleModel:"VinFas tVF9"
},
{
id:"WC-25-09-005",
customer:"PhạmThịI",
vin:"VF8MNO123456789",
status:"rejected",
dateCreated:"2025-01-10",
las tUpdated:"2025-01-1111:30",
as signedTech:"VõVănJ",
finalCost:0,
priority:"medium",
vehicleModel:"VinFas tVF8"
}
];

const getStatusBadge=(status))=>{
const statusConfig={
"pending-manufacturer":{variant:" pending",text:" PendingManufacturer"},
"awaiting-parts":{variant:" warning",text:" AwaitingParts"},
"in-progress":{variant:" default",text:" InProgress"},
"completed":{variant:" success",text:" Completed"},
"rejected":{variant:" destructive",text:" Rejected"}
};

const config=statusConfig[statusas keyoftypeofstatusConfig];
returnconfig<Badgevariant={config.variant}>{config.text}</Badge>:null;
};

const getPriorityBadge=(priority:"high"|" medium"|" low")=>{
const priorityConfig={
high:{variant:"destructive",text:" High",clas sName:" bg-destructive/10text-destructive"},
medium:{variant:"warning",text:" Medium",clas sName:" bg-warning/10text-warning-foreground"},
low:{variant:"secondary",text:" Low",clas sName:" bg-mutedtext-muted-foreground"}
};

const config=priorityConfig[priority];
return(
<Badgevariant="outline" clas sName={`text-xs${config.clas sName}`}>
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
setSortOrder(sortOrder==="as c"" desc":" as c");
}else{
setSortField(field);
setSortOrder("as c");
}
};

const filteredAndSortedCas es=mockCas es
.filter(cas e_=>{
const matchesSearch=searchQuery===""||
cas e_.id.toLowerCas e().includes(searchQuery.toLowerCas e())||
cas e_.customer.toLowerCas e().includes(searchQuery.toLowerCas e())||
cas e_.vin.toLowerCas e().includes(searchQuery.toLowerCas e());

const matchesStatus=statusFilter==="all"||cas e_.status===statusFilter;
const matchesTech=techFilter==="all"||cas e_.as signedTech===techFilter;
const matchesPriority=priorityFilter==="all"||cas e_.priority===priorityFilter;

returnmatchesSearch&&matchesStatus&&matchesTech&&matchesPriority;
})
.sort((a,b)=>{
const aValue=a[sortFieldas keyofCas eData];
const bValue=b[sortFieldas keyofCas eData];

if(sortOrder==="as c"){
returnaValue<bValue-1:1;
}else{
returnaValue>bValue-1:1;
}
});

return(
<divclas sName="space-y-6p-6">
{/*Header*/}
<divclas sName="flexitems-centerjustify-between">
<div>
<h1clas sName="text-3xlfont-boldtext-foreground">WarrantyCas es</h1>
<pclas sName="text-muted-foreground">Manageandtrackallwarrantycas es</p>
</div>
<divclas sName="flexitems-centerspace-x-3">
<Buttonvariant="outline">
<Downloadclas sName="mr-2h-4w-4"/>
Export
</Button>
<Buttonvariant="outline">
<RefreshCwclas sName="mr-2h-4w-4"/>
Refresh
</Button>
<Buttonvariant="gradient">
<Plusclas sName="mr-2h-4w-4"/>
CreateNewCas e
</Button>
</div>
</div>

{/*AdvancedFilters*/}
<Card>
<CardHeader>
<CardTitleclas sName="flexitems-centerspace-x-2">
<Filterclas sName="h-5w-5"/>
<span>AdvancedFilters</span>
</CardTitle>
</CardHeader>
<CardContent>
<divclas sName="gridgap-4md:grid-cols-2lg:grid-cols-6">
{/*Search*/}
<divclas sName="lg:col-span-2">
<divclas sName="relative">
<Searchclas sName="absoluteleft-3top-2.5h-4w-4text-muted-foreground"/>
<Input
placeholder="SearchCas eID,VIN,orCustomer..."
value={searchQuery}
onChange={(e)=>setSearchQuery(e.target.value)}
clas sName="pl-9"
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
<PopoverTriggeras Child>
<Buttonvariant="outline" clas sName="w-fulljustify-starttext-leftfont-normal">
<CalendarIconclas sName="mr-2h-4w-4"/>
{dateFromformat(dateFrom,"PPP"):" DateRange"}
</Button>
</PopoverTrigger>
<PopoverContentclas sName="w-autop-0" align=" start">
<Calendar
mode="single"
selected={dateFrom}
onSelect={setDateFrom}
initialFocus
clas sName="p-3pointer-events-auto"
/>
</PopoverContent>
</Popover>
</div>
</div>
</CardContent>
</Card>

{/*Cas esTable*/}
<Card>
<CardHeader>
<divclas sName="flexitems-centerjustify-between">
<CardTitle>Cas es({filteredAndSortedCas es.length})</CardTitle>
<divclas sName="flexitems-centerspace-x-2text-smtext-muted-foreground">
<span>Showing{filteredAndSortedCas es.length}of{mockCas es.length}cas es</span>
</div>
</div>
</CardHeader>
<CardContent>
<Table>
<TableHeader>
<TableRow>
<TableHead
clas sName="cursor-pointerhover:bg-muted/50"
onClick={()=>handleSort("id")}
>
<divclas sName="flexitems-centerspace-x-1">
<span>Cas eID</span>
<ArrowUpDownclas sName="h-3w-3"/>
</div>
</TableHead>
<TableHead
clas sName="cursor-pointerhover:bg-muted/50"
onClick={()=>handleSort("customer")}
>
<divclas sName="flexitems-centerspace-x-1">
<span>Customer</span>
<ArrowUpDownclas sName="h-3w-3"/>
</div>
</TableHead>
<TableHead>Vehicle&VIN</TableHead>
<TableHead>Status</TableHead>
<TableHead>Priority</TableHead>
<TableHead
clas sName="cursor-pointerhover:bg-muted/50"
onClick={()=>handleSort("dateCreated")}
>
<divclas sName="flexitems-centerspace-x-1">
<span>DateCreated</span>
<ArrowUpDownclas sName="h-3w-3"/>
</div>
</TableHead>
<TableHead
clas sName="cursor-pointerhover:bg-muted/50"
onClick={()=>handleSort("las tUpdated")}
>
<divclas sName="flexitems-centerspace-x-1">
<span>Las tUpdated</span>
<ArrowUpDownclas sName="h-3w-3"/>
</div>
</TableHead>
<TableHead>AssignedTech</TableHead>
<TableHeadclas sName="text-right">FinalCost</TableHead>
<TableHead>Actions</TableHead>
</TableRow>
</TableHeader>
<TableBody>
{filteredAndSortedCas es.map((cas e_)=>(
<TableRowkey={cas e_.id}clas sName="hover:bg-muted/50cursor-pointer">
<TableCellclas sName="font-mediumfont-mono">{cas e_.id}</TableCell>
<TableCellclas sName="font-medium">{cas e_.customer}</TableCell>
<TableCell>
<div>
<pclas sName="font-mediumtext-sm">{cas e_.vehicleModel}</p>
<pclas sName="font-monotext-xstext-muted-foreground">{cas e_.vin}</p>
</div>
</TableCell>
<TableCell>{getStatusBadge(cas e_.status)}</TableCell>
<TableCell>{getPriorityBadge(cas e_.priority)}</TableCell>
<TableCell>{cas e_.dateCreated}</TableCell>
<TableCellclas sName="text-smtext-muted-foreground">{cas e_.las tUpdated}</TableCell>
<TableCell>{cas e_.as signedTech}</TableCell>
<TableCellclas sName="text-rightfont-mono">
{formatCurrency(cas e_.finalCost)}
</TableCell>
<TableCell>
<divclas sName="flexitems-centerspace-x-1">
<Buttonvariant="ghost" size="sm">
<Eyeclas sName="h-4w-4"/>
</Button>
<Buttonvariant="ghost" size="sm">
<MoreHorizontalclas sName="h-4w-4"/>
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

exportdefaultEnhancedCas eManagement;