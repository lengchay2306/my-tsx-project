import { useState } from"react";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Badge } from"@/components/ui/badge";
import { Avatar,AvatarFallback,AvatarImage } from"@/components/ui/avatar";
import { Textarea } from"@/components/ui/textarea";
import { Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger } from"@/components/ui/dialog";
import { Label } from"@/components/ui/label";
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
 } from"lucide-react";

interfaceReportDecision{
reportId:string;
status:'pending'|'approved'|'rejected';
rejectReason:string;
}

const ClaimReviewInterfacePro=()=>{
const[selectedClaim,setSelectedClaim]=useState("WC-25-09-001");
const[decisions,setDecisions]=useState<Record<string,ReportDecision>>({});
const[rejectReason,setRejectReason]=useState("");
const[isRejectDialogOpen,setIsRejectDialogOpen]=useState(false);
const[pendingRejectReportId,setPendingRejectReportId]=useState("");

//Mockdataforpendingclaimsqueue
const pendingClaims=[
{
id:"WC-25-09-001",
serviceCenter:"VinFastServiceCenterHanoi",
customer:"NguyễnVănAn",
vin:"VF8ABC123456789",
model:"VF8Plus",
dateSubmitted:"2025-01-17",
priority:"high",
reportsCount:2
},
{
id:"WC-25-09-006",
serviceCenter:"VinFastServiceCenterHCMC",
customer:"TrầnThịBích",
vin:"VF9DEF456789012",
model:"VF9Premium",
dateSubmitted:"2025-01-16",
priority:"medium",
reportsCount:1
},
{
id:"WC-25-09-007",
serviceCenter:"VinFastServiceCenterDaNang",
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
name:"VinFastServiceCenterHanoi",
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
purchaseDate:"2024-03-15",
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
diagnosis:"Batterypackshowingdegradedcellsinmodule3.Thermalrunawayprotectiontriggeredtwiceduringchargingcycles.Cellvoltageimbalancedetectedacross4cellswithinmodule.RecommendimmediatereplacementofbatterymoduleBM-VF8-03andcoolingsystemgaskettopreventfurtherdegradation.",
requiredParts:["BatteryModuleBM-VF8-03($2,850)","CoolingSystemGasketCSG-001($45)"],
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
if(rejectReason.trim()&&pendingRejectReportId){
setDecisions(prev=>({
...prev,
[pendingRejectReportId]:{
reportId:pendingRejectReportId,
status:'rejected',
rejectReason:rejectReason.trim()
}
}));

setRejectReason("");
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
high:{className:"bg-destructive/10text-destructiveborder-destructive"},
medium:{className:"bg-warning/10text-warningborder-warning"},
low:{className:"bg-mutedtext-muted-foregroundborder-muted-foreground"}
};

const style=config[priorityaskeyoftypeofconfig]||config.medium;
return(
<Badgevariant="outline"className={`${style.className}text-xscapitalize`}>
{priority}
</Badge>
);
};

return(
<divclassName="flexh-screenbg-background">
{/*LeftPanel-ClaimsQueue*/}
<divclassName="w-80border-rbg-card">
<divclassName="p-6border-b">
<h2className="text-xlfont-bold">ClaimsPendingReview</h2>
<pclassName="text-smtext-muted-foregroundmt-1">{pendingClaims.length}claimsawaitingdecision</p>
</div>

<divclassName="overflow-y-autoh-fullpb-20">
{pendingClaims.map((claim)=>(
<div
key={claim.id}
className={`p-4border-bcursor-pointerhover:bg-muted/50transition-colors${
selectedClaim===claim.id'bg-primary/5border-r-4border-r-primary':''
}`}
onClick={()=>setSelectedClaim(claim.id)}
>
<divclassName="space-y-2">
<divclassName="flexitems-centerjustify-between">
<spanclassName="font-monotext-smfont-mediumtext-primary">{claim.id}</span>
{getPriorityBadge(claim.priority)}
</div>

<div>
<pclassName="font-mediumtext-sm">{claim.customer}</p>
<pclassName="text-xstext-muted-foreground">{claim.model}•{claim.vin}</p>
</div>

<divclassName="text-xstext-muted-foreground">
<divclassName="flexitems-centerspace-x-1">
<MapPinclassName="h-3w-3"/>
<spanclassName="truncate">{claim.serviceCenter}</span>
</div>
<divclassName="flexitems-centerspace-x-1mt-1">
<CalendarclassName="h-3w-3"/>
<span>Submitted{claim.dateSubmitted}</span>
</div>
<divclassName="flexitems-centerspace-x-1mt-1">
<FileTextclassName="h-3w-3"/>
<span>{claim.reportsCount}diagnosticreports</span>
</div>
</div>
</div>
</div>
))}
</div>
</div>

{/*RightPanel-ClaimDetails*/}
<divclassName="flex-1overflow-y-auto">
<divclassName="p-6space-y-6">
{/*Header*/}
<divclassName="flexitems-centerjustify-between">
<div>
<h1className="text-3xlfont-bold">{claimDetails.id}</h1>
<pclassName="text-muted-foreground">Submittedby{claimDetails.submittedBy}on{claimDetails.dateSubmitted}</p>
</div>
<Button
size="lg"
disabled={!canFinalize}
onClick={handleFinalize}
className={`${!canFinalize'opacity-50':'animate-pulse-glow'}`}
>
<SendclassName="h-4w-4mr-2"/>
Finalize&SubmitDecisions
</Button>
</div>

<divclassName="gridgap-6lg:grid-cols-3">
{/*MainContent-Reports*/}
<divclassName="lg:col-span-2space-y-6">
<Card>
<CardHeader>
<CardTitleclassName="text-xl">CustomerComplaint</CardTitle>
</CardHeader>
<CardContent>
<pclassName="text-smbg-mutedp-4rounded-lg">{claimDetails.complaint}</p>
</CardContent>
</Card>

{/*DiagnosticReportsforReview*/}
<divclassName="space-y-4">
<h2className="text-2xlfont-bold">ReportsforApproval</h2>

{claimDetails.diagnosticReports.map((report,index)=>{
const status=getReportStatus(report.id);
const decision=decisions[report.id];

return(
<Cardkey={report.id}className={`border-l-4${
status==='approved''border-l-successbg-success/5':
status==='rejected''border-l-destructivebg-destructive/5':
'border-l-warningbg-warning/5'
}`}>
<CardHeaderclassName="pb-4">
<divclassName="flexitems-centerjustify-between">
<CardTitleclassName="text-lg">{report.title}</CardTitle>
<divclassName="flexitems-centerspace-x-2">
{status==='pending'&&(
<Badgevariant="outline"className="border-warningtext-warningbg-warning/5">
<ClockclassName="h-3w-3mr-1"/>
AwaitingDecision
</Badge>
)}
{status==='approved'&&(
<Badgevariant="outline"className="border-successtext-successbg-success/5">
<CheckCircleclassName="h-3w-3mr-1"/>
Approved
</Badge>
)}
{status==='rejected'&&(
<Badgevariant="outline"className="border-destructivetext-destructivebg-destructive/5">
<XclassName="h-3w-3mr-1"/>
Rejected
</Badge>
)}
</div>
</div>
<CardDescription>By{report.technician}</CardDescription>
</CardHeader>

<CardContentclassName="space-y-4">
<div>
<h4className="font-mediummb-2">Diagnosis</h4>
<pclassName="text-smbg-mutedp-3rounded-md">{report.diagnosis}</p>
</div>

{report.requiredParts.length>0&&(
<div>
<h4className="font-mediummb-2">RequiredParts&Cost</h4>
<divclassName="space-y-1">
{report.requiredParts.map((part,partIndex)=>(
<divkey={partIndex}className="text-smbg-accentp-2roundedflexitems-centerjustify-between">
<span>{part}</span>
</div>
))}
<divclassName="font-semiboldtext-rightpt-2border-t">
Total:${report.estimatedCost.toLocaleString()}
</div>
</div>
</div>
)}

<div>
<h4className="font-mediummb-2flexitems-center">
<CameraclassName="h-4w-4mr-2"/>
AttachedPhotos({report.photos.length})
</h4>
<divclassName="gridgrid-cols-2gap-2">
{report.photos.map((photo)=>(
<divkey={photo.id}className="text-xsbg-mutedp-2roundedflexitems-center">
<EyeclassName="h-3w-3mr-2"/>
<spanclassName="truncate">{photo.description}</span>
</div>
))}
</div>
</div>

{status==='rejected'&&decision.rejectReason&&(
<divclassName="p-3bg-destructive/10borderborder-destructive/20rounded-lg">
<h4className="font-mediumtext-destructivemb-1">RejectionReason</h4>
<pclassName="text-smtext-destructive">{decision.rejectReason}</p>
</div>
)}

{status==='pending'&&(
<divclassName="flexspace-x-3pt-4border-t">
<Button
onClick={()=>handleApproveReport(report.id)}
className="flex-1bg-successhover:bg-success/90text-success-foreground"
>
<CheckCircleclassName="h-4w-4mr-2"/>
ApproveReport
</Button>
<Button
variant="destructive"
onClick={()=>handleRejectReport(report.id)}
className="flex-1"
>
<XclassName="h-4w-4mr-2"/>
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
<divclassName="space-y-6">
{/*ServiceCenterInfo*/}
<Card>
<CardHeaderclassName="pb-3">
<CardTitleclassName="text-lgflexitems-center">
<MapPinclassName="h-4w-4mr-2"/>
ServiceCenter
</CardTitle>
</CardHeader>
<CardContentclassName="space-y-3">
<div>
<pclassName="font-mediumtext-sm">{claimDetails.serviceCenter.name}</p>
<pclassName="text-xstext-muted-foregroundmt-1">{claimDetails.serviceCenter.address}</p>
<pclassName="text-xstext-muted-foreground">{claimDetails.serviceCenter.contact}</p>
</div>
</CardContent>
</Card>

{/*CustomerInfo*/}
<Card>
<CardHeaderclassName="pb-3">
<CardTitleclassName="text-lgflexitems-center">
<UserclassName="h-4w-4mr-2"/>
Customer
</CardTitle>
</CardHeader>
<CardContentclassName="space-y-3">
<divclassName="flexitems-centerspace-x-3">
<AvatarclassName="h-10w-10">
<AvatarImagesrc="/api/placeholder/40/40"/>
<AvatarFallback>{claimDetails.customer.name.charAt(0)}</AvatarFallback>
</Avatar>
<divclassName="flex-1min-w-0">
<pclassName="font-mediumtext-sm">{claimDetails.customer.name}</p>
<pclassName="text-xstext-muted-foreground">{claimDetails.customer.phone}</p>
<pclassName="text-xstext-muted-foregroundtruncate">{claimDetails.customer.email}</p>
</div>
</div>
</CardContent>
</Card>

{/*VehicleInfo*/}
<Card>
<CardHeaderclassName="pb-3">
<CardTitleclassName="text-lgflexitems-center">
<CarclassName="h-4w-4mr-2"/>
Vehicle
</CardTitle>
</CardHeader>
<CardContentclassName="space-y-3">
<div>
<pclassName="font-medium">{claimDetails.vehicle.model}</p>
<pclassName="text-xsfont-monotext-muted-foreground">{claimDetails.vehicle.vin}</p>
</div>
<divclassName="space-y-1text-smtext-muted-foreground">
<div>Purchase:{claimDetails.vehicle.purchaseDate}</div>
<div>Odometer:{claimDetails.vehicle.odometer}</div>
<div>Color:{claimDetails.vehicle.color}</div>
</div>
</CardContent>
</Card>

{/*ProgressIndicator*/}
<Card>
<CardHeaderclassName="pb-3">
<CardTitleclassName="text-lg">ReviewProgress</CardTitle>
</CardHeader>
<CardContent>
<divclassName="space-y-3">
{claimDetails.diagnosticReports.map((report,index)=>(
<divkey={report.id}className="flexitems-centerjustify-betweentext-sm">
<spanclassName="truncate">{report.title}</span>
<divclassName="flexitems-center">
{getReportStatus(report.id)==='pending'&&<ClockclassName="h-4w-4text-warning"/>}
{getReportStatus(report.id)==='approved'&&<CheckCircleclassName="h-4w-4text-success"/>}
{getReportStatus(report.id)==='rejected'&&<XclassName="h-4w-4text-destructive"/>}
</div>
</div>
))}
</div>

{!canFinalize&&(
<divclassName="mt-4p-3bg-warning/10borderborder-warning/20rounded-lg">
<divclassName="flexitems-centerspace-x-2">
<AlertTriangleclassName="h-4w-4text-warning"/>
<pclassName="text-xstext-warning-foreground">Reviewallreportstofinalize</p>
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
<divclassName="space-y-4">
<div>
<LabelhtmlFor="rejectReason">Reasonforrejection*</Label>
<Textarea
id="rejectReason"
value={rejectReason}
onChange={(e)=>setRejectReason(e.target.value)}
placeholder="Pleaseprovideadetailedreasonforrejectingthisreport..."
className="mt-2min-h-[100px]"
required
/>
</div>

<divclassName="flexspace-x-3pt-4">
<Button
variant="outline"
onClick={()=>setIsRejectDialogOpen(false)}
className="flex-1"
>
Cancel
</Button>
<Button
variant="destructive"
onClick={confirmRejectReport}
disabled={!rejectReason.trim()}
className="flex-1"
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