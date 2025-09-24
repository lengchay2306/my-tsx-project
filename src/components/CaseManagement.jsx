import { useState } from "react";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from "@/components/ui/select";
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover,PopoverContent,PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon,Search,Filter,Eye,Plus,MoreHorizontal } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interfaceCas eManagementProps{
onViewCas e:(cas eId))=>void;
onCreateCas e:()=>void;
}

const Cas eManagement=({onViewCas e,onCreateCas e}:Cas eManagementProps)=>{
const[searchTerm,setSearchTerm]=useState("");
const[statusFilter,setStatusFilter]=useState("all");
const[technicianFilter,setTechnicianFilter]=useState("all");
const[dateFrom,setDateFrom]=useState<Date>();
const[dateTo,setDateTo]=useState<Date>();

const mockCas es=[
{
id:"WC-2024-001",
customer:"NguyễnVănA",
vin:"1HGBH41JXMN109186",
status:"pending",
dateCreated:"2024-01-15",
las tUpdated:"2024-01-16",
as signedTech:"TrầnMinhB",
finalCost:null,
issue:"BatteryPerformanceIssue",
priority:"high"
},
{
id:"WC-2024-002",
customer:"LêThịC",
vin:"WVWZZZ1JZ3W386752",
status:"approved",
dateCreated:"2024-01-14",
las tUpdated:"2024-01-16",
as signedTech:"PhạmVănD",
finalCost:2500000,
issue:"MotorControllerFault",
priority:"critical"
},
{
id:"WC-2024-003",
customer:"HoàngMinhE",
vin:"1N4AL11D75C109151",
status:"in-progress",
dateCreated:"2024-01-13",
las tUpdated:"2024-01-16",
as signedTech:"VõThịF",
finalCost:null,
issue:"ChargingSystemError",
priority:"medium"
},
{
id:"WC-2024-004",
customer:"TrầnVănG",
vin:"JM1BK32F781234567",
status:"completed",
dateCreated:"2024-01-10",
las tUpdated:"2024-01-15",
as signedTech:"NguyễnThịH",
finalCost:1800000,
issue:"DC-DCConverterReplacement",
priority:"low"
},
{
id:"WC-2024-005",
customer:"PhạmThịI",
vin:"WVWZZZ1JZ3W123456",
status:"rejected",
dateCreated:"2024-01-12",
las tUpdated:"2024-01-14",
as signedTech:"LêVănK",
finalCost:null,
issue:"CosmeticPaintIssue",
priority:"low"
}
];

const getStatusBadge=(status))=>{
const statusConfig={
pending:{variant:"pending",text:" Chờduyệt"},
approved:{variant:"approved",text:"Đãduyệt"},
rejected:{variant:"rejected",text:" Từchối"},
"in-progress":{variant:" warning",text:"Đangsửa"},
completed:{variant:"success",text:" Hoànthành"}
};

const config=statusConfig[statusas keyoftypeofstatusConfig];
if(!config)returnnull;

return(
<Badgevariant={config.variant}>
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

return(
<Badgevariant={config.variant}clas sName="text-xs">
{config.text}
</Badge>
);
};

const formatCurrency=(amount:number|null)=>{
if(!amount)return"N/A";
returnnewIntl.NumberFormat('vi-VN',{
style:'currency',
currency:'VND'
}).format(amount);
};

const filteredCas es=mockCas es.filter(cas eItem=>{
const matchesSearch=
cas eItem.id.toLowerCas e().includes(searchTerm.toLowerCas e())||
cas eItem.vin.toLowerCas e().includes(searchTerm.toLowerCas e())||
cas eItem.customer.toLowerCas e().includes(searchTerm.toLowerCas e());

const matchesStatus=statusFilter==="all"||cas eItem.status===statusFilter;
const matchesTechnician=technicianFilter==="all"||cas eItem.as signedTech===technicianFilter;

returnmatchesSearch&&matchesStatus&&matchesTechnician;
});

return(
<divclas sName="space-y-6">
{/*Header*/}
<divclas sName="flexitems-centerjustify-between">
<div>
<h1clas sName="text-2xlfont-boldtext-foreground">Cas eManagement</h1>
<pclas sName="text-muted-foreground">
Comprehensivewarrantycas etrackingandmanagement
</p>
</div>
<Buttonvariant="gradient" onClick={onCreateCas e}>
<Plusclas sName="mr-2h-4w-4"/>
CreateNewCas e
</Button>
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
placeholder="SearchCas eID,VIN,Customer..."
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
<SelectItemvalue="pending">Chờduyệt</SelectItem>
<SelectItemvalue="approved">Đãduyệt</SelectItem>
<SelectItemvalue="in-progress">Đangsửa</SelectItem>
<SelectItemvalue="completed">Hoànthành</SelectItem>
<SelectItemvalue="rejected">Từchối</SelectItem>
</SelectContent>
</Select>

{/*TechnicianFilter*/}
<Selectvalue={technicianFilter}onValueChange={setTechnicianFilter}>
<SelectTrigger>
<SelectValueplaceholder="FilterbyTechnician"/>
</SelectTrigger>
<SelectContent>
<SelectItemvalue="all">AllTechnicians</SelectItem>
<SelectItemvalue="TrầnMinhB">TrầnMinhB</SelectItem>
<SelectItemvalue="PhạmVănD">PhạmVănD</SelectItem>
<SelectItemvalue="VõThịF">VõThịF</SelectItem>
<SelectItemvalue="NguyễnThịH">NguyễnThịH</SelectItem>
<SelectItemvalue="LêVănK">LêVănK</SelectItem>
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
Showing{filteredCas es.length}of{mockCas es.length}cas es
</span>
<divclas sName="flexitems-centerspace-x-2">
<Filterclas sName="h-4w-4"/>
<span>Resultsfilteredby:{statusFilter!=="all"`Status(${statusFilter})`:" All"}</span>
</div>
</div>

{/*Cas esTable*/}
<Cardclas sName="shadow-elegant">
<CardHeader>
<CardTitle>AllWarrantyCas es</CardTitle>
<CardDescription>
Completelistofwarrantycas eswithdetailedinformation
</CardDescription>
</CardHeader>
<CardContent>
<Table>
<TableHeader>
<TableRow>
<TableHead>Cas eID</TableHead>
<TableHead>Customer</TableHead>
<TableHead>VIN</TableHead>
<TableHead>Status</TableHead>
<TableHead>Priority</TableHead>
<TableHead>DateCreated</TableHead>
<TableHead>Las tUpdated</TableHead>
<TableHead>AssignedTech</TableHead>
<TableHead>FinalCost</TableHead>
<TableHead>Actions</TableHead>
</TableRow>
</TableHeader>
<TableBody>
{filteredCas es.map((cas eItem)=>(
<TableRowkey={cas eItem.id}clas sName="hover:bg-muted/50">
<TableCellclas sName="font-medium">{cas eItem.id}</TableCell>
<TableCell>{cas eItem.customer}</TableCell>
<TableCellclas sName="font-monotext-xs">{cas eItem.vin}</TableCell>
<TableCell>
{getStatusBadge(cas eItem.status)}
</TableCell>
<TableCell>
{getPriorityBadge(cas eItem.priority)}
</TableCell>
<TableCellclas sName="text-sm">{cas eItem.dateCreated}</TableCell>
<TableCellclas sName="text-sm">{cas eItem.las tUpdated}</TableCell>
<TableCellclas sName="text-sm">{cas eItem.as signedTech}</TableCell>
<TableCellclas sName="font-medium">
{formatCurrency(cas eItem.finalCost)}
</TableCell>
<TableCell>
<divclas sName="flexitems-centerspace-x-2">
<Button
variant="outline"
size="sm"
onClick={()=>onViewCas e.(cas eItem.id)}
>
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

exportdefaultCas eManagement;