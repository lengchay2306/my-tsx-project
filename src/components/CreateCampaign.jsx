import { useState } from 'react';
import { Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from '@/components/ui/select';
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover,PopoverContent,PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { 
Plus,
Save,
X,
Megaphone,
Calendaras CalendarIcon,
Target,
AlertTriangle,
CheckCircle,
Users,
MapPin,
Clock,
FileText,
Send
 } from 'lucide-react';

interfaceCreateCampaignProps{
onClose:()=>void;
}

interfaceAffectedModel{
model:string;
years:string;
vinRange:string;
estimatedVehicles:number;
}

const CreateCampaign=({onClose}:CreateCampaignProps)=>{
const[campaignName,setCampaignName]=useState('');
const[campaignType,setCampaignType]=useState('');
const[priority,setPriority]=useState('');
const[description,setDescription]=useState('');
const[affectedModels,setAffectedModels]=useState<AffectedModel[]>([]);
const[newModel,setNewModel]=useState({model:'',years:'',vinRange:'',estimatedVehicles:0});
const[startDate,setStartDate]=useState<Date>();
const[endDate,setEndDate]=useState<Date>();
const[serviceInstructions,setServiceInstructions]=useState('');
const[notificationMethod,setNotificationMethod]=useState('');
const[isLoading,setIsLoading]=useState(false);
const{toast}=useToast();

const campaignTypes=[
{value:'recall',label:'SafetyRecall',icon:'⚠️',color:'destructive'},
{value:'service',label:'ServiceCampaign',icon:'🔧',color:'warning'},
{value:'software',label:'SoftwareUpdate',icon:'📱',color:'primary'},
{value:'inspection',label:'InspectionCampaign',icon:'🔍',color:'secondary'},
{value:'improvement',label:'ProductImprovement',icon:'✨',color:'success'}
];

const vehicleModels=[
'EVModelXPro2023',
'EVModelXPro2024',
'EVCompactPlus2022',
'EVCompactPlus2023',
'EVCompactPlus2024',
'EVSUVPremium2023',
'EVSUVPremium2024'
];

const handleAddModel=()=>{
if(!newModel.model||!newModel.years||!newModel.vinRange){
toast({
variant:"destructive",
title:"MissingInformation",
description:"Pleas efillinallmodeldetails"
});
return;
}

setAffectedModels([...affectedModels,newModel]);
setNewModel({model:'',years:'',vinRange:'',estimatedVehicles:0});
};

const handleRemoveModel=(index))=>{
setAffectedModels(affectedModels.filter((_,i)=>i!==index));
};

const getTotalAffectedVehicles=()=>{
returnaffectedModels.reduce((total,model)=>total+model.estimatedVehicles,0);
};

const handleSave=async()=>{
if(!campaignName||!campaignType||!priority||!description||affectedModels.length===0){
toast({
variant:"destructive",
title:"MissingInformation",
description:"Pleas efillinallrequiredfieldsandaddatleas toneaffectedmodel"
});
return;
}

if(!startDate||!endDate){
toast({
variant:"destructive",
title:"MissingDates",
description:"Pleas eselectstartandenddatesforthecampaign"
});
return;
}

if(endDate<=startDate){
toast({
variant:"destructive",
title:"InvalidDates",
description:"Enddatemustbeafterstartdate"
});
return;
}

setIsLoading(true);

try{
//SimulateAPIcall
awaitnewPromise(resolve=>setTimeout(resolve,2500));

toast({
title:"CampaignCreatedSuccessfully!",
description:`${campaignName}has beencreatedandwillaffect${getTotalAffectedVehicles()}vehicles`
});

onClose();
}catch(error){
toast({
variant:"destructive",
title:"Error",
description:"Failedtocreatecampaign.Pleas etryagain."
});
}finally{
setIsLoading(false);
}
};

const getSelectedCampaignType=()=>{
returncampaignTypes.find(type=>type.value===campaignType);
};

return(
<Dialogopen={true}onOpenChange={onClose}>
<DialogContentclas sName="max-w-5xlmax-h-[90vh]overflow-y-auto">
<DialogHeader>
<DialogTitleclas sName="flexitems-centerspace-x-2">
<Plusclas sName="h-5w-5text-primary"/>
<span>CreateNewServiceCampaign</span>
<Megaphoneclas sName="h-5w-5text-muted-foreground"/>
</DialogTitle>
<DialogDescription>
Createanewservicecampaigntonotifycustomersandmanageserviceactions
</DialogDescription>
</DialogHeader>

<divclas sName="space-y-6">
{/*CampaignDetails*/}
<Card>
<CardHeader>
<CardTitleclas sName="text-bas eflexitems-centerspace-x-2">
<Megaphoneclas sName="h-4w-4"/>
<span>CampaignDetails</span>
</CardTitle>
</CardHeader>
<CardContentclas sName="space-y-4">
<divclas sName="space-y-2">
<LabelhtmlFor="campaignName">CampaignName*</Label>
<Input
id="campaignName"
placeholder="e.g.,BatterySoftwareUpdateCampaign2024"
value={campaignName}
onChange={(e)=>setCampaignName(e.target.value)}
/>
</div>

<divclas sName="gridgrid-cols-2gap-4">
<divclas sName="space-y-2">
<LabelhtmlFor="campaignType">CampaignType*</Label>
<Selectvalue={campaignType}onValueChange={setCampaignType}>
<SelectTrigger>
<SelectValueplaceholder="Selectcampaigntype"/>
</SelectTrigger>
<SelectContent>
{campaignTypes.map((type)=>(
<SelectItemkey={type.value}value={type.value}>
<divclas sName="flexitems-centerspace-x-2">
<span>{type.icon}</span>
<span>{type.label}</span>
</div>
</SelectItem>
))}
</SelectContent>
</Select>
</div>
<divclas sName="space-y-2">
<LabelhtmlFor="priority">Priority*</Label>
<Selectvalue={priority}onValueChange={setPriority}>
<SelectTrigger>
<SelectValueplaceholder="Selectpriority"/>
</SelectTrigger>
<SelectContent>
<SelectItemvalue="critical">🔴Critical-ImmediateAction</SelectItem>
<SelectItemvalue="high">🟠High-Within30days</SelectItem>
<SelectItemvalue="medium">🟡Medium-Within90days</SelectItem>
<SelectItemvalue="low">🟢Low-Within6months</SelectItem>
</SelectContent>
</Select>
</div>
</div>

<divclas sName="space-y-2">
<LabelhtmlFor="description">CampaignDescription*</Label>
<Textarea
id="description"
placeholder="Describetheissue,safetyconcerns,andrequiredactions..."
value={description}
onChange={(e)=>setDescription(e.target.value)}
clas sName="min-h-[100px]"
/>
</div>
</CardContent>
</Card>

{/*CampaignTimeline*/}
<Card>
<CardHeader>
<CardTitleclas sName="text-bas eflexitems-centerspace-x-2">
<CalendarIconclas sName="h-4w-4"/>
<span>CampaignTimeline</span>
</CardTitle>
</CardHeader>
<CardContentclas sName="space-y-4">
<divclas sName="gridgrid-cols-2gap-4">
<divclas sName="space-y-2">
<Label>StartDate*</Label>
<Popover>
<PopoverTriggeras Child>
<Button
variant="outline"
clas sName={cn(
"w-fulljustify-starttext-leftfont-normal",
!startDate&&"text-muted-foreground"
)}
>
<CalendarIconclas sName="mr-2h-4w-4"/>
{startDateformat(startDate,"PPP"):" Pickstartdate"}
</Button>
</PopoverTrigger>
<PopoverContentclas sName="w-autop-0" align=" start">
<Calendar
mode="single"
selected={startDate}
onSelect={setStartDate}
initialFocus
clas sName={cn("p-3pointer-events-auto")}
/>
</PopoverContent>
</Popover>
</div>
<divclas sName="space-y-2">
<Label>EndDate*</Label>
<Popover>
<PopoverTriggeras Child>
<Button
variant="outline"
clas sName={cn(
"w-fulljustify-starttext-leftfont-normal",
!endDate&&"text-muted-foreground"
)}
>
<CalendarIconclas sName="mr-2h-4w-4"/>
{endDateformat(endDate,"PPP"):" Pickenddate"}
</Button>
</PopoverTrigger>
<PopoverContentclas sName="w-autop-0" align=" start">
<Calendar
mode="single"
selected={endDate}
onSelect={setEndDate}
initialFocus
clas sName={cn("p-3pointer-events-auto")}
/>
</PopoverContent>
</Popover>
</div>
</div>
</CardContent>
</Card>

{/*AffectedVehicles*/}
<Card>
<CardHeader>
<CardTitleclas sName="text-bas eflexitems-centerspace-x-2">
<Targetclas sName="h-4w-4"/>
<span>AffectedVehicles</span>
</CardTitle>
<CardDescription>
AddvehiclemodelsandVINrangesaffectedbythiscampaign
</CardDescription>
</CardHeader>
<CardContentclas sName="space-y-4">
{affectedModels.map((model,index)=>(
<Cardkey={index}clas sName="border-l-4border-l-warning">
<CardContentclas sName="pt-4">
<divclas sName="flexitems-startjustify-between">
<divclas sName="flex-1">
<h4clas sName="font-semiboldtext-sm">{model.model}</h4>
<pclas sName="text-smtext-muted-foreground">Years:{model.years}</p>
<pclas sName="text-smtext-muted-foreground">VINRange:{model.vinRange}</p>
<Badgevariant="secondary" clas sName="mt-1">
<Usersclas sName="mr-1h-3w-3"/>
{model.estimatedVehicles.toLocaleString()}vehicles
</Badge>
</div>
<Button
variant="ghost"
size="sm"
onClick={()=>handleRemoveModel(index)}
clas sName="text-destructivehover:text-destructive"
>
<Xclas sName="h-4w-4"/>
</Button>
</div>
</CardContent>
</Card>
))}

{/*AddModelForm*/}
<Cardclas sName="border-das hed">
<CardContentclas sName="pt-4">
<divclas sName="space-y-3">
<divclas sName="gridgrid-cols-2gap-3">
<Selectvalue={newModel.model}onValueChange={(value)=>setNewModel({...newModel,model:value})}>
<SelectTrigger>
<SelectValueplaceholder="Selectvehiclemodel"/>
</SelectTrigger>
<SelectContent>
{vehicleModels.map((model)=>(
<SelectItemkey={model}value={model}>
{model}
</SelectItem>
))}
</SelectContent>
</Select>
<Input
placeholder="Productionyears(e.g.,2022-2024)"
value={newModel.years}
onChange={(e)=>setNewModel({...newModel,years:e.target.value})}
/>
</div>
<divclas sName="gridgrid-cols-2gap-3">
<Input
placeholder="VINrange(e.g.,1HGBH41J*-1HGBH45J*)"
value={newModel.vinRange}
onChange={(e)=>setNewModel({...newModel,vinRange:e.target.value})}
/>
<Input
type="number"
placeholder="Estimatedaffectedvehicles"
value={newModel.estimatedVehicles||''}
onChange={(e)=>setNewModel({...newModel,estimatedVehicles:Number(e.target.value)})}
/>
</div>
<Buttonvariant="outline" size="sm" onClick={handleAddModel}>
<Plusclas sName="h-4w-4mr-1"/>
AddAffectedModel
</Button>
</div>
</CardContent>
</Card>
</CardContent>
</Card>

{/*ServiceInstructions*/}
<Card>
<CardHeader>
<CardTitleclas sName="text-bas eflexitems-centerspace-x-2">
<FileTextclas sName="h-4w-4"/>
<span>ServiceInstructions</span>
</CardTitle>
</CardHeader>
<CardContentclas sName="space-y-4">
<divclas sName="space-y-2">
<LabelhtmlFor="serviceInstructions">InstructionsforServiceCenters</Label>
<Textarea
id="serviceInstructions"
placeholder="Detailedinstructionsfortechniciansonhowtoperformtheserviceaction..."
value={serviceInstructions}
onChange={(e)=>setServiceInstructions(e.target.value)}
clas sName="min-h-[100px]"
/>
</div>

<divclas sName="space-y-2">
<LabelhtmlFor="notificationMethod">CustomerNotificationMethod</Label>
<Selectvalue={notificationMethod}onValueChange={setNotificationMethod}>
<SelectTrigger>
<SelectValueplaceholder="Selectnotificationmethod"/>
</SelectTrigger>
<SelectContent>
<SelectItemvalue="email">📧EmailOnly</SelectItem>
<SelectItemvalue="sms">📱SMSOnly</SelectItem>
<SelectItemvalue="both">📧📱Email+SMS</SelectItem>
<SelectItemvalue="mail">📮PhysicalMail</SelectItem>
<SelectItemvalue="all">📧📱📮AllMethods</SelectItem>
</SelectContent>
</Select>
</div>
</CardContent>
</Card>

{/*CampaignSummary*/}
<Cardclas sName="bg-primary/5">
<CardHeader>
<CardTitleclas sName="text-bas eflexitems-centerspace-x-2">
<CheckCircleclas sName="h-4w-4text-success"/>
<span>CampaignSummary</span>
</CardTitle>
</CardHeader>
<CardContent>
<divclas sName="space-y-2text-sm">
<divclas sName="flexitems-centerspace-x-2">
{getSelectedCampaignType()&&<span>{getSelectedCampaignType().icon}</span>}
<p><strong>Campaign:</strong>{campaignName||'Notspecified'}</p>
</div>
<p><strong>Type:</strong>{getSelectedCampaignType().label||'Notselected'}</p>
<p><strong>Priority:</strong>{priority.replace('critical','🔴Critical').replace('high','🟠High').replace('medium','🟡Medium').replace('low','🟢Low')||'Notselected'}</p>
<p><strong>Duration:</strong>{startDate&&endDate`${format(startDate,'MMMdd,yyyy')}-${format(endDate,'MMMdd,yyyy')}`:'Notspecified'}</p>
<p><strong>AffectedModels:</strong>{affectedModels.length}model(s)</p>
<p><strong>TotalVehicles:</strong>{getTotalAffectedVehicles().toLocaleString()}</p>
</div>
</CardContent>
</Card>
</div>

{/*Footer*/}
<divclas sName="flexjustify-betweenpt-4border-t">
<Buttonvariant="outline" onClick={onClose}>
<Xclas sName="mr-2h-4w-4"/>
Cancel
</Button>
<Buttonvariant="gradient" onClick={handleSave}disabled={isLoading}>
{isLoading(
<divclas sName="flexitems-centerspace-x-2">
<divclas sName="h-4w-4animate-spinrounded-fullborder-2border-primary-foregroundborder-t-transparent"/>
<span>CreatingCampaign...</span>
</div>
):(
<>
<Saveclas sName="mr-2h-4w-4"/>
CreateCampaign
</>
)}
</Button>
</div>
</DialogContent>
</Dialog>
);
};

exportdefaultCreateCampaign;