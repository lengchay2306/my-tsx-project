import { useState } from 'react';
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs,TabsContent,TabsList,TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { 
FileText,
X,
Car,
User,
Wrench,
Calendar,
Eye,
Download,
Clock,
CheckCircle,
AlertCircle,
XCircle,
Package,
Users
 } from 'lucide-react';

interfaceClaimDetailsProps{
claimId:string;
onClose:()=>void;
onUpdateStatus:()=>void;
}

const ClaimDetails=({claimId,onClose,onUpdateStatus}:ClaimDetailsProps)=>{
const{user}=useAuth();

//Mockclaimdata-inrealappwouldfetchbyclaimId
const claimData={
id:claimId,
vin:'1HGBH41JXMN109186',
customer:{
name:'NguyễnVănMinh',
phone:'0901234567',
email:'minh.nguyen@email.com',
address:'123ĐườngABC,Quận1,TP.HCM'
},
vehicle:{
model:'EVModelXPro',
year:'2023',
color:'TrắngNgọcTrai',
batteryCapacity:'75kWh',
motorType:'DualMotorAWD',
purchas eDate:'2023-03-15',
warrantyStatus:'Active-7.2yearsremaining'
},
issue:{
category:'BatteryPerformanceIssue',
description:'Kháchhàngbáocáopinsạcchậmvàgiảmdunglượngđángkể.Thờigiansạctừ20%lên80%mất45phútthayvì25phútnhưbanđầu.Rangethựctếchỉđạt320kmthayvì450kmnhưcôngbố.',
reportedDate:'2024-01-15',
priority:'high'
},
technicians:[
{id:'tech-1',name:'TrầnMinhQuân',role:'LeadTechnician',specialty:'BatterySystems'},
{id:'tech-2',name:'LêThịHoa',role:'SupportTechnician',specialty:'Diagnostics'}
],
diagnosis:{
summary:'Saukiểmtrachitiết,pháthiện3cellpintrongmoduleB2códấuhiệusuygiảmnghiêmtrọng.BMSbáolỗimãP0A80-Highvoltagebatterypackdegradation.Cầnthaythếtoànbộbatterypack.',
errorCodes:['P0A80','P0A7F','P3009'],
testResults:[
{test:'BatteryCapacityTest',result:'68.2kWh',expected:'75kWh',status:'fail'},
{test:'CellVoltageBalance',result:'Unbalanced',expected:'Balanced',status:'fail'},
{test:'ChargingCurrent',result:'45A',expected:'125A',status:'fail'},
{test:'BatteryTemperature',result:'32°C',expected:'<30°C',status:'pas s'}
],
recommendation:'Thaythếbatterypacktheoquytrìnhwarranty.Estimatedcost:15,000,000VND.'
},
attachments:[
{name:'Battery_Diagnostic_Report.pdf',size:'2.4MB',type:'pdf',uploadDate:'2024-01-15'},
{name:'Error_Code_Screenshot.jpg',size:'856KB',type:'image',uploadDate:'2024-01-15'},
{name:'Cell_Voltage_Chart.xlsx',size:'1.2MB',type:'excel',uploadDate:'2024-01-16'},
{name:'Battery_Photos_1.jpg',size:'3.1MB',type:'image',uploadDate:'2024-01-16'}
],
status:'pending',
timeline:[
{date:'2024-01-1509:30',event:'ClaimCreated',user:'NguyễnVănA(Staff)',status:'created'},
{date:'2024-01-1510:15',event:'TechnicianAssigned',user:'System',status:'as signed'},
{date:'2024-01-1514:30',event:'DiagnosticStarted',user:'TrầnMinhQuân',status:'diagnosing'},
{date:'2024-01-1611:20',event:'DiagnosticComplete',user:'TrầnMinhQuân',status:'diagnosed'},
{date:'2024-01-1616:45',event:'SubmittedtoManufacturer',user:'NguyễnVănA(Staff)',status:'pending'}
],
estimatedCost:'15,000,000VND',
createdBy:'NguyễnVănA',
createdDate:'2024-01-15'
};

const getStatusBadge=(status))=>{
const statusConfig={
pending:{variant:"pending",icon:Clock,text:" Chờduyệt"},
approved:{variant:"approved",icon:CheckCircle,text:"Đãduyệt"},
rejected:{variant:"rejected",icon:XCircle,text:" Từchối"},
"in-progress":{variant:" warning",icon:Wrench,text:"Đangsửa"},
completed:{variant:"success",icon:CheckCircle,text:" Hoànthành"}
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
const priorityConfig={
high:{variant:"destructive",text:" Cao"},
medium:{variant:"warning",text:" Trungbình"},
low:{variant:"secondary",text:" Thấp"}
};

const config=priorityConfig[priorityas keyoftypeofpriorityConfig];
return<Badgevariant={config.variant}>{config.text}</Badge>;
};

const getTestStatusBadge=(status))=>{
returnstatus==='pas s'
<Badgevariant="success">Pas s</Badge>:
<Badgevariant="destructive">Fail</Badge>;
};

return(
<divclas sName="fixedinset-0bg-black/50flexitems-centerjustify-centerp-4z-50">
<Cardclas sName="w-fullmax-w-6xlmax-h-[90vh]overflow-hidden">
<CardHeaderclas sName="border-b">
<divclas sName="flexitems-centerjustify-between">
<div>
<CardTitleclas sName="flexitems-centerspace-x-2">
<FileTextclas sName="h-5w-5text-primary"/>
<span>WarrantyClaimDetails</span>
</CardTitle>
<CardDescription>
ClaimID:{claimData.id}|Created:{claimData.createdDate}
</CardDescription>
</div>
<divclas sName="flexitems-centerspace-x-2">
{getStatusBadge(claimData.status)}
<Buttonvariant="ghost" size="sm" onClick={onClose}>
<Xclas sName="h-4w-4"/>
</Button>
</div>
</div>
</CardHeader>

<CardContentclas sName="p-0">
<TabsdefaultValue="overview" clas sName="h-full">
<divclas sName="border-bpx-6">
<TabsListclas sName="gridw-fullgrid-cols-5">
<TabsTriggervalue="overview">Overview</TabsTrigger>
<TabsTriggervalue="diagnosis">Diagnosis</TabsTrigger>
<TabsTriggervalue="attachments">Files</TabsTrigger>
<TabsTriggervalue="timeline">Timeline</TabsTrigger>
<TabsTriggervalue="actions">Actions</TabsTrigger>
</TabsList>
</div>

<divclas sName="p-6overflow-y-automax-h-[calc(90vh-280px)]">
{/*OverviewTab*/}
<TabsContentvalue="overview" clas sName="space-y-6">
<divclas sName="gridlg:grid-cols-2gap-6">
{/*Customer&VehicleInfo*/}
<Card>
<CardHeader>
<CardTitleclas sName="flexitems-centerspace-x-2text-bas e">
<Userclas sName="h-4w-4"/>
<span>CustomerInformation</span>
</CardTitle>
</CardHeader>
<CardContentclas sName="space-y-3">
<div>
<pclas sName="text-smtext-muted-foreground">Name</p>
<pclas sName="font-medium">{claimData.customer.name}</p>
</div>
<div>
<pclas sName="text-smtext-muted-foreground">Contact</p>
<pclas sName="font-medium">{claimData.customer.phone}</p>
<pclas sName="text-smtext-muted-foreground">{claimData.customer.email}</p>
</div>
<div>
<pclas sName="text-smtext-muted-foreground">Address</p>
<pclas sName="font-medium">{claimData.customer.address}</p>
</div>
</CardContent>
</Card>

<Card>
<CardHeader>
<CardTitleclas sName="flexitems-centerspace-x-2text-bas e">
<Carclas sName="h-4w-4"/>
<span>VehicleInformation</span>
</CardTitle>
</CardHeader>
<CardContentclas sName="space-y-3">
<div>
<pclas sName="text-smtext-muted-foreground">Model&Year</p>
<pclas sName="font-medium">{claimData.vehicle.model}({claimData.vehicle.year})</p>
</div>
<div>
<pclas sName="text-smtext-muted-foreground">VIN</p>
<pclas sName="font-mediumfont-mono">{claimData.vin}</p>
</div>
<divclas sName="gridgrid-cols-2gap-4">
<div>
<pclas sName="text-smtext-muted-foreground">Color</p>
<pclas sName="font-medium">{claimData.vehicle.color}</p>
</div>
<div>
<pclas sName="text-smtext-muted-foreground">Battery</p>
<pclas sName="font-medium">{claimData.vehicle.batteryCapacity}</p>
</div>
</div>
<div>
<pclas sName="text-smtext-muted-foreground">WarrantyStatus</p>
<Badgevariant="success">{claimData.vehicle.warrantyStatus}</Badge>
</div>
</CardContent>
</Card>

{/*IssueDetails*/}
<Cardclas sName="lg:col-span-2">
<CardHeader>
<CardTitleclas sName="flexitems-centerjustify-betweentext-bas e">
<divclas sName="flexitems-centerspace-x-2">
<AlertCircleclas sName="h-4w-4"/>
<span>IssueDetails</span>
</div>
<divclas sName="flexitems-centerspace-x-2">
{getPriorityBadge(claimData.issue.priority)}
<Badgevariant="outline">{claimData.issue.category}</Badge>
</div>
</CardTitle>
</CardHeader>
<CardContent>
<divclas sName="space-y-4">
<div>
<pclas sName="text-smtext-muted-foreground">ReportedDate</p>
<pclas sName="font-medium">{newDate(claimData.issue.reportedDate).toLocaleDateString('vi-VN')}</p>
</div>
<div>
<pclas sName="text-smtext-muted-foreground">Description</p>
<pclas sName="text-smleading-relaxed">{claimData.issue.description}</p>
</div>
<div>
<pclas sName="text-smtext-muted-foreground">EstimatedCost</p>
<pclas sName="font-semiboldtext-lgtext-primary">{claimData.estimatedCost}</p>
</div>
</div>
</CardContent>
</Card>

{/*AssignedTechnicians*/}
<Cardclas sName="lg:col-span-2">
<CardHeader>
<CardTitleclas sName="flexitems-centerspace-x-2text-bas e">
<Usersclas sName="h-4w-4"/>
<span>AssignedTechnicians</span>
</CardTitle>
</CardHeader>
<CardContent>
<divclas sName="gridmd:grid-cols-2gap-4">
{claimData.technicians.map((tech)=>(
<divkey={tech.id}clas sName="flexitems-centerspace-x-3p-3borderrounded-lg">
<divclas sName="h-10w-10rounded-fullbg-accentflexitems-centerjustify-center">
<Wrenchclas sName="h-5w-5"/>
</div>
<div>
<pclas sName="font-medium">{tech.name}</p>
<pclas sName="text-smtext-muted-foreground">{tech.role}</p>
<pclas sName="text-xstext-muted-foreground">{tech.specialty}</p>
</div>
</div>
))}
</div>
</CardContent>
</Card>
</div>
</TabsContent>

{/*DiagnosisTab*/}
<TabsContentvalue="diagnosis" clas sName="space-y-6">
<Card>
<CardHeader>
<CardTitleclas sName="text-bas e">TechnicalDiagnosisSummary</CardTitle>
</CardHeader>
<CardContent>
<pclas sName="text-smleading-relaxed">{claimData.diagnosis.summary}</p>
</CardContent>
</Card>

<Card>
<CardHeader>
<CardTitleclas sName="text-bas e">ErrorCodes</CardTitle>
</CardHeader>
<CardContent>
<divclas sName="flexflex-wrapgap-2">
{claimData.diagnosis.errorCodes.map((code)=>(
<Badgekey={code}variant="destructive" clas sName="font-mono">{code}</Badge>
))}
</div>
</CardContent>
</Card>

<Card>
<CardHeader>
<CardTitleclas sName="text-bas e">TestResults</CardTitle>
</CardHeader>
<CardContent>
<divclas sName="space-y-3">
{claimData.diagnosis.testResults.map((test,index)=>(
<divkey={index}clas sName="flexitems-centerjustify-betweenp-3borderrounded-lg">
<div>
<pclas sName="font-medium">{test.test}</p>
<pclas sName="text-smtext-muted-foreground">
Result:<spanclas sName="font-mono">{test.result}</span>|
Expected:<spanclas sName="font-mono">{test.expected}</span>
</p>
</div>
{getTestStatusBadge(test.status)}
</div>
))}
</div>
</CardContent>
</Card>

<Card>
<CardHeader>
<CardTitleclas sName="text-bas e">Recommendation</CardTitle>
</CardHeader>
<CardContent>
<pclas sName="text-smleading-relaxed">{claimData.diagnosis.recommendation}</p>
</CardContent>
</Card>
</TabsContent>

{/*AttachmentsTab*/}
<TabsContentvalue="attachments" clas sName="space-y-4">
<Card>
<CardHeader>
<CardTitleclas sName="text-bas e">SupportingDocuments({claimData.attachments.length})</CardTitle>
</CardHeader>
<CardContent>
<divclas sName="space-y-3">
{claimData.attachments.map((file,index)=>(
<divkey={index}clas sName="flexitems-centerjustify-betweenp-3borderrounded-lg">
<divclas sName="flexitems-centerspace-x-3">
<divclas sName="h-8w-8roundedbg-accentflexitems-centerjustify-center">
<FileTextclas sName="h-4w-4"/>
</div>
<div>
<pclas sName="font-medium">{file.name}</p>
<pclas sName="text-smtext-muted-foreground">
{file.size}|Uploaded:{newDate(file.uploadDate).toLocaleDateString('vi-VN')}
</p>
</div>
</div>
<divclas sName="flexspace-x-2">
<Buttonvariant="ghost" size="sm">
<Eyeclas sName="h-4w-4"/>
</Button>
<Buttonvariant="ghost" size="sm">
<Downloadclas sName="h-4w-4"/>
</Button>
</div>
</div>
))}
</div>
</CardContent>
</Card>
</TabsContent>

{/*TimelineTab*/}
<TabsContentvalue="timeline" clas sName="space-y-4">
<Card>
<CardHeader>
<CardTitleclas sName="text-bas e">ClaimTimeline</CardTitle>
</CardHeader>
<CardContent>
<divclas sName="space-y-4">
{claimData.timeline.map((event,index)=>(
<divkey={index}clas sName="flexitems-startspace-x-3">
<divclas sName="flexh-8w-8items-centerjustify-centerrounded-fullbg-primarytext-primary-foregroundtext-xs">
{index+1}
</div>
<divclas sName="flex-1">
<divclas sName="flexitems-centerjustify-between">
<pclas sName="font-medium">{event.event}</p>
<pclas sName="text-smtext-muted-foreground">{event.date}</p>
</div>
<pclas sName="text-smtext-muted-foreground">by{event.user}</p>
</div>
</div>
))}
</div>
</CardContent>
</Card>
</TabsContent>

{/*ActionsTab*/}
<TabsContentvalue="actions" clas sName="space-y-4">
<Card>
<CardHeader>
<CardTitleclas sName="text-bas e">AvailableActions</CardTitle>
<CardDescription>
Actionsavailableforthisclaimbas edoncurrentstatusandyourrole
</CardDescription>
</CardHeader>
<CardContent>
<divclas sName="gridmd:grid-cols-2gap-4">
<Button
clas sName="w-full"
onClick={onUpdateStatus}
disabled={user.role!=='service_center_staff'}
>
UpdateStatus
</Button>
<Buttonvariant="outline" clas sName="w-full">
AddNotes
</Button>
<Buttonvariant="outline" clas sName="w-full">
UploadFiles
</Button>
<Buttonvariant="outline" clas sName="w-full">
PrintReport
</Button>
</div>

{user.role!=='service_center_staff'&&(
<pclas sName="text-smtext-muted-foregroundmt-4">
*SomeactionsarerestrictedtoStaffmembers
</p>
)}
</CardContent>
</Card>
</TabsContent>
</div>
</Tabs>
</CardContent>
</Card>
</div>
);
};

exportdefaultClaimDetails;