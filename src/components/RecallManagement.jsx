import { useState } from 'react';
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs,TabsContent,TabsList,TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
AlertTriangle,
Plus,
Eye,
Send,
Users,
Calendar,
CheckCircle,
Clock,
FileText,
Mail,
Phone,
MessageSquare
 } from 'lucide-react';

interfaceRecall{
id:string;
title:string;
description:string;
severity:'critical'|'high'|'medium'|'low';
affectedModels:string[];
affectedVins:string[];
issueDate:string;
deadline:string;
status:'draft'|'active'|'completed'|'cancelled';
serviceInstructions:string;
estimatedVehicles:number;
completedCount:number;
notificationsSent:number;
estimatedCost:number;
safetyRisk:string;
correctiveAction:string;
}

interfaceRecallManagementProps{
onClose:()=>void;
}

const RecallManagement=({onClose}:RecallManagementProps)=>{
const[activeTab,setActiveTab]=useState('list');
const[showCreateForm,setShowCreateForm]=useState(false);
const[selectedRecall,setSelectedRecall]=useState<Recall|null>(null);
const{toast}=useToast();

//Formstate
const[formData,setFormData]=useState({
title:'',
description:'',
severity:'medium'as Recall['severity'],
affectedModels:[]as string[],
vinPattern:'',
deadline:'',
safetyRisk:'',
correctiveAction:'',
serviceInstructions:'',
estimatedCost:''
});

//Mockdata
constrecalls:Recall[]=[
{
id:'RCL-2024-001',
title:'BatteryThermalManagementSystemRecall',
description:'Potentialoverheatinginbatterythermalmanagementsystemcouldleadtofirerisk',
severity:'critical',
affectedModels:['EVModelXPro2023','EVModelXPro2024'],
affectedVins:['1HGBH41JXMN109186','WVWZZZ1JZ3W386752'],
issueDate:'2024-01-15',
deadline:'2024-03-15',
status:'active',
serviceInstructions:'Replacebatterythermalmanagementcontrolunitandupdatesoftwaretoversion2.1.4',
estimatedVehicles:15420,
completedCount:8930,
notificationsSent:15420,
estimatedCost:2850000000,
safetyRisk:'Firehazardduetooverheating-immediateactionrequired',
correctiveAction:'Hardwarereplacementandsoftwareupdate'
},
{
id:'RCL-2024-002',
title:'MotorControllerSoftwareUpdate',
description:'Softwarebugcausingunexpectedaccelerationbehavior',
severity:'high',
affectedModels:['EVCompactPlus2022','EVSportSeries2023'],
affectedVins:['1N4AL11D75C109151'],
issueDate:'2024-01-20',
deadline:'2024-02-28',
status:'active',
serviceInstructions:'Updatemotorcontrollerfirmwaretoversion3.2.1',
estimatedVehicles:8750,
completedCount:2140,
notificationsSent:8750,
estimatedCost:175000000,
safetyRisk:'Potentiallossofvehiclecontrol',
correctiveAction:'Firmwareupdateandcalibration'
},
{
id:'RCL-2023-045',
title:'ChargingPortSafetyInspection',
description:'Routinesafetyinspectionforchargingportas sembly',
severity:'medium',
affectedModels:['EVCityMini2022'],
affectedVins:[],
issueDate:'2023-12-01',
deadline:'2024-06-01',
status:'completed',
serviceInstructions:'Inspectchargingportforwearandreplaceifnecessary',
estimatedVehicles:3200,
completedCount:3200,
notificationsSent:3200,
estimatedCost:96000000,
safetyRisk:'Low-preventivemeas ure',
correctiveAction:'Inspectionandconditionalreplacement'
}
];

const vehicleModels=[
'EVModelXPro2024',
'EVModelXPro2023',
'EVCompactPlus2023',
'EVCompactPlus2022',
'EVSportSeries2023',
'EVSportSeries2022',
'EVCityMini2023',
'EVCityMini2022'
];

const handleCreateRecall=()=>{
if(!formData.title||!formData.description||!formData.deadline){
toast({
title:"Lỗi",
description:"Vuilòngđiềnđầyđủthôngtinbắtbuộc.",
variant:"destructive"
});
return;
}

//Inrealapp,submittoAPI
console.log('Creatingrecall:',formData);

toast({
title:"Tạothuhồithànhcông",
description:`Thuhồi"${formData.title}"đãđượctạovàsẽđượcgửiđếntấtcảtrungtâmdịchvụ.`
});

setShowCreateForm(false);
setFormData({
title:'',
description:'',
severity:'medium',
affectedModels:[],
vinPattern:'',
deadline:'',
safetyRisk:'',
correctiveAction:'',
serviceInstructions:'',
estimatedCost:''
});
};

const handleModelToggle=(model))=>{
setFormData(prev=>({
...prev,
affectedModels:prev.affectedModels.includes(model)
prev.affectedModels.filter(m=>m!==model)
:[...prev.affectedModels,model]
}));
};

const getSeverityBadge=(severity:Recall['severity'])=>{
const configs={
critical:{variant:'destructive',text:'Khẩncấp',icon:AlertTriangle},
high:{variant:'destructive',text:'Cao',icon:AlertTriangle},
medium:{variant:'warning',text:'Trungbình',icon:Clock},
low:{variant:'secondary',text:'Thấp',icon:CheckCircle}
};
const config=configs[severity];
const Icon=config.icon;
return(
<Badgevariant={config.variant}>
<Iconclas sName="h-3w-3mr-1"/>
{config.text}
</Badge>
);
};

const getStatusBadge=(status:Recall['status'])=>{
const configs={
draft:{variant:'secondary',text:'Nháp'},
active:{variant:'warning',text:'Đangthựchiện'},
completed:{variant:'default',text:'Hoànthành'},
cancelled:{variant:'destructive',text:'Đãhủy'}
};
const config=configs[status];
return<Badgevariant={config.variant}>{config.text}</Badge>;
};

const formatCurrency=(amount))=>{
returnnewIntl.NumberFormat('vi-VN',{
style:'currency',
currency:'VND',
minimumFractionDigits:0
}).format(amount);
};

if(showCreateForm){
return(
<divclas sName="fixedinset-0bg-black/50flexitems-centerjustify-centerp-4z-50">
<Cardclas sName="w-fullmax-w-4xlmax-h-[90vh]overflow-hidden">
<CardHeader>
<CardTitleclas sName="flexitems-centergap-2">
<AlertTriangleclas sName="h-5w-5text-destructive"/>
Tạothôngbáothuhồimới
</CardTitle>
<CardDescription>
Tạothôngbáothuhồichoxecólỗikỹthuậthoặcvấnđềantoàn
</CardDescription>
</CardHeader>

<CardContentclas sName="overflow-y-automax-h-[calc(90vh-200px)]space-y-6">
<divclas sName="gridgrid-cols-2gap-4">
<divclas sName="space-y-2">
<LabelhtmlFor="title">Tiêuđềthuhồi*</Label>
<Input
id="title"
placeholder="Nhậptiêuđềthuhồi..."
value={formData.title}
onChange={(e)=>setFormData(prev=>({...prev,title:e.target.value}))}
/>
</div>

<divclas sName="space-y-2">
<LabelhtmlFor="severity">Mứcđộnghiêmtrọng*</Label>
<Selectvalue={formData.severity}onValueChange={(value)=>
setFormData(prev=>({...prev,severity:valueas Recall['severity']}))
}>
<SelectTrigger>
<SelectValue/>
</SelectTrigger>
<SelectContent>
<SelectItemvalue="critical">Khẩncấp-Nguyhiểmcao</SelectItem>
<SelectItemvalue="high">Cao-Cầnxửlýngay</SelectItem>
<SelectItemvalue="medium">Trungbình</SelectItem>
<SelectItemvalue="low">Thấp-Khônggấp</SelectItem>
</SelectContent>
</Select>
</div>
</div>

<divclas sName="space-y-2">
<LabelhtmlFor="description">Môtảvấnđề*</Label>
<Textarea
id="description"
placeholder="Môtảchitiếtvấnđềkỹthuậtvàrủiro..."
value={formData.description}
onChange={(e)=>setFormData(prev=>({...prev,description:e.target.value}))}
rows={3}
/>
</div>

<divclas sName="space-y-2">
<Label>Dòngxebịảnhhưởng*</Label>
<divclas sName="gridgrid-cols-2gap-2">
{vehicleModels.map((model)=>(
<divkey={model}clas sName="flexitems-centerspace-x-2">
<Checkbox
checked={formData.affectedModels.includes(model)}
onCheckedChange={()=>handleModelToggle(model)}
/>
<labelclas sName="text-sm">{model}</label>
</div>
))}
</div>
</div>

<divclas sName="gridgrid-cols-2gap-4">
<divclas sName="space-y-2">
<LabelhtmlFor="vinPattern">PatternVIN(tùychọn)</Label>
<Input
id="vinPattern"
placeholder="Vídụ:1HGBH41JXMN*"
value={formData.vinPattern}
onChange={(e)=>setFormData(prev=>({...prev,vinPattern:e.target.value}))}
/>
</div>

<divclas sName="space-y-2">
<LabelhtmlFor="deadline">Hạnchótthựchiện*</Label>
<Input
id="deadline"
type="date"
value={formData.deadline}
onChange={(e)=>setFormData(prev=>({...prev,deadline:e.target.value}))}
/>
</div>
</div>

<divclas sName="space-y-2">
<LabelhtmlFor="safetyRisk">Rủiroantoàn</Label>
<Textarea
id="safetyRisk"
placeholder="Môtảrủiroantoànvàtácđộngtiềmẩn..."
value={formData.safetyRisk}
onChange={(e)=>setFormData(prev=>({...prev,safetyRisk:e.target.value}))}
rows={2}
/>
</div>

<divclas sName="space-y-2">
<LabelhtmlFor="correctiveAction">Biệnphápkhắcphục</Label>
<Textarea
id="correctiveAction"
placeholder="Môtảbiệnphápkhắcphục..."
value={formData.correctiveAction}
onChange={(e)=>setFormData(prev=>({...prev,correctiveAction:e.target.value}))}
rows={2}
/>
</div>

<divclas sName="space-y-2">
<LabelhtmlFor="serviceInstructions">Hướngdẫnkỹthuật</Label>
<Textarea
id="serviceInstructions"
placeholder="Hướngdẫnchitiếtchokỹthuậtviên..."
value={formData.serviceInstructions}
onChange={(e)=>setFormData(prev=>({...prev,serviceInstructions:e.target.value}))}
rows={3}
/>
</div>

<divclas sName="space-y-2">
<LabelhtmlFor="estimatedCost">Chiphíướctính(VND)</Label>
<Input
id="estimatedCost"
type="number"
placeholder="0"
value={formData.estimatedCost}
onChange={(e)=>setFormData(prev=>({...prev,estimatedCost:e.target.value}))}
/>
</div>
</CardContent>

<divclas sName="flexjustify-betweenp-6border-t">
<Buttonvariant="outline" onClick={()=>setShowCreateForm(false)}>
Hủy
</Button>
<divclas sName="flexgap-2">
<Buttonvariant="secondary">Lưunháp</Button>
<ButtononClick={handleCreateRecall}clas sName="bg-destructivehover:bg-destructive/90">
<Sendclas sName="h-4w-4mr-2"/>
Tạo&Gửithuhồi
</Button>
</div>
</div>
</Card>
</div>
);
}

return(
<divclas sName="fixedinset-0bg-black/50flexitems-centerjustify-centerp-4z-50">
<Cardclas sName="w-fullmax-w-7xlmax-h-[90vh]overflow-hidden">
<CardHeader>
<divclas sName="flexitems-centerjustify-between">
<div>
<CardTitleclas sName="flexitems-centergap-2">
<AlertTriangleclas sName="h-5w-5text-destructive"/>
QuảnlýThuhồi&Recall
</CardTitle>
<CardDescription>
Quảnlýthôngbáothuhồibắtbuộcvàchiếndịchbảodưỡng
</CardDescription>
</div>
<divclas sName="flexgap-2">
<Buttonvariant="outline" onClick={onClose}>Đóng</Button>
<ButtononClick={()=>setShowCreateForm(true)}clas sName="bg-destructivehover:bg-destructive/90">
<Plusclas sName="h-4w-4mr-2"/>
Tạothuhồimới
</Button>
</div>
</div>
</CardHeader>

<CardContentclas sName="overflow-y-automax-h-[calc(90vh-200px)]">
<Tabsvalue={activeTab}onValueChange={setActiveTab}>
<TabsListclas sName="gridw-fullgrid-cols-4">
<TabsTriggervalue="list">Danhsáchthuhồi</TabsTrigger>
<TabsTriggervalue="active">Đangthựchiện</TabsTrigger>
<TabsTriggervalue="completed">Đãhoànthành</TabsTrigger>
<TabsTriggervalue="statistics">Thốngkê</TabsTrigger>
</TabsList>

<TabsContentvalue="list" clas sName="space-y-4">
{recalls.map((recall)=>(
<Cardkey={recall.id}clas sName="border-l-4border-l-destructive">
<CardContentclas sName="pt-4">
<divclas sName="flexjustify-betweenitems-startmb-4">
<div>
<divclas sName="flexitems-centergap-2mb-2">
<h3clas sName="font-semibold">{recall.title}</h3>
{getSeverityBadge(recall.severity)}
{getStatusBadge(recall.status)}
</div>
<pclas sName="text-smtext-muted-foregroundmb-2">{recall.description}</p>
<pclas sName="text-xstext-muted-foreground">#{recall.id}-Pháthành:{newDate(recall.issueDate).toLocaleDateString('vi-VN')}</p>
</div>
<Button
variant="outline"
size="sm"
onClick={()=>setSelectedRecall(recall)}
>
<Eyeclas sName="h-3w-3mr-1"/>
Chitiết
</Button>
</div>

<divclas sName="gridgrid-cols-4gap-4text-sm">
<div>
<pclas sName="font-medium">Xeảnhhưởng</p>
<pclas sName="text-muted-foreground">{recall.estimatedVehicles.toLocaleString('vi-VN')}</p>
</div>
<div>
<pclas sName="font-medium">Đãhoànthành</p>
<pclas sName="text-muted-foreground">{recall.completedCount.toLocaleString('vi-VN')}({Math.round(recall.completedCount/recall.estimatedVehicles*100)}%)</p>
</div>
<div>
<pclas sName="font-medium">Hạnchót</p>
<pclas sName="text-muted-foreground">{newDate(recall.deadline).toLocaleDateString('vi-VN')}</p>
</div>
<div>
<pclas sName="font-medium">Chiphíướctính</p>
<pclas sName="text-muted-foreground">{formatCurrency(recall.estimatedCost)}</p>
</div>
</div>

<divclas sName="mt-3">
<pclas sName="text-smfont-mediummb-1">Tiếnđộhoànthành:</p>
<divclas sName="w-fullbg-mutedrounded-fullh-2">
<div
clas sName="bg-primaryh-2rounded-full"
style={{width:`${(recall.completedCount/recall.estimatedVehicles)*100}%`}}
/>
</div>
</div>
</CardContent>
</Card>
))}
</TabsContent>

<TabsContentvalue="active" clas sName="space-y-4">
{recalls.filter(r=>r.status==='active').map((recall)=>(
<Cardkey={recall.id}clas sName="border-l-4border-l-warning">
<CardContentclas sName="pt-4">
<divclas sName="flexjustify-betweenitems-start">
<divclas sName="flex-1">
<divclas sName="flexitems-centergap-2mb-2">
<h3clas sName="font-semibold">{recall.title}</h3>
{getSeverityBadge(recall.severity)}
</div>
<pclas sName="text-smtext-muted-foregroundmb-2">{recall.description}</p>

<divclas sName="gridgrid-cols-3gap-4text-sm">
<div>
<pclas sName="font-medium">Tiếnđộ</p>
<pclas sName="text-muted-foreground">{recall.completedCount}/{recall.estimatedVehicles}xe</p>
</div>
<div>
<pclas sName="font-medium">Thôngbáođãgửi</p>
<pclas sName="text-muted-foreground">{recall.notificationsSent.toLocaleString('vi-VN')}</p>
</div>
<div>
<pclas sName="font-medium">Thờigiancònlại</p>
<pclas sName="text-muted-foreground">
{Math.ceil((newDate(recall.deadline).getTime()-newDate().getTime())/(1000*60*60*24))}ngày
</p>
</div>
</div>
</div>

<divclas sName="flexgap-2ml-4">
<Buttonvariant="outline" size="sm">
<Mailclas sName="h-3w-3mr-1"/>
Gửinhắcnhở
</Button>
<Buttonvariant="outline" size="sm" onClick={()=>setSelectedRecall(recall)}>
<Eyeclas sName="h-3w-3mr-1"/>
Chitiết
</Button>
</div>
</div>
</CardContent>
</Card>
))}
</TabsContent>

<TabsContentvalue="completed" clas sName="space-y-4">
{recalls.filter(r=>r.status==='completed').map((recall)=>(
<Cardkey={recall.id}clas sName="border-l-4border-l-success">
<CardContentclas sName="pt-4">
<divclas sName="flexjustify-betweenitems-start">
<div>
<divclas sName="flexitems-centergap-2mb-2">
<h3clas sName="font-semibold">{recall.title}</h3>
<Badgevariant="default">
<CheckCircleclas sName="h-3w-3mr-1"/>
Hoànthành
</Badge>
</div>
<pclas sName="text-smtext-muted-foreground">{recall.description}</p>

<divclas sName="gridgrid-cols-3gap-4text-smmt-3">
<div>
<pclas sName="font-medium">Hoànthành</p>
<pclas sName="text-success">100%({recall.completedCount.toLocaleString('vi-VN')}xe)</p>
</div>
<div>
<pclas sName="font-medium">Chiphíthựctế</p>
<pclas sName="text-muted-foreground">{formatCurrency(recall.estimatedCost)}</p>
</div>
<div>
<pclas sName="font-medium">Hoànthànhtrướchạn</p>
<pclas sName="text-success">15ngày</p>
</div>
</div>
</div>

<Buttonvariant="outline" size="sm" onClick={()=>setSelectedRecall(recall)}>
<FileTextclas sName="h-3w-3mr-1"/>
Báocáo
</Button>
</div>
</CardContent>
</Card>
))}
</TabsContent>

<TabsContentvalue="statistics" clas sName="space-y-6">
<divclas sName="gridgap-4md:grid-cols-4">
<Card>
<CardContentclas sName="pt-6">
<divclas sName="text-center">
<pclas sName="text-2xlfont-boldtext-destructive">3</p>
<pclas sName="text-smtext-muted-foreground">Thuhồikhẩncấp</p>
</div>
</CardContent>
</Card>
<Card>
<CardContentclas sName="pt-6">
<divclas sName="text-center">
<pclas sName="text-2xlfont-boldtext-warning">2</p>
<pclas sName="text-smtext-muted-foreground">Đangthựchiện</p>
</div>
</CardContent>
</Card>
<Card>
<CardContentclas sName="pt-6">
<divclas sName="text-center">
<pclas sName="text-2xlfont-boldtext-success">15</p>
<pclas sName="text-smtext-muted-foreground">Hoànthành</p>
</div>
</CardContent>
</Card>
<Card>
<CardContentclas sName="pt-6">
<divclas sName="text-center">
<pclas sName="text-2xlfont-bold">27,370</p>
<pclas sName="text-smtext-muted-foreground">Xeđượcthuhồi</p>
</div>
</CardContent>
</Card>
</div>

<Card>
<CardHeader>
<CardTitle>Hiệuquảthuhồi</CardTitle>
</CardHeader>
<CardContent>
<divclas sName="space-y-4">
<div>
<divclas sName="flexjustify-betweentext-sm">
<span>Tỷlệhoànthànhđúnghạn</span>
<spanclas sName="font-medium">92.3%</span>
</div>
<divclas sName="mt-1h-2bg-mutedrounded-full">
<divclas sName="h-2bg-successrounded-full" style={{width:"92.3%"}}/>
</div>
</div>
<div>
<divclas sName="flexjustify-betweentext-sm">
<span>Thờigianphảnhồitrungbình</span>
<spanclas sName="font-medium">3.2ngày</span>
</div>
</div>
<div>
<divclas sName="flexjustify-betweentext-sm">
<span>Chiphíthuhồinămnay</span>
<spanclas sName="font-medium">{formatCurrency(3200000000)}</span>
</div>
</div>
</div>
</CardContent>
</Card>
</TabsContent>
</Tabs>

{/*DetailModal*/}
{selectedRecall&&(
<divclas sName="fixedinset-0bg-black/50flexitems-centerjustify-centerp-4z-[60]">
<Cardclas sName="w-fullmax-w-4xlmax-h-[90vh]overflow-hidden">
<CardHeader>
<divclas sName="flexjustify-betweenitems-start">
<div>
<CardTitleclas sName="flexitems-centergap-2">
{getSeverityBadge(selectedRecall.severity)}
{selectedRecall.title}
</CardTitle>
<CardDescription>#{selectedRecall.id}</CardDescription>
</div>
<Buttonvariant="outline" onClick={()=>setSelectedRecall(null)}>
Đóng
</Button>
</div>
</CardHeader>

<CardContentclas sName="overflow-y-automax-h-[calc(90vh-200px)]space-y-6">
<divclas sName="gridgrid-cols-2gap-6">
<div>
<h4clas sName="font-semiboldmb-2">Thôngtinthuhồi</h4>
<divclas sName="space-y-2text-sm">
<p><strong>Môtả:</strong>{selectedRecall.description}</p>
<p><strong>Rủiroantoàn:</strong>{selectedRecall.safetyRisk}</p>
<p><strong>Biệnphápkhắcphục:</strong>{selectedRecall.correctiveAction}</p>
<p><strong>Ngàypháthành:</strong>{newDate(selectedRecall.issueDate).toLocaleDateString('vi-VN')}</p>
<p><strong>Hạnchót:</strong>{newDate(selectedRecall.deadline).toLocaleDateString('vi-VN')}</p>
</div>
</div>

<div>
<h4clas sName="font-semiboldmb-2">Thốngkêtiếnđộ</h4>
<divclas sName="space-y-2text-sm">
<p><strong>Xeảnhhưởng:</strong>{selectedRecall.estimatedVehicles.toLocaleString('vi-VN')}</p>
<p><strong>Đãhoànthành:</strong>{selectedRecall.completedCount.toLocaleString('vi-VN')}</p>
<p><strong>Tỷlệhoànthành:</strong>{Math.round(selectedRecall.completedCount/selectedRecall.estimatedVehicles*100)}%</p>
<p><strong>Thôngbáođãgửi:</strong>{selectedRecall.notificationsSent.toLocaleString('vi-VN')}</p>
<p><strong>Chiphíướctính:</strong>{formatCurrency(selectedRecall.estimatedCost)}</p>
</div>
</div>
</div>

<div>
<h4clas sName="font-semiboldmb-2">Dòngxebịảnhhưởng</h4>
<divclas sName="flexflex-wrapgap-2">
{selectedRecall.affectedModels.map((model)=>(
<Badgekey={model}variant="outline">{model}</Badge>
))}
</div>
</div>

<div>
<h4clas sName="font-semiboldmb-2">Hướngdẫnkỹthuật</h4>
<divclas sName="bg-mutedp-4roundedtext-sm">
{selectedRecall.serviceInstructions}
</div>
</div>

<divclas sName="flexgap-2">
<Buttonvariant="outline">
<Mailclas sName="h-4w-4mr-2"/>
Gửinhắcnhở
</Button>
<Buttonvariant="outline">
<Phoneclas sName="h-4w-4mr-2"/>
Liênhệtrungtâm
</Button>
<Buttonvariant="outline">
<FileTextclas sName="h-4w-4mr-2"/>
Xuấtbáocáo
</Button>
</div>
</CardContent>
</Card>
</div>
)}
</CardContent>
</Card>
</div>
);
};

exportdefaultRecallManagement;