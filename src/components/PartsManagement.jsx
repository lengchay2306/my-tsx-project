import { useState } from'react';
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from'@/components/ui/card';
import { Button } from'@/components/ui/button';
import { Badge } from'@/components/ui/badge';
import { Input } from'@/components/ui/input';
import { Label } from'@/components/ui/label';
import { Textarea } from'@/components/ui/textarea';
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from'@/components/ui/select';
import { Tabs,TabsContent,TabsList,TabsTrigger } from'@/components/ui/tabs';
import { useToast } from'@/hooks/use-toast';
import { 
Package,
Plus,
Edit,
Trash2,
Search,
AlertTriangle,
CheckCircle,
TrendingUp,
TrendingDown,
Truck,
Eye,
Download
 } from'lucide-react';

interfacePart{
id:string;
partCode:string;
partName:string;
category:string;
compatibleModels:string[];
description:string;
unitPrice:number;
currentStock:number;
minStock:number;
maxStock:number;
supplier:string;
leadTime:number;//days
status:'active'|'discontinued'|'development';
lastUpdated:string;
stockMovements:StockMovement[];
}

interfaceStockMovement{
id:string;
type:'in'|'out';
quantity:number;
reason:string;
date:string;
reference:string;
}

interfacePartsManagementProps{
onClose:()=>void;
}

const PartsManagement=({onClose}:PartsManagementProps)=>{
const[searchTerm,setSearchTerm]=useState('');
const[selectedCategory,setSelectedCategory]=useState('all');
const[showAddForm,setShowAddForm]=useState(false);
const[showEditForm,setShowEditForm]=useState(false);
const[selectedPart,setSelectedPart]=useState<Part|null>(null);
const{toast}=useToast();

//Formstate
const[formData,setFormData]=useState({
partCode:'',
partName:'',
category:'',
compatibleModels:[]asstring[],
description:'',
unitPrice:'',
currentStock:'',
minStock:'',
maxStock:'',
supplier:'',
leadTime:''
});

//Mockdata
constparts:Part[]=[
{
id:'P001',
partCode:'BAT-XP-001',
partName:'BatteryModuleMain-EVModelXPro',
category:'BatterySystem',
compatibleModels:['EVModelXPro2023','EVModelXPro2024'],
description:'High-capacitylithium-ionbatterymoduleformainpowersystem',
unitPrice:15000000,
currentStock:45,
minStock:20,
maxStock:100,
supplier:'BatteryTechVietnam',
leadTime:14,
status:'active',
lastUpdated:'2024-01-15',
stockMovements:[
{id:'SM001',type:'out',quantity:5,reason:'Warrantyclaim',date:'2024-01-15',reference:'WC-2024-001'},
{id:'SM002',type:'in',quantity:20,reason:'Stockreplenishment',date:'2024-01-10',reference:'PO-2024-015'}
]
},
{
id:'P002',
partCode:'CTRL-CP-001',
partName:'MotorControllerUnit-EVCompact',
category:'MotorControl',
compatibleModels:['EVCompactPlus2022','EVCompactPlus2023'],
description:'Advancedmotorcontrolunitwithregenerativebraking',
unitPrice:8000000,
currentStock:78,
minStock:30,
maxStock:150,
supplier:'MotorControlSystems',
leadTime:10,
status:'active',
lastUpdated:'2024-01-14',
stockMovements:[
{id:'SM003',type:'out',quantity:3,reason:'Warrantyclaim',date:'2024-01-14',reference:'WC-2024-002'},
{id:'SM004',type:'in',quantity:50,reason:'Stockreplenishment',date:'2024-01-05',reference:'PO-2024-012'}
]
},
{
id:'P003',
partCode:'CHG-PORT-V2',
partName:'ChargingPortAssemblyV2',
category:'ChargingSystem',
compatibleModels:['EVModelXPro2023','EVCompactPlus2023','EVSportSeries2023'],
description:'Universalfast-chargingportwithweathersealing',
unitPrice:3200000,
currentStock:234,
minStock:50,
maxStock:300,
supplier:'ChargeTechInternational',
leadTime:7,
status:'active',
lastUpdated:'2024-01-16',
stockMovements:[
{id:'SM005',type:'out',quantity:12,reason:'Preventivemaintenance',date:'2024-01-12',reference:'PM-2024-008'}
]
},
{
id:'P004',
partCode:'DISP-UNIT-HD',
partName:'HDDisplayUnit12.3inch',
category:'Electronics',
compatibleModels:['EVModelXPro2024','EVSportSeries2023'],
description:'High-definitiontouchscreendisplayunit',
unitPrice:5500000,
currentStock:15,
minStock:25,
maxStock:80,
supplier:'DisplayTechCorp',
leadTime:21,
status:'active',
lastUpdated:'2024-01-13',
stockMovements:[
{id:'SM006',type:'out',quantity:8,reason:'Warrantyclaim',date:'2024-01-10',reference:'WC-2024-005'}
]
}
];

const categories=[
'BatterySystem',
'MotorControl',
'ChargingSystem',
'Electronics',
'CoolingSystem',
'SafetySystems',
'Body&Interior',
'Suspension',
'BrakingSystem'
];

const vehicleModels=[
'EVModelXPro2024',
'EVModelXPro2023',
'EVCompactPlus2023',
'EVCompactPlus2022',
'EVSportSeries2023',
'EVSportSeries2022',
'EVCityMini2023',
'EVCityMini2022'
];

const filteredParts=parts.filter(part=>{
const matchesSearch=part.partName.toLowerCase().includes(searchTerm.toLowerCase())||
part.partCode.toLowerCase().includes(searchTerm.toLowerCase());
const matchesCategory=selectedCategory==='all'||part.category===selectedCategory;
returnmatchesSearch&&matchesCategory;
});

const lowStockParts=parts.filter(part=>part.currentStock<=part.minStock);

const handleAddPart=()=>{
if(!formData.partCode||!formData.partName||!formData.category){
toast({
title:"Lỗi",
description:"Vuilòngđiềnđầyđủthôngtinbắtbuộc.",
variant:"destructive"
});
return;
}

//Inrealapp,submittoAPI
console.log('Addingpart:',formData);

toast({
title:"Thêmphụtùngthànhcông",
description:`Phụtùng${formData.partName}đãđượcthêmvàohệthống.`
});

setShowAddForm(false);
resetForm();
};

const handleEditPart=()=>{
if(!selectedPart)return;

//Inrealapp,submittoAPI
console.log('Updatingpart:',selectedPart.id,formData);

toast({
title:"Cậpnhậtthànhcông",
description:`Thôngtinphụtùngđãđượccậpnhật.`
});

setShowEditForm(false);
setSelectedPart(null);
resetForm();
};

const handleDeletePart=(partId))=>{
if(confirm('Bạncóchắcchắnmuốnxóaphụtùngnày')){
//Inrealapp,callAPI
console.log('Deletingpart:',partId);

toast({
title:"Đãxóaphụtùng",
description:"Phụtùngđãđượcxóakhỏihệthống."
});
}
};

const resetForm=()=>{
setFormData({
partCode:'',
partName:'',
category:'',
compatibleModels:[],
description:'',
unitPrice:'',
currentStock:'',
minStock:'',
maxStock:'',
supplier:'',
leadTime:''
});
};

const openEditForm=(part:Part)=>{
setSelectedPart(part);
setFormData({
partCode:part.partCode,
partName:part.partName,
category:part.category,
compatibleModels:part.compatibleModels,
description:part.description,
unitPrice:part.unitPrice.toString(),
currentStock:part.currentStock.toString(),
minStock:part.minStock.toString(),
maxStock:part.maxStock.toString(),
supplier:part.supplier,
leadTime:part.leadTime.toString()
});
setShowEditForm(true);
};

const getStockStatus=(part:Part)=>{
if(part.currentStock<=part.minStock){
return{status:'low',color:'destructive',icon:AlertTriangle,text:'Thiếuhàng'};
}elseif(part.currentStock>=part.maxStock*0.8){
return{status:'high',color:'success',icon:CheckCircle,text:'Đầyđủ'};
}else{
return{status:'normal',color:'secondary',icon:Package,text:'Bìnhthường'};
}
};

const formatCurrency=(amount))=>{
returnnewIntl.NumberFormat('vi-VN',{
style:'currency',
currency:'VND',
minimumFractionDigits:0
}).format(amount);
};

const PartForm=({isEdit=false}:{isEdit:boolean})=>(
<divclassName="fixedinset-0bg-black/50flexitems-centerjustify-centerp-4z-50">
<CardclassName="w-fullmax-w-4xlmax-h-[90vh]overflow-hidden">
<CardHeader>
<CardTitle>{isEdit'Chỉnhsửa':'Thêm'}phụtùng</CardTitle>
<CardDescription>
{isEdit'Cậpnhậtthôngtinphụtùng':'Thêmphụtùngmớivàokho'}
</CardDescription>
</CardHeader>

<CardContentclassName="overflow-y-automax-h-[calc(90vh-200px)]space-y-6">
<divclassName="gridgrid-cols-2gap-4">
<divclassName="space-y-2">
<LabelhtmlFor="partCode">Mãphụtùng*</Label>
<Input
id="partCode"
placeholder="Vídụ:BAT-XP-001"
value={formData.partCode}
onChange={(e)=>setFormData(prev=>({...prev,partCode:e.target.value}))}
disabled={isEdit}
/>
</div>

<divclassName="space-y-2">
<LabelhtmlFor="category">Danhmục*</Label>
<Selectvalue={formData.category}onValueChange={(value)=>
setFormData(prev=>({...prev,category:value}))
}>
<SelectTrigger>
<SelectValueplaceholder="Chọndanhmục"/>
</SelectTrigger>
<SelectContent>
{categories.map(category=>(
<SelectItemkey={category}value={category}>{category}</SelectItem>
))}
</SelectContent>
</Select>
</div>
</div>

<divclassName="space-y-2">
<LabelhtmlFor="partName">Tênphụtùng*</Label>
<Input
id="partName"
placeholder="Nhậptênphụtùng..."
value={formData.partName}
onChange={(e)=>setFormData(prev=>({...prev,partName:e.target.value}))}
/>
</div>

<divclassName="space-y-2">
<Label>Dòngxetươngthích</Label>
<divclassName="gridgrid-cols-2gap-2">
{vehicleModels.map((model)=>(
<divkey={model}className="flexitems-centerspace-x-2">
<input
type="checkbox"
checked={formData.compatibleModels.includes(model)}
onChange={(e)=>{
if(e.target.checked){
setFormData(prev=>({
...prev,
compatibleModels:[...prev.compatibleModels,model]
}));
}else{
setFormData(prev=>({
...prev,
compatibleModels:prev.compatibleModels.filter(m=>m!==model)
}));
}
}}
/>
<labelclassName="text-sm">{model}</label>
</div>
))}
</div>
</div>

<divclassName="space-y-2">
<LabelhtmlFor="description">Môtả</Label>
<Textarea
id="description"
placeholder="Môtảchitiếtvềphụtùng..."
value={formData.description}
onChange={(e)=>setFormData(prev=>({...prev,description:e.target.value}))}
rows={3}
/>
</div>

<divclassName="gridgrid-cols-2gap-4">
<divclassName="space-y-2">
<LabelhtmlFor="unitPrice">Đơngiá(VND)*</Label>
<Input
id="unitPrice"
type="number"
placeholder="0"
value={formData.unitPrice}
onChange={(e)=>setFormData(prev=>({...prev,unitPrice:e.target.value}))}
/>
</div>

<divclassName="space-y-2">
<LabelhtmlFor="supplier">Nhàcungcấp</Label>
<Input
id="supplier"
placeholder="Tênnhàcungcấp"
value={formData.supplier}
onChange={(e)=>setFormData(prev=>({...prev,supplier:e.target.value}))}
/>
</div>
</div>

<divclassName="gridgrid-cols-4gap-4">
<divclassName="space-y-2">
<LabelhtmlFor="currentStock">Tồnkhohiệntại</Label>
<Input
id="currentStock"
type="number"
placeholder="0"
value={formData.currentStock}
onChange={(e)=>setFormData(prev=>({...prev,currentStock:e.target.value}))}
/>
</div>

<divclassName="space-y-2">
<LabelhtmlFor="minStock">Tồnkhotốithiểu</Label>
<Input
id="minStock"
type="number"
placeholder="0"
value={formData.minStock}
onChange={(e)=>setFormData(prev=>({...prev,minStock:e.target.value}))}
/>
</div>

<divclassName="space-y-2">
<LabelhtmlFor="maxStock">Tồnkhotốiđa</Label>
<Input
id="maxStock"
type="number"
placeholder="0"
value={formData.maxStock}
onChange={(e)=>setFormData(prev=>({...prev,maxStock:e.target.value}))}
/>
</div>

<divclassName="space-y-2">
<LabelhtmlFor="leadTime">Thờigiangiao(ngày)</Label>
<Input
id="leadTime"
type="number"
placeholder="0"
value={formData.leadTime}
onChange={(e)=>setFormData(prev=>({...prev,leadTime:e.target.value}))}
/>
</div>
</div>
</CardContent>

<divclassName="flexjustify-betweenp-6border-t">
<Buttonvariant="outline"onClick={()=>{
isEditsetShowEditForm(false):setShowAddForm(false);
setSelectedPart(null);
resetForm();
}}>
Hủy
</Button>
<ButtononClick={isEdithandleEditPart:handleAddPart}>
{isEdit'Cậpnhật':'Thêmphụtùng'}
</Button>
</div>
</Card>
</div>
);

return(
<divclassName="fixedinset-0bg-black/50flexitems-centerjustify-centerp-4z-50">
<CardclassName="w-fullmax-w-7xlmax-h-[90vh]overflow-hidden">
<CardHeader>
<divclassName="flexitems-centerjustify-between">
<div>
<CardTitleclassName="flexitems-centergap-2">
<PackageclassName="h-5w-5text-primary"/>
QuảnlýPhụtùng&Kho
</CardTitle>
<CardDescription>
Quảnlýtồnkho,cậpnhậtgiávàtheodõicảnhbáothiếuhàng
</CardDescription>
</div>
<divclassName="flexgap-2">
<Buttonvariant="outline"onClick={onClose}>Đóng</Button>
<ButtononClick={()=>setShowAddForm(true)}>
<PlusclassName="h-4w-4mr-2"/>
Thêmphụtùng
</Button>
</div>
</div>
</CardHeader>

<CardContentclassName="overflow-y-automax-h-[calc(90vh-200px)]">
<TabsdefaultValue="inventory"className="space-y-6">
<TabsListclassName="gridw-fullgrid-cols-4">
<TabsTriggervalue="inventory">Khohàng</TabsTrigger>
<TabsTriggervalue="alerts">Cảnhbáothiếu</TabsTrigger>
<TabsTriggervalue="movements">Xuấtnhậpkho</TabsTrigger>
<TabsTriggervalue="analytics">Phântích</TabsTrigger>
</TabsList>

<TabsContentvalue="inventory"className="space-y-4">
{/*Filters*/}
<divclassName="flexgap-4">
<divclassName="relativeflex-1max-w-md">
<SearchclassName="absoluteleft-3top-3h-4w-4text-muted-foreground"/>
<Input
placeholder="Tìmtheotênhoặcmãphụtùng..."
value={searchTerm}
onChange={(e)=>setSearchTerm(e.target.value)}
className="pl-10"
/>
</div>
<Selectvalue={selectedCategory}onValueChange={setSelectedCategory}>
<SelectTriggerclassName="w-48">
<SelectValue/>
</SelectTrigger>
<SelectContent>
<SelectItemvalue="all">Tấtcảdanhmục</SelectItem>
{categories.map(category=>(
<SelectItemkey={category}value={category}>{category}</SelectItem>
))}
</SelectContent>
</Select>
</div>

{/*PartsList*/}
<divclassName="space-y-4">
{filteredParts.map((part)=>{
const stockStatus=getStockStatus(part);
const StatusIcon=stockStatus.icon;

return(
<Cardkey={part.id}className="border">
<CardContentclassName="pt-4">
<divclassName="flexjustify-betweenitems-start">
<divclassName="flex-1">
<divclassName="flexitems-centergap-3mb-2">
<h3className="font-semibold">{part.partName}</h3>
<Badgevariant="outline">{part.partCode}</Badge>
<Badgevariant={stockStatus.colorasany}>
<StatusIconclassName="h-3w-3mr-1"/>
{stockStatus.text}
</Badge>
</div>

<pclassName="text-smtext-muted-foregroundmb-3">{part.description}</p>

<divclassName="gridgrid-cols-5gap-4text-sm">
<div>
<pclassName="font-medium">Danhmục</p>
<pclassName="text-muted-foreground">{part.category}</p>
</div>
<div>
<pclassName="font-medium">Tồnkho</p>
<pclassName="text-muted-foreground">{part.currentStock}/{part.maxStock}</p>
</div>
<div>
<pclassName="font-medium">Đơngiá</p>
<pclassName="text-muted-foreground">{formatCurrency(part.unitPrice)}</p>
</div>
<div>
<pclassName="font-medium">Nhàcungcấp</p>
<pclassName="text-muted-foreground">{part.supplier}</p>
</div>
<div>
<pclassName="font-medium">Leadtime</p>
<pclassName="text-muted-foreground">{part.leadTime}ngày</p>
</div>
</div>

<divclassName="mt-3">
<pclassName="text-smfont-mediummb-1">Tươngthích:</p>
<divclassName="flexflex-wrapgap-1">
{part.compatibleModels.map(model=>(
<Badgekey={model}variant="secondary"className="text-xs">{model}</Badge>
))}
</div>
</div>
</div>

<divclassName="flexgap-2ml-4">
<Buttonvariant="outline"size="sm"onClick={()=>setSelectedPart(part)}>
<EyeclassName="h-3w-3mr-1"/>
Chitiết
</Button>
<Buttonvariant="outline"size="sm"onClick={()=>openEditForm(part)}>
<EditclassName="h-3w-3mr-1"/>
Sửa
</Button>
<Button
variant="outline"
size="sm"
onClick={()=>handleDeletePart(part.id)}
>
<Trash2className="h-3w-3mr-1"/>
Xóa
</Button>
</div>
</div>
</CardContent>
</Card>
);
})}
</div>
</TabsContent>

<TabsContentvalue="alerts"className="space-y-4">
<CardclassName="border-destructive">
<CardHeader>
<CardTitleclassName="flexitems-centergap-2text-destructive">
<AlertTriangleclassName="h-5w-5"/>
Cảnhbáothiếuhàng({lowStockParts.length}phụtùng)
</CardTitle>
</CardHeader>
<CardContentclassName="space-y-4">
{lowStockParts.map((part)=>(
<divkey={part.id}className="flexitems-centerjustify-betweenp-4borderborder-destructive/20rounded">
<div>
<h3className="font-medium">{part.partName}</h3>
<pclassName="text-smtext-muted-foreground">Mã:{part.partCode}</p>
<pclassName="text-sm">
<spanclassName="text-destructivefont-medium">Còn:{part.currentStock}</span>/
Tốithiểu:{part.minStock}
</p>
</div>
<divclassName="flexgap-2">
<Buttonsize="sm"variant="outline">
<TruckclassName="h-3w-3mr-1"/>
Đặthàng
</Button>
<Buttonsize="sm">
LiênhệNCC
</Button>
</div>
</div>
))}

{lowStockParts.length===0&&(
<divclassName="text-centerpy-8">
<CheckCircleclassName="h-12w-12mx-automb-4text-success"/>
<pclassName="text-muted-foreground">Tấtcảphụtùngđềuđủhàng</p>
</div>
)}
</CardContent>
</Card>
</TabsContent>

<TabsContentvalue="movements"className="space-y-4">
<Card>
<CardHeader>
<CardTitle>Lịchsửxuấtnhậpkho</CardTitle>
<CardDescription>Theodõitấtcảhoạtđộngxuấtnhậpkho</CardDescription>
</CardHeader>
<CardContent>
<divclassName="space-y-4">
{parts.flatMap(part=>
part.stockMovements.map(movement=>(
<divkey={movement.id}className="flexitems-centerjustify-betweenp-3borderrounded">
<divclassName="flexitems-centergap-4">
<divclassName={`p-2rounded${
movement.type==='in''bg-success/20':'bg-destructive/20'
}`}>
{movement.type==='in'
<TrendingUpclassName="h-4w-4text-success"/>:
<TrendingDownclassName="h-4w-4text-destructive"/>
}
</div>
<div>
<pclassName="font-medium">{part.partName}</p>
<pclassName="text-smtext-muted-foreground">
{movement.type==='in''Nhập':'Xuất'}{movement.quantity}cái-{movement.reason}
</p>
<pclassName="text-xstext-muted-foreground">
{newDate(movement.date).toLocaleDateString('vi-VN')}-Ref:{movement.reference}
</p>
</div>
</div>
</div>
))
)}
</div>
</CardContent>
</Card>
</TabsContent>

<TabsContentvalue="analytics"className="space-y-6">
<divclassName="gridgap-4md:grid-cols-4">
<Card>
<CardContentclassName="pt-6">
<divclassName="text-center">
<pclassName="text-2xlfont-bold">{parts.length}</p>
<pclassName="text-smtext-muted-foreground">Tổngphụtùng</p>
</div>
</CardContent>
</Card>
<Card>
<CardContentclassName="pt-6">
<divclassName="text-center">
<pclassName="text-2xlfont-boldtext-destructive">{lowStockParts.length}</p>
<pclassName="text-smtext-muted-foreground">Thiếuhàng</p>
</div>
</CardContent>
</Card>
<Card>
<CardContentclassName="pt-6">
<divclassName="text-center">
<pclassName="text-2xlfont-bold">{formatCurrency(parts.reduce((sum,part)=>sum+(part.unitPrice*part.currentStock),0))}</p>
<pclassName="text-smtext-muted-foreground">Giátrịtồnkho</p>
</div>
</CardContent>
</Card>
<Card>
<CardContentclassName="pt-6">
<divclassName="text-center">
<pclassName="text-2xlfont-bold">15</p>
<pclassName="text-smtext-muted-foreground">Nhàcungcấp</p>
</div>
</CardContent>
</Card>
</div>
</TabsContent>
</Tabs>
</CardContent>

{/*Modals*/}
{showAddForm&&<PartForm/>}
{showEditForm&&<PartFormisEdit={true}/>}

{/*PartDetailModal*/}
{selectedPart&&!showEditForm&&(
<divclassName="fixedinset-0bg-black/50flexitems-centerjustify-centerp-4z-[60]">
<CardclassName="w-fullmax-w-4xlmax-h-[90vh]overflow-hidden">
<CardHeader>
<divclassName="flexjustify-betweenitems-start">
<div>
<CardTitle>{selectedPart.partName}</CardTitle>
<CardDescription>Mã:{selectedPart.partCode}</CardDescription>
</div>
<Buttonvariant="outline"onClick={()=>setSelectedPart(null)}>
Đóng
</Button>
</div>
</CardHeader>

<CardContentclassName="overflow-y-automax-h-[calc(90vh-200px)]space-y-6">
<divclassName="gridgrid-cols-2gap-6">
<div>
<h4className="font-semiboldmb-2">Thôngtincơbản</h4>
<divclassName="space-y-2text-sm">
<p><strong>Danhmục:</strong>{selectedPart.category}</p>
<p><strong>Môtả:</strong>{selectedPart.description}</p>
<p><strong>Đơngiá:</strong>{formatCurrency(selectedPart.unitPrice)}</p>
<p><strong>Nhàcungcấp:</strong>{selectedPart.supplier}</p>
<p><strong>Thờigiangiao:</strong>{selectedPart.leadTime}ngày</p>
<p><strong>Cậpnhậtlầncuối:</strong>{newDate(selectedPart.lastUpdated).toLocaleDateString('vi-VN')}</p>
</div>
</div>

<div>
<h4className="font-semiboldmb-2">Tồnkho</h4>
<divclassName="space-y-2text-sm">
<p><strong>Hiệntại:</strong>{selectedPart.currentStock}</p>
<p><strong>Tốithiểu:</strong>{selectedPart.minStock}</p>
<p><strong>Tốiđa:</strong>{selectedPart.maxStock}</p>
<p><strong>Giátrịtồnkho:</strong>{formatCurrency(selectedPart.unitPrice*selectedPart.currentStock)}</p>
<divclassName="mt-3">
<pclassName="font-mediummb-1">Mứctồnkho:</p>
<divclassName="w-fullbg-mutedrounded-fullh-2">
<div
className="bg-primaryh-2rounded-full"
style={{width:`${(selectedPart.currentStock/selectedPart.maxStock)*100}%`}}
/>
</div>
</div>
</div>
</div>
</div>

<div>
<h4className="font-semiboldmb-2">Dòngxetươngthích</h4>
<divclassName="flexflex-wrapgap-2">
{selectedPart.compatibleModels.map((model)=>(
<Badgekey={model}variant="outline">{model}</Badge>
))}
</div>
</div>

<div>
<h4className="font-semiboldmb-2">Lịchsửxuấtnhậpkhogầnđây</h4>
<divclassName="space-y-2">
{selectedPart.stockMovements.map((movement)=>(
<divkey={movement.id}className="flexitems-centerjustify-betweenp-3borderrounded">
<divclassName="flexitems-centergap-3">
<divclassName={`p-1rounded${
movement.type==='in''bg-success/20':'bg-destructive/20'
}`}>
{movement.type==='in'
<TrendingUpclassName="h-3w-3text-success"/>:
<TrendingDownclassName="h-3w-3text-destructive"/>
}
</div>
<div>
<pclassName="text-smfont-medium">
{movement.type==='in''Nhập':'Xuất'}{movement.quantity}cái
</p>
<pclassName="text-xstext-muted-foreground">{movement.reason}</p>
</div>
</div>
<divclassName="text-righttext-xstext-muted-foreground">
<p>{newDate(movement.date).toLocaleDateString('vi-VN')}</p>
<p>Ref:{movement.reference}</p>
</div>
</div>
))}
</div>
</div>

<divclassName="flexgap-2">
<Buttonvariant="outline"onClick={()=>openEditForm(selectedPart)}>
<EditclassName="h-4w-4mr-2"/>
Chỉnhsửa
</Button>
<Buttonvariant="outline">
<DownloadclassName="h-4w-4mr-2"/>
Xuấtbáocáo
</Button>
<Buttonvariant="outline">
<TruckclassName="h-4w-4mr-2"/>
Đặthàng
</Button>
</div>
</CardContent>
</Card>
</div>
)}
</Card>
</div>
);
};

exportdefaultPartsManagement;