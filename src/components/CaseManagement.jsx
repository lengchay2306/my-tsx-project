import { useState } from"react";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Badge } from"@/components/ui/badge";
import { Input } from"@/components/ui/input";
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from"@/components/ui/select";
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from"@/components/ui/table";
import { Calendar } from"@/components/ui/calendar";
import { Popover,PopoverContent,PopoverTrigger } from"@/components/ui/popover";
import { CalendarIcon,Search,Filter,Eye,Plus,MoreHorizontal } from"lucide-react";
import { format } from"date-fns";
import { cn } from"@/lib/utils";

interfaceCaseManagementProps{
onViewCase:(caseId))=>void;
onCreateCase:()=>void;
}

const CaseManagement=({onViewCase,onCreateCase}:CaseManagementProps)=>{
const[searchTerm,setSearchTerm]=useState("");
const[statusFilter,setStatusFilter]=useState("all");
const[technicianFilter,setTechnicianFilter]=useState("all");
const[dateFrom,setDateFrom]=useState<Date>();
const[dateTo,setDateTo]=useState<Date>();

const mockCases=[
{
id:"WC-2024-001",
customer:"NguyễnVănA",
vin:"1HGBH41JXMN109186",
status:"pending",
dateCreated:"2024-01-15",
lastUpdated:"2024-01-16",
assignedTech:"TrầnMinhB",
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
lastUpdated:"2024-01-16",
assignedTech:"PhạmVănD",
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
lastUpdated:"2024-01-16",
assignedTech:"VõThịF",
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
lastUpdated:"2024-01-15",
assignedTech:"NguyễnThịH",
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
lastUpdated:"2024-01-14",
assignedTech:"LêVănK",
finalCost:null,
issue:"CosmeticPaintIssue",
priority:"low"
}
];

const getStatusBadge=(status))=>{
const statusConfig={
pending:{variant:"pending",text:"Chờduyệt"},
approved:{variant:"approved",text:"Đãduyệt"},
rejected:{variant:"rejected",text:"Từchối"},
"in-progress":{variant:"warning",text:"Đangsửa"},
completed:{variant:"success",text:"Hoànthành"}
};

const config=statusConfig[statusaskeyoftypeofstatusConfig];
if(!config)returnnull;

return(
<Badgevariant={config.variant}>
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

return(
<Badgevariant={config.variant}className="text-xs">
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

const filteredCases=mockCases.filter(caseItem=>{
const matchesSearch=
caseItem.id.toLowerCase().includes(searchTerm.toLowerCase())||
caseItem.vin.toLowerCase().includes(searchTerm.toLowerCase())||
caseItem.customer.toLowerCase().includes(searchTerm.toLowerCase());

const matchesStatus=statusFilter==="all"||caseItem.status===statusFilter;
const matchesTechnician=technicianFilter==="all"||caseItem.assignedTech===technicianFilter;

returnmatchesSearch&&matchesStatus&&matchesTechnician;
});

return(
<divclassName="space-y-6">
{/*Header*/}
<divclassName="flexitems-centerjustify-between">
<div>
<h1className="text-2xlfont-boldtext-foreground">CaseManagement</h1>
<pclassName="text-muted-foreground">
Comprehensivewarrantycasetrackingandmanagement
</p>
</div>
<Buttonvariant="gradient"onClick={onCreateCase}>
<PlusclassName="mr-2h-4w-4"/>
CreateNewCase
</Button>
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
placeholder="SearchCaseID,VIN,Customer..."
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
Showing{filteredCases.length}of{mockCases.length}cases
</span>
<divclassName="flexitems-centerspace-x-2">
<FilterclassName="h-4w-4"/>
<span>Resultsfilteredby:{statusFilter!=="all"`Status(${statusFilter})`:"All"}</span>
</div>
</div>

{/*CasesTable*/}
<CardclassName="shadow-elegant">
<CardHeader>
<CardTitle>AllWarrantyCases</CardTitle>
<CardDescription>
Completelistofwarrantycaseswithdetailedinformation
</CardDescription>
</CardHeader>
<CardContent>
<Table>
<TableHeader>
<TableRow>
<TableHead>CaseID</TableHead>
<TableHead>Customer</TableHead>
<TableHead>VIN</TableHead>
<TableHead>Status</TableHead>
<TableHead>Priority</TableHead>
<TableHead>DateCreated</TableHead>
<TableHead>LastUpdated</TableHead>
<TableHead>AssignedTech</TableHead>
<TableHead>FinalCost</TableHead>
<TableHead>Actions</TableHead>
</TableRow>
</TableHeader>
<TableBody>
{filteredCases.map((caseItem)=>(
<TableRowkey={caseItem.id}className="hover:bg-muted/50">
<TableCellclassName="font-medium">{caseItem.id}</TableCell>
<TableCell>{caseItem.customer}</TableCell>
<TableCellclassName="font-monotext-xs">{caseItem.vin}</TableCell>
<TableCell>
{getStatusBadge(caseItem.status)}
</TableCell>
<TableCell>
{getPriorityBadge(caseItem.priority)}
</TableCell>
<TableCellclassName="text-sm">{caseItem.dateCreated}</TableCell>
<TableCellclassName="text-sm">{caseItem.lastUpdated}</TableCell>
<TableCellclassName="text-sm">{caseItem.assignedTech}</TableCell>
<TableCellclassName="font-medium">
{formatCurrency(caseItem.finalCost)}
</TableCell>
<TableCell>
<divclassName="flexitems-centerspace-x-2">
<Button
variant="outline"
size="sm"
onClick={()=>onViewCase.(caseItem.id)}
>
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

exportdefaultCaseManagement;