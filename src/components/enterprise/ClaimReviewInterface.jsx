import { useState } from"react";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Badge } from"@/components/ui/badge";
import { Input } from"@/components/ui/input";
import { Textarea } from"@/components/ui/textarea";
import { Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger } from"@/components/ui/dialog";
import { Avatar,AvatarFallback } from"@/components/ui/avatar";
import { Tabs,TabsContent,TabsList,TabsTrigger } from"@/components/ui/tabs";
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
 } from"lucide-react";

interfaceDiagnosticReport{
id:string;
summary:string;
technician:string;
dateSubmitted:string;
details:string;
attachments:number;
requiredParts:string[];
status:"pending"|"approved"|"rejected";
rejectionReason:string;
}

interfaceClaimData{
id:string;
serviceCenter:string;
dateSubmitted:string;
status:"pending-review"|"in-review"|"completed";
customer:{
name:string;
phone:string;
email:string;
address:string;
};
vehicle:{
vin:string;
model:string;
purchaseDate:string;
odometer:string;
warrantyExpiry:string;
};
reports:DiagnosticReport[];
}

const ClaimReviewInterface=()=>{
const[selectedClaim,setSelectedClaim]=useState<string>("WC-25-09-001");
const[reportDecisions,setReportDecisions]=useState<Record<string,{status:"approved"|"rejected",reason:string}>>({});
const[showRejectDialog,setShowRejectDialog]=useState<string|null>(null);
const[rejectionReason,setRejectionReason]=useState("");

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
model:"VinFastVF82023",
purchaseDate:"2023-06-15",
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
requiredParts:["BatteryCellModulex2","ThermalManagementSensor"],
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
"pending-review":{variant:"warning",text:"PendingReview",icon:Clock},
"in-review":{variant:"default",text:"InReview",icon:Eye},
"completed":{variant:"success",text:"Completed",icon:CheckCircle}
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
const config={
high:{variant:"destructive",text:"HighPriority"},
medium:{variant:"warning",text:"MediumPriority"},
low:{variant:"secondary",text:"LowPriority"}
};

const priorityConfig=config[priorityaskeyoftypeofconfig];
returnpriorityConfig<Badgevariant={priorityConfig.variant}className="text-xs">{priorityConfig.text}</Badge>:null;
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
if(showRejectDialog&&rejectionReason.trim()){
setReportDecisions(prev=>({
...prev,
[showRejectDialog]:{status:"rejected",reason:rejectionReason.trim()}
}));
setShowRejectDialog(null);
setRejectionReason("");
}
};

const canFinalize=claimData.reports.every(report=>reportDecisions[report.id]);

const handleFinalizeDecisions=()=>{
//Handlesubmissionofalldecisions
console.log("Finalizingdecisions:",reportDecisions);
};

return(
<divclassName="flexh-screenbg-background">
{/*LeftPanel-ClaimsQueue*/}
<divclassName="w-80border-rborder-borderbg-muted/20">
<divclassName="p-4border-bborder-border">
<h2className="text-lgfont-semiboldtext-foreground">ClaimsReviewQueue</h2>
<pclassName="text-smtext-muted-foreground">Pendingmanufacturerapproval</p>
</div>

<divclassName="overflow-y-autoh-fullpb-20">
{pendingClaims.map((claim)=>(
<Card
key={claim.id}
className={`m-2cursor-pointertransition-allduration-200hover:shadow-md${
selectedClaim===claim.id'ring-2ring-primaryborder-primary':''
}`}
onClick={()=>setSelectedClaim(claim.id)}
>
<CardContentclassName="p-4">
<divclassName="space-y-3">
<divclassName="flexitems-centerjustify-between">
<spanclassName="font-monofont-mediumtext-sm">{claim.id}</span>
{getPriorityBadge(claim.priority)}
</div>

<div>
<pclassName="font-mediumtext-sm">{claim.serviceCenter}</p>
<pclassName="text-xstext-muted-foreground">Submitted{claim.dateSubmitted}</p>
</div>

<divclassName="flexitems-centerjustify-between">
{getStatusBadge(claim.status)}
<spanclassName="text-xstext-muted-foreground">
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
<divclassName="flex-1overflow-y-auto">
<divclassName="p-6space-y-6">
{/*Header*/}
<divclassName="flexitems-centerjustify-between">
<div>
<h1className="text-2xlfont-boldtext-foreground">ClaimReview-{claimData.id}</h1>
<pclassName="text-muted-foreground">Submittedby{claimData.serviceCenter}</p>
</div>
<divclassName="flexitems-centerspace-x-3">
<Buttonvariant="outline">
<MessageSquareclassName="mr-2h-4w-4"/>
RequestMoreInfo
</Button>
<Button
variant="gradient"
disabled={!canFinalize}
onClick={handleFinalizeDecisions}
>
<SendclassName="mr-2h-4w-4"/>
Finalize&SubmitDecisions
</Button>
</div>
</div>

{/*StatusOverview*/}
<Card>
<CardContentclassName="p-4">
<divclassName="gridgap-4md:grid-cols-3">
<divclassName="text-center">
<pclassName="text-2xlfont-boldtext-success">{Object.values(reportDecisions).filter(d=>d.status==="approved").length}</p>
<pclassName="text-smtext-muted-foreground">ReportsApproved</p>
</div>
<divclassName="text-center">
<pclassName="text-2xlfont-boldtext-destructive">{Object.values(reportDecisions).filter(d=>d.status==="rejected").length}</p>
<pclassName="text-smtext-muted-foreground">ReportsRejected</p>
</div>
<divclassName="text-center">
<pclassName="text-2xlfont-boldtext-warning">{claimData.reports.length-Object.keys(reportDecisions).length}</p>
<pclassName="text-smtext-muted-foreground">PendingReview</p>
</div>
</div>
</CardContent>
</Card>

<TabsdefaultValue="reports"className="space-y-4">
<TabsList>
<TabsTriggervalue="reports">DiagnosticReports({claimData.reports.length})</TabsTrigger>
<TabsTriggervalue="details">CaseDetails</TabsTrigger>
<TabsTriggervalue="history">ReviewHistory</TabsTrigger>
</TabsList>

<TabsContentvalue="reports"className="space-y-4">
{claimData.reports.map((report)=>(
<Cardkey={report.id}className="overflow-hidden">
<CardHeader>
<divclassName="flexitems-centerjustify-between">
<divclassName="flexitems-centerspace-x-3">
<FileTextclassName="h-5w-5text-primary"/>
<div>
<CardTitleclassName="text-base">{report.id}-{report.summary}</CardTitle>
<CardDescription>
By{report.technician}on{report.dateSubmitted}
</CardDescription>
</div>
</div>
<divclassName="flexitems-centerspace-x-2">
{getReportStatusBadge(report.id,report.status)}
</div>
</div>
</CardHeader>

<CardContentclassName="space-y-4">
<divclassName="bg-muted/50p-4rounded-lg">
<pclassName="text-sm">{report.details}</p>
</div>

{report.requiredParts.length>0&&(
<div>
<pclassName="text-smfont-mediummb-2flexitems-centerspace-x-2">
<PackageclassName="h-4w-4"/>
<span>RequiredParts:</span>
</p>
<divclassName="flexflex-wrapgap-2">
{report.requiredParts.map((part,index)=>(
<Badgekey={index}variant="outline">{part}</Badge>
))}
</div>
</div>
)}

<divclassName="flexitems-centerjustify-between">
<divclassName="flexitems-centerspace-x-4text-smtext-muted-foreground">
<divclassName="flexitems-centerspace-x-1">
<CameraclassName="h-4w-4"/>
<span>{report.attachments}attachments</span>
</div>
<Buttonvariant="ghost"size="sm">
<EyeclassName="h-4w-4mr-1"/>
ViewDetails
</Button>
</div>

{!reportDecisions[report.id]&&(
<divclassName="flexitems-centerspace-x-2">
<Button
variant="outline"
size="sm"
onClick={()=>handleRejectReport(report.id)}
className="text-destructivehover:bg-destructive/10"
>
<XCircleclassName="h-4w-4mr-1"/>
Reject
</Button>
<Button
variant="success"
size="sm"
onClick={()=>handleApproveReport(report.id)}
>
<CheckCircleclassName="h-4w-4mr-1"/>
Approve
</Button>
</div>
)}

{reportDecisions[report.id].status==="rejected"&&(
<divclassName="bg-destructive/10p-3rounded-lgborderborder-destructive/20">
<pclassName="text-smfont-mediumtext-destructivemb-1">RejectionReason:</p>
<pclassName="text-sm">{reportDecisions[report.id].reason}</p>
</div>
)}
</div>
</CardContent>
</Card>
))}
</TabsContent>

<TabsContentvalue="details"className="space-y-4">
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
<divclassName="space-y-3">
<div>
<pclassName="font-medium">{claimData.customer.name}</p>
</div>
<divclassName="flexitems-centerspace-x-3">
<PhoneclassName="h-4w-4text-muted-foreground"/>
<spanclassName="text-sm">{claimData.customer.phone}</span>
</div>
<divclassName="flexitems-centerspace-x-3">
<MailclassName="h-4w-4text-muted-foreground"/>
<spanclassName="text-sm">{claimData.customer.email}</span>
</div>
<divclassName="flexitems-centerspace-x-3">
<MapPinclassName="h-4w-4text-muted-foreground"/>
<spanclassName="text-sm">{claimData.customer.address}</span>
</div>
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
<pclassName="text-xstext-muted-foreground">Model</p>
<pclassName="text-smfont-medium">{claimData.vehicle.model}</p>
</div>
<div>
<pclassName="text-xstext-muted-foreground">VIN</p>
<pclassName="text-smfont-mediumfont-mono">{claimData.vehicle.vin}</p>
</div>
<div>
<pclassName="text-xstext-muted-foreground">PurchaseDate</p>
<pclassName="text-smfont-medium">{claimData.vehicle.purchaseDate}</p>
</div>
<div>
<pclassName="text-xstext-muted-foreground">Odometer</p>
<pclassName="text-smfont-medium">{claimData.vehicle.odometer}</p>
</div>
<div>
<pclassName="text-xstext-muted-foreground">WarrantyExpiry</p>
<pclassName="text-smfont-medium">{claimData.vehicle.warrantyExpiry}</p>
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
<divclassName="space-y-4">
<divclassName="flexitems-startspace-x-3">
<AvatarclassName="h-8w-8">
<AvatarFallbackclassName="bg-primarytext-primary-foregroundtext-xs">SY</AvatarFallback>
</Avatar>
<divclassName="flex-1">
<pclassName="text-sm">Claimsubmittedforreview</p>
<divclassName="flexitems-centerspace-x-2text-xstext-muted-foreground">
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
Pleaseprovideadetailedreasonforrejectingthisdiagnosticreport.
</DialogDescription>
</DialogHeader>
<divclassName="space-y-4">
<Textarea
placeholder="Enterrejectionreason..."
value={rejectionReason}
onChange={(e)=>setRejectionReason(e.target.value)}
rows={4}
/>
<divclassName="flexjustify-endspace-x-2">
<Buttonvariant="outline"onClick={()=>setShowRejectDialog(null)}>
Cancel
</Button>
<Button
variant="destructive"
onClick={confirmRejectReport}
disabled={!rejectionReason.trim()}
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