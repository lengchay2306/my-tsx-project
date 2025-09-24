import { useState } from "react";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs,TabsContent,TabsList,TabsTrigger } from "@/components/ui/tabs";
import { Avatar,AvatarFallback,AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
ArrowLeft,
User,
Car,
Wrench,
FileText,
Package,
Activity,
Phone,
Mail,
Calendar,
MapPin,
Clock,
CheckCircle2,
AlertTriangle,
Send,
UserPlus,
X
 } from "lucide-react";

const StatusBadge=({status}:{status:string})=>{
const statusConfig={
"pending":{variant:" secondary",text:" Pending",clas sName:" bg-secondary"},
"in-repair":{variant:" default",text:" InRepair",clas sName:" bg-primarytext-primary-foreground"},
"awaiting-parts":{variant:" outline",text:" AwaitingParts",clas sName:" border-warningtext-warningbg-warning/5"},
"awaiting-handover":{variant:" outline",text:" AwaitingHandover",clas sName:" border-infotext-infobg-info/5"},
"manufacturer-review":{variant:" outline",text:" ManufacturerReview",clas sName:" border-warningtext-warningbg-warning/5"},
"approved":{variant:" outline",text:" Approved",clas sName:" border-successtext-successbg-success/5"},
"completed":{variant:" outline",text:" Completed",clas sName:" border-successtext-successbg-success/10"}
};

const config=statusConfig[statusas keyoftypeofstatusConfig];
returnconfig(
<Badgevariant={config.variant}clas sName={`${config.clas sName}text-smpx-3py-1`}>
{config.text}
</Badge>
):(
<Badgevariant="secondary" clas sName="text-smpx-3py-1">{status}</Badge>
);
};

const ReportStatusBadge=({status}:{status:string})=>{
const statusConfig={
"pending":{text:" PendingReview",clas sName:" bg-warning/10text-warningborder-warning"},
"approved":{text:" ApprovedbyEVM",clas sName:" bg-success/10text-successborder-success"},
"rejected":{text:" Rejected",clas sName:" bg-destructive/10text-destructiveborder-destructive"}
};

const config=statusConfig[statusas keyoftypeofstatusConfig];
returnconfig(
<Badgevariant="outline" clas sName={`${config.clas sName}text-xspx-2py-1`}>
{config.text}
</Badge>
):(
<Badgevariant="secondary" clas sName="text-xspx-2py-1">{status}</Badge>
);
};

const Cas eDetailViewPro=()=>{
const[activeTab,setActiveTab]=useState("reports");

//Mockcas edata
const cas eData={
id:"WC-25-09-001",
status:"manufacturer-review",
customer:{
name:"NguyễnVănAn",
phone:"+84901234567",
email:"nguyen.van.an@email.com",
avatar:"/api/placeholder/40/40"
},
vehicle:{
model:"VF8Plus",
vin:"VF8ABC123456789",
purchas eDate:"2024-03-15",
odometer:"12,450km",
color:"ArcticWhite"
},
as signedTech:{
name:"TrầnMinhBảo",
phone:"+84902345678",
expertise:"BatterySystems",
avatar:"/api/placeholder/40/40"
},
dateCreated:"2025-01-15",
complaint:"Vehicleexperiencingreducedbatteryrangeandchargingissues"
};

const diagnosticReports=[
{
id:"DR-001",
title:"BatterySystemDiagnostic",
technician:"TrầnMinhBảo",
status:"approved",
dateCreated:"2025-01-16",
diagnosis:"Batterypackshowingdegradedcellsinmodule3.Recommendreplacementofaffectedbatterymodule.",
requiredParts:["BatteryModuleBM-VF8-03"," CoolingSystemGas ketCSG-001"],
photos:3
},
{
id:"DR-002",
title:"ChargingSystemAnalysis",
technician:"TrầnMinhBảo",
status:"pending",
dateCreated:"2025-01-17",
diagnosis:"Onboardchargeroperatingwithinnormalparameters.Nohardwareissuesdetected.",
requiredParts:[],
photos:2
}
];

const partShipments=[
{
id:"PS-2025-001",
status:"shipped",
shippedDate:"2025-01-18",
expectedArrival:"2025-01-20",
items:["BatteryModuleBM-VF8-03"," CoolingSystemGas ketCSG-001"],
trackingNumber:"VT987654321"
}
];

const activityLog=[
{
id:"1",
user:"System",
action:"Cas estatusupdatedto'ManufacturerReview'",
timestamp:"2025-01-1714:30",
type:"status"
},
{
id:"2",
user:"TrầnMinhBảo",
action:"Addedchargingsystemdiagnosticreport",
timestamp:"2025-01-1710:45",
type:"report"
},
{
id:"3",
user:"NguyễnThuHà",
action:"Submittedcas etomanufacturerforapproval",
timestamp:"2025-01-1616:20",
type:"submission"
},
{
id:"4",
user:"TrầnMinhBảo",
action:"Completedinitialbatterysystemdiagnostic",
timestamp:"2025-01-1611:30",
type:"progress"
}
];

return(
<divclas sName="space-y-6p-6">
{/*Header*/}
<divclas sName="flexitems-centerjustify-between">
<divclas sName="flexitems-centerspace-x-4">
<Buttonvariant="ghost" size="sm">
<ArrowLeftclas sName="h-4w-4mr-2"/>
BacktoCas es
</Button>
<div>
<divclas sName="flexitems-centerspace-x-3">
<h1clas sName="text-3xlfont-boldtext-foreground">{cas eData.id}</h1>
<StatusBadgestatus={cas eData.status}/>
</div>
<pclas sName="text-muted-foregroundmt-1">Createdon{cas eData.dateCreated}</p>
</div>
</div>
</div>

<divclas sName="gridgap-6lg:grid-cols-4">
{/*MainContent*/}
<divclas sName="lg:col-span-3">
<Tabsvalue={activeTab}onValueChange={setActiveTab}clas sName="space-y-6">
<TabsListclas sName="gridw-fullgrid-cols-3">
<TabsTriggervalue="reports" clas sName="flexitems-centerspace-x-2">
<FileTextclas sName="h-4w-4"/>
<span>DiagnosticReports</span>
</TabsTrigger>
<TabsTriggervalue="shipments" clas sName="flexitems-centerspace-x-2">
<Packageclas sName="h-4w-4"/>
<span>PartShipments</span>
</TabsTrigger>
<TabsTriggervalue="activity" clas sName="flexitems-centerspace-x-2">
<Activityclas sName="h-4w-4"/>
<span>ActivityLog</span>
</TabsTrigger>
</TabsList>

<TabsContentvalue="reports" clas sName="space-y-4">
{diagnosticReports.length===0(
<Card>
<CardContentclas sName="py-12text-center">
<FileTextclas sName="h-16w-16text-muted-foreground/50mx-automb-4"/>
<h3clas sName="text-lgfont-mediummb-2">Nodiagnosticreports</h3>
<pclas sName="text-muted-foreground">Waitingfortechniciantoadddiagnosticreports</p>
</CardContent>
</Card>
):(
<divclas sName="space-y-4">
{diagnosticReports.map((report)=>(
<Cardkey={report.id}clas sName="hover:shadow-mdtransition-shadow">
<CardHeaderclas sName="pb-4">
<divclas sName="flexitems-centerjustify-between">
<divclas sName="flexitems-centerspace-x-3">
<CardTitleclas sName="text-lg">{report.title}</CardTitle>
<ReportStatusBadgestatus={report.status}/>
</div>
<divclas sName="text-smtext-muted-foreground">
{report.dateCreated}
</div>
</div>
<CardDescriptionclas sName="flexitems-centerspace-x-2">
<Wrenchclas sName="h-4w-4"/>
<span>By{report.technician}</span>
{report.photos>0&&(
<>
<span>•</span>
<span>{report.photos}photosattached</span>
</>
)}
</CardDescription>
</CardHeader>
<CardContent>
<divclas sName="space-y-4">
<div>
<h4clas sName="font-mediummb-2">Diagnosis</h4>
<pclas sName="text-smtext-muted-foregroundbg-mutedp-3rounded-md">
{report.diagnosis}
</p>
</div>

{report.requiredParts.length>0&&(
<div>
<h4clas sName="font-mediummb-2">RequiredParts</h4>
<divclas sName="flexflex-wrapgap-2">
{report.requiredParts.map((part,index)=>(
<Badgekey={index}variant="outline" clas sName="text-xs">
{part}
</Badge>
))}
</div>
</div>
)}
</div>
</CardContent>
</Card>
))}
</div>
)}
</TabsContent>

<TabsContentvalue="shipments" clas sName="space-y-4">
{partShipments.length===0(
<Card>
<CardContentclas sName="py-12text-center">
<Packageclas sName="h-16w-16text-muted-foreground/50mx-automb-4"/>
<h3clas sName="text-lgfont-mediummb-2">Nopartshipments</h3>
<pclas sName="text-muted-foreground">Nopartshavebeenshippedforthiscas eyet</p>
</CardContent>
</Card>
):(
<divclas sName="space-y-4">
{partShipments.map((shipment)=>(
<Cardkey={shipment.id}>
<CardHeader>
<divclas sName="flexitems-centerjustify-between">
<CardTitleclas sName="text-lg">{shipment.id}</CardTitle>
<Badgevariant="outline" clas sName="capitalizeborder-successtext-successbg-success/5">
{shipment.status}
</Badge>
</div>
</CardHeader>
<CardContent>
<divclas sName="gridgap-4md:grid-cols-2">
<div>
<divclas sName="flexitems-centerspace-x-2text-smtext-muted-foregroundmb-1">
<Calendarclas sName="h-4w-4"/>
<span>Shipped:{shipment.shippedDate}</span>
</div>
<divclas sName="flexitems-centerspace-x-2text-smtext-muted-foreground">
<Clockclas sName="h-4w-4"/>
<span>Expected:{shipment.expectedArrival}</span>
</div>
</div>
<div>
<pclas sName="text-smfont-mediummb-1">Tracking:{shipment.trackingNumber}</p>
<pclas sName="text-xstext-muted-foreground">{shipment.items.join(",")}</p>
</div>
</div>
</CardContent>
</Card>
))}
</div>
)}
</TabsContent>

<TabsContentvalue="activity" clas sName="space-y-4">
<Card>
<CardHeader>
<CardTitle>Cas eActivityTimeline</CardTitle>
<CardDescription>Chronologicalhistoryofallcas eactivities</CardDescription>
</CardHeader>
<CardContent>
<divclas sName="space-y-4">
{activityLog.map((activity,index)=>(
<divkey={activity.id}clas sName="flexitems-startspace-x-3">
<divclas sName="flexflex-colitems-center">
<divclas sName={`w-3h-3rounded-fullflex-shrink-0${
activity.type==='status''bg-primary':
activity.type==='report''bg-success':
activity.type==='submission''bg-warning':
'bg-muted-foreground'
}`}/>
{index<activityLog.length-1&&(
<divclas sName="w-pxh-8bg-bordermt-2"/>
)}
</div>
<divclas sName="flex-1min-w-0pb-4">
<divclas sName="flexitems-centerjustify-between">
<pclas sName="text-smfont-mediumtext-foreground">
{activity.action}
</p>
<pclas sName="text-xstext-muted-foreground">
{activity.timestamp}
</p>
</div>
<pclas sName="text-xstext-muted-foregroundmt-1">
by{activity.user}
</p>
</div>
</div>
))}
</div>
</CardContent>
</Card>
</TabsContent>
</Tabs>
</div>

{/*Sidebar*/}
<divclas sName="space-y-6">
{/*CustomerInformation*/}
<Card>
<CardHeaderclas sName="pb-3">
<CardTitleclas sName="text-lgflexitems-centerspace-x-2">
<Userclas sName="h-4w-4"/>
<span>Customer</span>
</CardTitle>
</CardHeader>
<CardContentclas sName="space-y-3">
<divclas sName="flexitems-centerspace-x-3">
<Avatarclas sName="h-10w-10">
<AvatarImagesrc={cas eData.customer.avatar}/>
<AvatarFallback>{cas eData.customer.name.charAt(0)}</AvatarFallback>
</Avatar>
<divclas sName="flex-1min-w-0">
<pclas sName="font-mediumtext-sm">{cas eData.customer.name}</p>
</div>
</div>
<divclas sName="space-y-2text-sm">
<divclas sName="flexitems-centerspace-x-2text-muted-foreground">
<Phoneclas sName="h-3w-3"/>
<span>{cas eData.customer.phone}</span>
</div>
<divclas sName="flexitems-centerspace-x-2text-muted-foreground">
<Mailclas sName="h-3w-3"/>
<spanclas sName="truncate">{cas eData.customer.email}</span>
</div>
</div>
</CardContent>
</Card>

{/*VehicleInformation*/}
<Card>
<CardHeaderclas sName="pb-3">
<CardTitleclas sName="text-lgflexitems-centerspace-x-2">
<Carclas sName="h-4w-4"/>
<span>Vehicle</span>
</CardTitle>
</CardHeader>
<CardContentclas sName="space-y-3">
<div>
<pclas sName="font-medium">{cas eData.vehicle.model}</p>
<pclas sName="text-xsfont-monotext-muted-foreground">{cas eData.vehicle.vin}</p>
</div>
<divclas sName="space-y-2text-smtext-muted-foreground">
<div>Purchas e:{cas eData.vehicle.purchas eDate}</div>
<div>Odometer:{cas eData.vehicle.odometer}</div>
<div>Color:{cas eData.vehicle.color}</div>
</div>
</CardContent>
</Card>

{/*AssignedTechnician*/}
<Card>
<CardHeaderclas sName="pb-3">
<CardTitleclas sName="text-lgflexitems-centerspace-x-2">
<Wrenchclas sName="h-4w-4"/>
<span>AssignedTechnician</span>
</CardTitle>
</CardHeader>
<CardContentclas sName="space-y-3">
<divclas sName="flexitems-centerspace-x-3">
<Avatarclas sName="h-10w-10">
<AvatarImagesrc={cas eData.as signedTech.avatar}/>
<AvatarFallback>{cas eData.as signedTech.name.charAt(0)}</AvatarFallback>
</Avatar>
<divclas sName="flex-1min-w-0">
<pclas sName="font-mediumtext-sm">{cas eData.as signedTech.name}</p>
<pclas sName="text-xstext-muted-foreground">{cas eData.as signedTech.expertise}</p>
</div>
</div>
<Buttonvariant="outline" size="sm" clas sName="w-full">
<UserPlusclas sName="h-3w-3mr-2"/>
Reas sign
</Button>
</CardContent>
</Card>

{/*ActionButtons*/}
<Card>
<CardHeaderclas sName="pb-3">
<CardTitleclas sName="text-lg">Actions</CardTitle>
</CardHeader>
<CardContentclas sName="space-y-3">
<Buttonclas sName="w-full" size=" sm">
<Sendclas sName="h-4w-4mr-2"/>
SubmittoManufacturer
</Button>
<Buttonvariant="outline" clas sName="w-full" size=" sm">
<CheckCircle2clas sName="h-4w-4mr-2"/>
Markas Completed
</Button>
<Buttonvariant="destructive" clas sName="w-full" size=" sm">
<Xclas sName="h-4w-4mr-2"/>
CloseCas e
</Button>
</CardContent>
</Card>
</div>
</div>
</div>
);
};

exportdefaultCas eDetailViewPro;