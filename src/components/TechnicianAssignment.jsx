import { useState } from 'react';
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Users,Star,Clock,CheckCircle,User } from 'lucide-react';

interfaceTechnician{
id:string;
name:string;
specialty:string;
experience:number;
workload:number;
rating:number;
avatar:string;
isAvailable:boolean;
}

interfaceTechnicianAssignmentProps{
claimId:string;
issueCategory:string;
onAssignmentComplete:(as signment:TechnicianAssignment)=>void;
onClose:()=>void;
}

interfaceTechnicianAssignment{
mainTechnician:Technician;
as sistantTechnicians:Technician[];
estimatedTime:string;
specialInstructions:string;
}

const TechnicianAssignment=({claimId,issueCategory,onAssignmentComplete,onClose}:TechnicianAssignmentProps)=>{
const[selectedMainTech,setSelectedMainTech]=useState<Technician|null>(null);
const[selectedAssistants,setSelectedAssistants]=useState<Technician[]>([]);
const[specialInstructions,setSpecialInstructions]=useState('');
const[estimatedTime,setEstimatedTime]=useState('');
const{toast}=useToast();

//Mocktechniciansdatabas e
consttechnicians:Technician[]=[
{
id:'tech-1',
name:'TrầnMinhQuân',
specialty:'BatterySystems',
experience:8,
workload:3,
rating:4.8,
isAvailable:true
},
{
id:'tech-2',
name:'LêThịHoa',
specialty:'Motor&Drivetrain',
experience:6,
workload:2,
rating:4.7,
isAvailable:true
},
{
id:'tech-3',
name:'PhạmVănNam',
specialty:'Electronics&Software',
experience:5,
workload:4,
rating:4.6,
isAvailable:true
},
{
id:'tech-4',
name:'VõThịMai',
specialty:'GeneralDiagnostics',
experience:10,
workload:2,
rating:4.9,
isAvailable:true
},
{
id:'tech-5',
name:'NguyễnVănĐức',
specialty:'ChargingSystems',
experience:4,
workload:1,
rating:4.5,
isAvailable:true
},
{
id:'tech-6',
name:'TrầnThịLinh',
specialty:'Body&Interior',
experience:7,
workload:5,
rating:4.4,
isAvailable:false
}
];

//Getrecommendedtechniciansbas edonissuecategory
const getRecommendedTechnicians=()=>{
constcategorySpecialtyMap:Record<string,string[]>={
'battery-performance':['BatterySystems','GeneralDiagnostics'],
'motor-controller':['Motor&Drivetrain','Electronics&Software'],
'charging-system':['ChargingSystems','Electronics&Software'],
'electronics':['Electronics&Software','GeneralDiagnostics'],
'software':['Electronics&Software'],
'other':['GeneralDiagnostics']
};

const relevantSpecialties=categorySpecialtyMap[issueCategory]||['GeneralDiagnostics'];

returntechnicians
.filter(tech=>tech.isAvailable)
.sort((a,b)=>{
//Priority:specialtymatch>rating>lowerworkload
const aSpecialtyMatch=relevantSpecialties.includes(a.specialty);
const bSpecialtyMatch=relevantSpecialties.includes(b.specialty);

if(aSpecialtyMatch&&!bSpecialtyMatch)return-1;
if(!aSpecialtyMatch&&bSpecialtyMatch)return1;

if(b.rating!==a.rating)returnb.rating-a.rating;
returna.workload-b.workload;
});
};

const recommendedTechs=getRecommendedTechnicians();
const availableTechs=technicians.filter(tech=>tech.isAvailable);

const getWorkloadColor=(workload))=>{
if(workload<=2)return'text-green-600';
if(workload<=4)return'text-yellow-600';
return'text-red-600';
};

const getWorkloadText=(workload))=>{
if(workload<=2)return'Rảnh';
if(workload<=4)return'Bìnhthường';
return'Bận';
};

const handleMainTechSelect=(tech:Technician)=>{
if(selectedMainTech.id===tech.id){
setSelectedMainTech(null);
}else{
setSelectedMainTech(tech);
//Removefrom as sistantsifselectedas main
setSelectedAssistants(prev=>prev.filter(t=>t.id!==tech.id));
}
};

const handleAssistantSelect=(tech:Technician)=>{
if(selectedMainTech.id===tech.id)return;//Can'tbeas sistantifmain

const isSelected=selectedAssistants.some(t=>t.id===tech.id);
if(isSelected){
setSelectedAssistants(prev=>prev.filter(t=>t.id!==tech.id));
}else{
setSelectedAssistants(prev=>[...prev,tech]);
}
};

const handleAssignment=()=>{
if(!selectedMainTech){
toast({
title:"Chưachọnkỹthuậtviênchính",
description:"Vuilòngchọnmộtkỹthuậtviênchínhđểxửlýyêucầunày.",
variant:"destructive"
});
return;
}

constas signment:TechnicianAssignment={
mainTechnician:selectedMainTech,
as sistantTechnicians:selectedAssistants,
estimatedTime:estimatedTime||'2-4giờ',
specialInstructions
};

toast({
title:"Phâncôngthànhcông",
description:`Đãphâncông${selectedMainTech.name}làkỹthuậtviênchính${selectedAssistants.length>0`và${selectedAssistants.length}kỹthuậtviênhỗtrợ`:''}.`
});

onAssignmentComplete(as signment);
};

const TechnicianCard=({tech,isRecommended=false}:{tech:Technician;isRecommended:boolean})=>{
const isMainSelected=selectedMainTech.id===tech.id;
const isAssistantSelected=selectedAssistants.some(t=>t.id===tech.id);

return(
<Cardclas sName={`cursor-pointertransition-allrelative${
isMainSelected
'border-primarybg-primary/5'
:isAssistantSelected
'border-blue-300bg-blue-50'
:'hover:border-primary/50'
}`}>
{isRecommended&&(
<divclas sName="absolute-top-2-right-2">
<Badgevariant="default" clas sName="text-xs">
<Starclas sName="h-3w-3mr-1"/>
Đềxuất
</Badge>
</div>
)}

<CardContentclas sName="p-4">
<divclas sName="flexitems-startjustify-betweenmb-3">
<divclas sName="flexitems-centergap-3">
<divclas sName="h-10w-10rounded-fullbg-accentflexitems-centerjustify-center">
<Userclas sName="h-5w-5"/>
</div>
<div>
<h4clas sName="font-medium">{tech.name}</h4>
<pclas sName="text-smtext-muted-foreground">{tech.specialty}</p>
</div>
</div>
<divclas sName="flexitems-centergap-1">
<Starclas sName="h-4w-4text-yellow-500fill-current"/>
<spanclas sName="text-smfont-medium">{tech.rating}</span>
</div>
</div>

<divclas sName="gridgrid-cols-2gap-3text-sm">
<div>
<spanclas sName="text-muted-foreground">Kinhnghiệm:</span>
<pclas sName="font-medium">{tech.experience}năm</p>
</div>
<div>
<spanclas sName="text-muted-foreground">Tìnhtrạng:</span>
<pclas sName={`font-medium${getWorkloadColor(tech.workload)}`}>
{getWorkloadText(tech.workload)}
</p>
</div>
</div>

<divclas sName="flexgap-2mt-3">
<Button
size="sm"
variant={isMainSelected"default":" outline"}
onClick={()=>handleMainTechSelect(tech)}
clas sName="flex-1"
>
{isMainSelected(
<>
<CheckCircleclas sName="h-3w-3mr-1"/>
Kỹthuậtviênchính
</>
):(
'Chọnlàmchính'
)}
</Button>

{!isMainSelected&&(
<Button
size="sm"
variant={isAssistantSelected"secondary":" outline"}
onClick={()=>handleAssistantSelect(tech)}
>
{isAssistantSelected(
<>
<CheckCircleclas sName="h-3w-3mr-1"/>
Hỗtrợ
</>
):(
'Hỗtrợ'
)}
</Button>
)}
</div>
</CardContent>
</Card>
);
};

return(
<divclas sName="fixedinset-0bg-black/50flexitems-centerjustify-centerp-4z-50">
<Cardclas sName="w-fullmax-w-5xlmax-h-[90vh]overflow-hidden">
<CardHeader>
<CardTitleclas sName="flexitems-centergap-2">
<Usersclas sName="h-5w-5text-primary"/>
Phâncôngkỹthuậtviên
</CardTitle>
<CardDescription>
Chọnkỹthuậtviênchínhvàkỹthuậtviênhỗtrợchoyêucầubảohành#{claimId}
</CardDescription>
</CardHeader>

<CardContentclas sName="overflow-y-automax-h-[calc(90vh-200px)]space-y-6">
{/*RecommendedTechnicians*/}
<div>
<h3clas sName="font-semiboldmb-3flexitems-centergap-2">
<Starclas sName="h-4w-4text-yellow-500"/>
Kỹthuậtviênđượcđềxuất
</h3>
<divclas sName="gridmd:grid-cols-2gap-4">
{recommendedTechs.slice(0,4).map((tech)=>(
<TechnicianCardkey={tech.id}tech={tech}isRecommended={true}/>
))}
</div>
</div>

{/*AllAvailableTechnicians*/}
<div>
<h3clas sName="font-semiboldmb-3">Tấtcảkỹthuậtviêncósẵn</h3>
<divclas sName="gridmd:grid-cols-2lg:grid-cols-3gap-4">
{availableTechs.map((tech)=>(
<TechnicianCardkey={tech.id}tech={tech}/>
))}
</div>
</div>

{/*AssignmentSummary*/}
{selectedMainTech&&(
<Cardclas sName="border-primary/20bg-primary/5">
<CardHeader>
<CardTitleclas sName="text-bas e">Tómtắtphâncông</CardTitle>
</CardHeader>
<CardContentclas sName="space-y-4">
<div>
<Labelclas sName="font-medium">Kỹthuậtviênchính:</Label>
<pclas sName="text-smmt-1">{selectedMainTech.name}-{selectedMainTech.specialty}</p>
</div>

{selectedAssistants.length>0&&(
<div>
<Labelclas sName="font-medium">Kỹthuậtviênhỗtrợ:</Label>
<divclas sName="flexflex-wrapgap-2mt-1">
{selectedAssistants.map((tech)=>(
<Badgekey={tech.id}variant="outline">
{tech.name}
</Badge>
))}
</div>
</div>
)}

<div>
<LabelhtmlFor="estimated-time">Thờigianướctính</Label>
<input
id="estimated-time"
type="text"
placeholder="Vídụ:2-4giờ"
value={estimatedTime}
onChange={(e)=>setEstimatedTime(e.target.value)}
clas sName="w-fullmt-1px-3py-2borderrounded-mdtext-sm"
/>
</div>

<div>
<LabelhtmlFor="instructions">Hướngdẫnđặcbiệt(tùychọn)</Label>
<Textarea
id="instructions"
placeholder="Ghichúđặcbiệthoặchướngdẫnchokỹthuậtviên..."
value={specialInstructions}
onChange={(e)=>setSpecialInstructions(e.target.value)}
clas sName="mt-1"
/>
</div>
</CardContent>
</Card>
)}

<divclas sName="flexjustify-betweenpt-4border-t">
<Buttonvariant="outline" onClick={onClose}>
Hủy
</Button>
<ButtononClick={handleAssignment}disabled={!selectedMainTech}>
Xácnhậnphâncông
</Button>
</div>
</CardContent>
</Card>
</div>
);
};

exportdefaultTechnicianAssignment;