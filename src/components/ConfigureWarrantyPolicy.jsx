import { useState } from'react';
import { Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle } from'@/components/ui/dialog';
import { Button } from'@/components/ui/button';
import { Input } from'@/components/ui/input';
import { Label } from'@/components/ui/label';
import { Textarea } from'@/components/ui/textarea';
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from'@/components/ui/select';
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from'@/components/ui/card';
import { Badge } from'@/components/ui/badge';
import { useToast } from'@/hooks/use-toast';
import { 
Settings,
Save,
X,
Shield,
Calendar,
MapPin,
AlertTriangle,
CheckCircle,
Plus,
Trash2
 } from'lucide-react';

interfaceConfigureWarrantyPolicyProps{
policyType:string;
onClose:()=>void;
}

interfaceCoverageItem{
id:string;
component:string;
coverage:string;
exclusions:string[];
}

const ConfigureWarrantyPolicy=({policyType,onClose}:ConfigureWarrantyPolicyProps)=>{
const[duration,setDuration]=useState('');
const[mileage,setMileage]=useState('');
const[region,setRegion]=useState('');
const[transferable,setTransferable]=useState('yes');
const[description,setDescription]=useState('');
const[newCoverage,setNewCoverage]=useState({component:'',coverage:'',exclusions:''});
const[isLoading,setIsLoading]=useState(false);
const{toast}=useToast();

const[coverageItems,setCoverageItems]=useState<CoverageItem[]>([
{
id:'1',
component:policyType==='battery''BatteryCells':policyType==='motor''MotorAssembly':'ControlUnits',
coverage:'Fullreplacementformanufacturingdefects',
exclusions:['Physicaldamage','Waterdamage','Modificationdamage']
},
{
id:'2',
component:policyType==='battery''BatteryManagementSystem':policyType==='motor''MotorController':'DisplaySystems',
coverage:'Repairorreplacementasneeded',
exclusions:['Softwaremodifications','Unauthorizedrepairs']
}
]);

const getDefaultValues=()=>{
const defaults={
battery:{duration:'8',mileage:'160000',description:'Comprehensivebatterywarrantycoveringallbattery-relatedcomponents'},
motor:{duration:'5',mileage:'100000',description:'Motoranddrivetrainwarrantycoveringmanufacturingdefects'},
electronics:{duration:'3',mileage:'60000',description:'Electronicsandinfotainmentsystemwarranty'}
};
returndefaults[policyTypeaskeyoftypeofdefaults]||defaults.electronics;
};

useState(()=>{
const defaults=getDefaultValues();
setDuration(defaults.duration);
setMileage(defaults.mileage);
setDescription(defaults.description);
setRegion('vietnam');
});

const handleAddCoverage=()=>{
if(!newCoverage.component||!newCoverage.coverage){
toast({
variant:"destructive",
title:"Error",
description:"Pleasefillincomponentandcoveragedetails"
});
return;
}

const exclusionsList=newCoverage.exclusions.split(',').map(e=>e.trim()).filter(e=>e);

setCoverageItems([...coverageItems,{
id:Date.now().toString(),
component:newCoverage.component,
coverage:newCoverage.coverage,
exclusions:exclusionsList
}]);

setNewCoverage({component:'',coverage:'',exclusions:''});
};

const handleRemoveCoverage=(id))=>{
setCoverageItems(coverageItems.filter(item=>item.id!==id));
};

const handleSave=async()=>{
if(!duration||!mileage){
toast({
variant:"destructive",
title:"Error",
description:"Pleasefillinallrequiredfields"
});
return;
}

setIsLoading(true);

try{
//SimulateAPIcall
awaitnewPromise(resolve=>setTimeout(resolve,2000));

toast({
title:"Success",
description:`${policyType.charAt(0).toUpperCase()+policyType.slice(1)}warrantypolicyupdatedsuccessfully`
});

onClose();
}catch(error){
toast({
variant:"destructive",
title:"Error",
description:"Failedtoupdatewarrantypolicy.Pleasetryagain."
});
}finally{
setIsLoading(false);
}
};

const getPolicyIcon=()=>{
const icons={
battery:'🔋',
motor:'⚡',
electronics:'📱'
};
returnicons[policyTypeaskeyoftypeoficons]||'🛡️';
};

return(
<Dialogopen={true}onOpenChange={onClose}>
<DialogContentclassName="max-w-4xlmax-h-[90vh]overflow-y-auto">
<DialogHeader>
<DialogTitleclassName="flexitems-centerspace-x-2">
<SettingsclassName="h-5w-5text-primary"/>
<span>Configure{policyType.charAt(0).toUpperCase()+policyType.slice(1)}WarrantyPolicy</span>
<spanclassName="text-2xl">{getPolicyIcon()}</span>
</DialogTitle>
<DialogDescription>
Setwarrantyterms,coveragedetails,andconditionsfor{policyType}components
</DialogDescription>
</DialogHeader>

<divclassName="space-y-6">
{/*BasicTerms*/}
<Card>
<CardHeader>
<CardTitleclassName="text-baseflexitems-centerspace-x-2">
<CalendarclassName="h-4w-4"/>
<span>WarrantyTerms</span>
</CardTitle>
</CardHeader>
<CardContentclassName="space-y-4">
<divclassName="gridgrid-cols-2gap-4">
<divclassName="space-y-2">
<LabelhtmlFor="duration">Duration(Years)*</Label>
<Input
id="duration"
type="number"
placeholder="e.g.,8"
value={duration}
onChange={(e)=>setDuration(e.target.value)}
/>
</div>
<divclassName="space-y-2">
<LabelhtmlFor="mileage">MileageLimit(KM)*</Label>
<Input
id="mileage"
type="number"
placeholder="e.g.,160000"
value={mileage}
onChange={(e)=>setMileage(e.target.value)}
/>
</div>
</div>

<divclassName="gridgrid-cols-2gap-4">
<divclassName="space-y-2">
<LabelhtmlFor="region">ApplicableRegion</Label>
<Selectvalue={region}onValueChange={setRegion}>
<SelectTrigger>
<SelectValue/>
</SelectTrigger>
<SelectContent>
<SelectItemvalue="vietnam">Vietnam</SelectItem>
<SelectItemvalue="asean">ASEANRegion</SelectItem>
<SelectItemvalue="global">Global</SelectItem>
</SelectContent>
</Select>
</div>
<divclassName="space-y-2">
<LabelhtmlFor="transferable">Transferable</Label>
<Selectvalue={transferable}onValueChange={setTransferable}>
<SelectTrigger>
<SelectValue/>
</SelectTrigger>
<SelectContent>
<SelectItemvalue="yes">Yes</SelectItem>
<SelectItemvalue="no">No</SelectItem>
<SelectItemvalue="limited">LimitedTransfer</SelectItem>
</SelectContent>
</Select>
</div>
</div>

<divclassName="space-y-2">
<LabelhtmlFor="description">PolicyDescription</Label>
<Textarea
id="description"
placeholder="Describethewarrantypolicytermsandconditions..."
value={description}
onChange={(e)=>setDescription(e.target.value)}
className="min-h-[80px]"
/>
</div>
</CardContent>
</Card>

{/*CoverageDetails*/}
<Card>
<CardHeader>
<CardTitleclassName="text-baseflexitems-centerspace-x-2">
<ShieldclassName="h-4w-4"/>
<span>CoverageDetails</span>
</CardTitle>
</CardHeader>
<CardContentclassName="space-y-4">
{coverageItems.map((item)=>(
<Cardkey={item.id}className="border-l-4border-l-primary">
<CardContentclassName="pt-4">
<divclassName="flexitems-startjustify-between">
<divclassName="flex-1">
<h4className="font-semiboldtext-sm">{item.component}</h4>
<pclassName="text-smtext-muted-foregroundmt-1">{item.coverage}</p>
<divclassName="flexflex-wrapgap-1mt-2">
{item.exclusions.map((exclusion,idx)=>(
<Badgekey={idx}variant="secondary"className="text-xs">
{exclusion}
</Badge>
))}
</div>
</div>
<Button
variant="ghost"
size="sm"
onClick={()=>handleRemoveCoverage(item.id)}
className="text-destructivehover:text-destructive"
>
<Trash2className="h-4w-4"/>
</Button>
</div>
</CardContent>
</Card>
))}

{/*AddNewCoverage*/}
<CardclassName="border-dashed">
<CardContentclassName="pt-4">
<divclassName="space-y-3">
<divclassName="gridgrid-cols-2gap-3">
<Input
placeholder="Componentname"
value={newCoverage.component}
onChange={(e)=>setNewCoverage({...newCoverage,component:e.target.value})}
/>
<Input
placeholder="Coveragedescription"
value={newCoverage.coverage}
onChange={(e)=>setNewCoverage({...newCoverage,coverage:e.target.value})}
/>
</div>
<Input
placeholder="Exclusions(commaseparated)"
value={newCoverage.exclusions}
onChange={(e)=>setNewCoverage({...newCoverage,exclusions:e.target.value})}
/>
<Buttonvariant="outline"size="sm"onClick={handleAddCoverage}>
<PlusclassName="h-4w-4mr-1"/>
AddCoverageItem
</Button>
</div>
</CardContent>
</Card>
</CardContent>
</Card>

{/*PolicyPreview*/}
<CardclassName="bg-accent/5">
<CardHeader>
<CardTitleclassName="text-baseflexitems-centerspace-x-2">
<CheckCircleclassName="h-4w-4text-success"/>
<span>PolicyPreview</span>
</CardTitle>
</CardHeader>
<CardContent>
<divclassName="space-y-2text-sm">
<p><strong>CoveragePeriod:</strong>{duration}yearsor{Number(mileage).toLocaleString()}km(whichevercomesfirst)</p>
<p><strong>Region:</strong>{region.charAt(0).toUpperCase()+region.slice(1)}</p>
<p><strong>Transferable:</strong>{transferable==='yes''Yes':transferable==='no''No':'Limited'}</p>
<p><strong>ComponentsCovered:</strong>{coverageItems.length}items</p>
</div>
</CardContent>
</Card>
</div>

{/*Footer*/}
<divclassName="flexjustify-betweenpt-4border-t">
<Buttonvariant="outline"onClick={onClose}>
<XclassName="mr-2h-4w-4"/>
Cancel
</Button>
<Buttonvariant="gradient"onClick={handleSave}disabled={isLoading}>
{isLoading(
<divclassName="flexitems-centerspace-x-2">
<divclassName="h-4w-4animate-spinrounded-fullborder-2border-primary-foregroundborder-t-transparent"/>
<span>Saving...</span>
</div>
):(
<>
<SaveclassName="mr-2h-4w-4"/>
SavePolicy
</>
)}
</Button>
</div>
</DialogContent>
</Dialog>
);
};

exportdefaultConfigureWarrantyPolicy;