import { useState } from"react";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from"@/components/ui/card";
import { Button } from"@/components/ui/button";
import { Badge } from"@/components/ui/badge";
import { Input } from"@/components/ui/input";
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from"@/components/ui/table";
import { Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle } from"@/components/ui/dialog";
import { Tabs,TabsContent,TabsList,TabsTrigger } from"@/components/ui/tabs";
import { 
Package,
Truck,
Scan,
CheckCircle,
Clock,
MapPin,
Printer,
AlertTriangle,
Search,
Camera,
BarcodeIconasBarcode,
Factory,
Phone
 } from"lucide-react";

interfaceDispatchItem{
partId:string;
partName:string;
partType:string;
quantity:number;
serialNumbers:string[];
scannedSerials:string[];
requiresSerial:boolean;
}

interfaceDispatchOrder{
id:string;
caseId:string;
serviceCenter:{
name:string;
address:string;
contactPerson:string;
phone:string;
};
dateApproved:string;
priority:"high"|"medium"|"low";
items:DispatchItem[];
status:"pending"|"in-progress"|"ready-ship"|"shipped";
}

const WarehouseDispatchInterface=()=>{
const[selectedOrder,setSelectedOrder]=useState<string>("DO-2025-001");
const[scanningMode,setScanningMode]=useState<string|null>(null);
const[tempSerial,setTempSerial]=useState("");
const[showShipDialog,setShowShipDialog]=useState(false);

//Mockdispatchorders
constdispatchOrders:DispatchOrder[]=[
{
id:"DO-2025-001",
caseId:"WC-25-09-001",
serviceCenter:{
name:"ServiceCenterHoChiMinh1",
address:"123NguyễnVănCừ,Quận1,TP.HCM",
contactPerson:"NguyễnThịManager",
phone:"+84901234567"
},
dateApproved:"2025-01-1614:30",
priority:"high",
status:"pending",
items:[
{
partId:"BP-VF8-001",
partName:"BatteryCellModule",
partType:"CriticalComponent",
quantity:2,
serialNumbers:["BP240115001","BP240115002"],
scannedSerials:[],
requiresSerial:true
},
{
partId:"TS-VF8-003",
partName:"ThermalManagementSensor",
partType:"Sensor",
quantity:1,
serialNumbers:["TS240116001"],
scannedSerials:[],
requiresSerial:true
}
]
},
{
id:"DO-2025-002",
caseId:"WC-25-09-008",
serviceCenter:{
name:"ServiceCenterHanoi2",
address:"456LángHạ,BaĐình,HàNội",
contactPerson:"TrầnVănSupervisor",
phone:"+84902345678"
},
dateApproved:"2025-01-1516:45",
priority:"medium",
status:"in-progress",
items:[
{
partId:"CP-VF9-002",
partName:"ChargingPortProtectionKit",
partType:"Accessory",
quantity:1,
serialNumbers:["CP240115003"],
scannedSerials:["CP240115003"],
requiresSerial:true
},
{
partId:"DS-VF9-001",
partName:"DisplayScreenAssembly",
partType:"ElectronicComponent",
quantity:1,
serialNumbers:["DS240116004"],
scannedSerials:[],
requiresSerial:true
}
]
}
];

const selectedOrderData=dispatchOrders.find(order=>order.id===selectedOrder);

const getPriorityBadge=(priority))=>{
const config={
high:{variant:"destructive",text:"HighPriority"},
medium:{variant:"warning",text:"MediumPriority"},
low:{variant:"secondary",text:"LowPriority"}
};

const priorityConfig=config[priorityaskeyoftypeofconfig];
returnpriorityConfig<Badgevariant={priorityConfig.variant}className="text-xs">{priorityConfig.text}</Badge>:null;
};

const getStatusBadge=(status))=>{
const statusConfig={
pending:{variant:"warning",text:"Pending",icon:Clock},
"in-progress":{variant:"default",text:"InProgress",icon:Package},
"ready-ship":{variant:"success",text:"ReadytoShip",icon:Truck},
shipped:{variant:"secondary",text:"Shipped",icon:CheckCircle}
};

const config=statusConfig[statusaskeyoftypeofstatusConfig];
if(!config)returnnull;

const Icon=config.icon;
return(
<Badgevariant={config.variant}>
<IconclassName="mr-1h-3w-3"/>
{config.text}
</Badge>
);
};

const handleScanSerial=(itemId:string,serial))=>{
//Updatescannedserialsfortheitem
if(selectedOrderData){
const updatedOrder={
...selectedOrderData,
items:selectedOrderData.items.map(item=>
item.partId===itemId
{...item,scannedSerials:[...item.scannedSerials,serial]}
:item
)
};
//Inrealapp,wouldupdatestate/database
console.log("Updatedorder:",updatedOrder);
}
setScanningMode(null);
setTempSerial("");
};

const getItemCompletionStatus=(item:DispatchItem)=>{
if(!item.requiresSerial)return"complete";
const scannedCount=item.scannedSerials.length;
const requiredCount=item.quantity;

if(scannedCount===0)return"pending";
if(scannedCount<requiredCount)return"partial";
return"complete";
};

const isOrderComplete=()=>{
returnselectedOrderData.items.every(item=>
getItemCompletionStatus(item)==="complete"
)||false;
};

const handleConfirmShipment=()=>{
console.log("Confirmingshipmentfororder:",selectedOrder);
setShowShipDialog(false);
};

return(
<divclassName="flexh-screenbg-background">
{/*LeftPanel-OrdersQueue*/}
<divclassName="w-80border-rborder-borderbg-muted/20">
<divclassName="p-4border-bborder-border">
<h2className="text-lgfont-semiboldtext-foreground">DispatchQueue</h2>
<pclassName="text-smtext-muted-foreground">Ordersreadyforprocessing</p>
</div>

<divclassName="overflow-y-autoh-fullpb-20">
{dispatchOrders.map((order)=>(
<Card
key={order.id}
className={`m-2cursor-pointertransition-allduration-200hover:shadow-md${
selectedOrder===order.id'ring-2ring-primaryborder-primary':''
}`}
onClick={()=>setSelectedOrder(order.id)}
>
<CardContentclassName="p-4">
<divclassName="space-y-3">
<divclassName="flexitems-centerjustify-between">
<spanclassName="font-monofont-mediumtext-sm">{order.id}</span>
{getPriorityBadge(order.priority)}
</div>

<div>
<pclassName="font-mediumtext-sm">{order.serviceCenter.name}</p>
<pclassName="text-xstext-muted-foreground">Case:{order.caseId}</p>
</div>

<divclassName="flexitems-centerjustify-between">
{getStatusBadge(order.status)}
<spanclassName="text-xstext-muted-foreground">
{order.items.length}items
</span>
</div>
</div>
</CardContent>
</Card>
))}
</div>
</div>

{/*RightPanel-OrderProcessing*/}
<divclassName="flex-1overflow-y-auto">
{selectedOrderData&&(
<divclassName="p-6space-y-6">
{/*Header*/}
<divclassName="flexitems-centerjustify-between">
<div>
<h1className="text-2xlfont-boldtext-foreground">DispatchOrder-{selectedOrderData.id}</h1>
<pclassName="text-muted-foreground">Case{selectedOrderData.caseId}-{selectedOrderData.serviceCenter.name}</p>
</div>
<divclassName="flexitems-centerspace-x-3">
<Buttonvariant="outline">
<SearchclassName="mr-2h-4w-4"/>
CheckInventory
</Button>
<Button
variant="gradient"
disabled={!isOrderComplete()}
onClick={()=>setShowShipDialog(true)}
>
<TruckclassName="mr-2h-4w-4"/>
ConfirmShipment&PrintLabel
</Button>
</div>
</div>

{/*DestinationInformation*/}
<Card>
<CardHeader>
<CardTitleclassName="flexitems-centerspace-x-2">
<MapPinclassName="h-5w-5text-success"/>
<span>DestinationServiceCenter</span>
</CardTitle>
</CardHeader>
<CardContent>
<divclassName="gridgap-4md:grid-cols-2">
<div>
<pclassName="font-mediumtext-lg">{selectedOrderData.serviceCenter.name}</p>
<pclassName="text-muted-foreground">{selectedOrderData.serviceCenter.address}</p>
</div>
<divclassName="space-y-2">
<divclassName="flexitems-centerspace-x-2">
<FactoryclassName="h-4w-4text-muted-foreground"/>
<spanclassName="text-sm">Contact:{selectedOrderData.serviceCenter.contactPerson}</span>
</div>
<divclassName="flexitems-centerspace-x-2">
<PhoneclassName="h-4w-4text-muted-foreground"/>
<spanclassName="text-sm">{selectedOrderData.serviceCenter.phone}</span>
</div>
</div>
</div>
</CardContent>
</Card>

{/*ItemsProcessing*/}
<Card>
<CardHeader>
<CardTitleclassName="flexitems-centerjustify-between">
<divclassName="flexitems-centerspace-x-2">
<PackageclassName="h-5w-5"/>
<span>ItemstoShip({selectedOrderData.items.length})</span>
</div>
<divclassName="text-smtext-muted-foreground">
{selectedOrderData.items.filter(item=>getItemCompletionStatus(item)==="complete").length}of{selectedOrderData.items.length}ready
</div>
</CardTitle>
</CardHeader>
<CardContent>
<divclassName="space-y-4">
{selectedOrderData.items.map((item,index)=>{
const completionStatus=getItemCompletionStatus(item);

return(
<Cardkey={item.partId}className="border-l-4border-l-primary">
<CardContentclassName="p-4">
<divclassName="space-y-4">
{/*ItemHeader*/}
<divclassName="flexitems-centerjustify-between">
<div>
<pclassName="font-medium">{item.partName}</p>
<pclassName="text-smtext-muted-foreground">{item.partType}-{item.partId}</p>
</div>
<divclassName="flexitems-centerspace-x-2">
<Badgevariant="outline">Qty:{item.quantity}</Badge>
<Badgevariant={
completionStatus==="complete""success":
completionStatus==="partial""warning":"secondary"
}>
{completionStatus==="complete""Ready":
completionStatus==="partial""Partial":"Pending"}
</Badge>
</div>
</div>

{/*SerialNumberScanning*/}
{item.requiresSerial&&(
<divclassName="space-y-3">
<divclassName="flexitems-centerjustify-between">
<pclassName="text-smfont-medium">SerialNumbersRequired:</p>
<spanclassName="text-smtext-muted-foreground">
{item.scannedSerials.length}of{item.quantity}scanned
</span>
</div>

{/*ExpectedSerialNumbers*/}
<divclassName="gridgap-2md:grid-cols-2">
{item.serialNumbers.map((serial,serialIndex)=>{
const isScanned=item.scannedSerials.includes(serial);

return(
<divkey={serialIndex}className={`p-3rounded-lgborder-2${
isScanned'border-successbg-success/10':'border-borderbg-muted/30'
}`}>
<divclassName="flexitems-centerjustify-between">
<div>
<pclassName="font-monotext-smfont-medium">{serial}</p>
<pclassName="text-xstext-muted-foreground">ExpectedSerial#{serialIndex+1}</p>
</div>
{isScanned(
<CheckCircleclassName="h-5w-5text-success"/>
):(
<divclassName="flexspace-x-1">
<Button
size="sm"
variant="outline"
onClick={()=>setScanningMode(`${item.partId}-${serialIndex}`)}
>
<CameraclassName="h-3w-3mr-1"/>
Scan
</Button>
</div>
)}
</div>

{/*ManualSerialInput*/}
{scanningMode===`${item.partId}-${serialIndex}`&&(
<divclassName="mt-3pt-3border-tborder-border">
<divclassName="flexspace-x-2">
<Input
placeholder="Scanorenterserialnumber..."
value={tempSerial}
onChange={(e)=>setTempSerial(e.target.value)}
className="font-mono"
/>
<Button
size="sm"
onClick={()=>handleScanSerial(item.partId,tempSerial)}
disabled={!tempSerial.trim()}
>
Confirm
</Button>
<Button
size="sm"
variant="ghost"
onClick={()=>{
setScanningMode(null);
setTempSerial("");
}}
>
Cancel
</Button>
</div>
</div>
)}
</div>
);
})}
</div>
</div>
)}
</div>
</CardContent>
</Card>
);
})}
</div>
</CardContent>
</Card>

{/*SummaryCard*/}
<CardclassName={`${isOrderComplete()'border-successbg-success/5':'border-warningbg-warning/5'}`}>
<CardContentclassName="p-4">
<divclassName="flexitems-centerjustify-between">
<divclassName="flexitems-centerspace-x-3">
{isOrderComplete()(
<CheckCircleclassName="h-6w-6text-success"/>
):(
<AlertTriangleclassName="h-6w-6text-warning"/>
)}
<div>
<pclassName="font-medium">
{isOrderComplete()"OrderReadyforShipment":"OrderIncomplete"}
</p>
<pclassName="text-smtext-muted-foreground">
{isOrderComplete()
"Allitemshavebeenscannedandverified"
:"Pleasecompleteserialnumberscanningforallitems"
}
</p>
</div>
</div>

{isOrderComplete()&&(
<Buttonvariant="gradient"onClick={()=>setShowShipDialog(true)}>
<PrinterclassName="mr-2h-4w-4"/>
PrintShippingLabel
</Button>
)}
</div>
</CardContent>
</Card>
</div>
)}
</div>

{/*ShipmentConfirmationDialog*/}
<Dialogopen={showShipDialog}onOpenChange={setShowShipDialog}>
<DialogContentclassName="max-w-2xl">
<DialogHeader>
<DialogTitle>ConfirmShipment</DialogTitle>
<DialogDescription>
Pleasereviewandconfirmtheshipmentdetailsbeforeproceeding.
</DialogDescription>
</DialogHeader>

{selectedOrderData&&(
<divclassName="space-y-4">
<divclassName="gridgap-4md:grid-cols-2">
<div>
<pclassName="font-mediumtext-smmb-1">DispatchOrder</p>
<pclassName="font-monotext-lgfont-bold">{selectedOrderData.id}</p>
</div>
<div>
<pclassName="font-mediumtext-smmb-1">Destination</p>
<p>{selectedOrderData.serviceCenter.name}</p>
</div>
</div>

<div>
<pclassName="font-mediumtext-smmb-2">ItemsSummary</p>
<divclassName="bg-muted/50p-3rounded-lg">
{selectedOrderData.items.map(item=>(
<divkey={item.partId}className="flexjustify-betweentext-sm">
<span>{item.partName}</span>
<span>Qty:{item.quantity}</span>
</div>
))}
</div>
</div>

<divclassName="flexjustify-endspace-x-2">
<Buttonvariant="outline"onClick={()=>setShowShipDialog(false)}>
Cancel
</Button>
<Buttonvariant="gradient"onClick={handleConfirmShipment}>
<TruckclassName="mr-2h-4w-4"/>
ConfirmShipment&PrintLabel
</Button>
</div>
</div>
)}
</DialogContent>
</Dialog>
</div>
);
};

exportdefaultWarehouseDispatchInterface;