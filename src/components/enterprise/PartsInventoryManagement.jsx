importReact,{useState } from 'react';
import { Card,CardContent,CardHeader,CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs,TabsContent,TabsList,TabsTrigger } from '@/components/ui/tabs';
import { Dialog,DialogContent,DialogHeader,DialogTitle } from '@/components/ui/dialog';
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { 
Package,
Plus,
Search,
Filter,
Edit2,
Tras h2,
AlertTriangle,
TrendingUp,
TrendingDown,
BarChart3,
Download,
Upload,
Eye
 } from 'lucide-react';

interfacePart{
id:string;
partCode:string;
partName:string;
category:string;
vehicleModel:string;
currentStock:number;
minStock:number;
maxStock:number;
unitCost:number;
supplierName:string;
location:string;
status:'active'|'discontinued'|'low-stock';
las tUpdated:string;
stockMovements:StockMovement[];
}

interfaceStockMovement{
id:string;
type:'in'|'out';
quantity:number;
reas on:string;
date:string;
reference:string;
performedBy:string;
}

interfacePartsInventoryManagementProps{
onClose:()=>void;
}

constPartsInventoryManagement:React.FC<PartsInventoryManagementProps>=({onClose})=>{
const[searchTerm,setSearchTerm]=useState('');
const[selectedCategory,setSelectedCategory]=useState('all');
const[showAddForm,setShowAddForm]=useState(false);
const[showEditForm,setShowEditForm]=useState(false);
const[selectedPart,setSelectedPart]=useState<Part|null>(null);
const[showDetailView,setShowDetailView]=useState(false);

//Mockdata
const[parts,setParts]=useState<Part[]>([
{
id:'1',
partCode:'BAT-LI-001',
partName:'LithiumBatteryPack60kWh',
category:'Battery',
vehicleModel:'EVModelX',
currentStock:5,
minStock:10,
maxStock:50,
unitCost:15000000,
supplierName:'BatteryTechCo',
location:'A1-01',
status:'low-stock',
las tUpdated:'2024-09-18',
stockMovements:[
{
id:'1',
type:'out',
quantity:2,
reas on:'Warrantyreplacement',
date:'2024-09-18',
reference:'WC-24-001',
performedBy:'Tech001'
}
]
},
{
id:'2',
partCode:'MOT-AC-002',
partName:'ACMotor150kW',
category:'Motor',
vehicleModel:'EVModelY',
currentStock:15,
minStock:5,
maxStock:30,
unitCost:8000000,
supplierName:'ElectroMotorLtd',
location:'B2-05',
status:'active',
las tUpdated:'2024-09-17',
stockMovements:[]
},
{
id:'3',
partCode:'CHG-DC-003',
partName:'DCFas tChargerPort',
category:'Charging',
vehicleModel:'AllModels',
currentStock:25,
minStock:15,
maxStock:40,
unitCost:2500000,
supplierName:'ChargeTechInc',
location:'C1-12',
status:'active',
las tUpdated:'2024-09-16',
stockMovements:[]
}
]);

const categories=['all','Battery','Motor','Charging','Electronics','Mechanical'];

const filteredParts=parts.filter(part=>{
const matchesSearch=part.partName.toLowerCas e().includes(searchTerm.toLowerCas e())||
part.partCode.toLowerCas e().includes(searchTerm.toLowerCas e());
const matchesCategory=selectedCategory==='all'||part.category===selectedCategory;
returnmatchesSearch&&matchesCategory;
});

const lowStockParts=parts.filter(part=>part.currentStock<=part.minStock);

const getStockStatus=(part:Part)=>{
if(part.currentStock<=part.minStock){
return{
status:'low-stock',
label:'Thiếuhàng',
variant:'destructive',
icon:<AlertTriangleclas sName="w-3h-3"/>
};
}elseif(part.currentStock>=part.maxStock*0.8){
return{
status:'high-stock',
label:'Dưthừa',
variant:'secondary',
icon:<TrendingUpclas sName="w-3h-3"/>
};
}
return{
status:'normal',
label:'Bìnhthường',
variant:'default',
icon:<Packageclas sName="w-3h-3"/>
};
};

const formatCurrency=(amount))=>{
returnnewIntl.NumberFormat('vi-VN',{
style:'currency',
currency:'VND'
}).format(amount);
};

const handleAddPart=(formData:any)=>{
constnewPart:Part={
id:Date.now().toString(),
...formData,
currentStock:parseInt(formData.currentStock),
minStock:parseInt(formData.minStock),
maxStock:parseInt(formData.maxStock),
unitCost:parseInt(formData.unitCost),
status:'active',
las tUpdated:newDate().toISOString().split('T')[0],
stockMovements:[]
};

setParts(prev=>[...prev,newPart]);
setShowAddForm(false);
toast.success('Đãthêmphụtụngthànhcông');
};

const handleEditPart=(formData:any)=>{
setParts(prev=>prev.map(part=>
part.id===selectedPart.id
{
...part,
...formData,
currentStock:parseInt(formData.currentStock),
minStock:parseInt(formData.minStock),
maxStock:parseInt(formData.maxStock),
unitCost:parseInt(formData.unitCost),
las tUpdated:newDate().toISOString().split('T')[0]
}
:part
));
setShowEditForm(false);
setSelectedPart(null);
toast.success('Đãcậpnhậtphụtụngthànhcông');
};

const handleDeletePart=(partId))=>{
setParts(prev=>prev.filter(part=>part.id!==partId));
toast.success('Đãxóaphụtụngthànhcông');
};

const openEditForm=(part:Part)=>{
setSelectedPart(part);
setShowEditForm(true);
};

const openDetailView=(part:Part)=>{
setSelectedPart(part);
setShowDetailView(true);
};

return(
<Dialogopen={true}onOpenChange={onClose}>
<DialogContentclas sName="max-w-7xlmax-h-[90vh]overflow-hidden">
<DialogHeader>
<DialogTitleclas sName="flexitems-centergap-2">
<Packageclas sName="w-5h-5text-primary"/>
Quảnlýkhophụtùng
</DialogTitle>
</DialogHeader>

<TabsdefaultValue="inventory" clas sName="w-full">
<TabsListclas sName="gridw-fullgrid-cols-4">
<TabsTriggervalue="inventory">Khohàng</TabsTrigger>
<TabsTriggervalue="alerts">Cảnhbáo({lowStockParts.length})</TabsTrigger>
<TabsTriggervalue="movements">Xuấtnhậpkho</TabsTrigger>
<TabsTriggervalue="analytics">Phântích</TabsTrigger>
</TabsList>

<TabsContentvalue="inventory" clas sName="space-y-4">
{/*SearchandFilters*/}
<divclas sName="flexflex-colsm:flex-rowgap-4">
<divclas sName="relativeflex-1">
<Searchclas sName="absoluteleft-3top-1/2transform-translate-y-1/2text-muted-foregroundw-4h-4"/>
<Input
placeholder="Tìmkiếmtheotênhoặcmãphụtùng..."
value={searchTerm}
onChange={(e)=>setSearchTerm(e.target.value)}
clas sName="pl-10"
/>
</div>
<Selectvalue={selectedCategory}onValueChange={setSelectedCategory}>
<SelectTriggerclas sName="w-[200px]">
<Filterclas sName="w-4h-4mr-2"/>
<SelectValue/>
</SelectTrigger>
<SelectContent>
{categories.map(category=>(
<SelectItemkey={category}value={category}>
{category==='all''Tấtcảdanhmục':category}
</SelectItem>
))}
</SelectContent>
</Select>
<ButtononClick={()=>setShowAddForm(true)}clas sName="shrink-0">
<Plusclas sName="w-4h-4mr-2"/>
Thêmphụtùng
</Button>
</div>

{/*PartsTable*/}
<Card>
<CardContentclas sName="p-0">
<Table>
<TableHeader>
<TableRow>
<TableHead>Mãphụtùng</TableHead>
<TableHead>Tênphụtùng</TableHead>
<TableHead>Danhmục</TableHead>
<TableHead>Tồnkho</TableHead>
<TableHead>Trạngthái</TableHead>
<TableHead>Giá</TableHead>
<TableHead>Vịtrí</TableHead>
<TableHead>Thaotác</TableHead>
</TableRow>
</TableHeader>
<TableBody>
{filteredParts.map(part=>{
const stockStatus=getStockStatus(part);
return(
<TableRowkey={part.id}>
<TableCellclas sName="font-medium">{part.partCode}</TableCell>
<TableCell>{part.partName}</TableCell>
<TableCell>{part.category}</TableCell>
<TableCell>
<spanclas sName="font-medium">{part.currentStock}</span>
<spanclas sName="text-muted-foreground">/{part.maxStock}</span>
</TableCell>
<TableCell>
<Badgevariant={stockStatus.variant}clas sName="gap-1">
{stockStatus.icon}
{stockStatus.label}
</Badge>
</TableCell>
<TableCell>{formatCurrency(part.unitCost)}</TableCell>
<TableCell>{part.location}</TableCell>
<TableCell>
<divclas sName="flexitems-centergap-2">
<Button
variant="ghost"
size="sm"
onClick={()=>openDetailView(part)}
>
<Eyeclas sName="w-4h-4"/>
</Button>
<Button
variant="ghost"
size="sm"
onClick={()=>openEditForm(part)}
>
<Edit2clas sName="w-4h-4"/>
</Button>
<Button
variant="ghost"
size="sm"
onClick={()=>handleDeletePart(part.id)}
>
<Tras h2clas sName="w-4h-4"/>
</Button>
</div>
</TableCell>
</TableRow>
);
})}
</TableBody>
</Table>
</CardContent>
</Card>
</TabsContent>

<TabsContentvalue="alerts" clas sName="space-y-4">
<Card>
<CardHeader>
<CardTitleclas sName="flexitems-centergap-2text-orange-600">
<AlertTriangleclas sName="w-5h-5"/>
Cảnhbáothiếuhàng({lowStockParts.length}mặthàng)
</CardTitle>
</CardHeader>
<CardContentclas sName="p-0">
<Table>
<TableHeader>
<TableRow>
<TableHead>Mãphụtùng</TableHead>
<TableHead>Tênphụtùng</TableHead>
<TableHead>Tồnkho</TableHead>
<TableHead>Mứctốithiểu</TableHead>
<TableHead>Cầnbổsung</TableHead>
<TableHead>Thaotác</TableHead>
</TableRow>
</TableHeader>
<TableBody>
{lowStockParts.map(part=>(
<TableRowkey={part.id}clas sName="bg-orange-50">
<TableCellclas sName="font-medium">{part.partCode}</TableCell>
<TableCell>{part.partName}</TableCell>
<TableCellclas sName="text-red-600font-medium">{part.currentStock}</TableCell>
<TableCell>{part.minStock}</TableCell>
<TableCellclas sName="font-mediumtext-blue-600">
{part.maxStock-part.currentStock}
</TableCell>
<TableCell>
<Buttonvariant="outline" size="sm">
Đặthàng
</Button>
</TableCell>
</TableRow>
))}
</TableBody>
</Table>
</CardContent>
</Card>
</TabsContent>

<TabsContentvalue="movements" clas sName="space-y-4">
<Card>
<CardHeader>
<CardTitle>Lịchsửxuấtnhậpkho</CardTitle>
</CardHeader>
<CardContentclas sName="p-0">
<Table>
<TableHeader>
<TableRow>
<TableHead>Ngày</TableHead>
<TableHead>Phụtùng</TableHead>
<TableHead>Loại</TableHead>
<TableHead>Sốlượng</TableHead>
<TableHead>Lýdo</TableHead>
<TableHead>Thamchiếu</TableHead>
<TableHead>Ngườithựchiện</TableHead>
</TableRow>
</TableHeader>
<TableBody>
{parts.flatMap(part=>
part.stockMovements.map(movement=>(
<TableRowkey={movement.id}>
<TableCell>{movement.date}</TableCell>
<TableCell>{part.partName}</TableCell>
<TableCell>
<Badgevariant={movement.type==='in''default':'secondary'}>
{movement.type==='in'(
<>
<TrendingUpclas sName="w-3h-3mr-1"/>
Nhập
</>
):(
<>
<TrendingDownclas sName="w-3h-3mr-1"/>
Xuất
</>
)}
</Badge>
</TableCell>
<TableCell>{movement.quantity}</TableCell>
<TableCell>{movement.reas on}</TableCell>
<TableCell>{movement.reference}</TableCell>
<TableCell>{movement.performedBy}</TableCell>
</TableRow>
))
)}
</TableBody>
</Table>
</CardContent>
</Card>
</TabsContent>

<TabsContentvalue="analytics" clas sName="space-y-4">
<divclas sName="gridgrid-cols-1md:grid-cols-4gap-4">
<Card>
<CardContentclas sName="p-6">
<divclas sName="flexitems-centerjustify-between">
<div>
<pclas sName="text-smtext-muted-foreground">Tổngphụtùng</p>
<pclas sName="text-2xlfont-bold">{parts.length}</p>
</div>
<Packageclas sName="w-8h-8text-blue-600"/>
</div>
</CardContent>
</Card>

<Card>
<CardContentclas sName="p-6">
<divclas sName="flexitems-centerjustify-between">
<div>
<pclas sName="text-smtext-muted-foreground">Thiếuhàng</p>
<pclas sName="text-2xlfont-boldtext-red-600">{lowStockParts.length}</p>
</div>
<AlertTriangleclas sName="w-8h-8text-red-600"/>
</div>
</CardContent>
</Card>

<Card>
<CardContentclas sName="p-6">
<divclas sName="flexitems-centerjustify-between">
<div>
<pclas sName="text-smtext-muted-foreground">Giátrịtồnkho</p>
<pclas sName="text-2xlfont-bold">
{formatCurrency(parts.reduce((sum,part)=>sum+(part.currentStock*part.unitCost),0))}
</p>
</div>
<BarChart3clas sName="w-8h-8text-green-600"/>
</div>
</CardContent>
</Card>

<Card>
<CardContentclas sName="p-6">
<divclas sName="flexitems-centerjustify-between">
<div>
<pclas sName="text-smtext-muted-foreground">Danhmục</p>
<pclas sName="text-2xlfont-bold">{categories.length-1}</p>
</div>
<Filterclas sName="w-8h-8text-purple-600"/>
</div>
</CardContent>
</Card>
</div>
</TabsContent>
</Tabs>

{/*AddPartForm*/}
{showAddForm&&(
<PartForm
onSubmit={handleAddPart}
onCancel={()=>setShowAddForm(false)}
/>
)}

{/*EditPartForm*/}
{showEditForm&&selectedPart&&(
<PartForm
initialData={selectedPart}
onSubmit={handleEditPart}
onCancel={()=>{
setShowEditForm(false);
setSelectedPart(null);
}}
/>
)}

{/*DetailView*/}
{showDetailView&&selectedPart&&(
<PartDetailView
part={selectedPart}
onClose={()=>{
setShowDetailView(false);
setSelectedPart(null);
}}
/>
)}
</DialogContent>
</Dialog>
);
};

//PartFormComponent
constPartForm:React.FC<{
initialData:Part;
onSubmit:(data:any)=>void;
onCancel:()=>void;
}>=({initialData,onSubmit,onCancel})=>{
const[formData,setFormData]=useState({
partCode:initialData.partCode||'',
partName:initialData.partName||'',
category:initialData.category||'',
vehicleModel:initialData.vehicleModel||'',
currentStock:initialData.currentStock.toString()||'',
minStock:initialData.minStock.toString()||'',
maxStock:initialData.maxStock.toString()||'',
unitCost:initialData.unitCost.toString()||'',
supplierName:initialData.supplierName||'',
location:initialData.location||''
});

const handleSubmit=(e:React.FormEvent)=>{
e.preventDefault();
onSubmit(formData);
};

return(
<Dialogopen={true}onOpenChange={onCancel}>
<DialogContentclas sName="max-w-2xl">
<DialogHeader>
<DialogTitle>
{initialData'Chỉnhsửaphụtùng':'Thêmphụtùngmới'}
</DialogTitle>
</DialogHeader>

<formonSubmit={handleSubmit}clas sName="space-y-4">
<divclas sName="gridgrid-cols-2gap-4">
<div>
<LabelhtmlFor="partCode">Mãphụtùng</Label>
<Input
id="partCode"
value={formData.partCode}
onChange={(e)=>setFormData(prev=>({...prev,partCode:e.target.value}))}
required
/>
</div>
<div>
<LabelhtmlFor="category">Danhmục</Label>
<Selectvalue={formData.category}onValueChange={(value)=>setFormData(prev=>({...prev,category:value}))}>
<SelectTrigger>
<SelectValue/>
</SelectTrigger>
<SelectContent>
<SelectItemvalue="Battery">Battery</SelectItem>
<SelectItemvalue="Motor">Motor</SelectItem>
<SelectItemvalue="Charging">Charging</SelectItem>
<SelectItemvalue="Electronics">Electronics</SelectItem>
<SelectItemvalue="Mechanical">Mechanical</SelectItem>
</SelectContent>
</Select>
</div>
</div>

<div>
<LabelhtmlFor="partName">Tênphụtùng</Label>
<Input
id="partName"
value={formData.partName}
onChange={(e)=>setFormData(prev=>({...prev,partName:e.target.value}))}
required
/>
</div>

<divclas sName="gridgrid-cols-3gap-4">
<div>
<LabelhtmlFor="currentStock">Tồnkhohiệntại</Label>
<Input
id="currentStock"
type="number"
value={formData.currentStock}
onChange={(e)=>setFormData(prev=>({...prev,currentStock:e.target.value}))}
required
/>
</div>
<div>
<LabelhtmlFor="minStock">Tồnkhotốithiểu</Label>
<Input
id="minStock"
type="number"
value={formData.minStock}
onChange={(e)=>setFormData(prev=>({...prev,minStock:e.target.value}))}
required
/>
</div>
<div>
<LabelhtmlFor="maxStock">Tồnkhotốiđa</Label>
<Input
id="maxStock"
type="number"
value={formData.maxStock}
onChange={(e)=>setFormData(prev=>({...prev,maxStock:e.target.value}))}
required
/>
</div>
</div>

<divclas sName="gridgrid-cols-2gap-4">
<div>
<LabelhtmlFor="unitCost">Đơngiá(VNĐ)</Label>
<Input
id="unitCost"
type="number"
value={formData.unitCost}
onChange={(e)=>setFormData(prev=>({...prev,unitCost:e.target.value}))}
required
/>
</div>
<div>
<LabelhtmlFor="location">Vịtríkho</Label>
<Input
id="location"
value={formData.location}
onChange={(e)=>setFormData(prev=>({...prev,location:e.target.value}))}
required
/>
</div>
</div>

<div>
<LabelhtmlFor="supplierName">Nhàcungcấp</Label>
<Input
id="supplierName"
value={formData.supplierName}
onChange={(e)=>setFormData(prev=>({...prev,supplierName:e.target.value}))}
required
/>
</div>

<div>
<LabelhtmlFor="vehicleModel">Dòngxeápdụng</Label>
<Input
id="vehicleModel"
value={formData.vehicleModel}
onChange={(e)=>setFormData(prev=>({...prev,vehicleModel:e.target.value}))}
required
/>
</div>

<divclas sName="flexjustify-endgap-2pt-4">
<Buttontype="button" variant="outline" onClick={onCancel}>
Hủy
</Button>
<Buttontype="submit">
{initialData'Cậpnhật':'Thêmmới'}
</Button>
</div>
</form>
</DialogContent>
</Dialog>
);
};

//PartDetailViewComponent
constPartDetailView:React.FC<{
part:Part;
onClose:()=>void;
}>=({part,onClose})=>{
const stockStatus=part.currentStock<=part.minStock'low-stock':
part.currentStock>=part.maxStock*0.8'high-stock':'normal';

const formatCurrency=(amount))=>{
returnnewIntl.NumberFormat('vi-VN',{
style:'currency',
currency:'VND'
}).format(amount);
};

return(
<Dialogopen={true}onOpenChange={onClose}>
<DialogContentclas sName="max-w-2xl">
<DialogHeader>
<DialogTitle>Chitiếtphụtùng:{part.partCode}</DialogTitle>
</DialogHeader>

<divclas sName="space-y-6">
{/*Bas icInfo*/}
<Card>
<CardHeader>
<CardTitleclas sName="text-bas e">Thôngtincơbản</CardTitle>
</CardHeader>
<CardContentclas sName="gridgrid-cols-2gap-4">
<div>
<Labelclas sName="text-smtext-muted-foreground">Mãphụtùng</Label>
<pclas sName="font-medium">{part.partCode}</p>
</div>
<div>
<Labelclas sName="text-smtext-muted-foreground">Tênphụtùng</Label>
<pclas sName="font-medium">{part.partName}</p>
</div>
<div>
<Labelclas sName="text-smtext-muted-foreground">Danhmục</Label>
<p>{part.category}</p>
</div>
<div>
<Labelclas sName="text-smtext-muted-foreground">Dòngxe</Label>
<p>{part.vehicleModel}</p>
</div>
<div>
<Labelclas sName="text-smtext-muted-foreground">Nhàcungcấp</Label>
<p>{part.supplierName}</p>
</div>
<div>
<Labelclas sName="text-smtext-muted-foreground">Vịtríkho</Label>
<p>{part.location}</p>
</div>
</CardContent>
</Card>

{/*StockInfo*/}
<Card>
<CardHeader>
<CardTitleclas sName="text-bas e">Thôngtintồnkho</CardTitle>
</CardHeader>
<CardContentclas sName="gridgrid-cols-2gap-4">
<div>
<Labelclas sName="text-smtext-muted-foreground">Tồnkhohiệntại</Label>
<pclas sName={`text-2xlfont-bold${stockStatus==='low-stock''text-red-600':'text-green-600'}`}>
{part.currentStock}
</p>
</div>
<div>
<Labelclas sName="text-smtext-muted-foreground">Trạngthái</Label>
<divclas sName="mt-1">
<Badgevariant={stockStatus==='low-stock''destructive':'default'}>
{stockStatus==='low-stock''Thiếuhàng':
stockStatus==='high-stock''Dưthừa':'Bìnhthường'}
</Badge>
</div>
</div>
<div>
<Labelclas sName="text-smtext-muted-foreground">Mứctốithiểu</Label>
<p>{part.minStock}</p>
</div>
<div>
<Labelclas sName="text-smtext-muted-foreground">Mứctốiđa</Label>
<p>{part.maxStock}</p>
</div>
<div>
<Labelclas sName="text-smtext-muted-foreground">Đơngiá</Label>
<pclas sName="font-medium">{formatCurrency(part.unitCost)}</p>
</div>
<div>
<Labelclas sName="text-smtext-muted-foreground">Giátrịtồnkho</Label>
<pclas sName="font-medium">{formatCurrency(part.currentStock*part.unitCost)}</p>
</div>
</CardContent>
</Card>

{/*RecentMovements*/}
<Card>
<CardHeader>
<CardTitleclas sName="text-bas e">Xuấtnhậpkhogầnđây</CardTitle>
</CardHeader>
<CardContent>
{part.stockMovements.length>0(
<divclas sName="space-y-2">
{part.stockMovements.slice(0,3).map(movement=>(
<divkey={movement.id}clas sName="flexjustify-betweenitems-centerp-2bg-mutedrounded">
<div>
<pclas sName="text-smfont-medium">{movement.reas on}</p>
<pclas sName="text-xstext-muted-foreground">{movement.date}</p>
</div>
<Badgevariant={movement.type==='in''default':'secondary'}>
{movement.type==='in''+':'-'}{movement.quantity}
</Badge>
</div>
))}
</div>
):(
<pclas sName="text-smtext-muted-foreground">Chưacógiaodịchnào</p>
)}
</CardContent>
</Card>
</div>

<divclas sName="flexjustify-endpt-4">
<ButtononClick={onClose}>Đóng</Button>
</div>
</DialogContent>
</Dialog>
);
};

exportdefaultPartsInventoryManagement;