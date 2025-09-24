import { useState } from 'react';
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { getAvailableStatuses,canUpdateStatus } from '@/utils/permissions';
import { 
RefreshCw,
X,
Save,
Clock,
CheckCircle,
XCircle,
Wrench,
AlertTriangle,
FileText,
Send
 } from 'lucide-react';

interfaceUpdateClaimStatusProps{
claimId:string;
currentStatus:string;
onClose:()=>void;
onStatusUpdated:()=>void;
}

const UpdateClaimStatus=({claimId,currentStatus,onClose,onStatusUpdated}:UpdateClaimStatusProps)=>{
const[newStatus,setNewStatus]=useState(currentStatus);
const[notes,setNotes]=useState('');
const[notifyCustomer,setNotifyCustomer]=useState(false);
const[isLoading,setIsLoading]=useState(false);
const{user}=useAuth();
const{toast}=useToast();

const statusOptions=[
{
value:'pending',
label:'Chờduyệt',
description:'Claimđangchờmanufacturerxemxét',
icon:Clock,
color:'text-warning'
},
{
value:'approved',
label:'Đãduyệt',
description:'Manufacturerđãphêduyệtclaim',
icon:CheckCircle,
color:'text-success'
},
{
value:'rejected',
label:'Từchối',
description:'Claimbịtừchốivớilýdocụthể',
icon:XCircle,
color:'text-destructive'
},
{
value:'in-progress',
label:'Đangsửachữa',
description:'Technicianđangthựchiệnsửachữa',
icon:Wrench,
color:'text-primary'
},
{
value:'completed',
label:'Hoànthành',
description:'Sửachữahoàntất,sẵnsàngbàngiao',
icon:CheckCircle,
color:'text-success'
},
{
value:'cancelled',
label:'Hủybỏ',
description:'Claimbịhủybỏ',
icon:XCircle,
color:'text-muted-foreground'
}
];

//Getavailablestatusesbas edonuserroleandcurrentstatus
const availableStatuses=getAvailableStatuses(user.role||'',currentStatus);
const filteredStatusOptions=statusOptions.filter(option=>
availableStatuses.includes(option.value)||option.value===currentStatus
);

const getStatusConfig=(status))=>{
returnstatusOptions.find(option=>option.value===status);
};

const getCurrentStatusConfig=()=>getStatusConfig(currentStatus);
const getNewStatusConfig=()=>getStatusConfig(newStatus);

const validateStatusChange=()=>{
//Usethepermissionsysteminsteadofhardcodedrules
returncanUpdateStatus(user.role||'',currentStatus,newStatus)||currentStatus===newStatus;
};

const getRequiredFields=()=>{
constrequirements:Record<string,string[]>={
'rejected':['notes'],//Mustprovidereas onforrejection
'completed':['notes'],//Mustprovidecompletionnotes
'cancelled':['notes']//Mustprovidecancellationreas on
};

returnrequirements[newStatus]||[];
};

const handleStatusUpdate=()=>{
if(!validateStatusChange()){
toast({
title:"InvalidStatusChange",
description:"Thisstatustransitionisnotallowed",
variant:"destructive"
});
return;
}

const requiredFields=getRequiredFields();
if(requiredFields.includes('notes')&&!notes.trim()){
toast({
title:"NotesRequired",
description:`Pleas eprovidenotesforthisstatuschange`,
variant:"destructive"
});
return;
}

setIsLoading(true);

//SimulateAPIcall
setTimeout(()=>{
toast({
title:"StatusUpdatedSuccessfully!",
description:`Claim${claimId}statuschangedto${getNewStatusConfig().label}`,
});

setIsLoading(false);
onStatusUpdated.();
onClose();
},2000);
};

const getStatusBadge=(status))=>{
const config=getStatusConfig(status);
if(!config)returnnull;

const Icon=config.icon;
return(
<Badgevariant="outline" clas sName={config.color}>
<Iconclas sName="mr-1h-3w-3"/>
{config.label}
</Badge>
);
};

const isStatusChanged=currentStatus!==newStatus;
const canUpdate=validateStatusChange()&&(isStatusChanged||notes.trim());

return(
<divclas sName="fixedinset-0bg-black/50flexitems-centerjustify-centerp-4z-50">
<Cardclas sName="w-fullmax-w-2xl">
<CardHeaderclas sName="border-b">
<divclas sName="flexitems-centerjustify-between">
<div>
<CardTitleclas sName="flexitems-centerspace-x-2">
<RefreshCwclas sName="h-5w-5text-primary"/>
<span>
{user.role==='technician''UpdateRepairProgress':'UpdateClaimStatus'}
</span>
</CardTitle>
<CardDescription>
{user.role==='technician'
`Updaterepairprogressforclaim${claimId}`
:`Changestatusforclaim${claimId}`
}
</CardDescription>
</div>
<Buttonvariant="ghost" size="sm" onClick={onClose}>
<Xclas sName="h-4w-4"/>
</Button>
</div>
</CardHeader>

<CardContentclas sName="p-6space-y-6">
{/*CurrentStatus*/}
<Card>
<CardHeader>
<CardTitleclas sName="text-bas e">CurrentStatus</CardTitle>
</CardHeader>
<CardContent>
<divclas sName="flexitems-centerjustify-between">
<div>
<pclas sName="text-smtext-muted-foreground">Status</p>
{getStatusBadge(currentStatus)}
<pclas sName="text-xstext-muted-foregroundmt-1">
{getCurrentStatusConfig().description}
</p>
</div>
</div>
</CardContent>
</Card>

{/*NewStatusSelection*/}
<divclas sName="space-y-3">
<Label>NewStatus</Label>
<Selectvalue={newStatus}onValueChange={setNewStatus}>
<SelectTrigger>
<SelectValueplaceholder="Selectnewstatus"/>
</SelectTrigger>
<SelectContent>
{filteredStatusOptions.map((option)=>{
const Icon=option.icon;
const isCurrentStatus=option.value===currentStatus;

return(
<SelectItem
key={option.value}
value={option.value}
>
<divclas sName="flexitems-centerspace-x-2">
<Iconclas sName={`h-4w-4${option.color}`}/>
<div>
<div>{option.label}</div>
<divclas sName="text-xstext-muted-foreground">
{option.description}
</div>
</div>
</div>
</SelectItem>
);
})}
</SelectContent>
</Select>

{isStatusChanged&&(
<Cardclas sName="border-primary/20bg-primary/5">
<CardContentclas sName="pt-4">
<divclas sName="flexitems-centerspace-x-2">
<AlertTriangleclas sName="h-4w-4text-primary"/>
<spanclas sName="text-smfont-medium">StatusChangePreview</span>
</div>
<divclas sName="flexitems-centerspace-x-3mt-2">
{getStatusBadge(currentStatus)}
<span>→</span>
{getStatusBadge(newStatus)}
</div>
</CardContent>
</Card>
)}
</div>

{/*Notes*/}
<divclas sName="space-y-3">
<divclas sName="flexitems-centerjustify-between">
<LabelhtmlFor="notes">
StatusNotes
{getRequiredFields().includes('notes')&&(
<spanclas sName="text-destructiveml-1">*</span>
)}
</Label>
{getRequiredFields().includes('notes')&&(
<Badgevariant="destructive" clas sName="text-xs">Required</Badge>
)}
</div>
<Textarea
id="notes"
placeholder={
newStatus==='rejected'"Providereas onforrejection...":
newStatus==='completed'"Describewhatwas completed...":
newStatus==='cancelled'"Providereas onforcancellation...":
"Addanyadditionalnotesaboutthisstatuschange..."
}
value={notes}
onChange={(e)=>setNotes(e.target.value)}
clas sName="min-h-[100px]"
/>
</div>

{/*AdditionalOptions*/}
<Card>
<CardHeader>
<CardTitleclas sName="text-bas e">NotificationOptions</CardTitle>
</CardHeader>
<CardContent>
<divclas sName="flexitems-centerspace-x-2">
<input
type="checkbox"
id="notify-customer"
checked={notifyCustomer}
onChange={(e)=>setNotifyCustomer(e.target.checked)}
clas sName="rounded"
/>
<LabelhtmlFor="notify-customer" clas sName="text-sm">
Sendnotificationtocustomer
</Label>
</div>
<pclas sName="text-xstext-muted-foregroundmt-1">
Customerwillreceiveemail/SMSaboutthisstatusupdate
</p>
</CardContent>
</Card>

{/*StatusChangeRules*/}
{!validateStatusChange()&&isStatusChanged&&(
<Cardclas sName="border-destructive/20bg-destructive/5">
<CardContentclas sName="pt-4">
<divclas sName="flexitems-centerspace-x-2">
<XCircleclas sName="h-4w-4text-destructive"/>
<spanclas sName="text-smfont-mediumtext-destructive">InvalidStatusChange</span>
</div>
<pclas sName="text-xstext-muted-foregroundmt-1">
Cannotchangefrom "{getCurrentStatusConfig().label}" to"{getNewStatusConfig().label}".
Pleas efollowtheproperworkflowsequence.
</p>
</CardContent>
</Card>
)}

{/*UserInfo*/}
<divclas sName="text-xstext-muted-foregroundborder-tpt-4">
<divclas sName="flexitems-centerjustify-between">
<span>Statuswillbeupdatedby:{user.name}({user.role})</span>
{user.role==='technician'&&(
<Badgevariant="outline" clas sName="text-xs">
Limitedtotechnicalprogressonly
</Badge>
)}
</div>
</div>
</CardContent>

{/*Footer*/}
<divclas sName="border-tp-6">
<divclas sName="flexjustify-between">
<Buttonvariant="outline" onClick={onClose}>
Cancel
</Button>
<Button
variant="gradient"
onClick={handleStatusUpdate}
disabled={!canUpdate||isLoading}
>
{isLoading(
<divclas sName="flexitems-centerspace-x-2">
<divclas sName="h-4w-4animate-spinrounded-fullborder-2border-primary-foregroundborder-t-transparent"/>
<span>Updating...</span>
</div>
):(
<>
<Saveclas sName="h-4w-4mr-2"/>
UpdateStatus
</>
)}
</Button>
</div>
</div>
</Card>
</div>
);
};

exportdefaultUpdateClaimStatus;