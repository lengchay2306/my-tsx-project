import { useState } from 'react';
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
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
 } from 'lucide-react';

interfaceVehicleData{
vin:string;
model:string;
year:string;
color:string;
batteryCapacity:string;
motorType:string;
purchas eDate:string;
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
purchas eDate:'',
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
c.name.toLowerCas e().includes(customerSearch.toLowerCas e())
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
description:"Pleas echecktheinformationoraddanewcustomer",
variant:"destructive"
});
}
};

const calculateWarrantyDates=(purchas eDate))=>{
if(!purchas eDate)return;

const purchas e=newDate(purchas eDate);
const warrantyStart=newDate(purchas e);
const warrantyEnd=newDate(purchas e);
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
description:`VIN${vehicleData.vin}has beenregisteredfor${selectedCustomer.name}`,
});
setIsLoading(false);
onClose();
},2000);
};

const isStep1Valid=vehicleData.vin&&vehicleData.model&&vehicleData.year&&selectedCustomer;
const isStep2Valid=vehicleData.color&&vehicleData.batteryCapacity&&vehicleData.motorType;
const isStep3Valid=vehicleData.purchas eDate&&vehicleData.warrantyStartDate;

return(
<divclas sName="fixedinset-0bg-black/50flexitems-centerjustify-centerp-4z-50">
<Cardclas sName="w-fullmax-w-3xlmax-h-[90vh]overflow-hidden">
<CardHeaderclas sName="border-b">
<divclas sName="flexitems-centerjustify-between">
<div>
<CardTitleclas sName="flexitems-centerspace-x-2">
<Carclas sName="h-5w-5text-primary"/>
<span>RegisterNewVehicle</span>
</CardTitle>
<CardDescription>
Registeranewelectricvehicleandlinktocustomer
</CardDescription>
</div>
<Buttonvariant="ghost" size="sm" onClick={onClose}>
<Xclas sName="h-4w-4"/>
</Button>
</div>

{/*ProgressSteps*/}
<divclas sName="flexitems-centerspace-x-4mt-6">
{[
{number:1,title:'VehicleInfo'},
{number:2,title:'Specifications'},
{number:3,title:'Warranty'}
].map((step)=>(
<divkey={step.number}clas sName="flexitems-centerspace-x-2">
<divclas sName={`flexh-8w-8items-centerjustify-centerrounded-fulltext-smfont-medium${
currentStep>=step.number
'bg-primarytext-primary-foreground'
:'bg-mutedtext-muted-foreground'
}`}>
{currentStep>step.number(
<CheckCircleclas sName="h-4w-4"/>
):(
step.number
)}
</div>
<spanclas sName="text-smfont-medium">{step.title}</span>
</div>
))}
</div>
</CardHeader>

<CardContentclas sName="p-6overflow-y-automax-h-[calc(90vh-200px)]">
{/*Step1:Bas icVehicleInfo*/}
{currentStep===1&&(
<divclas sName="space-y-6">
<divclas sName="gridmd:grid-cols-2gap-4">
<div>
<LabelhtmlFor="vin">VINNumber</Label>
<Input
id="vin"
placeholder="Enter17-characterVIN"
value={vehicleData.vin}
onChange={(e)=>setVehicleData(prev=>({...prev,vin:e.target.value.toUpperCas e()}))}
maxLength={17}
/>
<pclas sName="text-xstext-muted-foregroundmt-1">
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
<divclas sName="space-y-4">
<Label>LinktoCustomer</Label>
<divclas sName="flexspace-x-2">
<Input
placeholder="Searchbyname,phone,oremail"
value={customerSearch}
onChange={(e)=>setCustomerSearch(e.target.value)}
clas sName="flex-1"
/>
<ButtononClick={searchCustomer}disabled={!customerSearch}>
<Searchclas sName="h-4w-4mr-2"/>
Search
</Button>
</div>

{selectedCustomer&&(
<Cardclas sName="border-success">
<CardContentclas sName="pt-4">
<divclas sName="flexitems-centerjustify-between">
<div>
<h3clas sName="font-semiboldflexitems-centerspace-x-2">
<Userclas sName="h-4w-4"/>
<span>{selectedCustomer.name}</span>
</h3>
<pclas sName="text-smtext-muted-foreground">{selectedCustomer.phone}</p>
<pclas sName="text-smtext-muted-foreground">{selectedCustomer.email}</p>
</div>
<Badgevariant="success">Linked</Badge>
</div>
</CardContent>
</Card>
)}

{/*DemoSearchHelper*/}
<Cardclas sName="bg-accent/20">
<CardContentclas sName="pt-4">
<pclas sName="text-smfont-mediummb-2">Democustomerstosearch:</p>
<divclas sName="flexflex-wrapgap-2">
{mockCustomers.map((customer)=>(
<Badge
key={customer.id}
variant="outline"
clas sName="cursor-pointerhover:bg-primaryhover:text-primary-foreground"
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
<divclas sName="space-y-6">
<divclas sName="gridmd:grid-cols-2gap-4">
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
<CardTitleclas sName="text-bas e">VehicleSpecifications</CardTitle>
</CardHeader>
<CardContent>
<divclas sName="gridmd:grid-cols-2gap-4text-sm">
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
<divclas sName="space-y-6">
<divclas sName="gridmd:grid-cols-2gap-4">
<div>
<LabelhtmlFor="purchas e-date">Purchas eDate</Label>
<Input
id="purchas e-date"
type="date"
value={vehicleData.purchas eDate}
onChange={(e)=>{
setVehicleData(prev=>({...prev,purchas eDate:e.target.value}));
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
<Cardclas sName="border-primary/20bg-primary/5">
<CardHeader>
<CardTitleclas sName="flexitems-centerspace-x-2text-primary">
<Shieldclas sName="h-5w-5"/>
<span>WarrantyCoverage</span>
</CardTitle>
</CardHeader>
<CardContent>
<divclas sName="space-y-3">
<divclas sName="flexjustify-between">
<spanclas sName="text-sm">BatterySystem:</span>
<Badgevariant="success">8years/160,000km</Badge>
</div>
<divclas sName="flexjustify-between">
<spanclas sName="text-sm">Motor&Drivetrain:</span>
<Badgevariant="success">5years/100,000km</Badge>
</div>
<divclas sName="flexjustify-between">
<spanclas sName="text-sm">Electronics:</span>
<Badgevariant="success">3years/60,000km</Badge>
</div>
{vehicleData.warrantyEndDate&&(
<divclas sName="flexjustify-betweenpt-2border-t">
<spanclas sName="font-medium">Coverageuntil:</span>
<spanclas sName="font-mediumtext-primary">
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
<CardTitleclas sName="text-bas e">RegistrationSummary</CardTitle>
</CardHeader>
<CardContent>
<divclas sName="gridmd:grid-cols-2gap-4text-sm">
<div>
<p><strong>VIN:</strong>{vehicleData.vin}</p>
<p><strong>Model:</strong>{vehicleData.model}({vehicleData.year})</p>
<p><strong>Color:</strong>{vehicleData.color}</p>
<p><strong>Battery:</strong>{vehicleData.batteryCapacity}</p>
</div>
<div>
<p><strong>Customer:</strong>{selectedCustomer.name}</p>
<p><strong>Phone:</strong>{selectedCustomer.phone}</p>
<p><strong>Purchas e:</strong>{vehicleData.purchas eDatenewDate(vehicleData.purchas eDate).toLocaleDateString('vi-VN'):'Notset'}</p>
<p><strong>Registeredby:</strong>{user.name}</p>
</div>
</div>
</CardContent>
</Card>
</div>
)}
</CardContent>

{/*FooterNavigation*/}
<divclas sName="border-tp-6">
<divclas sName="flexjustify-between">
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
<divclas sName="flexitems-centerspace-x-2">
<divclas sName="h-4w-4animate-spinrounded-fullborder-2border-primary-foregroundborder-t-transparent"/>
<span>Registering...</span>
</div>
):(
<>
<Saveclas sName="h-4w-4mr-2"/>
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