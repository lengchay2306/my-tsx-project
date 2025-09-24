import { useState } from'react';
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from'@/components/ui/card';
import { Button } from'@/components/ui/button';
import { Input } from'@/components/ui/input';
import { Label } from'@/components/ui/label';
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from'@/components/ui/select';
import { Badge } from'@/components/ui/badge';
import { useToast } from'@/hooks/use-toast';
import { useAuth } from'@/contexts/AuthContext';
import { 
Package,
Search,
Plus,
X,
Save,
Car,
Wrench,
Battery,
Zap,
Trash2,
CheckCircle
 } from'lucide-react';

interfacePartData{
id:string;
name:string;
category:string;
serialNumber:string;
installationDate:string;
warrantyPeriod:string;
}

interfaceVehicleInfo{
vin:string;
model:string;
customer:string;
}

const AttachParts=({onClose}:{onClose:()=>void})=>{
const[isLoading,setIsLoading]=useState(false);
const[vinSearch,setVinSearch]=useState('');
const[selectedVehicle,setSelectedVehicle]=useState<VehicleInfo|null>(null);
const[attachedParts,setAttachedParts]=useState<PartData[]>([]);
const[newPart,setNewPart]=useState({
category:'',
partId:'',
serialNumber:'',
installationDate:''
});

const{user}=useAuth();
const{toast}=useToast();

//Mockvehicles
const mockVehicles=[
{
vin:'1HGBH41JXMN109186',
model:'EVModelXPro2023',
customer:'NguyễnVănMinh'
},
{
vin:'WVWZZZ1JZ3W386752',
model:'EVCompactPlus2022',
customer:'TrầnThịLan'
}
];

//Partcategoriesandavailableparts
const partCategories=[
{
id:'battery',
name:'BatterySystem',
icon:Battery,
parts:[
{id:'BAT-001',name:'Li-ionBatteryPack75kWh',warranty:'8years'},
{id:'BAT-002',name:'BatteryManagementSystem',warranty:'5years'},
{id:'BAT-003',name:'BatteryCoolingSystem',warranty:'3years'}
]
},
{
id:'motor',
name:'Motor&Drivetrain',
icon:Wrench,
parts:[
{id:'MOT-001',name:'ElectricMotor-Front',warranty:'5years'},
{id:'MOT-002',name:'ElectricMotor-Rear',warranty:'5years'},
{id:'MOT-003',name:'GearboxAssembly',warranty:'5years'},
{id:'MOT-004',name:'InverterUnit',warranty:'3years'}
]
},
{
id:'charging',
name:'ChargingSystem',
icon:Zap,
parts:[
{id:'CHG-001',name:'OnboardCharger11kW',warranty:'3years'},
{id:'CHG-002',name:'DCFastChargePort',warranty:'3years'},
{id:'CHG-003',name:'ChargingControlUnit',warranty:'3years'}
]
},
{
id:'electronics',
name:'Electronics&Software',
icon:Package,
parts:[
{id:'ECU-001',name:'MainControlUnit',warranty:'3years'},
{id:'ECU-002',name:'Display&Infotainment',warranty:'2years'},
{id:'ECU-003',name:'ADASController',warranty:'3years'}
]
}
];

const searchVehicle=()=>{
const vehicle=mockVehicles.find(v=>v.vin===vinSearch);
if(vehicle){
setSelectedVehicle(vehicle);
toast({
title:"VehicleFound!",
description:`Found${vehicle.model}for${vehicle.customer}`,
});
}else{
toast({
title:"VehicleNotFound",
description:"PleasechecktheVINnumberandtryagain",
variant:"destructive"
});
}
};

const getPartsForCategory=(categoryId))=>{
returnpartCategories.find(cat=>cat.id===categoryId).parts||[];
};

const getPartDetails=(partId))=>{
for(constcategoryofpartCategories){
const part=category.parts.find(p=>p.id===partId);
if(part)returnpart;
}
returnnull;
};

const addPart=()=>{
if(!newPart.category||!newPart.partId||!newPart.serialNumber||!newPart.installationDate){
toast({
title:"MissingInformation",
description:"Pleasefillallpartdetails",
variant:"destructive"
});
return;
}

const partDetails=getPartDetails(newPart.partId);
if(!partDetails)return;

constpart:PartData={
id:`${newPart.partId}-${Date.now()}`,
name:partDetails.name,
category:newPart.category,
serialNumber:newPart.serialNumber,
installationDate:newPart.installationDate,
warrantyPeriod:partDetails.warranty
};

setAttachedParts(prev=>[...prev,part]);
setNewPart({category:'',partId:'',serialNumber:'',installationDate:''});

toast({
title:"PartAdded!",
description:`${partDetails.name}hasbeenaddedtothevehicle`,
});
};

const removePart=(partId))=>{
setAttachedParts(prev=>prev.filter(part=>part.id!==partId));
toast({
title:"PartRemoved",
description:"Parthasbeenremovedfrom thelist",
});
};

const handleSave=()=>{
if(!selectedVehicle||attachedParts.length===0){
toast({
title:"CannotSave",
description:"Pleaseselectavehicleandaddatleastonepart",
variant:"destructive"
});
return;
}

setIsLoading(true);
setTimeout(()=>{
toast({
title:"PartsAttachedSuccessfully!",
description:`${attachedParts.length}partshavebeenattachedto${selectedVehicle.vin}`,
});
setIsLoading(false);
onClose();
},2000);
};

const getCategoryIcon=(categoryId))=>{
const category=partCategories.find(cat=>cat.id===categoryId);
returncategory.icon||Package;
};

return(
<divclassName="fixedinset-0bg-black/50flexitems-centerjustify-centerp-4z-50">
<CardclassName="w-fullmax-w-5xlmax-h-[90vh]overflow-hidden">
<CardHeaderclassName="border-b">
<divclassName="flexitems-centerjustify-between">
<div>
<CardTitleclassName="flexitems-centerspace-x-2">
<PackageclassName="h-5w-5text-primary"/>
<span>AttachPartstoVehicle</span>
</CardTitle>
<CardDescription>
Attachserialpartstoaspecificvehicleforwarrantytracking
</CardDescription>
</div>
<Buttonvariant="ghost"size="sm"onClick={onClose}>
<XclassName="h-4w-4"/>
</Button>
</div>
</CardHeader>

<CardContentclassName="p-6overflow-y-automax-h-[calc(90vh-200px)]">
<divclassName="space-y-6">
{/*VehicleSearch*/}
<Card>
<CardHeader>
<CardTitleclassName="flexitems-centerspace-x-2text-base">
<CarclassName="h-4w-4"/>
<span>SelectVehicle</span>
</CardTitle>
</CardHeader>
<CardContent>
<divclassName="space-y-4">
<divclassName="flexspace-x-2">
<Input
placeholder="EnterVINnumber"
value={vinSearch}
onChange={(e)=>setVinSearch(e.target.value)}
className="flex-1"
/>
<ButtononClick={searchVehicle}disabled={!vinSearch}>
<SearchclassName="h-4w-4mr-2"/>
Search
</Button>
</div>

{selectedVehicle&&(
<CardclassName="border-success">
<CardContentclassName="pt-4">
<divclassName="flexitems-centerjustify-between">
<div>
<h3className="font-semibold">{selectedVehicle.model}</h3>
<pclassName="text-smtext-muted-foreground">VIN:{selectedVehicle.vin}</p>
<pclassName="text-smtext-muted-foreground">Customer:{selectedVehicle.customer}</p>
</div>
<Badgevariant="success">Selected</Badge>
</div>
</CardContent>
</Card>
)}

{/*DemoVINs*/}
<divclassName="flexflex-wrapgap-2">
<spanclassName="text-smtext-muted-foreground">DemoVINs:</span>
{mockVehicles.map((vehicle)=>(
<Badge
key={vehicle.vin}
variant="outline"
className="cursor-pointerhover:bg-primaryhover:text-primary-foreground"
onClick={()=>setVinSearch(vehicle.vin)}
>
{vehicle.vin}
</Badge>
))}
</div>
</div>
</CardContent>
</Card>

{/*AddNewPart*/}
{selectedVehicle&&(
<Card>
<CardHeader>
<CardTitleclassName="flexitems-centerspace-x-2text-base">
<PlusclassName="h-4w-4"/>
<span>AddNewPart</span>
</CardTitle>
</CardHeader>
<CardContent>
<divclassName="gridgap-4">
<divclassName="gridmd:grid-cols-2gap-4">
<div>
<Label>PartCategory</Label>
<Select
value={newPart.category}
onValueChange={(value)=>setNewPart(prev=>({...prev,category:value,partId:''}))}
>
<SelectTrigger>
<SelectValueplaceholder="Selectcategory"/>
</SelectTrigger>
<SelectContent>
{partCategories.map((category)=>{
const Icon=category.icon;
return(
<SelectItemkey={category.id}value={category.id}>
<divclassName="flexitems-centerspace-x-2">
<IconclassName="h-4w-4"/>
<span>{category.name}</span>
</div>
</SelectItem>
);
})}
</SelectContent>
</Select>
</div>

<div>
<Label>SpecificPart</Label>
<Select
value={newPart.partId}
onValueChange={(value)=>setNewPart(prev=>({...prev,partId:value}))}
disabled={!newPart.category}
>
<SelectTrigger>
<SelectValueplaceholder="Selectpart"/>
</SelectTrigger>
<SelectContent>
{getPartsForCategory(newPart.category).map((part)=>(
<SelectItemkey={part.id}value={part.id}>
<div>
<div>{part.name}</div>
<divclassName="text-xstext-muted-foreground">Warranty:{part.warranty}</div>
</div>
</SelectItem>
))}
</SelectContent>
</Select>
</div>

<div>
<LabelhtmlFor="serial">SerialNumber</Label>
<Input
id="serial"
placeholder="Enterserialnumber"
value={newPart.serialNumber}
onChange={(e)=>setNewPart(prev=>({...prev,serialNumber:e.target.value}))}
/>
</div>

<div>
<LabelhtmlFor="installation">InstallationDate</Label>
<Input
id="installation"
type="date"
value={newPart.installationDate}
onChange={(e)=>setNewPart(prev=>({...prev,installationDate:e.target.value}))}
/>
</div>
</div>

<Button
onClick={addPart}
disabled={!newPart.category||!newPart.partId||!newPart.serialNumber||!newPart.installationDate}
className="w-fit"
>
<PlusclassName="h-4w-4mr-2"/>
AddPart
</Button>
</div>
</CardContent>
</Card>
)}

{/*AttachedPartsList*/}
{attachedParts.length>0&&(
<Card>
<CardHeader>
<CardTitleclassName="flexitems-centerspace-x-2text-base">
<CheckCircleclassName="h-4w-4text-success"/>
<span>AttachedParts({attachedParts.length})</span>
</CardTitle>
</CardHeader>
<CardContent>
<divclassName="space-y-3">
{attachedParts.map((part)=>{
const Icon=getCategoryIcon(part.category);
return(
<div
key={part.id}
className="flexitems-centerjustify-betweenp-4borderrounded-lg"
>
<divclassName="flexitems-centerspace-x-3">
<divclassName="flexh-10w-10items-centerjustify-centerrounded-lgbg-accent">
<IconclassName="h-5w-5"/>
</div>
<div>
<h3className="font-medium">{part.name}</h3>
<pclassName="text-smtext-muted-foreground">
Serial:{part.serialNumber}
</p>
<pclassName="text-smtext-muted-foreground">
Installed:{newDate(part.installationDate).toLocaleDateString('vi-VN')}|
Warranty:{part.warrantyPeriod}
</p>
</div>
</div>
<Button
variant="ghost"
size="sm"
onClick={()=>removePart(part.id)}
className="text-destructivehover:text-destructive"
>
<Trash2className="h-4w-4"/>
</Button>
</div>
);
})}
</div>
</CardContent>
</Card>
)}

{/*Summary*/}
{selectedVehicle&&attachedParts.length>0&&(
<CardclassName="bg-accent/20">
<CardHeader>
<CardTitleclassName="text-base">AttachmentSummary</CardTitle>
</CardHeader>
<CardContent>
<divclassName="gridmd:grid-cols-2gap-4text-sm">
<div>
<p><strong>Vehicle:</strong>{selectedVehicle.model}</p>
<p><strong>VIN:</strong>{selectedVehicle.vin}</p>
<p><strong>Customer:</strong>{selectedVehicle.customer}</p>
</div>
<div>
<p><strong>PartsCount:</strong>{attachedParts.length}</p>
<p><strong>Processedby:</strong>{user.name}</p>
<p><strong>Date:</strong>{newDate().toLocaleDateString('vi-VN')}</p>
</div>
</div>
</CardContent>
</Card>
)}
</div>
</CardContent>

{/*Footer*/}
<divclassName="border-tp-6">
<divclassName="flexjustify-between">
<Buttonvariant="outline"onClick={onClose}>
Cancel
</Button>
<Button
variant="gradient"
onClick={handleSave}
disabled={!selectedVehicle||attachedParts.length===0||isLoading}
>
{isLoading(
<divclassName="flexitems-centerspace-x-2">
<divclassName="h-4w-4animate-spinrounded-fullborder-2border-primary-foregroundborder-t-transparent"/>
<span>Saving...</span>
</div>
):(
<>
<SaveclassName="h-4w-4mr-2"/>
SaveAttachments
</>
)}
</Button>
</div>
</div>
</Card>
</div>
);
};

exportdefaultAttachParts;