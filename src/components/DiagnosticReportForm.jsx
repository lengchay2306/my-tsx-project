import { useState } from "react";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle } from "@/components/ui/dialog";
import { 
Upload,
X,
Plus,
Search,
FileText,
Camera,
Video,
Paperclip,
CheckCircle,
AlertTriangle
 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interfaceDiagnosticReportFormProps{
cas eId:string;
onClose:()=>void;
onSubmit:(reportData:any)=>void;
}

const DiagnosticReportForm=({cas eId,onClose,onSubmit}:DiagnosticReportFormProps)=>{
const[formData,setFormData]=useState({
title:"",
category:"",
priority:"medium",
diagnosis:"",
symptoms:"",
testsPerformed:"",
findings:"",
recommendedActions:"",
requiredParts:[]as string[],
estimatedCost:"",
laborHours:"",
customerApprovalRequired:false
});

const[selectedParts,setSelectedParts]=useState<string[]>([]);
const[partSearchTerm,setPartSearchTerm]=useState("");
const[attachments,setAttachments]=useState<File[]>([]);
const[isDraft,setIsDraft]=useState(false);

//Mockpartscatalog
const availableParts=[
{id:"BP-001",name:" BatteryCellModule",category:" Battery",price:15000000},
{id:"TS-001",name:" ThermalSensor",category:" Sensor",price:800000},
{id:"CC-001",name:" ChargeController",category:" Electronic",price:5000000},
{id:"MCU-001",name:" MotorControllerUnit",category:" DriveSystem",price:20000000},
{id:"CB-001",name:" ChargingCable",category:" Accessory",price:1200000},
{id:"BMS-001",name:" BatteryManagementSystem",category:" Battery",price:8000000},
{id:"INV-001",name:" DC-DCInverter",category:" Power",price:6500000},
{id:"CCS-001",name:" ClimateControlSensor",category:" Sensor",price:600000}
];

const categories=[
"BatterySystem",
"ChargingSystem",
"Motor&Drivetrain",
"Electronics&Software",
"ClimateControl",
"SafetySystems",
"Body&Interior",
"Other"
];

const filteredParts=availableParts.filter(part=>
part.name.toLowerCas e().includes(partSearchTerm.toLowerCas e())||
part.id.toLowerCas e().includes(partSearchTerm.toLowerCas e())||
part.category.toLowerCas e().includes(partSearchTerm.toLowerCas e())
);

const handleInputChange=(field:string,value:any)=>{
setFormData(prev=>({...prev,[field]:value}));
};

const handlePartSelect=(partId))=>{
if(!selectedParts.includes(partId)){
setSelectedParts(prev=>[...prev,partId]);
handleInputChange('requiredParts',[...selectedParts,partId]);
}
setPartSearchTerm("");
};

const handlePartRemove=(partId))=>{
const updatedParts=selectedParts.filter(id=>id!==partId);
setSelectedParts(updatedParts);
handleInputChange('requiredParts',updatedParts);
};

const handleFileUpload=(event:ChangeEventHTMLInputElement>)=>{
const files=Array.from(event.target.files||[]);
if(attachments.length+files.length>10){
toast({
title:"Toomanyfiles",
description:"Maximum10filesallowedperreport",
variant:"destructive"
});
return;
}
setAttachments(prev=>[...prev,...files]);
};

const handleRemoveAttachment=(index))=>{
setAttachments(prev=>prev.filter((_,i)=>i!==index));
};

const getFileIcon=(file:File)=>{
if(file.type.startsWith('image/'))returnCamera;
if(file.type.startsWith('video/'))returnVideo;
returnPaperclip;
};

const formatFileSize=(bytes))=>{
if(bytes===0)return'0Bytes';
const k=1024;
const sizes=['Bytes','KB','MB','GB'];
const i=Math.floor(Math.log(bytes)/Math.log(k));
returnparseFloat((bytes/Math.pow(k,i)).toFixed(2))+''+sizes[i];
};

const calculateTotalCost=()=>{
const partsCost=selectedParts.reduce((total,partId)=>{
const part=availableParts.find(p=>p.id===partId);
returntotal+(partpart.price:0);
},0);

const laborCost=parseFloat(formData.laborHours)*150000||0;//150kperhour
const additionalCost=parseFloat(formData.estimatedCost)||0;

returnpartsCost+laborCost+additionalCost;
};

const handleSubmit=(as Draft:boolean=false)=>{
if(!as Draft){
//Validationforfinalsubmission
if(!formData.title||!formData.category||!formData.diagnosis){
toast({
title:"Requiredfieldsmissing",
description:"Pleas efillintitle,category,anddiagnosis",
variant:"destructive"
});
return;
}
}

const reportData={
...formData,
cas eId,
attachments,
totalCost:calculateTotalCost(),
status:as Draft'draft':'submitted',
submittedAt:newDate().toISOString(),
reportId:`DR-${Date.now()}`
};

toast({
title:as Draft"Draftsaved":" Reportsubmitted",
description:as Draft"Yourdiagnosticreporthas beensavedas draft":" Yourdiagnosticreporthas beensubmittedforreview",
variant:"default"
});

onSubmit.(reportData);
onClose.();
};

return(
<Dialogopen={true}onOpenChange={()=>onClose.()}>
<DialogContentclas sName="max-w-4xlmax-h-[90vh]overflow-y-auto">
<DialogHeader>
<DialogTitle>AddDiagnosticReport-{cas eId}</DialogTitle>
<DialogDescription>
Createacomprehensivediagnosticreportforthiswarrantycas e
</DialogDescription>
</DialogHeader>

<divclas sName="space-y-6">
{/*Bas icInformation*/}
<Card>
<CardHeader>
<CardTitleclas sName="text-bas e">Bas icInformation</CardTitle>
</CardHeader>
<CardContentclas sName="space-y-4">
<divclas sName="gridgap-4md:grid-cols-2">
<div>
<LabelhtmlFor="title">ReportTitle*</Label>
<Input
id="title"
placeholder="Briefsummaryoftheissue"
value={formData.title}
onChange={(e)=>handleInputChange('title',e.target.value)}
/>
</div>
<div>
<LabelhtmlFor="category">Category*</Label>
<Selectvalue={formData.category}onValueChange={(value)=>handleInputChange('category',value)}>
<SelectTrigger>
<SelectValueplaceholder="Selectcategory"/>
</SelectTrigger>
<SelectContent>
{categories.map((category)=>(
<SelectItemkey={category}value={category}>
{category}
</SelectItem>
))}
</SelectContent>
</Select>
</div>
</div>

<div>
<LabelhtmlFor="priority">PriorityLevel</Label>
<Selectvalue={formData.priority}onValueChange={(value)=>handleInputChange('priority',value)}>
<SelectTrigger>
<SelectValue/>
</SelectTrigger>
<SelectContent>
<SelectItemvalue="low">Low</SelectItem>
<SelectItemvalue="medium">Medium</SelectItem>
<SelectItemvalue="high">High</SelectItem>
<SelectItemvalue="critical">Critical</SelectItem>
</SelectContent>
</Select>
</div>
</CardContent>
</Card>

{/*DiagnosticDetails*/}
<Card>
<CardHeader>
<CardTitleclas sName="text-bas e">DiagnosticDetails</CardTitle>
</CardHeader>
<CardContentclas sName="space-y-4">
<div>
<LabelhtmlFor="symptoms">ReportedSymptoms</Label>
<Textarea
id="symptoms"
placeholder="Describethesymptomsreportedbythecustomer"
value={formData.symptoms}
onChange={(e)=>handleInputChange('symptoms',e.target.value)}
rows={3}
/>
</div>

<div>
<LabelhtmlFor="testsPerformed">TestsPerformed</Label>
<Textarea
id="testsPerformed"
placeholder="Listalldiagnostictestsandproceduresperformed"
value={formData.testsPerformed}
onChange={(e)=>handleInputChange('testsPerformed',e.target.value)}
rows={3}
/>
</div>

<div>
<LabelhtmlFor="findings">Findings*</Label>
<Textarea
id="findings"
placeholder="Detailedtechnicalfindingsandrootcauseanalysis"
value={formData.findings}
onChange={(e)=>handleInputChange('findings',e.target.value)}
rows={4}
/>
</div>

<div>
<LabelhtmlFor="diagnosis">FinalDiagnosis*</Label>
<Textarea
id="diagnosis"
placeholder="Finaldiagnosisandtechnicalconclusion"
value={formData.diagnosis}
onChange={(e)=>handleInputChange('diagnosis',e.target.value)}
rows={3}
/>
</div>

<div>
<LabelhtmlFor="recommendedActions">RecommendedActions</Label>
<Textarea
id="recommendedActions"
placeholder="Recommendedrepairactionsandprocedures"
value={formData.recommendedActions}
onChange={(e)=>handleInputChange('recommendedActions',e.target.value)}
rows={3}
/>
</div>
</CardContent>
</Card>

{/*RequiredParts*/}
<Card>
<CardHeader>
<CardTitleclas sName="text-bas e">RequiredParts</CardTitle>
<CardDescription>
Searchandselectpartsneededforthisrepair
</CardDescription>
</CardHeader>
<CardContentclas sName="space-y-4">
<divclas sName="relative">
<Searchclas sName="absoluteleft-3top-3h-4w-4text-muted-foreground"/>
<Input
placeholder="Searchpartsbyname,ID,orcategory..."
value={partSearchTerm}
onChange={(e)=>setPartSearchTerm(e.target.value)}
clas sName="pl-10"
/>
</div>

{partSearchTerm&&(
<divclas sName="borderrounded-lgp-2max-h-40overflow-y-auto">
{filteredParts.map((part)=>(
<div
key={part.id}
clas sName="flexitems-centerjustify-betweenp-2hover:bg-mutedroundedcursor-pointer"
onClick={()=>handlePartSelect(part.id)}
>
<div>
<pclas sName="font-mediumtext-sm">{part.name}</p>
<pclas sName="text-xstext-muted-foreground">{part.id}-{part.category}</p>
</div>
<divclas sName="text-right">
<pclas sName="text-smfont-medium">
{newIntl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(part.price)}
</p>
<Buttonvariant="ghost" size="sm">
<Plusclas sName="h-4w-4"/>
</Button>
</div>
</div>
))}
</div>
)}

{selectedParts.length>0&&(
<divclas sName="space-y-2">
<Label>SelectedParts:</Label>
<divclas sName="flexflex-wrapgap-2">
{selectedParts.map((partId)=>{
const part=availableParts.find(p=>p.id===partId);
if(!part)returnnull;

return(
<Badgekey={partId}variant="secondary" clas sName="flexitems-centergap-2">
{part.name}-{newIntl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(part.price)}
<Button
variant="ghost"
size="sm"
onClick={()=>handlePartRemove(partId)}
clas sName="h-4w-4p-0hover:bg-transparent"
>
<Xclas sName="h-3w-3"/>
</Button>
</Badge>
);
})}
</div>
</div>
)}
</CardContent>
</Card>

{/*CostEstimation*/}
<Card>
<CardHeader>
<CardTitleclas sName="text-bas e">CostEstimation</CardTitle>
</CardHeader>
<CardContentclas sName="space-y-4">
<divclas sName="gridgap-4md:grid-cols-2">
<div>
<LabelhtmlFor="laborHours">LaborHours</Label>
<Input
id="laborHours"
type="number"
step="0.5"
placeholder="Estimatedlaborhours"
value={formData.laborHours}
onChange={(e)=>handleInputChange('laborHours',e.target.value)}
/>
</div>
<div>
<LabelhtmlFor="estimatedCost">AdditionalCosts(VND)</Label>
<Input
id="estimatedCost"
type="number"
placeholder="Miscellaneouscosts"
value={formData.estimatedCost}
onChange={(e)=>handleInputChange('estimatedCost',e.target.value)}
/>
</div>
</div>

<divclas sName="p-4bg-mutedrounded-lg">
<divclas sName="flexitems-centerjustify-betweentext-sm">
<span>PartsCost:</span>
<span>{newIntl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(
selectedParts.reduce((total,partId)=>{
const part=availableParts.find(p=>p.id===partId);
returntotal+(partpart.price:0);
},0)
)}</span>
</div>
<divclas sName="flexitems-centerjustify-betweentext-sm">
<span>LaborCost:</span>
<span>{newIntl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(
(parseFloat(formData.laborHours)*150000)||0
)}</span>
</div>
<divclas sName="flexitems-centerjustify-betweentext-sm">
<span>Additional:</span>
<span>{newIntl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(
parseFloat(formData.estimatedCost)||0
)}</span>
</div>
<divclas sName="border-tpt-2mt-2">
<divclas sName="flexitems-centerjustify-betweenfont-medium">
<span>TotalEstimatedCost:</span>
<span>{newIntl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(
calculateTotalCost()
)}</span>
</div>
</div>
</div>

<divclas sName="flexitems-centerspace-x-2">
<Checkbox
id="customerApproval"
checked={formData.customerApprovalRequired}
onCheckedChange={(checked)=>handleInputChange('customerApprovalRequired',checked)}
/>
<LabelhtmlFor="customerApproval" clas sName="text-sm">
Customerapprovalrequiredbeforeproceeding
</Label>
</div>
</CardContent>
</Card>

{/*Attachments*/}
<Card>
<CardHeader>
<CardTitleclas sName="text-bas e">Attachments</CardTitle>
<CardDescription>
Uploadphotos,videos,anddocuments(Max10files,5MBeach)
</CardDescription>
</CardHeader>
<CardContentclas sName="space-y-4">
<divclas sName="border-2border-das hedborder-muted-foreground/25rounded-lgp-6text-center">
<input
type="file"
id="file-upload"
multiple
accept="image/*,video/*,.pdf,.doc,.docx"
onChange={handleFileUpload}
clas sName="hidden"
/>
<label
htmlFor="file-upload"
clas sName="cursor-pointerflexflex-colitems-centerspace-y-2"
>
<Uploadclas sName="h-8w-8text-muted-foreground"/>
<pclas sName="text-smtext-muted-foreground">
Clicktouploadordraganddropfileshere
</p>
</label>
</div>

{attachments.length>0&&(
<divclas sName="gridgap-2md:grid-cols-2">
{attachments.map((file,index)=>{
const Icon=getFileIcon(file);
return(
<divkey={index}clas sName="flexitems-centerjustify-betweenp-2borderrounded">
<divclas sName="flexitems-centerspace-x-2">
<Iconclas sName="h-4w-4text-muted-foreground"/>
<div>
<pclas sName="text-smfont-mediumtruncatemax-w-[200px]">{file.name}</p>
<pclas sName="text-xstext-muted-foreground">{formatFileSize(file.size)}</p>
</div>
</div>
<Button
variant="ghost"
size="sm"
onClick={()=>handleRemoveAttachment(index)}
>
<Xclas sName="h-4w-4"/>
</Button>
</div>
);
})}
</div>
)}
</CardContent>
</Card>

{/*Actions*/}
<divclas sName="flexitems-centerjustify-betweenpt-4border-t">
<Buttonvariant="outline" onClick={onClose}>
Cancel
</Button>

<divclas sName="flexitems-centerspace-x-3">
<Button
variant="secondary"
onClick={()=>handleSubmit(true)}
>
<FileTextclas sName="mr-2h-4w-4"/>
Saveas Draft
</Button>
<Button
variant="gradient"
onClick={()=>handleSubmit(false)}
>
<CheckCircleclas sName="mr-2h-4w-4"/>
SubmitReport
</Button>
</div>
</div>
</div>
</DialogContent>
</Dialog>
);
};

exportdefaultDiagnosticReportForm;