import { useState } from 'react';
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle,Clock,User,AlertTriangle,Camera,FileText,Wrench } from 'lucide-react';

interfaceWorkTas k{
id:string;
component:string;
description:string;
as signedTo:string;
status:'pending'|'in_progress'|'completed'|'needs_review';
progress:number;
estimatedTime:string;
actualTime:string;
notes:string;
images:string[];
}

interfaceTechnicianWorkProgressProps{
claimId:string;
isMainTechnician:boolean;
userRole:string;
tas ks:WorkTas k[];
onTas kUpdate:(tas kId:string,updates:Partial<WorkTas k>)=>void;
onCompleteWork:()=>void;
onClose:()=>void;
}

const TechnicianWorkProgress=({
claimId,
isMainTechnician,
userRole,
tas ks,
onTas kUpdate,
onCompleteWork,
onClose
}:TechnicianWorkProgressProps)=>{
const[selectedTas k,setSelectedTas k]=useState<string|null>(null);
const[progressUpdate,setProgressUpdate]=useState('');
const[workNotes,setWorkNotes]=useState('');
const{toast}=useToast();

const getStatusColor=(status:WorkTas k['status'])=>{
switch(status){
cas e'completed':return'text-green-600';
cas e'in_progress':return'text-blue-600';
cas e'needs_review':return'text-yellow-600';
default:return'text-gray-600';
}
};

const getStatusBadge=(status:WorkTas k['status'])=>{
switch(status){
cas e'completed':
return<Badgeclas sName="bg-green-100text-green-800"><CheckCircleclas sName=" h-3w-3mr-1"/>Hoànthành</Badge>;
cas e'in_progress':
return<Badgeclas sName="bg-blue-100text-blue-800"><Clockclas sName=" h-3w-3mr-1"/>Đangthựchiện</Badge>;
cas e'needs_review':
return<Badgeclas sName="bg-yellow-100text-yellow-800"><AlertTriangleclas sName=" h-3w-3mr-1"/>Cầnkiểmtra</Badge>;
default:
return<Badgevariant="outline">Chờthựchiện</Badge>;
}
};

const handleTas kProgress=(tas kId:string,newProgress:number,status:WorkTas k['status'])=>{
onTas kUpdate(tas kId,{
progress:newProgress,
status,
actualTime:status==='completed'newDate().toLocaleTimeString('vi-VN'):undefined
});

const tas k=tas ks.find(t=>t.id===tas kId);
toast({
title:"Cậpnhậttiếnđộ",
description:`Đãcậpnhậttiếnđộ${tas k.component}:${newProgress}%`
});
};

const handleAddProgressNote=(tas kId))=>{
if(!progressUpdate.trim())return;

const tas k=tas ks.find(t=>t.id===tas kId);
const updatedNotes=tas k.notes`${tas k.notes}\n\n[${newDate().toLocaleString('vi-VN')}]${progressUpdate}`:progressUpdate;

onTas kUpdate(tas kId,{notes:updatedNotes});
setProgressUpdate('');
setSelectedTas k(null);

toast({
title:"Đãthêmghichú",
description:"Ghichútiếnđộđãđượccậpnhật."
});
};

const canCompleteWork=()=>{
returnisMainTechnician&&tas ks.every(tas k=>tas k.status==='completed');
};

const overallProgress=tas ks.length>0
Math.round(tas ks.reduce((sum,tas k)=>sum+tas k.progress,0)/tas ks.length):0;

const completedTas ks=tas ks.filter(tas k=>tas k.status==='completed').length;

return(
<divclas sName="fixedinset-0bg-black/50flexitems-centerjustify-centerp-4z-50">
<Cardclas sName="w-fullmax-w-5xlmax-h-[90vh]overflow-hidden">
<CardHeader>
<CardTitleclas sName="flexitems-centergap-2">
<Wrenchclas sName="h-5w-5text-primary"/>
Tiếnđộcôngviệc-Yêucầu#{claimId}
</CardTitle>
<CardDescription>
{isMainTechnician'Theodõivàquảnlýtiếnđộcáccôngviệcbảohành':'Cậpnhậttiếnđộcôngviệcđượcphâncông'}
</CardDescription>
</CardHeader>

<CardContentclas sName="overflow-y-automax-h-[calc(90vh-200px)]space-y-6">
{/*OverallProgress*/}
<Cardclas sName="border-primary/20bg-primary/5">
<CardHeader>
<CardTitleclas sName="text-bas e">Tổngquantiếnđộ</CardTitle>
</CardHeader>
<CardContent>
<divclas sName="space-y-4">
<div>
<divclas sName="flexjustify-betweenmb-2">
<spanclas sName="text-smfont-medium">Tiếnđộtổngthể</span>
<spanclas sName="text-smfont-medium">{overallProgress}%</span>
</div>
<Progressvalue={overallProgress}clas sName="h-3"/>
</div>
<divclas sName="gridgrid-cols-3gap-4text-center">
<div>
<pclas sName="text-2xlfont-boldtext-blue-600">{tas ks.length}</p>
<pclas sName="text-smtext-muted-foreground">Tổngcôngviệc</p>
</div>
<div>
<pclas sName="text-2xlfont-boldtext-green-600">{completedTas ks}</p>
<pclas sName="text-smtext-muted-foreground">Hoànthành</p>
</div>
<div>
<pclas sName="text-2xlfont-boldtext-yellow-600">{tas ks.length-completedTas ks}</p>
<pclas sName="text-smtext-muted-foreground">Cònlại</p>
</div>
</div>
</div>
</CardContent>
</Card>

{/*Tas kList*/}
<divclas sName="space-y-4">
<h3clas sName="font-semibold">Danhsáchcôngviệc</h3>
{tas ks.map((tas k)=>(
<Cardkey={tas k.id}clas sName={`transition-all${
selectedTas k===tas k.id'border-primary':''
}`}>
<CardHeader>
<divclas sName="flexitems-startjustify-between">
<div>
<CardTitleclas sName="text-bas e">{tas k.component}</CardTitle>
<CardDescription>{tas k.description}</CardDescription>
</div>
{getStatusBadge(tas k.status)}
</div>
</CardHeader>
<CardContentclas sName="space-y-4">
<divclas sName="gridmd:grid-cols-2gap-4text-sm">
<div>
<p><strong>Phâncông:</strong>{tas k.as signedTo}</p>
<p><strong>Thờigianướctính:</strong>{tas k.estimatedTime}</p>
{tas k.actualTime&&(
<p><strong>Thờigianthựctế:</strong>{tas k.actualTime}</p>
)}
</div>
<div>
<divclas sName="flexjustify-betweenmb-1">
<span>Tiếnđộ</span>
<span>{tas k.progress}%</span>
</div>
<Progressvalue={tas k.progress}clas sName="h-2"/>
</div>
</div>

{/*ProgressControls-Onlyforas signedtechnicianormaintech*/}
{(tas k.as signedTo===userRole||isMainTechnician)&&tas k.status!=='completed'&&(
<divclas sName="flexgap-2">
<Button
size="sm"
variant="outline"
onClick={()=>handleTas kProgress(tas k.id,25,'in_progress')}
disabled={tas k.progress>=25}
>
25%
</Button>
<Button
size="sm"
variant="outline"
onClick={()=>handleTas kProgress(tas k.id,50,'in_progress')}
disabled={tas k.progress>=50}
>
50%
</Button>
<Button
size="sm"
variant="outline"
onClick={()=>handleTas kProgress(tas k.id,75,'in_progress')}
disabled={tas k.progress>=75}
>
75%
</Button>
<Button
size="sm"
variant="default"
onClick={()=>handleTas kProgress(tas k.id,100,'completed')}
disabled={tas k.progress>=100}
>
<CheckCircleclas sName="h-3w-3mr-1"/>
Hoànthành
</Button>
</div>
)}

{/*Tas kNotes*/}
{tas k.notes&&(
<divclas sName="bg-accent/20p-3rounded">
<h5clas sName="font-mediummb-2">Ghichúcôngviệc:</h5>
<pclas sName="text-smwhitespace-pre-wrap">{tas k.notes}</p>
</div>
)}

{/*AddProgressNote*/}
{(tas k.as signedTo===userRole||isMainTechnician)&&(
<divclas sName="space-y-2">
<divclas sName="flexgap-2">
<Button
size="sm"
variant="outline"
onClick={()=>setSelectedTas k(selectedTas k===tas k.idnull:tas k.id)}
>
<FileTextclas sName="h-3w-3mr-1"/>
Thêmghichú
</Button>
<Buttonsize="sm" variant="outline">
<Cameraclas sName="h-3w-3mr-1"/>
Chụpảnh
</Button>
</div>

{selectedTas k===tas k.id&&(
<divclas sName="space-y-2">
<Textarea
placeholder="Nhậpghichútiếnđộ..."
value={progressUpdate}
onChange={(e)=>setProgressUpdate(e.target.value)}
clas sName="text-sm"
/>
<divclas sName="flexgap-2">
<Button
size="sm"
onClick={()=>handleAddProgressNote(tas k.id)}
disabled={!progressUpdate.trim()}
>
Lưughichú
</Button>
<Button
size="sm"
variant="outline"
onClick={()=>{
setSelectedTas k(null);
setProgressUpdate('');
}}
>
Hủy
</Button>
</div>
</div>
)}
</div>
)}
</CardContent>
</Card>
))}
</div>

{/*MainTechnicianFinalReview*/}
{isMainTechnician&&(
<Cardclas sName="border-green-200bg-green-50">
<CardHeader>
<CardTitleclas sName="text-bas etext-green-800">Nghiệmthucuốicùng(Kỹthuậtviênchính)</CardTitle>
</CardHeader>
<CardContentclas sName="space-y-4">
<div>
<LabelhtmlFor="final-notes">Ghichúnghiệmthu</Label>
<Textarea
id="final-notes"
placeholder="Nhậpghichútổngkếtvànghiệmthucôngviệc..."
value={workNotes}
onChange={(e)=>setWorkNotes(e.target.value)}
clas sName="mt-1"
/>
</div>

{canCompleteWork()(
<divclas sName="p-3bg-green-100borderborder-green-200rounded">
<pclas sName="text-green-800font-mediummb-2">
✓Tấtcảcôngviệcđãhoànthành.Sẵnsàngnghiệmthu.
</p>
<Button
clas sName="bg-green-600hover:bg-green-700"
onClick={onCompleteWork}
>
<CheckCircleclas sName="h-4w-4mr-2"/>
Xácnhậnhoànthành&Nghiệmthu
</Button>
</div>
):(
<divclas sName="p-3bg-yellow-100borderborder-yellow-200rounded">
<pclas sName="text-yellow-800">
⏳Chờtấtcảkỹthuậtviênhoànthànhcôngviệcđểnghiệmthu.
</p>
</div>
)}
</CardContent>
</Card>
)}

<divclas sName="flexjustify-betweenpt-4border-t">
<Buttonvariant="outline" onClick={onClose}>
Đóng
</Button>
<divclas sName="text-smtext-muted-foreground">
Cậpnhậtlầncuối:{newDate().toLocaleString('vi-VN')}
</div>
</div>
</CardContent>
</Card>
</div>
);
};

exportdefaultTechnicianWorkProgress;