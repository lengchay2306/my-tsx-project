import { useState } from'react';
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from'@/components/ui/card';
import { Button } from'@/components/ui/button';
import { Badge } from'@/components/ui/badge';
import { Textarea } from'@/components/ui/textarea';
import { Label } from'@/components/ui/label';
import { Progress } from'@/components/ui/progress';
import { useToast } from'@/hooks/use-toast';
import { CheckCircle,Clock,User,AlertTriangle,Camera,FileText,Wrench } from'lucide-react';

interfaceWorkTask{
id:string;
component:string;
description:string;
assignedTo:string;
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
tasks:WorkTask[];
onTaskUpdate:(taskId:string,updates:Partial<WorkTask>)=>void;
onCompleteWork:()=>void;
onClose:()=>void;
}

const TechnicianWorkProgress=({
claimId,
isMainTechnician,
userRole,
tasks,
onTaskUpdate,
onCompleteWork,
onClose
}:TechnicianWorkProgressProps)=>{
const[selectedTask,setSelectedTask]=useState<string|null>(null);
const[progressUpdate,setProgressUpdate]=useState('');
const[workNotes,setWorkNotes]=useState('');
const{toast}=useToast();

const getStatusColor=(status:WorkTask['status'])=>{
switch(status){
case'completed':return'text-green-600';
case'in_progress':return'text-blue-600';
case'needs_review':return'text-yellow-600';
default:return'text-gray-600';
}
};

const getStatusBadge=(status:WorkTask['status'])=>{
switch(status){
case'completed':
return<BadgeclassName="bg-green-100text-green-800"><CheckCircleclassName="h-3w-3mr-1"/>Hoànthành</Badge>;
case'in_progress':
return<BadgeclassName="bg-blue-100text-blue-800"><ClockclassName="h-3w-3mr-1"/>Đangthựchiện</Badge>;
case'needs_review':
return<BadgeclassName="bg-yellow-100text-yellow-800"><AlertTriangleclassName="h-3w-3mr-1"/>Cầnkiểmtra</Badge>;
default:
return<Badgevariant="outline">Chờthựchiện</Badge>;
}
};

const handleTaskProgress=(taskId:string,newProgress:number,status:WorkTask['status'])=>{
onTaskUpdate(taskId,{
progress:newProgress,
status,
actualTime:status==='completed'newDate().toLocaleTimeString('vi-VN'):undefined
});

const task=tasks.find(t=>t.id===taskId);
toast({
title:"Cậpnhậttiếnđộ",
description:`Đãcậpnhậttiếnđộ${task.component}:${newProgress}%`
});
};

const handleAddProgressNote=(taskId))=>{
if(!progressUpdate.trim())return;

const task=tasks.find(t=>t.id===taskId);
const updatedNotes=task.notes`${task.notes}\n\n[${newDate().toLocaleString('vi-VN')}]${progressUpdate}`:progressUpdate;

onTaskUpdate(taskId,{notes:updatedNotes});
setProgressUpdate('');
setSelectedTask(null);

toast({
title:"Đãthêmghichú",
description:"Ghichútiếnđộđãđượccậpnhật."
});
};

const canCompleteWork=()=>{
returnisMainTechnician&&tasks.every(task=>task.status==='completed');
};

const overallProgress=tasks.length>0
Math.round(tasks.reduce((sum,task)=>sum+task.progress,0)/tasks.length):0;

const completedTasks=tasks.filter(task=>task.status==='completed').length;

return(
<divclassName="fixedinset-0bg-black/50flexitems-centerjustify-centerp-4z-50">
<CardclassName="w-fullmax-w-5xlmax-h-[90vh]overflow-hidden">
<CardHeader>
<CardTitleclassName="flexitems-centergap-2">
<WrenchclassName="h-5w-5text-primary"/>
Tiếnđộcôngviệc-Yêucầu#{claimId}
</CardTitle>
<CardDescription>
{isMainTechnician'Theodõivàquảnlýtiếnđộcáccôngviệcbảohành':'Cậpnhậttiếnđộcôngviệcđượcphâncông'}
</CardDescription>
</CardHeader>

<CardContentclassName="overflow-y-automax-h-[calc(90vh-200px)]space-y-6">
{/*OverallProgress*/}
<CardclassName="border-primary/20bg-primary/5">
<CardHeader>
<CardTitleclassName="text-base">Tổngquantiếnđộ</CardTitle>
</CardHeader>
<CardContent>
<divclassName="space-y-4">
<div>
<divclassName="flexjustify-betweenmb-2">
<spanclassName="text-smfont-medium">Tiếnđộtổngthể</span>
<spanclassName="text-smfont-medium">{overallProgress}%</span>
</div>
<Progressvalue={overallProgress}className="h-3"/>
</div>
<divclassName="gridgrid-cols-3gap-4text-center">
<div>
<pclassName="text-2xlfont-boldtext-blue-600">{tasks.length}</p>
<pclassName="text-smtext-muted-foreground">Tổngcôngviệc</p>
</div>
<div>
<pclassName="text-2xlfont-boldtext-green-600">{completedTasks}</p>
<pclassName="text-smtext-muted-foreground">Hoànthành</p>
</div>
<div>
<pclassName="text-2xlfont-boldtext-yellow-600">{tasks.length-completedTasks}</p>
<pclassName="text-smtext-muted-foreground">Cònlại</p>
</div>
</div>
</div>
</CardContent>
</Card>

{/*TaskList*/}
<divclassName="space-y-4">
<h3className="font-semibold">Danhsáchcôngviệc</h3>
{tasks.map((task)=>(
<Cardkey={task.id}className={`transition-all${
selectedTask===task.id'border-primary':''
}`}>
<CardHeader>
<divclassName="flexitems-startjustify-between">
<div>
<CardTitleclassName="text-base">{task.component}</CardTitle>
<CardDescription>{task.description}</CardDescription>
</div>
{getStatusBadge(task.status)}
</div>
</CardHeader>
<CardContentclassName="space-y-4">
<divclassName="gridmd:grid-cols-2gap-4text-sm">
<div>
<p><strong>Phâncông:</strong>{task.assignedTo}</p>
<p><strong>Thờigianướctính:</strong>{task.estimatedTime}</p>
{task.actualTime&&(
<p><strong>Thờigianthựctế:</strong>{task.actualTime}</p>
)}
</div>
<div>
<divclassName="flexjustify-betweenmb-1">
<span>Tiếnđộ</span>
<span>{task.progress}%</span>
</div>
<Progressvalue={task.progress}className="h-2"/>
</div>
</div>

{/*ProgressControls-Onlyforassignedtechnicianormaintech*/}
{(task.assignedTo===userRole||isMainTechnician)&&task.status!=='completed'&&(
<divclassName="flexgap-2">
<Button
size="sm"
variant="outline"
onClick={()=>handleTaskProgress(task.id,25,'in_progress')}
disabled={task.progress>=25}
>
25%
</Button>
<Button
size="sm"
variant="outline"
onClick={()=>handleTaskProgress(task.id,50,'in_progress')}
disabled={task.progress>=50}
>
50%
</Button>
<Button
size="sm"
variant="outline"
onClick={()=>handleTaskProgress(task.id,75,'in_progress')}
disabled={task.progress>=75}
>
75%
</Button>
<Button
size="sm"
variant="default"
onClick={()=>handleTaskProgress(task.id,100,'completed')}
disabled={task.progress>=100}
>
<CheckCircleclassName="h-3w-3mr-1"/>
Hoànthành
</Button>
</div>
)}

{/*TaskNotes*/}
{task.notes&&(
<divclassName="bg-accent/20p-3rounded">
<h5className="font-mediummb-2">Ghichúcôngviệc:</h5>
<pclassName="text-smwhitespace-pre-wrap">{task.notes}</p>
</div>
)}

{/*AddProgressNote*/}
{(task.assignedTo===userRole||isMainTechnician)&&(
<divclassName="space-y-2">
<divclassName="flexgap-2">
<Button
size="sm"
variant="outline"
onClick={()=>setSelectedTask(selectedTask===task.idnull:task.id)}
>
<FileTextclassName="h-3w-3mr-1"/>
Thêmghichú
</Button>
<Buttonsize="sm"variant="outline">
<CameraclassName="h-3w-3mr-1"/>
Chụpảnh
</Button>
</div>

{selectedTask===task.id&&(
<divclassName="space-y-2">
<Textarea
placeholder="Nhậpghichútiếnđộ..."
value={progressUpdate}
onChange={(e)=>setProgressUpdate(e.target.value)}
className="text-sm"
/>
<divclassName="flexgap-2">
<Button
size="sm"
onClick={()=>handleAddProgressNote(task.id)}
disabled={!progressUpdate.trim()}
>
Lưughichú
</Button>
<Button
size="sm"
variant="outline"
onClick={()=>{
setSelectedTask(null);
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
<CardclassName="border-green-200bg-green-50">
<CardHeader>
<CardTitleclassName="text-basetext-green-800">Nghiệmthucuốicùng(Kỹthuậtviênchính)</CardTitle>
</CardHeader>
<CardContentclassName="space-y-4">
<div>
<LabelhtmlFor="final-notes">Ghichúnghiệmthu</Label>
<Textarea
id="final-notes"
placeholder="Nhậpghichútổngkếtvànghiệmthucôngviệc..."
value={workNotes}
onChange={(e)=>setWorkNotes(e.target.value)}
className="mt-1"
/>
</div>

{canCompleteWork()(
<divclassName="p-3bg-green-100borderborder-green-200rounded">
<pclassName="text-green-800font-mediummb-2">
✓Tấtcảcôngviệcđãhoànthành.Sẵnsàngnghiệmthu.
</p>
<Button
className="bg-green-600hover:bg-green-700"
onClick={onCompleteWork}
>
<CheckCircleclassName="h-4w-4mr-2"/>
Xácnhậnhoànthành&Nghiệmthu
</Button>
</div>
):(
<divclassName="p-3bg-yellow-100borderborder-yellow-200rounded">
<pclassName="text-yellow-800">
⏳Chờtấtcảkỹthuậtviênhoànthànhcôngviệcđểnghiệmthu.
</p>
</div>
)}
</CardContent>
</Card>
)}

<divclassName="flexjustify-betweenpt-4border-t">
<Buttonvariant="outline"onClick={onClose}>
Đóng
</Button>
<divclassName="text-smtext-muted-foreground">
Cậpnhậtlầncuối:{newDate().toLocaleString('vi-VN')}
</div>
</div>
</CardContent>
</Card>
</div>
);
};

exportdefaultTechnicianWorkProgress;