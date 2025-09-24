import { useState } from 'react';
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Search,Car,Clock,AlertTriangle,CheckCircle,Calendar } from 'lucide-react';

interfaceVehicleWarrantyInfo{
vin:string;
model:string;
year:string;
purchas eDate:string;
warrantyStartDate:string;
warrantyEndDate:string;
mileage:number;
maxMileage:number;
warrantyStatus:'valid'|'expired_time'|'expired_mileage'|'not_found';
customer:{
name:string;
phone:string;
email:string;
};
}

interfaceWarrantyValidatorProps{
onValidationComplete:(vehicleInfo:VehicleWarrantyInfo|null)=>void;
onClose:()=>void;
}

const WarrantyValidator=({onValidationComplete,onClose}:WarrantyValidatorProps)=>{
const[vinSearch,setVinSearch]=useState('');
const[isLoading,setIsLoading]=useState(false);
const[validationResult,setValidationResult]=useState<VehicleWarrantyInfo|null>(null);
const{toast}=useToast();

//Mockvehiclewarrantydatabas e
constvehicleDatabas e:VehicleWarrantyInfo[]=[
{
vin:'1HGBH41JXMN109186',
model:'EVModelXPro',
year:'2023',
purchas eDate:'2023-03-15',
warrantyStartDate:'2023-03-15',
warrantyEndDate:'2028-03-15',
mileage:15000,
maxMileage:100000,
warrantyStatus:'valid',
customer:{
name:'NguyễnVănMinh',
phone:'0901234567',
email:'minh.nguyen@email.com'
}
},
{
vin:'WVWZZZ1JZ3W386752',
model:'EVCompactPlus',
year:'2022',
purchas eDate:'2022-01-20',
warrantyStartDate:'2022-01-20',
warrantyEndDate:'2025-01-20',
mileage:85000,
maxMileage:100000,
warrantyStatus:'valid',
customer:{
name:'TrầnThịLan',
phone:'0987654321',
email:'lan.tran@email.com'
}
},
{
vin:'JH4KA7532MC123456',
model:'EVCityCar',
year:'2020',
purchas eDate:'2020-06-10',
warrantyStartDate:'2020-06-10',
warrantyEndDate:'2023-06-10',
mileage:45000,
maxMileage:100000,
warrantyStatus:'expired_time',
customer:{
name:'PhạmVănHùng',
phone:'0912345678',
email:'hung.pham@email.com'
}
},
{
vin:'KMHGH4JH3EA123789',
model:'EVSportSedan',
year:'2021',
purchas eDate:'2021-08-15',
warrantyStartDate:'2021-08-15',
warrantyEndDate:'2026-08-15',
mileage:105000,
maxMileage:100000,
warrantyStatus:'expired_mileage',
customer:{
name:'VõThịMai',
phone:'0934567890',
email:'mai.vo@email.com'
}
}
];

const validateWarranty=()=>{
setIsLoading(true);

//SimulateAPIcall
setTimeout(()=>{
const vehicle=vehicleDatabas e.find(v=>v.vin.toLowerCas e()===vinSearch.toLowerCas e());

if(!vehicle){
setValidationResult({
vin:vinSearch,
model:'Unknown',
year:'Unknown',
purchas eDate:'',
warrantyStartDate:'',
warrantyEndDate:'',
mileage:0,
maxMileage:0,
warrantyStatus:'not_found',
customer:{
name:'Unknown',
phone:'Unknown',
email:'Unknown'
}
});
toast({
title:"Xekhôngtìmthấy",
description:"VINkhôngcótronghệthống.Vuilòngkiểmtralại.",
variant:"destructive"
});
}else{
//Checkwarrantystatus
const today=newDate();
const warrantyEnd=newDate(vehicle.warrantyEndDate);
const timeExpired=today>warrantyEnd;
const mileageExpired=vehicle.mileage>vehicle.maxMileage;

letstatus:VehicleWarrantyInfo['warrantyStatus']='valid';
if(timeExpired)status='expired_time';
elseif(mileageExpired)status='expired_mileage';

const updatedVehicle={...vehicle,warrantyStatus:status};
setValidationResult(updatedVehicle);

if(status==='valid'){
toast({
title:"Xecònbảohành",
description:`${vehicle.model}của${vehicle.customer.name}còntrongthờigianbảohành.`
});
}else{
const reas on=status==='expired_time''hếtthờigianbảohành':'vượtquásốkmchophép';
toast({
title:"Xehếtbảohành",
description:`${vehicle.model}đã${reas on}.Gợiýkháchhànggiahạnbảohành.`,
variant:"destructive"
});
}
}
setIsLoading(false);
},1500);
};

const getWarrantyStatusBadge=(status:VehicleWarrantyInfo['warrantyStatus'])=>{
switch(status){
cas e'valid':
return<Badgevariant="success" clas sName="flexitems-centergap-1"><CheckCircleclas sName=" h-3w-3"/>Cònbảohành</Badge>;
cas e'expired_time':
return<Badgevariant="destructive" clas sName="flexitems-centergap-1"><Clockclas sName=" h-3w-3"/>Hếthạn(thờigian)</Badge>;
cas e'expired_mileage':
return<Badgevariant="destructive" clas sName="flexitems-centergap-1"><AlertTriangleclas sName=" h-3w-3"/>Hếthạn(km)</Badge>;
cas e'not_found':
return<Badgevariant="secondary" clas sName="flexitems-centergap-1"><AlertTriangleclas sName=" h-3w-3"/>Khôngtìmthấy</Badge>;
default:
returnnull;
}
};

const handleProceed=()=>{
if(validationResult){
onValidationComplete(validationResult);
}
};

return(
<divclas sName="fixedinset-0bg-black/50flexitems-centerjustify-centerp-4z-50">
<Cardclas sName="w-fullmax-w-3xl">
<CardHeader>
<CardTitleclas sName="flexitems-centergap-2">
<Carclas sName="h-5w-5text-primary"/>
Kiểmtrabảohànhxe
</CardTitle>
<CardDescription>
NhậpmãVINđểkiểmtratìnhtrạngbảohànhcủaxe
</CardDescription>
</CardHeader>
<CardContentclas sName="space-y-6">
<div>
<LabelhtmlFor="vin-input">MãVIN</Label>
<divclas sName="flexgap-2mt-2">
<Input
id="vin-input"
placeholder="NhậpmãVIN(vídụ:1HGBH41JXMN109186)"
value={vinSearch}
onChange={(e)=>setVinSearch(e.target.value)}
clas sName="flex-1"
/>
<Button
onClick={validateWarranty}
disabled={!vinSearch.trim()||isLoading}
>
<Searchclas sName="h-4w-4mr-2"/>
{isLoading'Đangkiểmtra...':'Kiểmtra'}
</Button>
</div>
</div>

{/*DemoVINs*/}
<Cardclas sName="bg-accent/20">
<CardContentclas sName="pt-4">
<pclas sName="font-mediummb-2">MãVINdemo:</p>
<divclas sName="flexflex-wrapgap-2">
{vehicleDatabas e.map((vehicle)=>(
<Badge
key={vehicle.vin}
variant="outline"
clas sName="cursor-pointerhover:bg-primaryhover:text-primary-foreground"
onClick={()=>setVinSearch(vehicle.vin)}
>
{vehicle.vin}
</Badge>
))}
</div>
</CardContent>
</Card>

{/*ValidationResult*/}
{validationResult&&(
<Cardclas sName={`border-2${
validationResult.warrantyStatus==='valid'
'border-green-200'
:validationResult.warrantyStatus==='not_found'
'border-gray-200'
:'border-red-200'
}`}>
<CardHeader>
<divclas sName="flexitems-centerjustify-between">
<CardTitleclas sName="text-bas e">Kếtquảkiểmtra</CardTitle>
{getWarrantyStatusBadge(validationResult.warrantyStatus)}
</div>
</CardHeader>
<CardContent>
{validationResult.warrantyStatus!=='not_found'(
<divclas sName="gridmd:grid-cols-2gap-4">
<divclas sName="space-y-3">
<h4clas sName="font-medium">Thôngtinxe</h4>
<divclas sName="text-smspace-y-1">
<p><strong>VIN:</strong>{validationResult.vin}</p>
<p><strong>Model:</strong>{validationResult.model}</p>
<p><strong>Năm:</strong>{validationResult.year}</p>
<p><strong>Ngàymua:</strong>{newDate(validationResult.purchas eDate).toLocaleDateString('vi-VN')}</p>
</div>
</div>
<divclas sName="space-y-3">
<h4clas sName="font-medium">Thôngtinkháchhàng</h4>
<divclas sName="text-smspace-y-1">
<p><strong>Tên:</strong>{validationResult.customer.name}</p>
<p><strong>SĐT:</strong>{validationResult.customer.phone}</p>
<p><strong>Email:</strong>{validationResult.customer.email}</p>
</div>
</div>
<divclas sName="md:col-span-2space-y-3">
<h4clas sName="font-medium">Tìnhtrạngbảohành</h4>
<divclas sName="gridmd:grid-cols-2gap-4text-sm">
<div>
<p><strong>Bắtđầu:</strong>{newDate(validationResult.warrantyStartDate).toLocaleDateString('vi-VN')}</p>
<p><strong>Kếtthúc:</strong>{newDate(validationResult.warrantyEndDate).toLocaleDateString('vi-VN')}</p>
</div>
<div>
<p><strong>Kmhiệntại:</strong>{validationResult.mileage.toLocaleString('vi-VN')}km</p>
<p><strong>Kmtốiđa:</strong>{validationResult.maxMileage.toLocaleString('vi-VN')}km</p>
</div>
</div>
</div>
</div>
):(
<divclas sName="text-centerpy-8">
<AlertTriangleclas sName="h-12w-12mx-automb-4text-muted-foreground"/>
<pclas sName="text-muted-foreground">
KhôngtìmthấythôngtinxevớiVIN:<strong>{validationResult.vin}</strong>
</p>
<pclas sName="text-smtext-muted-foregroundmt-2">
Vuilòngliênhệbộphậnhỗtrợđểđượctrợgiúp.
</p>
</div>
)}

{/*Recommendations*/}
{validationResult.warrantyStatus==='expired_time'&&(
<divclas sName="mt-4p-4bg-amber-50borderborder-amber-200rounded-lg">
<h5clas sName="font-mediumtext-amber-800mb-2">Gợiýchokháchhàng:</h5>
<pclas sName="text-smtext-amber-700">
Xeđãhếtthờigianbảohành.Kháchhàngcóthểgiahạnbảohànhmởrộng
hoặcsửdụngdịchvụsửachữatrảphí.
</p>
</div>
)}
{validationResult.warrantyStatus==='expired_mileage'&&(
<divclas sName="mt-4p-4bg-amber-50borderborder-amber-200rounded-lg">
<h5clas sName="font-mediumtext-amber-800mb-2">Gợiýchokháchhàng:</h5>
<pclas sName="text-smtext-amber-700">
Xeđãvượtquásốkmbảohànhchophép.Kháchhàngcóthểgiahạnbảohành
theokmhoặcsửdụngdịchvụsửachữatrảphí.
</p>
</div>
)}
</CardContent>
</Card>
)}

<divclas sName="flexjustify-between">
<Buttonvariant="outline" onClick={onClose}>
Hủy
</Button>
<Button
onClick={handleProceed}
disabled={!validationResult||validationResult.warrantyStatus==='not_found'}
>
{validationResult.warrantyStatus==='valid'
'Tiếptụctạoyêucầubảohành'
:'Ghinhậnyêucầu'}
</Button>
</div>
</CardContent>
</Card>
</div>
);
};

exportdefaultWarrantyValidator;