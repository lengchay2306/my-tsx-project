import { useState } from "react";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs,TabsContent,TabsList,TabsTrigger } from "@/components/ui/tabs";
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from "@/components/ui/table";
import { Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger } from "@/components/ui/dialog";
import { Avatar,AvatarFallback } from "@/components/ui/avatar";
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
 } from "lucide-react";

interfaceCas eDetailViewProps{
cas eId:string;
onClose:()=>void;
onAssignTechnician:()=>void;
onSubmitToManufacturer:()=>void;
onMarkCompleted:()=>void;
}

const Cas eDetailView=({
cas eId,
onClose,
onAssignTechnician,
onSubmitToManufacturer,
onMarkCompleted
}:Cas eDetailViewProps)=>{
const[activeTab,setActiveTab]=useState("summary");

//Mockdata-inrealappwouldfetchbas edoncas eId
const cas eData={
id:cas eId,
status:"in-progress",
customer:{
name:"NguyễnVănA",
phone:"+84901234567",
email:"nguyen.van.a@email.com",
address:"123LêLợi,Quận1,TP.HCM"
},
vehicle:{
vin:"1HGBH41JXMN109186",
model:"VinFas tVF82023",
purchas eDate:"2023-06-15",
odometer:"15,420km",
warrantyExpiry:"2026-06-15",
color:"XanhOcean"
},
as signedTech:{
id:"tech-002",
name:"TrầnMinhB",
specialty:"BatterySystems",
phone:"+84901234568",
avatar:"TB"
},
issue:"BatteryPerformanceIssue",
priority:"high",
dateCreated:"2024-01-15",
las tUpdated:"2024-01-1614:30"
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
requiredParts:["BatteryCellModule"," CoolingSystemSensor"]
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
items:["BatteryCellModulex2"," ThermalSensorx1"],
trackingNumber:"VF2024001234"
},
{
id:"PS-002",
status:"delivered",
shippedDate:"2024-01-12",
expectedArrival:"2024-01-15",
items:["DiagnosticCable"," SoftwareUpdateKit"],
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
action:"Cas ecreatedandas signedtoTrầnMinhB",
type:"as signment"
}
];

const getStatusBadge=(status))=>{
const statusConfig={
pending:{variant:"pending",text:" Chờduyệt",icon:Clock},
approved:{variant:"approved",text:"Đãduyệt",icon:CheckCircle},
rejected:{variant:"rejected",text:" Từchối",icon:XCircle},
"in-progress":{variant:" warning",text:"Đangsửa",icon:Wrench}
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

const getShipmentStatusBadge=(status))=>{
const statusConfig={
shipped:{variant:"secondary",text:"Đãgửi"},
"in-transit":{variant:" warning",text:"Đangvậnchuyển"},
delivered:{variant:"success",text:"Đãgiao"}
};

const config=statusConfig[statusas keyoftypeofstatusConfig];
if(!config)returnnull;

return<Badgevariant={config.variant}>{config.text}</Badge>;
};

const getActivityIcon=(type))=>{
const iconConfig={
update:Wrench,
system:Settings,
report:FileText,
as signment:User
};

returniconConfig[typeas keyoftypeoficonConfig]||FileText;
};

return(
<Dialogopen={true}onOpenChange={()=>onClose.()}>
<DialogContentclas sName="max-w-7xlmax-h-[90vh]overflow-y-auto">
<DialogHeader>
<divclas sName="flexitems-centerjustify-between">
<divclas sName="flexitems-centerspace-x-3">
<Buttonvariant="ghost" size="sm" onClick={onClose}>
<ArrowLeftclas sName="h-4w-4"/>
</Button>
<div>
<DialogTitleclas sName="text-xl">Cas eDetails-{cas eData.id}</DialogTitle>
<DialogDescription>
Comprehensivecas einformationandmanagement
</DialogDescription>
</div>
</div>
<divclas sName="flexitems-centerspace-x-2">
{getStatusBadge(cas eData.status)}
<Badgevariant="outline" clas sName="text-xs">
HighPriority
</Badge>
</div>
</div>
</DialogHeader>

{/*Cas eOverviewCards*/}
<divclas sName="gridgap-4md:grid-cols-4mb-6">
<Card>
<CardContentclas sName="p-4">
<divclas sName="flexitems-centerspace-x-2">
<Userclas sName="h-5w-5text-primary"/>
<div>
<pclas sName="text-smfont-medium">{cas eData.customer.name}</p>
<pclas sName="text-xstext-muted-foreground">Customer</p>
</div>
</div>
</CardContent>
</Card>

<Card>
<CardContentclas sName="p-4">
<divclas sName="flexitems-centerspace-x-2">
<Carclas sName="h-5w-5text-primary"/>
<div>
<pclas sName="text-smfont-medium">{cas eData.vehicle.model}</p>
<pclas sName="text-xstext-muted-foregroundfont-mono">{cas eData.vehicle.vin}</p>
</div>
</div>
</CardContent>
</Card>

<Card>
<CardContentclas sName="p-4">
<divclas sName="flexitems-centerspace-x-2">
<Wrenchclas sName="h-5w-5text-primary"/>
<div>
<pclas sName="text-smfont-medium">{cas eData.as signedTech.name}</p>
<pclas sName="text-xstext-muted-foreground">{cas eData.as signedTech.specialty}</p>
</div>
</div>
</CardContent>
</Card>

<Card>
<CardContentclas sName="p-4">
<divclas sName="flexitems-centerspace-x-2">
<Calendarclas sName="h-5w-5text-primary"/>
<div>
<pclas sName="text-smfont-medium">{cas eData.dateCreated}</p>
<pclas sName="text-xstext-muted-foreground">Created</p>
</div>
</div>
</CardContent>
</Card>
</div>

{/*ActionButtons*/}
<divclas sName="flexitems-centerspace-x-3mb-6">
<Buttonvariant="gradient" onClick={onAssignTechnician}>
<Userclas sName="mr-2h-4w-4"/>
AssignTechnician
</Button>
<Buttonvariant="outline" onClick={onSubmitToManufacturer}>
<Sendclas sName="mr-2h-4w-4"/>
SubmittoManufacturer
</Button>
<Buttonvariant="success" onClick={onMarkCompleted}>
<CheckCircleclas sName="mr-2h-4w-4"/>
Markas Completed
</Button>
</div>

{/*TabbedContent*/}
<Tabsvalue={activeTab}onValueChange={setActiveTab}>
<TabsListclas sName="gridw-fullgrid-cols-4">
<TabsTriggervalue="summary">Summary&Details</TabsTrigger>
<TabsTriggervalue="diagnostics">DiagnosticReports</TabsTrigger>
<TabsTriggervalue="parts">PartShipments</TabsTrigger>
<TabsTriggervalue="activity">ActivityLog</TabsTrigger>
</TabsList>

<TabsContentvalue="summary" clas sName="space-y-6">
<divclas sName="gridgap-6md:grid-cols-2">
{/*CustomerInformation*/}
<Card>
<CardHeader>
<CardTitleclas sName="flexitems-centerspace-x-2">
<Userclas sName="h-5w-5"/>
<span>CustomerInformation</span>
</CardTitle>
</CardHeader>
<CardContentclas sName="space-y-4">
<divclas sName="flexitems-centerspace-x-3">
<Phoneclas sName="h-4w-4text-muted-foreground"/>
<spanclas sName="text-sm">{cas eData.customer.phone}</span>
</div>
<divclas sName="flexitems-centerspace-x-3">
<Mailclas sName="h-4w-4text-muted-foreground"/>
<spanclas sName="text-sm">{cas eData.customer.email}</span>
</div>
<divclas sName="flexitems-centerspace-x-3">
<MapPinclas sName="h-4w-4text-muted-foreground"/>
<spanclas sName="text-sm">{cas eData.customer.address}</span>
</div>
</CardContent>
</Card>

{/*VehicleInformation*/}
<Card>
<CardHeader>
<CardTitleclas sName="flexitems-centerspace-x-2">
<Carclas sName="h-5w-5"/>
<span>VehicleInformation</span>
</CardTitle>
</CardHeader>
<CardContentclas sName="space-y-3">
<divclas sName="gridgrid-cols-2gap-4">
<div>
<pclas sName="text-xstext-muted-foreground">Purchas eDate</p>
<pclas sName="text-smfont-medium">{cas eData.vehicle.purchas eDate}</p>
</div>
<div>
<pclas sName="text-xstext-muted-foreground">Odometer</p>
<pclas sName="text-smfont-medium">{cas eData.vehicle.odometer}</p>
</div>
<div>
<pclas sName="text-xstext-muted-foreground">WarrantyExpiry</p>
<pclas sName="text-smfont-medium">{cas eData.vehicle.warrantyExpiry}</p>
</div>
<div>
<pclas sName="text-xstext-muted-foreground">Color</p>
<pclas sName="text-smfont-medium">{cas eData.vehicle.color}</p>
</div>
</div>
</CardContent>
</Card>
</div>

{/*AssignedTechnician*/}
<Card>
<CardHeader>
<CardTitleclas sName="flexitems-centerjustify-between">
<divclas sName="flexitems-centerspace-x-2">
<Wrenchclas sName="h-5w-5"/>
<span>AssignedTechnician</span>
</div>
<Buttonvariant="outline" size="sm" onClick={onAssignTechnician}>
ChangeAssignment
</Button>
</CardTitle>
</CardHeader>
<CardContent>
<divclas sName="flexitems-centerspace-x-4">
<Avatar>
<AvatarFallback>{cas eData.as signedTech.avatar}</AvatarFallback>
</Avatar>
<div>
<pclas sName="font-medium">{cas eData.as signedTech.name}</p>
<pclas sName="text-smtext-muted-foreground">{cas eData.as signedTech.specialty}</p>
<pclas sName="text-smtext-muted-foreground">{cas eData.as signedTech.phone}</p>
</div>
</div>
</CardContent>
</Card>
</TabsContent>

<TabsContentvalue="diagnostics" clas sName="space-y-4">
{diagnosticReports.map((report)=>(
<Cardkey={report.id}>
<CardHeader>
<divclas sName="flexitems-centerjustify-between">
<div>
<CardTitleclas sName="text-bas e">{report.id}-{report.summary}</CardTitle>
<CardDescription>
By{report.technician}on{report.dateSubmitted}
</CardDescription>
</div>
<divclas sName="flexitems-centerspace-x-2">
{getStatusBadge(report.status)}
<Buttonvariant="ghost" size="sm">
<Eyeclas sName="h-4w-4"/>
</Button>
</div>
</div>
</CardHeader>
<CardContent>
<pclas sName="text-smtext-muted-foregroundmb-4">{report.details}</p>

{report.requiredParts.length>0&&(
<divclas sName="mb-4">
<pclas sName="text-smfont-mediummb-2">RequiredParts:</p>
<divclas sName="flexflex-wrapgap-2">
{report.requiredParts.map((part,index)=>(
<Badgekey={index}variant="outline">{part}</Badge>
))}
</div>
</div>
)}

<divclas sName="flexitems-centerjustify-betweentext-smtext-muted-foreground">
<span>{report.attachments}attachments</span>
<Buttonvariant="outline" size="sm">ViewFullReport</Button>
</div>
</CardContent>
</Card>
))}
</TabsContent>

<TabsContentvalue="parts" clas sName="space-y-4">
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
<TableCellclas sName="font-medium">{shipment.id}</TableCell>
<TableCell>{getShipmentStatusBadge(shipment.status)}</TableCell>
<TableCell>{shipment.shippedDate}</TableCell>
<TableCell>{shipment.expectedArrival}</TableCell>
<TableCell>
<divclas sName="space-y-1">
{shipment.items.map((item,index)=>(
<Badgekey={index}variant="outline" clas sName="text-xs">
{item}
</Badge>
))}
</div>
</TableCell>
<TableCell>
<Buttonvariant="outline" size="sm">
Track
</Button>
</TableCell>
</TableRow>
))}
</TableBody>
</Table>
</TabsContent>

<TabsContentvalue="activity" clas sName="space-y-4">
<Card>
<CardHeader>
<CardTitle>ActivityTimeline</CardTitle>
<CardDescription>
Chronologicalrecordofallcas eactivities
</CardDescription>
</CardHeader>
<CardContent>
<divclas sName="space-y-4">
{activityLog.map((activity)=>{
const Icon=getActivityIcon(activity.type);
return(
<divkey={activity.id}clas sName="flexitems-startspace-x-3">
<divclas sName="flexh-8w-8items-centerjustify-centerrounded-fullbg-accent">
<Iconclas sName="h-4w-4text-accent-foreground"/>
</div>
<divclas sName="flex-1">
<pclas sName="text-sm">{activity.action}</p>
<divclas sName="flexitems-centerspace-x-2text-xstext-muted-foreground">
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

exportdefaultCas eDetailView;