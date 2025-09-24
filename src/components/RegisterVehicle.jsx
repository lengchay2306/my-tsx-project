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
Car,
Calendar,
Shield,
X,
Save,
Search,
User,
CheckCircle,
AlertCircle
 } from'lucide-react';

interfaceVehicleData{
vin:string;
model:string;
year:string;
color:string;
batteryCapacity:string;
motorType:string;
purchaseDate:string;
warrantyStartDate:string;
warrantyEndDate:string;
customerId:string;
dealerInfo:string;
}

const RegisterVehicle=({onClose}:{onClose:()=>void})=>{
const[isLoading,setIsLoading]=useState(false);
const[currentStep,setCurrentStep]=useState(1);
const{user}=useAuth();
const{toast}=useToast();

const[vehicleData,setVehicleData]=useState<VehicleData>({
vin:'',
model:'',
year:'',
color:'',
batteryCapacity:'',
motorType:'',
purchaseDate:'',
warrantyStartDate:'',
warrantyEndDate:'',
customerId:'',
dealerInfo:''
});

const[customerSearch,setCustomerSearch]=useState('');
const[selectedCustomer,setSelectedCustomer]=useState<any>(null);

//Mockcustomers
const mockCustomers=[
{
id:'cust-001',
name:'NguyễnVănMinh',
phone:'0901234567',
email:'minh.nguyen@email.com',
address:'123ĐườngABC,Quận1,TP.HCM'
},
{
id:'cust-002',
name:'TrầnThịLan',
phone:'0987654321',
email:'lan.tran@email.com',
address:'456ĐườngXYZ,Quận2,TP.HCM'
},
{
id:'cust-003',
name:'LêHoàngNam',
phone:'0976543210',
email:'nam.le@email.com',
address:'789ĐườngDEF,Quận3,TP.HCM'
}
];

const evModels=[
'EVModelXPro',
'EVCompactPlus',
'EVSUVPremium',
'EVSedanElite',
'EVCrossover'
];

const colors=[
'TrắngNgọcTrai',
'ĐenObsidian',
'XanhNavy',
'BạcMetallic',
'ĐỏCherry',
'XámTitan'
];

const batteryOptions=[
'60kWh',
'75kWh',
'85kWh',
'100kWh',
'120kWh'
];

const motorTypes=[
'SingleMotorRWD',
'DualMotorAWD',
'TripleMotorAWD',
'PerformanceMotor'
];

const searchCustomer=()=>{
const customer=mockCustomers.find(c=>
c.phone===customerSearch||
c.email===customerSearch||
c.name.toLowerCase().includes(customerSearch.toLowerCase())
);

if(customer){
setSelectedCustomer(customer);
setVehicleData(prev=>({...prev,customerId:customer.id}));
toast({
title:"CustomerFound!",
description:`Found${customer.name}`,
});
}else{
toast({
title:"CustomerNotFound",
description:"Pleasechecktheinformationoraddanewcustomer",
variant:"destructive"
});
}
};

const calculateWarrantyDates=(purchaseDate))=>{
if(!purchaseDate)return;

const purchase=newDate(purchaseDate);
const warrantyStart=newDate(purchase);
const warrantyEnd=newDate(purchase);
warrantyEnd.setFullYear(warrantyEnd.getFullYear()+8);//8yearwarranty

setVehicleData(prev=>({
...prev,
warrantyStartDate:warrantyStart.toISOString().split('T')[0],
warrantyEndDate:warrantyEnd.toISOString().split('T')[0]
}));
};

const handleSubmit=()=>{
setIsLoading(true);
setTimeout(()=>{
toast({
title:"VehicleRegisteredSuccessfully!",
description:`VIN${vehicleData.vin}hasbeenregisteredfor${selectedCustomer.name}`,
});
setIsLoading(false);
onClose();
},2000);
};

const isStep1Valid=vehicleData.vin&&vehicleData.model&&vehicleData.year&&selectedCustomer;
const isStep2Valid=vehicleData.color&&vehicleData.batteryCapacity&&vehicleData.motorType;
const isStep3Valid=vehicleData.purchaseDate&&vehicleData.warrantyStartDate;

return(
<divclassName="fixedinset-0bg-black/50flexitems-centerjustify-centerp-4z-50">
<CardclassName="w-fullmax-w-3xlmax-h-[90vh]overflow-hidden">
<CardHeaderclassName="border-b">
<divclassName="flexitems-centerjustify-between">
<div>
<CardTitleclassName="flexitems-centerspace-x-2">
<CarclassName="h-5w-5text-primary"/>
<span>RegisterNewVehicle</span>
</CardTitle>
<CardDescription>
Registeranewelectricvehicleandlinktocustomer
</CardDescription>
</div>
<Buttonvariant="ghost"size="sm"onClick={onClose}>
<XclassName="h-4w-4"/>
</Button>
</div>

{/*ProgressSteps*/}
<divclassName="flexitems-centerspace-x-4mt-6">
{[
{number:1,title:'VehicleInfo'},
{number:2,title:'Specifications'},
{number:3,title:'Warranty'}
].map((step)=>(
<divkey={step.number}className="flexitems-centerspace-x-2">
<divclassName={`flexh-8w-8items-centerjustify-centerrounded-fulltext-smfont-medium${
currentStep>=step.number
'bg-primarytext-primary-foreground'
:'bg-mutedtext-muted-foreground'
}`}>
{currentStep>step.number(
<CheckCircleclassName="h-4w-4"/>
):(
step.number
)}
</div>
<spanclassName="text-smfont-medium">{step.title}</span>
</div>
))}
</div>
</CardHeader>

<CardContentclassName="p-6overflow-y-automax-h-[calc(90vh-200px)]">
{/*Step1:BasicVehicleInfo*/}
{currentStep===1&&(
<divclassName="space-y-6">
<divclassName="gridmd:grid-cols-2gap-4">
<div>
<LabelhtmlFor="vin">VINNumber</Label>
<Input
id="vin"
placeholder="Enter17-characterVIN"
value={vehicleData.vin}
onChange={(e)=>setVehicleData(prev=>({...prev,vin:e.target.value.toUpperCase()}))}
maxLength={17}
/>
<pclassName="text-xstext-muted-foregroundmt-1">
VehicleIdentificationNumber(17characters)
</p>
</div>

<div>
<Label>Model</Label>
<Selectvalue={vehicleData.model}onValueChange={(value)=>setVehicleData(prev=>({...prev,model:value}))}>
<SelectTrigger>
<SelectValueplaceholder="Selectvehiclemodel"/>
</SelectTrigger>
<SelectContent>
{evModels.map((model)=>(
<SelectItemkey={model}value={model}>{model}</SelectItem>
))}
</SelectContent>
</Select>
</div>

<div>
<Label>ManufacturingYear</Label>
<Selectvalue={vehicleData.year}onValueChange={(value)=>setVehicleData(prev=>({...prev,year:value}))}>
<SelectTrigger>
<SelectValueplaceholder="Selectyear"/>
</SelectTrigger>
<SelectContent>
{[2024,2023,2022,2021,2020].map((year)=>(
<SelectItemkey={year}value={year.toString()}>{year}</SelectItem>
))}
</SelectContent>
</Select>
</div>
</div>

{/*CustomerSearch*/}
<divclassName="space-y-4">
<Label>LinktoCustomer</Label>
<divclassName="flexspace-x-2">
<Input
placeholder="Searchbyname,phone,oremail"
value={customerSearch}
onChange={(e)=>setCustomerSearch(e.target.value)}
className="flex-1"
/>
<ButtononClick={searchCustomer}disabled={!customerSearch}>
<SearchclassName="h-4w-4mr-2"/>
Search
</Button>
</div>

{selectedCustomer&&(
<CardclassName="border-success">
<CardContentclassName="pt-4">
<divclassName="flexitems-centerjustify-between">
<div>
<h3className="font-semiboldflexitems-centerspace-x-2">
<UserclassName="h-4w-4"/>
<span>{selectedCustomer.name}</span>
</h3>
<pclassName="text-smtext-muted-foreground">{selectedCustomer.phone}</p>
<pclassName="text-smtext-muted-foreground">{selectedCustomer.email}</p>
</div>
<Badgevariant="success">Linked</Badge>
</div>
</CardContent>
</Card>
)}

{/*DemoSearchHelper*/}
<CardclassName="bg-accent/20">
<CardContentclassName="pt-4">
<pclassName="text-smfont-mediummb-2">Democustomerstosearch:</p>
<divclassName="flexflex-wrapgap-2">
{mockCustomers.map((customer)=>(
<Badge
key={customer.id}
variant="outline"
className="cursor-pointerhover:bg-primaryhover:text-primary-foreground"
onClick={()=>setCustomerSearch(customer.name)}
>
{customer.name}
</Badge>
))}
</div>
</CardContent>
</Card>
</div>
</div>
)}

{/*Step2:Specifications*/}
{currentStep===2&&(
<divclassName="space-y-6">
<divclassName="gridmd:grid-cols-2gap-4">
<div>
<Label>Color</Label>
<Selectvalue={vehicleData.color}onValueChange={(value)=>setVehicleData(prev=>({...prev,color:value}))}>
<SelectTrigger>
<SelectValueplaceholder="Selectcolor"/>
</SelectTrigger>
<SelectContent>
{colors.map((color)=>(
<SelectItemkey={color}value={color}>{color}</SelectItem>
))}
</SelectContent>
</Select>
</div>

<div>
<Label>BatteryCapacity</Label>
<Selectvalue={vehicleData.batteryCapacity}onValueChange={(value)=>setVehicleData(prev=>({...prev,batteryCapacity:value}))}>
<SelectTrigger>
<SelectValueplaceholder="Selectbatterycapacity"/>
</SelectTrigger>
<SelectContent>
{batteryOptions.map((battery)=>(
<SelectItemkey={battery}value={battery}>{battery}</SelectItem>
))}
</SelectContent>
</Select>
</div>

<div>
<Label>MotorType</Label>
<Selectvalue={vehicleData.motorType}onValueChange={(value)=>setVehicleData(prev=>({...prev,motorType:value}))}>
<SelectTrigger>
<SelectValueplaceholder="Selectmotorconfiguration"/>
</SelectTrigger>
<SelectContent>
{motorTypes.map((motor)=>(
<SelectItemkey={motor}value={motor}>{motor}</SelectItem>
))}
</SelectContent>
</Select>
</div>

<div>
<LabelhtmlFor="dealer">DealerInformation</Label>
<Input
id="dealer"
placeholder="Dealernameorcode"
value={vehicleData.dealerInfo}
onChange={(e)=>setVehicleData(prev=>({...prev,dealerInfo:e.target.value}))}
/>
</div>
</div>

{/*SpecificationsPreview*/}
<Card>
<CardHeader>
<CardTitleclassName="text-base">VehicleSpecifications</CardTitle>
</CardHeader>
<CardContent>
<divclassName="gridmd:grid-cols-2gap-4text-sm">
<div>
<p><strong>Model:</strong>{vehicleData.model||'Notselected'}</p>
<p><strong>Year:</strong>{vehicleData.year||'Notselected'}</p>
<p><strong>Color:</strong>{vehicleData.color||'Notselected'}</p>
</div>
<div>
<p><strong>Battery:</strong>{vehicleData.batteryCapacity||'Notselected'}</p>
<p><strong>Motor:</strong>{vehicleData.motorType||'Notselected'}</p>
<p><strong>Customer:</strong>{selectedCustomer.name||'Notlinked'}</p>
</div>
</div>
</CardContent>
</Card>
</div>
)}

{/*Step3:WarrantyInformation*/}
{currentStep===3&&(
<divclassName="space-y-6">
<divclassName="gridmd:grid-cols-2gap-4">
<div>
<LabelhtmlFor="purchase-date">PurchaseDate</Label>
<Input
id="purchase-date"
type="date"
value={vehicleData.purchaseDate}
onChange={(e)=>{
setVehicleData(prev=>({...prev,purchaseDate:e.target.value}));
calculateWarrantyDates(e.target.value);
}}
/>
</div>

<div>
<LabelhtmlFor="warranty-start">WarrantyStartDate</Label>
<Input
id="warranty-start"
type="date"
value={vehicleData.warrantyStartDate}
onChange={(e)=>setVehicleData(prev=>({...prev,warrantyStartDate:e.target.value}))}
/>
</div>

<div>
<LabelhtmlFor="warranty-end">WarrantyEndDate</Label>
<Input
id="warranty-end"
type="date"
value={vehicleData.warrantyEndDate}
onChange={(e)=>setVehicleData(prev=>({...prev,warrantyEndDate:e.target.value}))}
/>
</div>
</div>

{/*WarrantySummary*/}
<CardclassName="border-primary/20bg-primary/5">
<CardHeader>
<CardTitleclassName="flexitems-centerspace-x-2text-primary">
<ShieldclassName="h-5w-5"/>
<span>WarrantyCoverage</span>
</CardTitle>
</CardHeader>
<CardContent>
<divclassName="space-y-3">
<divclassName="flexjustify-between">
<spanclassName="text-sm">BatterySystem:</span>
<Badgevariant="success">8years/160,000km</Badge>
</div>
<divclassName="flexjustify-between">
<spanclassName="text-sm">Motor&Drivetrain:</span>
<Badgevariant="success">5years/100,000km</Badge>
</div>
<divclassName="flexjustify-between">
<spanclassName="text-sm">Electronics:</span>
<Badgevariant="success">3years/60,000km</Badge>
</div>
{vehicleData.warrantyEndDate&&(
<divclassName="flexjustify-betweenpt-2border-t">
<spanclassName="font-medium">Coverageuntil:</span>
<spanclassName="font-mediumtext-primary">
{newDate(vehicleData.warrantyEndDate).toLocaleDateString('vi-VN')}
</span>
</div>
)}
</div>
</CardContent>
</Card>

{/*RegistrationSummary*/}
<Card>
<CardHeader>
<CardTitleclassName="text-base">RegistrationSummary</CardTitle>
</CardHeader>
<CardContent>
<divclassName="gridmd:grid-cols-2gap-4text-sm">
<div>
<p><strong>VIN:</strong>{vehicleData.vin}</p>
<p><strong>Model:</strong>{vehicleData.model}({vehicleData.year})</p>
<p><strong>Color:</strong>{vehicleData.color}</p>
<p><strong>Battery:</strong>{vehicleData.batteryCapacity}</p>
</div>
<div>
<p><strong>Customer:</strong>{selectedCustomer.name}</p>
<p><strong>Phone:</strong>{selectedCustomer.phone}</p>
<p><strong>Purchase:</strong>{vehicleData.purchaseDatenewDate(vehicleData.purchaseDate).toLocaleDateString('vi-VN'):'Notset'}</p>
<p><strong>Registeredby:</strong>{user.name}</p>
</div>
</div>
</CardContent>
</Card>
</div>
)}
</CardContent>

{/*FooterNavigation*/}
<divclassName="border-tp-6">
<divclassName="flexjustify-between">
<Button
variant="outline"
onClick={()=>setCurrentStep(Math.max(1,currentStep-1))}
disabled={currentStep===1}
>
Previous
</Button>

{currentStep<3(
<Button
onClick={()=>setCurrentStep(currentStep+1)}
disabled={
(currentStep===1&&!isStep1Valid)||
(currentStep===2&&!isStep2Valid)
}
>
Next
</Button>
):(
<Button
variant="gradient"
onClick={handleSubmit}
disabled={!isStep3Valid||isLoading}
>
{isLoading(
<divclassName="flexitems-centerspace-x-2">
<divclassName="h-4w-4animate-spinrounded-fullborder-2border-primary-foregroundborder-t-transparent"/>
<span>Registering...</span>
</div>
):(
<>
<SaveclassName="h-4w-4mr-2"/>
RegisterVehicle
</>
)}
</Button>
)}
</div>
</div>
</Card>
</div>
);
};

exportdefaultRegisterVehicle;