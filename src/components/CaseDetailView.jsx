import { useState } from"react";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Badge } from"@/components/ui/badge";
import { Tabs,TabsContent,TabsList,TabsTrigger } from"@/components/ui/tabs";
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from"@/components/ui/table";
import { Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger } from"@/components/ui/dialog";
import { Avatar,AvatarFallback } from"@/components/ui/avatar";
import { 
User,
Car,
FileText,
Package,
Clock,
CheckCircle,
XCircle,
AlertCircle,
Phone,
Mail,
Calendar,
MapPin,
Wrench,
ArrowLeft,
Settings,
Send,
Eye
 } from"lucide-react";

interfaceCaseDetailViewProps{
caseId:string;
onClose:()=>void;
onAssignTechnician:()=>void;
onSubmitToManufacturer:()=>void;
onMarkCompleted:()=>void;
}

const CaseDetailView=({
caseId,
onClose,
onAssignTechnician,
onSubmitToManufacturer,
onMarkCompleted
}:CaseDetailViewProps)=>{
const[activeTab,setActiveTab]=useState("summary");

//Mockdata-inrealappwouldfetchbasedoncaseId
const caseData={
id:caseId,
status:"in-progress",
customer:{
name:"NguyễnVănA",
phone:"+84901234567",
email:"nguyen.van.a@email.com",
address:"123LêLợi,Quận1,TP.HCM"
},
vehicle:{
vin:"1HGBH41JXMN109186",
model:"VinFastVF82023",
purchaseDate:"2023-06-15",
odometer:"15,420km",
warrantyExpiry:"2026-06-15",
color:"XanhOcean"
},
assignedTech:{
id:"tech-002",
name:"TrầnMinhB",
specialty:"BatterySystems",
phone:"+84901234568",
avatar:"TB"
},
issue:"BatteryPerformanceIssue",
priority:"high",
dateCreated:"2024-01-15",
lastUpdated:"2024-01-1614:30"
};

const diagnosticReports=[
{
id:"DR-001",
summary:"Batterycapacitydegradationdetected",
technician:"TrầnMinhB",
status:"pending",
dateSubmitted:"2024-01-16",
details:"Initialdiagnosticshows15%capacitylossinbatterycells3-6.Requiresdetailedtesting.",
attachments:3,
requiredParts:["BatteryCellModule","CoolingSystemSensor"]
},
{
id:"DR-002",
summary:"Thermalmanagementsysteminspection",
technician:"TrầnMinhB",
status:"approved",
dateSubmitted:"2024-01-15",
details:"Coolingsystemfunctioningwithinnormalparameters.Noissuesdetected.",
attachments:2,
requiredParts:[]
}
];

const partShipments=[
{
id:"PS-001",
status:"in-transit",
shippedDate:"2024-01-14",
expectedArrival:"2024-01-18",
items:["BatteryCellModulex2","ThermalSensorx1"],
trackingNumber:"VF2024001234"
},
{
id:"PS-002",
status:"delivered",
shippedDate:"2024-01-12",
expectedArrival:"2024-01-15",
items:["DiagnosticCable","SoftwareUpdateKit"],
trackingNumber:"VF2024001235"
}
];

const activityLog=[
{
id:1,
timestamp:"2024-01-1614:30",
user:"TrầnMinhB",
action:"UpdateddiagnosticreportDR-001",
type:"update"
},
{
id:2,
timestamp:"2024-01-1610:15",
user:"System",
action:"PartsshipmentPS-001statuschangedtoin-transit",
type:"system"
},
{
id:3,
timestamp:"2024-01-1516:45",
user:"TrầnMinhB",
action:"SubmitteddiagnosticreportDR-002",
type:"report"
},
{
id:4,
timestamp:"2024-01-1509:30",
user:"NguyễnThịStaff",
action:"CasecreatedandassignedtoTrầnMinhB",
type:"assignment"
}
];

const getStatusBadge=(status))=>{
const statusConfig={
pending:{variant:"pending",text:"Chờduyệt",icon:Clock},
approved:{variant:"approved",text:"Đãduyệt",icon:CheckCircle},
rejected:{variant:"rejected",text:"Từchối",icon:XCircle},
"in-progress":{variant:"warning",text:"Đangsửa",icon:Wrench}
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

const getShipmentStatusBadge=(status))=>{
const statusConfig={
shipped:{variant:"secondary",text:"Đãgửi"},
"in-transit":{variant:"warning",text:"Đangvậnchuyển"},
delivered:{variant:"success",text:"Đãgiao"}
};

const config=statusConfig[statusaskeyoftypeofstatusConfig];
if(!config)returnnull;

return<Badgevariant={config.variant}>{config.text}</Badge>;
};

const getActivityIcon=(type))=>{
const iconConfig={
update:Wrench,
system:Settings,
report:FileText,
assignment:User
};

returniconConfig[typeaskeyoftypeoficonConfig]||FileText;
};

return(
<Dialogopen={true}onOpenChange={()=>onClose.()}>
<DialogContentclassName="max-w-7xlmax-h-[90vh]overflow-y-auto">
<DialogHeader>
<divclassName="flexitems-centerjustify-between">
<divclassName="flexitems-centerspace-x-3">
<Buttonvariant="ghost"size="sm"onClick={onClose}>
<ArrowLeftclassName="h-4w-4"/>
</Button>
<div>
<DialogTitleclassName="text-xl">CaseDetails-{caseData.id}</DialogTitle>
<DialogDescription>
Comprehensivecaseinformationandmanagement
</DialogDescription>
</div>
</div>
<divclassName="flexitems-centerspace-x-2">
{getStatusBadge(caseData.status)}
<Badgevariant="outline"className="text-xs">
HighPriority
</Badge>
</div>
</div>
</DialogHeader>

{/*CaseOverviewCards*/}
<divclassName="gridgap-4md:grid-cols-4mb-6">
<Card>
<CardContentclassName="p-4">
<divclassName="flexitems-centerspace-x-2">
<UserclassName="h-5w-5text-primary"/>
<div>
<pclassName="text-smfont-medium">{caseData.customer.name}</p>
<pclassName="text-xstext-muted-foreground">Customer</p>
</div>
</div>
</CardContent>
</Card>

<Card>
<CardContentclassName="p-4">
<divclassName="flexitems-centerspace-x-2">
<CarclassName="h-5w-5text-primary"/>
<div>
<pclassName="text-smfont-medium">{caseData.vehicle.model}</p>
<pclassName="text-xstext-muted-foregroundfont-mono">{caseData.vehicle.vin}</p>
</div>
</div>
</CardContent>
</Card>

<Card>
<CardContentclassName="p-4">
<divclassName="flexitems-centerspace-x-2">
<WrenchclassName="h-5w-5text-primary"/>
<div>
<pclassName="text-smfont-medium">{caseData.assignedTech.name}</p>
<pclassName="text-xstext-muted-foreground">{caseData.assignedTech.specialty}</p>
</div>
</div>
</CardContent>
</Card>

<Card>
<CardContentclassName="p-4">
<divclassName="flexitems-centerspace-x-2">
<CalendarclassName="h-5w-5text-primary"/>
<div>
<pclassName="text-smfont-medium">{caseData.dateCreated}</p>
<pclassName="text-xstext-muted-foreground">Created</p>
</div>
</div>
</CardContent>
</Card>
</div>

{/*ActionButtons*/}
<divclassName="flexitems-centerspace-x-3mb-6">
<Buttonvariant="gradient"onClick={onAssignTechnician}>
<UserclassName="mr-2h-4w-4"/>
AssignTechnician
</Button>
<Buttonvariant="outline"onClick={onSubmitToManufacturer}>
<SendclassName="mr-2h-4w-4"/>
SubmittoManufacturer
</Button>
<Buttonvariant="success"onClick={onMarkCompleted}>
<CheckCircleclassName="mr-2h-4w-4"/>
MarkasCompleted
</Button>
</div>

{/*TabbedContent*/}
<Tabsvalue={activeTab}onValueChange={setActiveTab}>
<TabsListclassName="gridw-fullgrid-cols-4">
<TabsTriggervalue="summary">Summary&Details</TabsTrigger>
<TabsTriggervalue="diagnostics">DiagnosticReports</TabsTrigger>
<TabsTriggervalue="parts">PartShipments</TabsTrigger>
<TabsTriggervalue="activity">ActivityLog</TabsTrigger>
</TabsList>

<TabsContentvalue="summary"className="space-y-6">
<divclassName="gridgap-6md:grid-cols-2">
{/*CustomerInformation*/}
<Card>
<CardHeader>
<CardTitleclassName="flexitems-centerspace-x-2">
<UserclassName="h-5w-5"/>
<span>CustomerInformation</span>
</CardTitle>
</CardHeader>
<CardContentclassName="space-y-4">
<divclassName="flexitems-centerspace-x-3">
<PhoneclassName="h-4w-4text-muted-foreground"/>
<spanclassName="text-sm">{caseData.customer.phone}</span>
</div>
<divclassName="flexitems-centerspace-x-3">
<MailclassName="h-4w-4text-muted-foreground"/>
<spanclassName="text-sm">{caseData.customer.email}</span>
</div>
<divclassName="flexitems-centerspace-x-3">
<MapPinclassName="h-4w-4text-muted-foreground"/>
<spanclassName="text-sm">{caseData.customer.address}</span>
</div>
</CardContent>
</Card>

{/*VehicleInformation*/}
<Card>
<CardHeader>
<CardTitleclassName="flexitems-centerspace-x-2">
<CarclassName="h-5w-5"/>
<span>VehicleInformation</span>
</CardTitle>
</CardHeader>
<CardContentclassName="space-y-3">
<divclassName="gridgrid-cols-2gap-4">
<div>
<pclassName="text-xstext-muted-foreground">PurchaseDate</p>
<pclassName="text-smfont-medium">{caseData.vehicle.purchaseDate}</p>
</div>
<div>
<pclassName="text-xstext-muted-foreground">Odometer</p>
<pclassName="text-smfont-medium">{caseData.vehicle.odometer}</p>
</div>
<div>
<pclassName="text-xstext-muted-foreground">WarrantyExpiry</p>
<pclassName="text-smfont-medium">{caseData.vehicle.warrantyExpiry}</p>
</div>
<div>
<pclassName="text-xstext-muted-foreground">Color</p>
<pclassName="text-smfont-medium">{caseData.vehicle.color}</p>
</div>
</div>
</CardContent>
</Card>
</div>

{/*AssignedTechnician*/}
<Card>
<CardHeader>
<CardTitleclassName="flexitems-centerjustify-between">
<divclassName="flexitems-centerspace-x-2">
<WrenchclassName="h-5w-5"/>
<span>AssignedTechnician</span>
</div>
<Buttonvariant="outline"size="sm"onClick={onAssignTechnician}>
ChangeAssignment
</Button>
</CardTitle>
</CardHeader>
<CardContent>
<divclassName="flexitems-centerspace-x-4">
<Avatar>
<AvatarFallback>{caseData.assignedTech.avatar}</AvatarFallback>
</Avatar>
<div>
<pclassName="font-medium">{caseData.assignedTech.name}</p>
<pclassName="text-smtext-muted-foreground">{caseData.assignedTech.specialty}</p>
<pclassName="text-smtext-muted-foreground">{caseData.assignedTech.phone}</p>
</div>
</div>
</CardContent>
</Card>
</TabsContent>

<TabsContentvalue="diagnostics"className="space-y-4">
{diagnosticReports.map((report)=>(
<Cardkey={report.id}>
<CardHeader>
<divclassName="flexitems-centerjustify-between">
<div>
<CardTitleclassName="text-base">{report.id}-{report.summary}</CardTitle>
<CardDescription>
By{report.technician}on{report.dateSubmitted}
</CardDescription>
</div>
<divclassName="flexitems-centerspace-x-2">
{getStatusBadge(report.status)}
<Buttonvariant="ghost"size="sm">
<EyeclassName="h-4w-4"/>
</Button>
</div>
</div>
</CardHeader>
<CardContent>
<pclassName="text-smtext-muted-foregroundmb-4">{report.details}</p>

{report.requiredParts.length>0&&(
<divclassName="mb-4">
<pclassName="text-smfont-mediummb-2">RequiredParts:</p>
<divclassName="flexflex-wrapgap-2">
{report.requiredParts.map((part,index)=>(
<Badgekey={index}variant="outline">{part}</Badge>
))}
</div>
</div>
)}

<divclassName="flexitems-centerjustify-betweentext-smtext-muted-foreground">
<span>{report.attachments}attachments</span>
<Buttonvariant="outline"size="sm">ViewFullReport</Button>
</div>
</CardContent>
</Card>
))}
</TabsContent>

<TabsContentvalue="parts"className="space-y-4">
<Table>
<TableHeader>
<TableRow>
<TableHead>ShipmentID</TableHead>
<TableHead>Status</TableHead>
<TableHead>ShippedDate</TableHead>
<TableHead>ExpectedArrival</TableHead>
<TableHead>Items</TableHead>
<TableHead>Actions</TableHead>
</TableRow>
</TableHeader>
<TableBody>
{partShipments.map((shipment)=>(
<TableRowkey={shipment.id}>
<TableCellclassName="font-medium">{shipment.id}</TableCell>
<TableCell>{getShipmentStatusBadge(shipment.status)}</TableCell>
<TableCell>{shipment.shippedDate}</TableCell>
<TableCell>{shipment.expectedArrival}</TableCell>
<TableCell>
<divclassName="space-y-1">
{shipment.items.map((item,index)=>(
<Badgekey={index}variant="outline"className="text-xs">
{item}
</Badge>
))}
</div>
</TableCell>
<TableCell>
<Buttonvariant="outline"size="sm">
Track
</Button>
</TableCell>
</TableRow>
))}
</TableBody>
</Table>
</TabsContent>

<TabsContentvalue="activity"className="space-y-4">
<Card>
<CardHeader>
<CardTitle>ActivityTimeline</CardTitle>
<CardDescription>
Chronologicalrecordofallcaseactivities
</CardDescription>
</CardHeader>
<CardContent>
<divclassName="space-y-4">
{activityLog.map((activity)=>{
const Icon=getActivityIcon(activity.type);
return(
<divkey={activity.id}className="flexitems-startspace-x-3">
<divclassName="flexh-8w-8items-centerjustify-centerrounded-fullbg-accent">
<IconclassName="h-4w-4text-accent-foreground"/>
</div>
<divclassName="flex-1">
<pclassName="text-sm">{activity.action}</p>
<divclassName="flexitems-centerspace-x-2text-xstext-muted-foreground">
<span>{activity.user}</span>
<span>•</span>
<span>{activity.timestamp}</span>
</div>
</div>
</div>
);
})}
</div>
</CardContent>
</Card>
</TabsContent>
</Tabs>
</DialogContent>
</Dialog>
);
};

exportdefaultCaseDetailView;