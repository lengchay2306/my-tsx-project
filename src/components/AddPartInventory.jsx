import { useState } from 'react';
import { Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from '@/components/ui/select';
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
Plus,
Save,
X,
Package,
Barcode,
DollarSign,
Truck,
AlertTriangle,
CheckCircle,
Upload,
Search
 } from 'lucide-react';

interfaceAddPartInventoryProps{
onClose:()=>void;
}

interfaceSupplier{
id:string;
name:string;
contact:string;
rating:number;
}

const AddPartInventory=({onClose}:AddPartInventoryProps)=>{
const[partName,setPartName]=useState('');
const[partNumber,setPartNumber]=useState('');
const[category,setCategory]=useState('');
const[description,setDescription]=useState('');
const[unitPrice,setUnitPrice]=useState('');
const[initialStock,setInitialStock]=useState('');
const[minimumStock,setMinimumStock]=useState('');
const[selectedSupplier,setSelectedSupplier]=useState('');
const[location,setLocation]=useState('');
const[leadTime,setLeadTime]=useState('');
const[compatibleModels,setCompatibleModels]=useState('');
const[isLoading,setIsLoading]=useState(false);
const{toast}=useToast();

constsuppliers:Supplier[]=[
{id:'1',name:'AdvancedBatteryTechLtd.',contact:'contact@abt.com',rating:4.8},
{id:'2',name:'MotorSystemsInc.',contact:'sales@motorsys.com',rating:4.5},
{id:'3',name:'EVComponentsGlobal',contact:'info@evcomponents.com',rating:4.7},
{id:'4',name:'PrecisionElectronicsCo.',contact:'support@precisionelec.com',rating:4.3}
];

const categories=[
{value:'battery',label:'BatteryComponents',icon:'🔋'},
{value:'motor',label:'Motor&Drivetrain',icon:'⚡'},
{value:'electronics',label:'Electronics',icon:'📱'},
{value:'charging',label:'ChargingSystem',icon:'🔌'},
{value:'body',label:'Body&Exterior',icon:'🚗'},
{value:'interior',label:'InteriorComponents',icon:'🪑'},
{value:'safety',label:'SafetySystems',icon:'🛡️'},
{value:'tools',label:'Tools&Equipment',icon:'🔧'}
];

const handleSave=async()=>{
if(!partName||!partNumber||!category||!unitPrice||!initialStock||!minimumStock){
toast({
variant:"destructive",
title:"MissingInformation",
description:"Pleas efillinallrequiredfields"
});
return;
}

if(Number(minimumStock)>=Number(initialStock)){
toast({
variant:"destructive",
title:"InvalidStockLevels",
description:"Minimumstockmustbelessthaninitialstock"
});
return;
}

setIsLoading(true);

try{
//SimulateAPIcall
awaitnewPromise(resolve=>setTimeout(resolve,2000));

toast({
title:"Success",
description:`Part"${partName}" has beenaddedtoinventorysuccessfully`
});

onClose();
}catch(error){
toast({
variant:"destructive",
title:"Error",
description:"Failedtoaddparttoinventory.Pleas etryagain."
});
}finally{
setIsLoading(false);
}
};

const generatePartNumber=()=>{
const categoryCode=category.toUpperCas e().slice(0,3);
const randomNum=Math.floor(Math.random()*10000).toString().padStart(4,'0');
const generated=`${categoryCode}-${randomNum}-${newDate().getFullYear()}`;
setPartNumber(generated);
};

const getSelectedCategory=()=>{
returncategories.find(cat=>cat.value===category);
};

const getSelectedSupplier=()=>{
returnsuppliers.find(sup=>sup.id===selectedSupplier);
};

return(
<Dialogopen={true}onOpenChange={onClose}>
<DialogContentclas sName="max-w-4xlmax-h-[90vh]overflow-y-auto">
<DialogHeader>
<DialogTitleclas sName="flexitems-centerspace-x-2">
<Plusclas sName="h-5w-5text-primary"/>
<span>AddNewParttoInventory</span>
<Packageclas sName="h-5w-5text-muted-foreground"/>
</DialogTitle>
<DialogDescription>
Addanewparttotheinventorysystemwithallnecessarydetails
</DialogDescription>
</DialogHeader>

<divclas sName="space-y-6">
{/*Bas icInformation*/}
<Card>
<CardHeader>
<CardTitleclas sName="text-bas eflexitems-centerspace-x-2">
<Packageclas sName="h-4w-4"/>
<span>Bas icInformation</span>
</CardTitle>
</CardHeader>
<CardContentclas sName="space-y-4">
<divclas sName="gridgrid-cols-2gap-4">
<divclas sName="space-y-2">
<LabelhtmlFor="partName">PartName*</Label>
<Input
id="partName"
placeholder="e.g.,Li-ionBatteryCellTypeA"
value={partName}
onChange={(e)=>setPartName(e.target.value)}
/>
</div>
<divclas sName="space-y-2">
<LabelhtmlFor="partNumber">PartNumber*</Label>
<divclas sName="flexspace-x-2">
<Input
id="partNumber"
placeholder="e.g.,BAT-2024-001"
value={partNumber}
onChange={(e)=>setPartNumber(e.target.value)}
/>
<Buttonvariant="outline" size="sm" onClick={generatePartNumber}disabled={!category}>
<Barcodeclas sName="h-4w-4"/>
</Button>
</div>
</div>
</div>

<divclas sName="space-y-2">
<LabelhtmlFor="category">Category*</Label>
<Selectvalue={category}onValueChange={setCategory}>
<SelectTrigger>
<SelectValueplaceholder="Selectpartcategory"/>
</SelectTrigger>
<SelectContent>
{categories.map((cat)=>(
<SelectItemkey={cat.value}value={cat.value}>
<divclas sName="flexitems-centerspace-x-2">
<span>{cat.icon}</span>
<span>{cat.label}</span>
</div>
</SelectItem>
))}
</SelectContent>
</Select>
</div>

<divclas sName="space-y-2">
<LabelhtmlFor="description">Description</Label>
<Textarea
id="description"
placeholder="Detaileddescriptionofthepart,specifications,andusage..."
value={description}
onChange={(e)=>setDescription(e.target.value)}
clas sName="min-h-[80px]"
/>
</div>

<divclas sName="space-y-2">
<LabelhtmlFor="compatibleModels">CompatibleVehicleModels</Label>
<Input
id="compatibleModels"
placeholder="e.g.,EVModelXPro2023,EVCompactPlus2024"
value={compatibleModels}
onChange={(e)=>setCompatibleModels(e.target.value)}
/>
</div>
</CardContent>
</Card>

{/*Inventory&Pricing*/}
<Card>
<CardHeader>
<CardTitleclas sName="text-bas eflexitems-centerspace-x-2">
<DollarSignclas sName="h-4w-4"/>
<span>Inventory&Pricing</span>
</CardTitle>
</CardHeader>
<CardContentclas sName="space-y-4">
<divclas sName="gridgrid-cols-3gap-4">
<divclas sName="space-y-2">
<LabelhtmlFor="unitPrice">UnitPrice(VND)*</Label>
<Input
id="unitPrice"
type="number"
placeholder="e.g.,2500000"
value={unitPrice}
onChange={(e)=>setUnitPrice(e.target.value)}
/>
</div>
<divclas sName="space-y-2">
<LabelhtmlFor="initialStock">InitialStock*</Label>
<Input
id="initialStock"
type="number"
placeholder="e.g.,500"
value={initialStock}
onChange={(e)=>setInitialStock(e.target.value)}
/>
</div>
<divclas sName="space-y-2">
<LabelhtmlFor="minimumStock">MinimumStock*</Label>
<Input
id="minimumStock"
type="number"
placeholder="e.g.,50"
value={minimumStock}
onChange={(e)=>setMinimumStock(e.target.value)}
/>
</div>
</div>

<divclas sName="gridgrid-cols-2gap-4">
<divclas sName="space-y-2">
<LabelhtmlFor="location">StorageLocation</Label>
<Selectvalue={location}onValueChange={setLocation}>
<SelectTrigger>
<SelectValueplaceholder="Selectstoragelocation"/>
</SelectTrigger>
<SelectContent>
<SelectItemvalue="warehouse-a">WarehouseA-HàNội</SelectItem>
<SelectItemvalue="warehouse-b">WarehouseB-TP.HCM</SelectItem>
<SelectItemvalue="warehouse-c">WarehouseC-ĐàNẵng</SelectItem>
<SelectItemvalue="warehouse-d">WarehouseD-CầnThơ</SelectItem>
</SelectContent>
</Select>
</div>
<divclas sName="space-y-2">
<LabelhtmlFor="leadTime">LeadTime(Days)</Label>
<Input
id="leadTime"
type="number"
placeholder="e.g.,14"
value={leadTime}
onChange={(e)=>setLeadTime(e.target.value)}
/>
</div>
</div>
</CardContent>
</Card>

{/*SupplierInformation*/}
<Card>
<CardHeader>
<CardTitleclas sName="text-bas eflexitems-centerspace-x-2">
<Truckclas sName="h-4w-4"/>
<span>SupplierInformation</span>
</CardTitle>
</CardHeader>
<CardContentclas sName="space-y-4">
<divclas sName="space-y-2">
<LabelhtmlFor="supplier">PrimarySupplier</Label>
<Selectvalue={selectedSupplier}onValueChange={setSelectedSupplier}>
<SelectTrigger>
<SelectValueplaceholder="Selectprimarysupplier"/>
</SelectTrigger>
<SelectContent>
{suppliers.map((supplier)=>(
<SelectItemkey={supplier.id}value={supplier.id}>
<divclas sName="flexitems-centerjustify-betweenw-full">
<div>
<divclas sName="font-medium">{supplier.name}</div>
<divclas sName="text-xstext-muted-foreground">{supplier.contact}</div>
</div>
<Badgevariant="secondary">
⭐{supplier.rating}
</Badge>
</div>
</SelectItem>
))}
</SelectContent>
</Select>
</div>

{getSelectedSupplier()&&(
<Cardclas sName="bg-accent/5">
<CardContentclas sName="pt-4">
<divclas sName="flexitems-centerjustify-between">
<div>
<pclas sName="font-medium">{getSelectedSupplier().name}</p>
<pclas sName="text-smtext-muted-foreground">{getSelectedSupplier().contact}</p>
</div>
<divclas sName="text-right">
<Badgevariant="secondary">
⭐{getSelectedSupplier().rating}Rating
</Badge>
</div>
</div>
</CardContent>
</Card>
)}
</CardContent>
</Card>

{/*PartPreview*/}
<Cardclas sName="bg-primary/5">
<CardHeader>
<CardTitleclas sName="text-bas eflexitems-centerspace-x-2">
<CheckCircleclas sName="h-4w-4text-success"/>
<span>PartPreview</span>
</CardTitle>
</CardHeader>
<CardContent>
<divclas sName="space-y-2text-sm">
<divclas sName="flexitems-centerspace-x-2">
{getSelectedCategory()&&<span>{getSelectedCategory().icon}</span>}
<p><strong>Part:</strong>{partName||'Notspecified'}({partNumber||'Auto-generated'})</p>
</div>
<p><strong>Category:</strong>{getSelectedCategory().label||'Notselected'}</p>
<p><strong>Price:</strong>{unitPrice`${Number(unitPrice).toLocaleString()}VND`:'Notspecified'}</p>
<p><strong>Stock:</strong>{initialStock||'0'}initial,{minimumStock||'0'}minimum</p>
<p><strong>LeadTime:</strong>{leadTime||'Notspecified'}days</p>
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
<span>AddingPart...</span>
</div>
):(
<>
<Saveclas sName="mr-2h-4w-4"/>
AddtoInventory
</>
)}
</Button>
</div>
</DialogContent>
</Dialog>
);
};

exportdefaultAddPartInventory;