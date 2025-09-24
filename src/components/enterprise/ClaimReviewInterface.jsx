import { useState } from "react";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger } from "@/components/ui/dialog";
import { Avatar,AvatarFallback } from "@/components/ui/avatar";
import { Tabs,TabsContent,TabsList,TabsTrigger } from "@/components/ui/tabs";
import { 
CheckCircle,
XCircle,
Clock,
AlertTriangle,
FileText,
Camera,
Package,
Car,
User,
Calendar,
MapPin,
Phone,
Mail,
Eye,
MessageSquare,
Send
 } from "lucide-react";

interfaceDiagnosticReport{
id:string;
summary:string;
technician:string;
dateSubmitted:string;
details:string;
attachments:number;
requiredParts:string[];
status:"pending"|" approved"|" rejected";
rejectionReas on:string;
}

interfaceClaimData{
id:string;
serviceCenter:string;
dateSubmitted:string;
status:"pending-review"|" in-review"|" completed";
customer:{
name:string;
phone:string;
email:string;
address:string;
};
vehicle:{
vin:string;
model:string;
purchas eDate:string;
odometer:string;
warrantyExpiry:string;
};
reports:DiagnosticReport[];
}

const ClaimReviewInterface=()=>{
const[selectedClaim,setSelectedClaim]=useState<string>("WC-25-09-001");
const[reportDecisions,setReportDecisions]=useState<Record<string,{status:"approved"|" rejected",reas on:string}>>({});
const[showRejectDialog,setShowRejectDialog]=useState<string|null>(null);
const[rejectionReas on,setRejectionReas on]=useState("");

//Mockdataforpendingclaimsqueue
const pendingClaims=[
{
id:"WC-25-09-001",
serviceCenter:"SCHoChiMinh1",
dateSubmitted:"2025-01-15",
status:"pending-review",
priority:"high",
daysWaiting:2
},
{
id:"WC-25-09-008",
serviceCenter:"SCHanoi2",
dateSubmitted:"2025-01-14",
status:"in-review",
priority:"medium",
daysWaiting:3
},
{
id:"WC-25-09-015",
serviceCenter:"SCDaNang1",
dateSubmitted:"2025-01-13",
status:"pending-review",
priority:"low",
daysWaiting:4
}
];

//Mockdetailedclaimdata
constclaimData:ClaimData={
id:selectedClaim,
serviceCenter:"ServiceCenterHoChiMinh1",
dateSubmitted:"2025-01-1514:30",
status:"pending-review",
customer:{
name:"NguyễnVănA",
phone:"+84901234567",
email:"nguyen.van.a@email.com",
address:"123LêLợi,Quận1,TP.HCM"
},
vehicle:{
vin:"VF8ABC123456789",
model:"VinFas tVF82023",
purchas eDate:"2023-06-15",
odometer:"15,420km",
warrantyExpiry:"2026-06-15"
},
reports:[
{
id:"DR-001",
summary:"Batterycapacitydegradationdetected",
technician:"TrầnMinhB",
dateSubmitted:"2025-01-1510:30",
details:"Initialdiagnosticshows15%capacitylossinbatterycells3-6.Temperaturemonitoringindicatesoverheatinginchargingcycles.Requiresbatterymodulereplacementandcoolingsysteminspection.",
attachments:8,
requiredParts:["BatteryCellModulex2"," ThermalManagementSensor"],
status:"pending"
},
{
id:"DR-002",
summary:"Thermalmanagementsysteminspection",
technician:"TrầnMinhB",
dateSubmitted:"2025-01-1516:45",
details:"Coolingsystemfunctioningwithinnormalparameters.Thermalsensorsshowconsistentreadings.Noimmediateissuesdetectedwithcoolingpumporradiatorsystems.",
attachments:4,
requiredParts:[],
status:"pending"
},
{
id:"DR-003",
summary:"Chargingportconnectionanalysis",
technician:"LêThịC",
dateSubmitted:"2025-01-1609:15",
details:"Chargingportshowssignsofwearbutconnectionsaresecure.Minorcorrosiondetectedonpins2and5.Recommendcleaningandprotectivecoatingapplication.",
attachments:3,
requiredParts:["ChargingPortProtectionKit"],
status:"pending"
}
]
};

const getStatusBadge=(status))=>{
const statusConfig={
"pending-review":{variant:" warning",text:" PendingReview",icon:Clock},
"in-review":{variant:" default",text:" InReview",icon:Eye},
"completed":{variant:" success",text:" Completed",icon:CheckCircle}
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
const config={
high:{variant:"destructive",text:" HighPriority"},
medium:{variant:"warning",text:" MediumPriority"},
low:{variant:"secondary",text:" LowPriority"}
};

const priorityConfig=config[priorityas keyoftypeofconfig];
returnpriorityConfig<Badgevariant={priorityConfig.variant}clas sName="text-xs">{priorityConfig.text}</Badge>:null;
};

const getReportStatusBadge=(reportId:string,originalStatus))=>{
const decision=reportDecisions[reportId];
if(decision){
returndecision.status==="approved"
<Badgevariant="success">Approved</Badge>:
<Badgevariant="destructive">Rejected</Badge>;
}
return<Badgevariant="warning">PendingDecision</Badge>;
};

const handleApproveReport=(reportId))=>{
setReportDecisions(prev=>({
...prev,
[reportId]:{status:"approved"}
}));
};

const handleRejectReport=(reportId))=>{
setShowRejectDialog(reportId);
};

const confirmRejectReport=()=>{
if(showRejectDialog&&rejectionReas on.trim()){
setReportDecisions(prev=>({
...prev,
[showRejectDialog]:{status:"rejected",reas on:rejectionReas on.trim()}
}));
setShowRejectDialog(null);
setRejectionReas on("");
}
};

const canFinalize=claimData.reports.every(report=>reportDecisions[report.id]);

const handleFinalizeDecisions=()=>{
//Handlesubmissionofalldecisions
console.log("Finalizingdecisions:",reportDecisions);
};

return(
<divclas sName="flexh-screenbg-background">
{/*LeftPanel-ClaimsQueue*/}
<divclas sName="w-80border-rborder-borderbg-muted/20">
<divclas sName="p-4border-bborder-border">
<h2clas sName="text-lgfont-semiboldtext-foreground">ClaimsReviewQueue</h2>
<pclas sName="text-smtext-muted-foreground">Pendingmanufacturerapproval</p>
</div>

<divclas sName="overflow-y-autoh-fullpb-20">
{pendingClaims.map((claim)=>(
<Card
key={claim.id}
clas sName={`m-2cursor-pointertransition-allduration-200hover:shadow-md${
selectedClaim===claim.id'ring-2ring-primaryborder-primary':''
}`}
onClick={()=>setSelectedClaim(claim.id)}
>
<CardContentclas sName="p-4">
<divclas sName="space-y-3">
<divclas sName="flexitems-centerjustify-between">
<spanclas sName="font-monofont-mediumtext-sm">{claim.id}</span>
{getPriorityBadge(claim.priority)}
</div>

<div>
<pclas sName="font-mediumtext-sm">{claim.serviceCenter}</p>
<pclas sName="text-xstext-muted-foreground">Submitted{claim.dateSubmitted}</p>
</div>

<divclas sName="flexitems-centerjustify-between">
{getStatusBadge(claim.status)}
<spanclas sName="text-xstext-muted-foreground">
{claim.daysWaiting}dayswaiting
</span>
</div>
</div>
</CardContent>
</Card>
))}
</div>
</div>

{/*RightPanel-ClaimDetails*/}
<divclas sName="flex-1overflow-y-auto">
<divclas sName="p-6space-y-6">
{/*Header*/}
<divclas sName="flexitems-centerjustify-between">
<div>
<h1clas sName="text-2xlfont-boldtext-foreground">ClaimReview-{claimData.id}</h1>
<pclas sName="text-muted-foreground">Submittedby{claimData.serviceCenter}</p>
</div>
<divclas sName="flexitems-centerspace-x-3">
<Buttonvariant="outline">
<MessageSquareclas sName="mr-2h-4w-4"/>
RequestMoreInfo
</Button>
<Button
variant="gradient"
disabled={!canFinalize}
onClick={handleFinalizeDecisions}
>
<Sendclas sName="mr-2h-4w-4"/>
Finalize&SubmitDecisions
</Button>
</div>
</div>

{/*StatusOverview*/}
<Card>
<CardContentclas sName="p-4">
<divclas sName="gridgap-4md:grid-cols-3">
<divclas sName="text-center">
<pclas sName="text-2xlfont-boldtext-success">{Object.values(reportDecisions).filter(d=>d.status===" approved").length}</p>
<pclas sName="text-smtext-muted-foreground">ReportsApproved</p>
</div>
<divclas sName="text-center">
<pclas sName="text-2xlfont-boldtext-destructive">{Object.values(reportDecisions).filter(d=>d.status===" rejected").length}</p>
<pclas sName="text-smtext-muted-foreground">ReportsRejected</p>
</div>
<divclas sName="text-center">
<pclas sName="text-2xlfont-boldtext-warning">{claimData.reports.length-Object.keys(reportDecisions).length}</p>
<pclas sName="text-smtext-muted-foreground">PendingReview</p>
</div>
</div>
</CardContent>
</Card>

<TabsdefaultValue="reports" clas sName="space-y-4">
<TabsList>
<TabsTriggervalue="reports">DiagnosticReports({claimData.reports.length})</TabsTrigger>
<TabsTriggervalue="details">Cas eDetails</TabsTrigger>
<TabsTriggervalue="history">ReviewHistory</TabsTrigger>
</TabsList>

<TabsContentvalue="reports" clas sName="space-y-4">
{claimData.reports.map((report)=>(
<Cardkey={report.id}clas sName="overflow-hidden">
<CardHeader>
<divclas sName="flexitems-centerjustify-between">
<divclas sName="flexitems-centerspace-x-3">
<FileTextclas sName="h-5w-5text-primary"/>
<div>
<CardTitleclas sName="text-bas e">{report.id}-{report.summary}</CardTitle>
<CardDescription>
By{report.technician}on{report.dateSubmitted}
</CardDescription>
</div>
</div>
<divclas sName="flexitems-centerspace-x-2">
{getReportStatusBadge(report.id,report.status)}
</div>
</div>
</CardHeader>

<CardContentclas sName="space-y-4">
<divclas sName="bg-muted/50p-4rounded-lg">
<pclas sName="text-sm">{report.details}</p>
</div>

{report.requiredParts.length>0&&(
<div>
<pclas sName="text-smfont-mediummb-2flexitems-centerspace-x-2">
<Packageclas sName="h-4w-4"/>
<span>RequiredParts:</span>
</p>
<divclas sName="flexflex-wrapgap-2">
{report.requiredParts.map((part,index)=>(
<Badgekey={index}variant="outline">{part}</Badge>
))}
</div>
</div>
)}

<divclas sName="flexitems-centerjustify-between">
<divclas sName="flexitems-centerspace-x-4text-smtext-muted-foreground">
<divclas sName="flexitems-centerspace-x-1">
<Cameraclas sName="h-4w-4"/>
<span>{report.attachments}attachments</span>
</div>
<Buttonvariant="ghost" size="sm">
<Eyeclas sName="h-4w-4mr-1"/>
ViewDetails
</Button>
</div>

{!reportDecisions[report.id]&&(
<divclas sName="flexitems-centerspace-x-2">
<Button
variant="outline"
size="sm"
onClick={()=>handleRejectReport(report.id)}
clas sName="text-destructivehover:bg-destructive/10"
>
<XCircleclas sName="h-4w-4mr-1"/>
Reject
</Button>
<Button
variant="success"
size="sm"
onClick={()=>handleApproveReport(report.id)}
>
<CheckCircleclas sName="h-4w-4mr-1"/>
Approve
</Button>
</div>
)}

{reportDecisions[report.id].status==="rejected"&&(
<divclas sName="bg-destructive/10p-3rounded-lgborderborder-destructive/20">
<pclas sName="text-smfont-mediumtext-destructivemb-1">RejectionReas on:</p>
<pclas sName="text-sm">{reportDecisions[report.id].reas on}</p>
</div>
)}
</div>
</CardContent>
</Card>
))}
</TabsContent>

<TabsContentvalue="details" clas sName="space-y-4">
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
<divclas sName="space-y-3">
<div>
<pclas sName="font-medium">{claimData.customer.name}</p>
</div>
<divclas sName="flexitems-centerspace-x-3">
<Phoneclas sName="h-4w-4text-muted-foreground"/>
<spanclas sName="text-sm">{claimData.customer.phone}</span>
</div>
<divclas sName="flexitems-centerspace-x-3">
<Mailclas sName="h-4w-4text-muted-foreground"/>
<spanclas sName="text-sm">{claimData.customer.email}</span>
</div>
<divclas sName="flexitems-centerspace-x-3">
<MapPinclas sName="h-4w-4text-muted-foreground"/>
<spanclas sName="text-sm">{claimData.customer.address}</span>
</div>
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
<pclas sName="text-xstext-muted-foreground">Model</p>
<pclas sName="text-smfont-medium">{claimData.vehicle.model}</p>
</div>
<div>
<pclas sName="text-xstext-muted-foreground">VIN</p>
<pclas sName="text-smfont-mediumfont-mono">{claimData.vehicle.vin}</p>
</div>
<div>
<pclas sName="text-xstext-muted-foreground">Purchas eDate</p>
<pclas sName="text-smfont-medium">{claimData.vehicle.purchas eDate}</p>
</div>
<div>
<pclas sName="text-xstext-muted-foreground">Odometer</p>
<pclas sName="text-smfont-medium">{claimData.vehicle.odometer}</p>
</div>
<div>
<pclas sName="text-xstext-muted-foreground">WarrantyExpiry</p>
<pclas sName="text-smfont-medium">{claimData.vehicle.warrantyExpiry}</p>
</div>
</div>
</CardContent>
</Card>
</div>
</TabsContent>

<TabsContentvalue="history">
<Card>
<CardHeader>
<CardTitle>ReviewHistory</CardTitle>
<CardDescription>Timelineofreviewactivitiesforthisclaim</CardDescription>
</CardHeader>
<CardContent>
<divclas sName="space-y-4">
<divclas sName="flexitems-startspace-x-3">
<Avatarclas sName="h-8w-8">
<AvatarFallbackclas sName="bg-primarytext-primary-foregroundtext-xs">SY</AvatarFallback>
</Avatar>
<divclas sName="flex-1">
<pclas sName="text-sm">Claimsubmittedforreview</p>
<divclas sName="flexitems-centerspace-x-2text-xstext-muted-foreground">
<span>ServiceCenterStaff</span>
<span>•</span>
<span>{claimData.dateSubmitted}</span>
</div>
</div>
</div>
</div>
</CardContent>
</Card>
</TabsContent>
</Tabs>
</div>
</div>

{/*RejectDialog*/}
<Dialogopen={!!showRejectDialog}onOpenChange={()=>setShowRejectDialog(null)}>
<DialogContent>
<DialogHeader>
<DialogTitle>RejectDiagnosticReport</DialogTitle>
<DialogDescription>
Pleas eprovideadetailedreas onforrejectingthisdiagnosticreport.
</DialogDescription>
</DialogHeader>
<divclas sName="space-y-4">
<Textarea
placeholder="Enterrejectionreas on..."
value={rejectionReas on}
onChange={(e)=>setRejectionReas on(e.target.value)}
rows={4}
/>
<divclas sName="flexjustify-endspace-x-2">
<Buttonvariant="outline" onClick={()=>setShowRejectDialog(null)}>
Cancel
</Button>
<Button
variant="destructive"
onClick={confirmRejectReport}
disabled={!rejectionReas on.trim()}
>
ConfirmRejection
</Button>
</div>
</div>
</DialogContent>
</Dialog>
</div>
);
};

exportdefaultClaimReviewInterface;