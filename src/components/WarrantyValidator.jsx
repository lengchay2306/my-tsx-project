import { useState } from'react';
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from'@/components/ui/card';
import { Button } from'@/components/ui/button';
import { Input } from'@/components/ui/input';
import { Label } from'@/components/ui/label';
import { Badge } from'@/components/ui/badge';
import { useToast } from'@/hooks/use-toast';
import { Search,Car,Clock,AlertTriangle,CheckCircle,Calendar } from'lucide-react';

interfaceVehicleWarrantyInfo{
vin:string;
model:string;
year:string;
purchaseDate:string;
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

//Mockvehiclewarrantydatabase
constvehicleDatabase:VehicleWarrantyInfo[]=[
{
vin:'1HGBH41JXMN109186',
model:'EVModelXPro',
year:'2023',
purchaseDate:'2023-03-15',
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
purchaseDate:'2022-01-20',
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
purchaseDate:'2020-06-10',
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
purchaseDate:'2021-08-15',
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
const vehicle=vehicleDatabase.find(v=>v.vin.toLowerCase()===vinSearch.toLowerCase());

if(!vehicle){
setValidationResult({
vin:vinSearch,
model:'Unknown',
year:'Unknown',
purchaseDate:'',
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
const reason=status==='expired_time''hếtthờigianbảohành':'vượtquásốkmchophép';
toast({
title:"Xehếtbảohành",
description:`${vehicle.model}đã${reason}.Gợiýkháchhànggiahạnbảohành.`,
variant:"destructive"
});
}
}
setIsLoading(false);
},1500);
};

const getWarrantyStatusBadge=(status:VehicleWarrantyInfo['warrantyStatus'])=>{
switch(status){
case'valid':
return<Badgevariant="success"className="flexitems-centergap-1"><CheckCircleclassName="h-3w-3"/>Cònbảohành</Badge>;
case'expired_time':
return<Badgevariant="destructive"className="flexitems-centergap-1"><ClockclassName="h-3w-3"/>Hếthạn(thờigian)</Badge>;
case'expired_mileage':
return<Badgevariant="destructive"className="flexitems-centergap-1"><AlertTriangleclassName="h-3w-3"/>Hếthạn(km)</Badge>;
case'not_found':
return<Badgevariant="secondary"className="flexitems-centergap-1"><AlertTriangleclassName="h-3w-3"/>Khôngtìmthấy</Badge>;
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
<divclassName="fixedinset-0bg-black/50flexitems-centerjustify-centerp-4z-50">
<CardclassName="w-fullmax-w-3xl">
<CardHeader>
<CardTitleclassName="flexitems-centergap-2">
<CarclassName="h-5w-5text-primary"/>
Kiểmtrabảohànhxe
</CardTitle>
<CardDescription>
NhậpmãVINđểkiểmtratìnhtrạngbảohànhcủaxe
</CardDescription>
</CardHeader>
<CardContentclassName="space-y-6">
<div>
<LabelhtmlFor="vin-input">MãVIN</Label>
<divclassName="flexgap-2mt-2">
<Input
id="vin-input"
placeholder="NhậpmãVIN(vídụ:1HGBH41JXMN109186)"
value={vinSearch}
onChange={(e)=>setVinSearch(e.target.value)}
className="flex-1"
/>
<Button
onClick={validateWarranty}
disabled={!vinSearch.trim()||isLoading}
>
<SearchclassName="h-4w-4mr-2"/>
{isLoading'Đangkiểmtra...':'Kiểmtra'}
</Button>
</div>
</div>

{/*DemoVINs*/}
<CardclassName="bg-accent/20">
<CardContentclassName="pt-4">
<pclassName="font-mediummb-2">MãVINdemo:</p>
<divclassName="flexflex-wrapgap-2">
{vehicleDatabase.map((vehicle)=>(
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
</CardContent>
</Card>

{/*ValidationResult*/}
{validationResult&&(
<CardclassName={`border-2${
validationResult.warrantyStatus==='valid'
'border-green-200'
:validationResult.warrantyStatus==='not_found'
'border-gray-200'
:'border-red-200'
}`}>
<CardHeader>
<divclassName="flexitems-centerjustify-between">
<CardTitleclassName="text-base">Kếtquảkiểmtra</CardTitle>
{getWarrantyStatusBadge(validationResult.warrantyStatus)}
</div>
</CardHeader>
<CardContent>
{validationResult.warrantyStatus!=='not_found'(
<divclassName="gridmd:grid-cols-2gap-4">
<divclassName="space-y-3">
<h4className="font-medium">Thôngtinxe</h4>
<divclassName="text-smspace-y-1">
<p><strong>VIN:</strong>{validationResult.vin}</p>
<p><strong>Model:</strong>{validationResult.model}</p>
<p><strong>Năm:</strong>{validationResult.year}</p>
<p><strong>Ngàymua:</strong>{newDate(validationResult.purchaseDate).toLocaleDateString('vi-VN')}</p>
</div>
</div>
<divclassName="space-y-3">
<h4className="font-medium">Thôngtinkháchhàng</h4>
<divclassName="text-smspace-y-1">
<p><strong>Tên:</strong>{validationResult.customer.name}</p>
<p><strong>SĐT:</strong>{validationResult.customer.phone}</p>
<p><strong>Email:</strong>{validationResult.customer.email}</p>
</div>
</div>
<divclassName="md:col-span-2space-y-3">
<h4className="font-medium">Tìnhtrạngbảohành</h4>
<divclassName="gridmd:grid-cols-2gap-4text-sm">
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
<divclassName="text-centerpy-8">
<AlertTriangleclassName="h-12w-12mx-automb-4text-muted-foreground"/>
<pclassName="text-muted-foreground">
KhôngtìmthấythôngtinxevớiVIN:<strong>{validationResult.vin}</strong>
</p>
<pclassName="text-smtext-muted-foregroundmt-2">
Vuilòngliênhệbộphậnhỗtrợđểđượctrợgiúp.
</p>
</div>
)}

{/*Recommendations*/}
{validationResult.warrantyStatus==='expired_time'&&(
<divclassName="mt-4p-4bg-amber-50borderborder-amber-200rounded-lg">
<h5className="font-mediumtext-amber-800mb-2">Gợiýchokháchhàng:</h5>
<pclassName="text-smtext-amber-700">
Xeđãhếtthờigianbảohành.Kháchhàngcóthểgiahạnbảohànhmởrộng
hoặcsửdụngdịchvụsửachữatrảphí.
</p>
</div>
)}
{validationResult.warrantyStatus==='expired_mileage'&&(
<divclassName="mt-4p-4bg-amber-50borderborder-amber-200rounded-lg">
<h5className="font-mediumtext-amber-800mb-2">Gợiýchokháchhàng:</h5>
<pclassName="text-smtext-amber-700">
Xeđãvượtquásốkmbảohànhchophép.Kháchhàngcóthểgiahạnbảohành
theokmhoặcsửdụngdịchvụsửachữatrảphí.
</p>
</div>
)}
</CardContent>
</Card>
)}

<divclassName="flexjustify-between">
<Buttonvariant="outline"onClick={onClose}>
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