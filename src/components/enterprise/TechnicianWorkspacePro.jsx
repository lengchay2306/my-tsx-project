import { useState } from"react";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Badge } from"@/components/ui/badge";
import { Input } from"@/components/ui/input";
import { Textarea } from"@/components/ui/textarea";
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from"@/components/ui/select";
import { Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger } from"@/components/ui/dialog";
import { Label } from"@/components/ui/label";
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
 } from"lucide-react";

const StatusBadge=({status}:{status:string})=>{
const statusConfig={
"new":{variant:"outline",text:"NewAssignment",className:"border-infotext-infobg-info/5"},
"in-progress":{variant:"default",text:"InProgress",className:"bg-primarytext-primary-foreground"},
"awaiting-parts":{variant:"outline",text:"AwaitingParts",className:"border-warningtext-warningbg-warning/5"},
"ready-check":{variant:"outline",text:"ReadyforFinalCheck",className:"border-successtext-successbg-success/5"}
};

const config=statusConfig[statusaskeyoftypeofstatusConfig];
returnconfig(
<Badgevariant={config.variant}className={`${config.className}text-xs`}>
{config.text}
</Badge>
):(
<Badgevariant="secondary"className="text-xs">{status}</Badge>
);
};

const TechnicianWorkspacePro=()=>{
const[selectedCase,setSelectedCase]=useState<string|null>("WC-25-09-001");
const[logType,setLogType]=useState("");
const[progressNote,setProgressNote]=useState("");
const[oldPartSerial,setOldPartSerial]=useState("");
const[newPartSerial,setNewPartSerial]=useState("");
const[isProgressDialogOpen,setIsProgressDialogOpen]=useState(false);
const[isDiagnosticDialogOpen,setIsDiagnosticDialogOpen]=useState(false);

//Mockdata
const myTasks=[
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

const selectedCaseData=myTasks.find(task=>task.id===selectedCase);

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
if(selectedCase){
//Handlemarkingworkascomplete
console.log("Markingtechnicalworkascompletefor:",selectedCase);
}
};

const canMarkComplete=selectedCaseData.status==="ready-check";

return(
<divclassName="space-y-6p-6">
{/*Header*/}
<div>
<h1className="text-3xlfont-boldtext-foreground">MyWorkspace</h1>
<pclassName="text-muted-foregroundtext-lgmt-1">Manageyourassignedwarrantycases</p>
</div>

<divclassName="gridgap-6lg:grid-cols-3">
{/*TaskList*/}
<divclassName="lg:col-span-1">
<Card>
<CardHeader>
<CardTitleclassName="text-lg">MyTasks</CardTitle>
<CardDescription>Casesassignedtoyou</CardDescription>
</CardHeader>
<CardContentclassName="space-y-3">
{myTasks.map((task)=>(
<div
key={task.id}
className={`p-4borderrounded-lgcursor-pointertransition-colorshover:bg-muted/50${
selectedCase===task.id'border-primarybg-primary/5':''
}`}
onClick={()=>setSelectedCase(task.id)}
>
<divclassName="space-y-2">
<divclassName="flexitems-centerjustify-between">
<spanclassName="font-monotext-smfont-mediumtext-primary">{task.id}</span>
<StatusBadgestatus={task.status}/>
</div>
<div>
<pclassName="font-mediumtext-sm">{task.customer}</p>
<pclassName="text-xstext-muted-foreground">{task.model}</p>
</div>
<pclassName="text-xstext-muted-foregroundbg-mutedp-2rounded">
{task.complaint}
</p>
</div>
</div>
))}
</CardContent>
</Card>
</div>

{/*CaseWorkspace*/}
<divclassName="lg:col-span-2">
{selectedCaseData(
<divclassName="space-y-6">
{/*CaseHeader*/}
<Card>
<CardHeader>
<divclassName="flexitems-centerjustify-between">
<div>
<CardTitleclassName="text-2xl">{selectedCaseData.id}</CardTitle>
<CardDescriptionclassName="text-basemt-1">
{selectedCaseData.customer}•{selectedCaseData.model}
</CardDescription>
</div>
<StatusBadgestatus={selectedCaseData.status}/>
</div>
</CardHeader>
<CardContent>
<divclassName="gridgap-4md:grid-cols-2">
<div>
<LabelclassName="text-xstext-muted-foreground">VIN</Label>
<pclassName="font-monotext-sm">{selectedCaseData.vin}</p>
</div>
<div>
<LabelclassName="text-xstext-muted-foreground">CustomerComplaint</Label>
<pclassName="text-sm">{selectedCaseData.complaint}</p>
</div>
</div>
</CardContent>
</Card>

{/*ActionButtons*/}
<divclassName="gridgap-4md:grid-cols-3">
<Dialogopen={isDiagnosticDialogOpen}onOpenChange={setIsDiagnosticDialogOpen}>
<DialogTriggerasChild>
<Buttonsize="lg"className="h-16">
<FileTextclassName="h-5w-5mr-2"/>
AddDiagnosticReport
</Button>
</DialogTrigger>
<DialogContentclassName="max-w-2xl">
<DialogHeader>
<DialogTitle>AddDiagnosticReport</DialogTitle>
</DialogHeader>
<divclassName="space-y-6">
<div>
<LabelhtmlFor="diagnosis">DiagnosisDetails</Label>
<Textarea
id="diagnosis"
placeholder="Describeyourfindingsanddiagnosis..."
className="mt-2min-h-[120px]"
/>
</div>

<div>
<Label>Photo/VideoUpload</Label>
<divclassName="mt-2border-2border-dashedborder-muted-foreground/25rounded-lgp-8text-center">
<UploadclassName="h-8w-8text-muted-foregroundmx-automb-2"/>
<pclassName="text-smtext-muted-foregroundmb-2">Draganddropfileshere,orclicktobrowse</p>
<Buttonvariant="outline"size="sm">
<CameraclassName="h-4w-4mr-2"/>
ChooseFiles
</Button>
</div>
</div>

<div>
<Label>RequiredParts</Label>
<Select>
<SelectTriggerclassName="mt-2">
<SelectValueplaceholder="Selectrequiredparts..."/>
</SelectTrigger>
<SelectContent>
<SelectItemvalue="battery-module">BatteryModuleBM-VF8-03</SelectItem>
<SelectItemvalue="cooling-gasket">CoolingSystemGasketCSG-001</SelectItem>
<SelectItemvalue="inverter">InverterUnitIV-VF8-01</SelectItem>
</SelectContent>
</Select>
</div>

<divclassName="flexspace-x-3pt-4">
<Buttonvariant="outline"className="flex-1">SaveasDraft</Button>
<ButtonclassName="flex-1">SubmitReport</Button>
</div>
</div>
</DialogContent>
</Dialog>

<Dialogopen={isProgressDialogOpen}onOpenChange={setIsProgressDialogOpen}>
<DialogTriggerasChild>
<Buttonvariant="outline"size="lg"className="h-16">
<WrenchclassName="h-5w-5mr-2"/>
LogProgress
</Button>
</DialogTrigger>
<DialogContent>
<DialogHeader>
<DialogTitle>LogProgress/RecordInstallation</DialogTitle>
</DialogHeader>
<divclassName="space-y-6">
<div>
<LabelhtmlFor="logType">LogType</Label>
<Selectvalue={logType}onValueChange={setLogType}>
<SelectTriggerclassName="mt-2">
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
className="mt-2min-h-[100px]"
/>
</div>

{logType==="installation"&&(
<divclassName="space-y-4p-4borderrounded-lgbg-muted/30">
<h4className="font-medium">PartInstallationDetails</h4>

<div>
<LabelhtmlFor="oldSerial">OldPartSerialNumber(Removed)</Label>
<divclassName="flexspace-x-2mt-2">
<Input
id="oldSerial"
value={oldPartSerial}
onChange={(e)=>setOldPartSerial(e.target.value)}
placeholder="Enterorscanserialnumber"
/>
<Buttonvariant="outline"size="icon">
<QrCodeclassName="h-4w-4"/>
</Button>
</div>
</div>

<div>
<LabelhtmlFor="newSerial">NewPartSerialNumber(Installed)</Label>
<divclassName="flexspace-x-2mt-2">
<Input
id="newSerial"
value={newPartSerial}
onChange={(e)=>setNewPartSerial(e.target.value)}
placeholder="Enterorscanserialnumber"
/>
<Buttonvariant="outline"size="icon">
<QrCodeclassName="h-4w-4"/>
</Button>
</div>
</div>
</div>
)}

<divclassName="flexspace-x-3pt-4">
<Button
variant="outline"
onClick={()=>setIsProgressDialogOpen(false)}
className="flex-1"
>
Cancel
</Button>
<Button
onClick={handleLogProgress}
disabled={!logType||!progressNote.trim()}
className="flex-1"
>
LogProgress
</Button>
</div>
</div>
</DialogContent>
</Dialog>

<Button
size="lg"
className={`h-16${!canMarkComplete'opacity-50':''}`}
disabled={!canMarkComplete}
onClick={handleMarkComplete}
>
<CheckCircle2className="h-5w-5mr-2"/>
MarkComplete
</Button>
</div>

{/*ProgressStatus*/}
<Card>
<CardHeader>
<CardTitleclassName="text-lg">WorkProgress</CardTitle>
</CardHeader>
<CardContent>
<divclassName="space-y-4">
<divclassName="flexitems-centerspace-x-3">
<divclassName={`w-3h-3rounded-full${
selectedCaseData.status!=='new''bg-success':'bg-muted-foreground'
}`}/>
<spanclassName={`text-sm${
selectedCaseData.status!=='new''text-foregroundfont-medium':'text-muted-foreground'
}`}>
Initialdiagnosticcompleted
</span>
</div>

<divclassName="flexitems-centerspace-x-3">
<divclassName={`w-3h-3rounded-full${
['in-progress','awaiting-parts','ready-check'].includes(selectedCaseData.status)'bg-success':'bg-muted-foreground'
}`}/>
<spanclassName={`text-sm${
['in-progress','awaiting-parts','ready-check'].includes(selectedCaseData.status)'text-foregroundfont-medium':'text-muted-foreground'
}`}>
Repairworkinprogress
</span>
</div>

<divclassName="flexitems-centerspace-x-3">
<divclassName={`w-3h-3rounded-full${
selectedCaseData.status==='ready-check''bg-warning':'bg-muted-foreground'
}`}/>
<spanclassName={`text-sm${
selectedCaseData.status==='ready-check''text-foregroundfont-medium':'text-muted-foreground'
}`}>
Readyforfinalverification
</span>
</div>
</div>

{!canMarkComplete&&(
<divclassName="mt-4p-3bg-warning/10borderborder-warning/20rounded-lg">
<divclassName="flexitems-centerspace-x-2">
<AlertTriangleclassName="h-4w-4text-warning"/>
<pclassName="text-smtext-warning-foreground">
Completeallrepairworkbeforemarkingasfinished
</p>
</div>
</div>
)}
</CardContent>
</Card>
</div>
):(
<Card>
<CardContentclassName="py-12text-center">
<ClockclassName="h-16w-16text-muted-foreground/50mx-automb-4"/>
<h3className="text-lgfont-mediummb-2">Nocaseselected</h3>
<pclassName="text-muted-foreground">Selectacasefrom yourtasklisttobeginworking</p>
</CardContent>
</Card>
)}
</div>
</div>
</div>
);
};

exportdefaultTechnicianWorkspacePro;