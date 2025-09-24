import { useState } from "react";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar,AvatarFallback,AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
CheckCircle,
X,
Eye,
Clock,
AlertTriangle,
Car,
User,
MapPin,
Calendar,
FileText,
Camera,
Send,
ChevronRight
 } from "lucide-react";

interfaceReportDecision{
reportId:string;
status:'pending'|'approved'|'rejected';
rejectReas on:string;
}

const ClaimReviewInterfacePro=()=>{
const[selectedClaim,setSelectedClaim]=useState("WC-25-09-001");
const[decisions,setDecisions]=useState<Record<string,ReportDecision>>({});
const[rejectReas on,setRejectReas on]=useState("");
const[isRejectDialogOpen,setIsRejectDialogOpen]=useState(false);
const[pendingRejectReportId,setPendingRejectReportId]=useState("");

//Mockdataforpendingclaimsqueue
const pendingClaims=[
{
id:"WC-25-09-001",
serviceCenter:"VinFas tServiceCenterHanoi",
customer:"NguyễnVănAn",
vin:"VF8ABC123456789",
model:"VF8Plus",
dateSubmitted:"2025-01-17",
priority:"high",
reportsCount:2
},
{
id:"WC-25-09-006",
serviceCenter:"VinFas tServiceCenterHCMC",
customer:"TrầnThịBích",
vin:"VF9DEF456789012",
model:"VF9Premium",
dateSubmitted:"2025-01-16",
priority:"medium",
reportsCount:1
},
{
id:"WC-25-09-007",
serviceCenter:"VinFas tServiceCenterDaNang",
customer:"LêMinhHoàng",
vin:"VF8GHI789012345",
model:"VF8Eco",
dateSubmitted:"2025-01-15",
priority:"low",
reportsCount:3
}
];

//Mockdataforselectedclaimdetails
const claimDetails={
id:"WC-25-09-001",
serviceCenter:{
name:"VinFas tServiceCenterHanoi",
address:"123CầuGiấyStreet,CầuGiấyDistrict,Hanoi",
contact:"+842412345678"
},
customer:{
name:"NguyễnVănAn",
phone:"+84901234567",
email:"nguyen.van.an@email.com"
},
vehicle:{
model:"VF8Plus",
vin:"VF8ABC123456789",
purchas eDate:"2024-03-15",
odometer:"12,450km",
color:"ArcticWhite"
},
complaint:"Vehicleexperiencingreducedbatteryrangeandchargingissues.Customerreports40%reductionindrivingrange.",
submittedBy:"NguyễnThuHà",
dateSubmitted:"2025-01-17",
diagnosticReports:[
{
id:"DR-001",
title:"BatterySystemDiagnostic",
technician:"TrầnMinhBảo",
diagnosis:"Batterypackshowingdegradedcellsinmodule3.Thermalrunawayprotectiontriggeredtwiceduringchargingcycles.Cellvoltageimbalancedetectedacross4cellswithinmodule.RecommendimmediatereplacementofbatterymoduleBM-VF8-03andcoolingsystemgas kettopreventfurtherdegradation.",
requiredParts:["BatteryModuleBM-VF8-03($2,850)"," CoolingSystemGas ketCSG-001($45)"],
photos:[
{id:1,description:"Batterymodulethermalimagingshowinghotspots"},
{id:2,description:"Cellvoltagereadingsdisplay"},
{id:3,description:"Physicalinspectionofbatteryconnections"}
],
estimatedCost:2895
},
{
id:"DR-002",
title:"ChargingSystemAnalysis",
technician:"TrầnMinhBảo",
diagnosis:"Onboardchargeroperatingwithinnormalparameters.DC-DCconverterefficiencyat94.2%(withinspec).ACchargingtestedat7.2kWwithnofaultsdetected.Nohardwareissuesidentifiedinchargingsystemcomponents.",
requiredParts:[],
photos:[
{id:4,description:"Chargingsystemdiagnosticreadout"},
{id:5,description:"Onboardchargerinspection"}
],
estimatedCost:0
}
]
};

const handleApproveReport=(reportId))=>{
setDecisions(prev=>({
...prev,
[reportId]:{reportId,status:'approved'}
}));
};

const handleRejectReport=(reportId))=>{
setPendingRejectReportId(reportId);
setIsRejectDialogOpen(true);
};

const confirmRejectReport=()=>{
if(rejectReas on.trim()&&pendingRejectReportId){
setDecisions(prev=>({
...prev,
[pendingRejectReportId]:{
reportId:pendingRejectReportId,
status:'rejected',
rejectReas on:rejectReas on.trim()
}
}));

setRejectReas on("");
setPendingRejectReportId("");
setIsRejectDialogOpen(false);
}
};

const canFinalize=claimDetails.diagnosticReports.every(report=>
decisions[report.id].status==='approved'||decisions[report.id].status==='rejected'
);

const handleFinalize=()=>{
if(canFinalize){
console.log("Finalizingdecisions:",decisions);
//Handlefinalizationlogic
}
};

const getReportStatus=(reportId))=>{
const decision=decisions[reportId];
if(!decision)return'pending';
returndecision.status;
};

const getPriorityBadge=(priority))=>{
const config={
high:{clas sName:"bg-destructive/10text-destructiveborder-destructive"},
medium:{clas sName:"bg-warning/10text-warningborder-warning"},
low:{clas sName:"bg-mutedtext-muted-foregroundborder-muted-foreground"}
};

const style=config[priorityas keyoftypeofconfig]||config.medium;
return(
<Badgevariant="outline" clas sName={`${style.clas sName}text-xscapitalize`}>
{priority}
</Badge>
);
};

return(
<divclas sName="flexh-screenbg-background">
{/*LeftPanel-ClaimsQueue*/}
<divclas sName="w-80border-rbg-card">
<divclas sName="p-6border-b">
<h2clas sName="text-xlfont-bold">ClaimsPendingReview</h2>
<pclas sName="text-smtext-muted-foregroundmt-1">{pendingClaims.length}claimsawaitingdecision</p>
</div>

<divclas sName="overflow-y-autoh-fullpb-20">
{pendingClaims.map((claim)=>(
<div
key={claim.id}
clas sName={`p-4border-bcursor-pointerhover:bg-muted/50transition-colors${
selectedClaim===claim.id'bg-primary/5border-r-4border-r-primary':''
}`}
onClick={()=>setSelectedClaim(claim.id)}
>
<divclas sName="space-y-2">
<divclas sName="flexitems-centerjustify-between">
<spanclas sName="font-monotext-smfont-mediumtext-primary">{claim.id}</span>
{getPriorityBadge(claim.priority)}
</div>

<div>
<pclas sName="font-mediumtext-sm">{claim.customer}</p>
<pclas sName="text-xstext-muted-foreground">{claim.model}•{claim.vin}</p>
</div>

<divclas sName="text-xstext-muted-foreground">
<divclas sName="flexitems-centerspace-x-1">
<MapPinclas sName="h-3w-3"/>
<spanclas sName="truncate">{claim.serviceCenter}</span>
</div>
<divclas sName="flexitems-centerspace-x-1mt-1">
<Calendarclas sName="h-3w-3"/>
<span>Submitted{claim.dateSubmitted}</span>
</div>
<divclas sName="flexitems-centerspace-x-1mt-1">
<FileTextclas sName="h-3w-3"/>
<span>{claim.reportsCount}diagnosticreports</span>
</div>
</div>
</div>
</div>
))}
</div>
</div>

{/*RightPanel-ClaimDetails*/}
<divclas sName="flex-1overflow-y-auto">
<divclas sName="p-6space-y-6">
{/*Header*/}
<divclas sName="flexitems-centerjustify-between">
<div>
<h1clas sName="text-3xlfont-bold">{claimDetails.id}</h1>
<pclas sName="text-muted-foreground">Submittedby{claimDetails.submittedBy}on{claimDetails.dateSubmitted}</p>
</div>
<Button
size="lg"
disabled={!canFinalize}
onClick={handleFinalize}
clas sName={`${!canFinalize'opacity-50':'animate-pulse-glow'}`}
>
<Sendclas sName="h-4w-4mr-2"/>
Finalize&SubmitDecisions
</Button>
</div>

<divclas sName="gridgap-6lg:grid-cols-3">
{/*MainContent-Reports*/}
<divclas sName="lg:col-span-2space-y-6">
<Card>
<CardHeader>
<CardTitleclas sName="text-xl">CustomerComplaint</CardTitle>
</CardHeader>
<CardContent>
<pclas sName="text-smbg-mutedp-4rounded-lg">{claimDetails.complaint}</p>
</CardContent>
</Card>

{/*DiagnosticReportsforReview*/}
<divclas sName="space-y-4">
<h2clas sName="text-2xlfont-bold">ReportsforApproval</h2>

{claimDetails.diagnosticReports.map((report,index)=>{
const status=getReportStatus(report.id);
const decision=decisions[report.id];

return(
<Cardkey={report.id}clas sName={`border-l-4${
status==='approved''border-l-successbg-success/5':
status==='rejected''border-l-destructivebg-destructive/5':
'border-l-warningbg-warning/5'
}`}>
<CardHeaderclas sName="pb-4">
<divclas sName="flexitems-centerjustify-between">
<CardTitleclas sName="text-lg">{report.title}</CardTitle>
<divclas sName="flexitems-centerspace-x-2">
{status==='pending'&&(
<Badgevariant="outline" clas sName="border-warningtext-warningbg-warning/5">
<Clockclas sName="h-3w-3mr-1"/>
AwaitingDecision
</Badge>
)}
{status==='approved'&&(
<Badgevariant="outline" clas sName="border-successtext-successbg-success/5">
<CheckCircleclas sName="h-3w-3mr-1"/>
Approved
</Badge>
)}
{status==='rejected'&&(
<Badgevariant="outline" clas sName="border-destructivetext-destructivebg-destructive/5">
<Xclas sName="h-3w-3mr-1"/>
Rejected
</Badge>
)}
</div>
</div>
<CardDescription>By{report.technician}</CardDescription>
</CardHeader>

<CardContentclas sName="space-y-4">
<div>
<h4clas sName="font-mediummb-2">Diagnosis</h4>
<pclas sName="text-smbg-mutedp-3rounded-md">{report.diagnosis}</p>
</div>

{report.requiredParts.length>0&&(
<div>
<h4clas sName="font-mediummb-2">RequiredParts&Cost</h4>
<divclas sName="space-y-1">
{report.requiredParts.map((part,partIndex)=>(
<divkey={partIndex}clas sName="text-smbg-accentp-2roundedflexitems-centerjustify-between">
<span>{part}</span>
</div>
))}
<divclas sName="font-semiboldtext-rightpt-2border-t">
Total:${report.estimatedCost.toLocaleString()}
</div>
</div>
</div>
)}

<div>
<h4clas sName="font-mediummb-2flexitems-center">
<Cameraclas sName="h-4w-4mr-2"/>
AttachedPhotos({report.photos.length})
</h4>
<divclas sName="gridgrid-cols-2gap-2">
{report.photos.map((photo)=>(
<divkey={photo.id}clas sName="text-xsbg-mutedp-2roundedflexitems-center">
<Eyeclas sName="h-3w-3mr-2"/>
<spanclas sName="truncate">{photo.description}</span>
</div>
))}
</div>
</div>

{status==='rejected'&&decision.rejectReas on&&(
<divclas sName="p-3bg-destructive/10borderborder-destructive/20rounded-lg">
<h4clas sName="font-mediumtext-destructivemb-1">RejectionReas on</h4>
<pclas sName="text-smtext-destructive">{decision.rejectReas on}</p>
</div>
)}

{status==='pending'&&(
<divclas sName="flexspace-x-3pt-4border-t">
<Button
onClick={()=>handleApproveReport(report.id)}
clas sName="flex-1bg-successhover:bg-success/90text-success-foreground"
>
<CheckCircleclas sName="h-4w-4mr-2"/>
ApproveReport
</Button>
<Button
variant="destructive"
onClick={()=>handleRejectReport(report.id)}
clas sName="flex-1"
>
<Xclas sName="h-4w-4mr-2"/>
RejectReport
</Button>
</div>
)}
</CardContent>
</Card>
);
})}
</div>
</div>

{/*Sidebar-ClaimInformation*/}
<divclas sName="space-y-6">
{/*ServiceCenterInfo*/}
<Card>
<CardHeaderclas sName="pb-3">
<CardTitleclas sName="text-lgflexitems-center">
<MapPinclas sName="h-4w-4mr-2"/>
ServiceCenter
</CardTitle>
</CardHeader>
<CardContentclas sName="space-y-3">
<div>
<pclas sName="font-mediumtext-sm">{claimDetails.serviceCenter.name}</p>
<pclas sName="text-xstext-muted-foregroundmt-1">{claimDetails.serviceCenter.address}</p>
<pclas sName="text-xstext-muted-foreground">{claimDetails.serviceCenter.contact}</p>
</div>
</CardContent>
</Card>

{/*CustomerInfo*/}
<Card>
<CardHeaderclas sName="pb-3">
<CardTitleclas sName="text-lgflexitems-center">
<Userclas sName="h-4w-4mr-2"/>
Customer
</CardTitle>
</CardHeader>
<CardContentclas sName="space-y-3">
<divclas sName="flexitems-centerspace-x-3">
<Avatarclas sName="h-10w-10">
<AvatarImagesrc="/api/placeholder/40/40"/>
<AvatarFallback>{claimDetails.customer.name.charAt(0)}</AvatarFallback>
</Avatar>
<divclas sName="flex-1min-w-0">
<pclas sName="font-mediumtext-sm">{claimDetails.customer.name}</p>
<pclas sName="text-xstext-muted-foreground">{claimDetails.customer.phone}</p>
<pclas sName="text-xstext-muted-foregroundtruncate">{claimDetails.customer.email}</p>
</div>
</div>
</CardContent>
</Card>

{/*VehicleInfo*/}
<Card>
<CardHeaderclas sName="pb-3">
<CardTitleclas sName="text-lgflexitems-center">
<Carclas sName="h-4w-4mr-2"/>
Vehicle
</CardTitle>
</CardHeader>
<CardContentclas sName="space-y-3">
<div>
<pclas sName="font-medium">{claimDetails.vehicle.model}</p>
<pclas sName="text-xsfont-monotext-muted-foreground">{claimDetails.vehicle.vin}</p>
</div>
<divclas sName="space-y-1text-smtext-muted-foreground">
<div>Purchas e:{claimDetails.vehicle.purchas eDate}</div>
<div>Odometer:{claimDetails.vehicle.odometer}</div>
<div>Color:{claimDetails.vehicle.color}</div>
</div>
</CardContent>
</Card>

{/*ProgressIndicator*/}
<Card>
<CardHeaderclas sName="pb-3">
<CardTitleclas sName="text-lg">ReviewProgress</CardTitle>
</CardHeader>
<CardContent>
<divclas sName="space-y-3">
{claimDetails.diagnosticReports.map((report,index)=>(
<divkey={report.id}clas sName="flexitems-centerjustify-betweentext-sm">
<spanclas sName="truncate">{report.title}</span>
<divclas sName="flexitems-center">
{getReportStatus(report.id)==='pending'&&<Clockclas sName="h-4w-4text-warning"/>}
{getReportStatus(report.id)==='approved'&&<CheckCircleclas sName="h-4w-4text-success"/>}
{getReportStatus(report.id)==='rejected'&&<Xclas sName="h-4w-4text-destructive"/>}
</div>
</div>
))}
</div>

{!canFinalize&&(
<divclas sName="mt-4p-3bg-warning/10borderborder-warning/20rounded-lg">
<divclas sName="flexitems-centerspace-x-2">
<AlertTriangleclas sName="h-4w-4text-warning"/>
<pclas sName="text-xstext-warning-foreground">Reviewallreportstofinalize</p>
</div>
</div>
)}
</CardContent>
</Card>
</div>
</div>
</div>
</div>

{/*RejectReportDialog*/}
<Dialogopen={isRejectDialogOpen}onOpenChange={setIsRejectDialogOpen}>
<DialogContent>
<DialogHeader>
<DialogTitle>RejectDiagnosticReport</DialogTitle>
</DialogHeader>
<divclas sName="space-y-4">
<div>
<LabelhtmlFor="rejectReas on">Reas onforrejection*</Label>
<Textarea
id="rejectReas on"
value={rejectReas on}
onChange={(e)=>setRejectReas on(e.target.value)}
placeholder="Pleas eprovideadetailedreas onforrejectingthisreport..."
clas sName="mt-2min-h-[100px]"
required
/>
</div>

<divclas sName="flexspace-x-3pt-4">
<Button
variant="outline"
onClick={()=>setIsRejectDialogOpen(false)}
clas sName="flex-1"
>
Cancel
</Button>
<Button
variant="destructive"
onClick={confirmRejectReport}
disabled={!rejectReas on.trim()}
clas sName="flex-1"
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

exportdefaultClaimReviewInterfacePro;