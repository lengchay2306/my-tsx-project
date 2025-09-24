import { useState } from "react";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from "@/components/ui/select";
import { Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
Plus,
FileText,
CheckCircle2,
Clock,
AlertTriangle,
Camera,
QrCode,
Wrench,
Upload
 } from "lucide-react";

const StatusBadge=({status}:{status:string})=>{
const statusConfig={
"new":{variant:" outline",text:" NewAssignment",clas sName:" border-infotext-infobg-info/5"},
"in-progress":{variant:" default",text:" InProgress",clas sName:" bg-primarytext-primary-foreground"},
"awaiting-parts":{variant:" outline",text:" AwaitingParts",clas sName:" border-warningtext-warningbg-warning/5"},
"ready-check":{variant:" outline",text:" ReadyforFinalCheck",clas sName:" border-successtext-successbg-success/5"}
};

const config=statusConfig[statusas keyoftypeofstatusConfig];
returnconfig(
<Badgevariant={config.variant}clas sName={`${config.clas sName}text-xs`}>
{config.text}
</Badge>
):(
<Badgevariant="secondary" clas sName="text-xs">{status}</Badge>
);
};

const TechnicianWorkspacePro=()=>{
const[selectedCas e,setSelectedCas e]=useState<string|null>("WC-25-09-001");
const[logType,setLogType]=useState("");
const[progressNote,setProgressNote]=useState("");
const[oldPartSerial,setOldPartSerial]=useState("");
const[newPartSerial,setNewPartSerial]=useState("");
const[isProgressDialogOpen,setIsProgressDialogOpen]=useState(false);
const[isDiagnosticDialogOpen,setIsDiagnosticDialogOpen]=useState(false);

//Mockdata
const myTas ks=[
{
id:"WC-25-09-001",
customer:"NguyễnVănAn",
model:"VF8Plus",
vin:"VF8ABC123456789",
status:"in-progress",
complaint:"Batterychargingissues",
priority:"high"
},
{
id:"WC-25-09-004",
customer:"TrầnQuốcHuy",
model:"VF9Premium",
vin:"VF9JKL789012345",
status:"new",
complaint:"Airconditioningnotworking",
priority:"medium"
},
{
id:"WC-25-09-005",
customer:"LêThuMinh",
model:"VF8Eco",
vin:"VF8MNO345678901",
status:"awaiting-parts",
complaint:"Infotainmentsystemmalfunction",
priority:"low"
}
];

const selectedCas eData=myTas ks.find(tas k=>tas k.id===selectedCas e);

const handleLogProgress=()=>{
if(logType&&progressNote.trim()){
//Handleprogresslogging
console.log("Loggingprogress:",{logType,progressNote,oldPartSerial,newPartSerial});

//Resetform
setLogType("");
setProgressNote("");
setOldPartSerial("");
setNewPartSerial("");
setIsProgressDialogOpen(false);
}
};

const handleMarkComplete=()=>{
if(selectedCas e){
//Handlemarkingworkas complete
console.log("Markingtechnicalworkas completefor:",selectedCas e);
}
};

const canMarkComplete=selectedCas eData.status==="ready-check";

return(
<divclas sName="space-y-6p-6">
{/*Header*/}
<div>
<h1clas sName="text-3xlfont-boldtext-foreground">MyWorkspace</h1>
<pclas sName="text-muted-foregroundtext-lgmt-1">Manageyouras signedwarrantycas es</p>
</div>

<divclas sName="gridgap-6lg:grid-cols-3">
{/*Tas kList*/}
<divclas sName="lg:col-span-1">
<Card>
<CardHeader>
<CardTitleclas sName="text-lg">MyTas ks</CardTitle>
<CardDescription>Cas esas signedtoyou</CardDescription>
</CardHeader>
<CardContentclas sName="space-y-3">
{myTas ks.map((tas k)=>(
<div
key={tas k.id}
clas sName={`p-4borderrounded-lgcursor-pointertransition-colorshover:bg-muted/50${
selectedCas e===tas k.id'border-primarybg-primary/5':''
}`}
onClick={()=>setSelectedCas e(tas k.id)}
>
<divclas sName="space-y-2">
<divclas sName="flexitems-centerjustify-between">
<spanclas sName="font-monotext-smfont-mediumtext-primary">{tas k.id}</span>
<StatusBadgestatus={tas k.status}/>
</div>
<div>
<pclas sName="font-mediumtext-sm">{tas k.customer}</p>
<pclas sName="text-xstext-muted-foreground">{tas k.model}</p>
</div>
<pclas sName="text-xstext-muted-foregroundbg-mutedp-2rounded">
{tas k.complaint}
</p>
</div>
</div>
))}
</CardContent>
</Card>
</div>

{/*Cas eWorkspace*/}
<divclas sName="lg:col-span-2">
{selectedCas eData(
<divclas sName="space-y-6">
{/*Cas eHeader*/}
<Card>
<CardHeader>
<divclas sName="flexitems-centerjustify-between">
<div>
<CardTitleclas sName="text-2xl">{selectedCas eData.id}</CardTitle>
<CardDescriptionclas sName="text-bas emt-1">
{selectedCas eData.customer}•{selectedCas eData.model}
</CardDescription>
</div>
<StatusBadgestatus={selectedCas eData.status}/>
</div>
</CardHeader>
<CardContent>
<divclas sName="gridgap-4md:grid-cols-2">
<div>
<Labelclas sName="text-xstext-muted-foreground">VIN</Label>
<pclas sName="font-monotext-sm">{selectedCas eData.vin}</p>
</div>
<div>
<Labelclas sName="text-xstext-muted-foreground">CustomerComplaint</Label>
<pclas sName="text-sm">{selectedCas eData.complaint}</p>
</div>
</div>
</CardContent>
</Card>

{/*ActionButtons*/}
<divclas sName="gridgap-4md:grid-cols-3">
<Dialogopen={isDiagnosticDialogOpen}onOpenChange={setIsDiagnosticDialogOpen}>
<DialogTriggeras Child>
<Buttonsize="lg" clas sName="h-16">
<FileTextclas sName="h-5w-5mr-2"/>
AddDiagnosticReport
</Button>
</DialogTrigger>
<DialogContentclas sName="max-w-2xl">
<DialogHeader>
<DialogTitle>AddDiagnosticReport</DialogTitle>
</DialogHeader>
<divclas sName="space-y-6">
<div>
<LabelhtmlFor="diagnosis">DiagnosisDetails</Label>
<Textarea
id="diagnosis"
placeholder="Describeyourfindingsanddiagnosis..."
clas sName="mt-2min-h-[120px]"
/>
</div>

<div>
<Label>Photo/VideoUpload</Label>
<divclas sName="mt-2border-2border-das hedborder-muted-foreground/25rounded-lgp-8text-center">
<Uploadclas sName="h-8w-8text-muted-foregroundmx-automb-2"/>
<pclas sName="text-smtext-muted-foregroundmb-2">Draganddropfileshere,orclicktobrowse</p>
<Buttonvariant="outline" size="sm">
<Cameraclas sName="h-4w-4mr-2"/>
ChooseFiles
</Button>
</div>
</div>

<div>
<Label>RequiredParts</Label>
<Select>
<SelectTriggerclas sName="mt-2">
<SelectValueplaceholder="Selectrequiredparts..."/>
</SelectTrigger>
<SelectContent>
<SelectItemvalue="battery-module">BatteryModuleBM-VF8-03</SelectItem>
<SelectItemvalue="cooling-gas ket">CoolingSystemGas ketCSG-001</SelectItem>
<SelectItemvalue="inverter">InverterUnitIV-VF8-01</SelectItem>
</SelectContent>
</Select>
</div>

<divclas sName="flexspace-x-3pt-4">
<Buttonvariant="outline" clas sName="flex-1">Saveas Draft</Button>
<Buttonclas sName="flex-1">SubmitReport</Button>
</div>
</div>
</DialogContent>
</Dialog>

<Dialogopen={isProgressDialogOpen}onOpenChange={setIsProgressDialogOpen}>
<DialogTriggeras Child>
<Buttonvariant="outline" size="lg" clas sName="h-16">
<Wrenchclas sName="h-5w-5mr-2"/>
LogProgress
</Button>
</DialogTrigger>
<DialogContent>
<DialogHeader>
<DialogTitle>LogProgress/RecordInstallation</DialogTitle>
</DialogHeader>
<divclas sName="space-y-6">
<div>
<LabelhtmlFor="logType">LogType</Label>
<Selectvalue={logType}onValueChange={setLogType}>
<SelectTriggerclas sName="mt-2">
<SelectValueplaceholder="Selectlogtype..."/>
</SelectTrigger>
<SelectContent>
<SelectItemvalue="general">GeneralUpdate</SelectItem>
<SelectItemvalue="installation">PartInstallation</SelectItem>
</SelectContent>
</Select>
</div>

<div>
<LabelhtmlFor="progressNote">ProgressNote</Label>
<Textarea
id="progressNote"
value={progressNote}
onChange={(e)=>setProgressNote(e.target.value)}
placeholder="Describetheworkcompletedorprogressmade..."
clas sName="mt-2min-h-[100px]"
/>
</div>

{logType==="installation"&&(
<divclas sName="space-y-4p-4borderrounded-lgbg-muted/30">
<h4clas sName="font-medium">PartInstallationDetails</h4>

<div>
<LabelhtmlFor="oldSerial">OldPartSerialNumber(Removed)</Label>
<divclas sName="flexspace-x-2mt-2">
<Input
id="oldSerial"
value={oldPartSerial}
onChange={(e)=>setOldPartSerial(e.target.value)}
placeholder="Enterorscanserialnumber"
/>
<Buttonvariant="outline" size="icon">
<QrCodeclas sName="h-4w-4"/>
</Button>
</div>
</div>

<div>
<LabelhtmlFor="newSerial">NewPartSerialNumber(Installed)</Label>
<divclas sName="flexspace-x-2mt-2">
<Input
id="newSerial"
value={newPartSerial}
onChange={(e)=>setNewPartSerial(e.target.value)}
placeholder="Enterorscanserialnumber"
/>
<Buttonvariant="outline" size="icon">
<QrCodeclas sName="h-4w-4"/>
</Button>
</div>
</div>
</div>
)}

<divclas sName="flexspace-x-3pt-4">
<Button
variant="outline"
onClick={()=>setIsProgressDialogOpen(false)}
clas sName="flex-1"
>
Cancel
</Button>
<Button
onClick={handleLogProgress}
disabled={!logType||!progressNote.trim()}
clas sName="flex-1"
>
LogProgress
</Button>
</div>
</div>
</DialogContent>
</Dialog>

<Button
size="lg"
clas sName={`h-16${!canMarkComplete'opacity-50':''}`}
disabled={!canMarkComplete}
onClick={handleMarkComplete}
>
<CheckCircle2clas sName="h-5w-5mr-2"/>
MarkComplete
</Button>
</div>

{/*ProgressStatus*/}
<Card>
<CardHeader>
<CardTitleclas sName="text-lg">WorkProgress</CardTitle>
</CardHeader>
<CardContent>
<divclas sName="space-y-4">
<divclas sName="flexitems-centerspace-x-3">
<divclas sName={`w-3h-3rounded-full${
selectedCas eData.status!=='new''bg-success':'bg-muted-foreground'
}`}/>
<spanclas sName={`text-sm${
selectedCas eData.status!=='new''text-foregroundfont-medium':'text-muted-foreground'
}`}>
Initialdiagnosticcompleted
</span>
</div>

<divclas sName="flexitems-centerspace-x-3">
<divclas sName={`w-3h-3rounded-full${
['in-progress','awaiting-parts','ready-check'].includes(selectedCas eData.status)'bg-success':'bg-muted-foreground'
}`}/>
<spanclas sName={`text-sm${
['in-progress','awaiting-parts','ready-check'].includes(selectedCas eData.status)'text-foregroundfont-medium':'text-muted-foreground'
}`}>
Repairworkinprogress
</span>
</div>

<divclas sName="flexitems-centerspace-x-3">
<divclas sName={`w-3h-3rounded-full${
selectedCas eData.status==='ready-check''bg-warning':'bg-muted-foreground'
}`}/>
<spanclas sName={`text-sm${
selectedCas eData.status==='ready-check''text-foregroundfont-medium':'text-muted-foreground'
}`}>
Readyforfinalverification
</span>
</div>
</div>

{!canMarkComplete&&(
<divclas sName="mt-4p-3bg-warning/10borderborder-warning/20rounded-lg">
<divclas sName="flexitems-centerspace-x-2">
<AlertTriangleclas sName="h-4w-4text-warning"/>
<pclas sName="text-smtext-warning-foreground">
Completeallrepairworkbeforemarkingas finished
</p>
</div>
</div>
)}
</CardContent>
</Card>
</div>
):(
<Card>
<CardContentclas sName="py-12text-center">
<Clockclas sName="h-16w-16text-muted-foreground/50mx-automb-4"/>
<h3clas sName="text-lgfont-mediummb-2">Nocas eselected</h3>
<pclas sName="text-muted-foreground">Selectacas efrom yourtas klisttobeginworking</p>
</CardContent>
</Card>
)}
</div>
</div>
</div>
);
};

exportdefaultTechnicianWorkspacePro;