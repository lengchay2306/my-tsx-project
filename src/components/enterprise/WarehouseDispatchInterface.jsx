import { useState } from "react";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from "@/components/ui/table";
import { Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle } from "@/components/ui/dialog";
import { Tabs,TabsContent,TabsList,TabsTrigger } from "@/components/ui/tabs";
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
BarcodeIconas Barcode,
Factory,
Phone
 } from "lucide-react";

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
cas eId:string;
serviceCenter:{
name:string;
address:string;
contactPerson:string;
phone:string;
};
dateApproved:string;
priority:"high"|" medium"|" low";
items:DispatchItem[];
status:"pending"|" in-progress"|" ready-ship"|" shipped";
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
cas eId:"WC-25-09-001",
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
serialNumbers:["BP240115001"," BP240115002"],
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
cas eId:"WC-25-09-008",
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
high:{variant:"destructive",text:" HighPriority"},
medium:{variant:"warning",text:" MediumPriority"},
low:{variant:"secondary",text:" LowPriority"}
};

const priorityConfig=config[priorityas keyoftypeofconfig];
returnpriorityConfig<Badgevariant={priorityConfig.variant}clas sName="text-xs">{priorityConfig.text}</Badge>:null;
};

const getStatusBadge=(status))=>{
const statusConfig={
pending:{variant:"warning",text:" Pending",icon:Clock},
"in-progress":{variant:" default",text:" InProgress",icon:Package},
"ready-ship":{variant:" success",text:" ReadytoShip",icon:Truck},
shipped:{variant:"secondary",text:" Shipped",icon:CheckCircle}
};

const config=statusConfig[statusas keyoftypeofstatusConfig];
if(!config)returnnull;

const Icon=config.icon;
return(
<Badgevariant={config.variant}>
<Iconclas sName="mr-1h-3w-3"/>
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
//Inrealapp,wouldupdatestate/databas e
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
<divclas sName="flexh-screenbg-background">
{/*LeftPanel-OrdersQueue*/}
<divclas sName="w-80border-rborder-borderbg-muted/20">
<divclas sName="p-4border-bborder-border">
<h2clas sName="text-lgfont-semiboldtext-foreground">DispatchQueue</h2>
<pclas sName="text-smtext-muted-foreground">Ordersreadyforprocessing</p>
</div>

<divclas sName="overflow-y-autoh-fullpb-20">
{dispatchOrders.map((order)=>(
<Card
key={order.id}
clas sName={`m-2cursor-pointertransition-allduration-200hover:shadow-md${
selectedOrder===order.id'ring-2ring-primaryborder-primary':''
}`}
onClick={()=>setSelectedOrder(order.id)}
>
<CardContentclas sName="p-4">
<divclas sName="space-y-3">
<divclas sName="flexitems-centerjustify-between">
<spanclas sName="font-monofont-mediumtext-sm">{order.id}</span>
{getPriorityBadge(order.priority)}
</div>

<div>
<pclas sName="font-mediumtext-sm">{order.serviceCenter.name}</p>
<pclas sName="text-xstext-muted-foreground">Cas e:{order.cas eId}</p>
</div>

<divclas sName="flexitems-centerjustify-between">
{getStatusBadge(order.status)}
<spanclas sName="text-xstext-muted-foreground">
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
<divclas sName="flex-1overflow-y-auto">
{selectedOrderData&&(
<divclas sName="p-6space-y-6">
{/*Header*/}
<divclas sName="flexitems-centerjustify-between">
<div>
<h1clas sName="text-2xlfont-boldtext-foreground">DispatchOrder-{selectedOrderData.id}</h1>
<pclas sName="text-muted-foreground">Cas e{selectedOrderData.cas eId}-{selectedOrderData.serviceCenter.name}</p>
</div>
<divclas sName="flexitems-centerspace-x-3">
<Buttonvariant="outline">
<Searchclas sName="mr-2h-4w-4"/>
CheckInventory
</Button>
<Button
variant="gradient"
disabled={!isOrderComplete()}
onClick={()=>setShowShipDialog(true)}
>
<Truckclas sName="mr-2h-4w-4"/>
ConfirmShipment&PrintLabel
</Button>
</div>
</div>

{/*DestinationInformation*/}
<Card>
<CardHeader>
<CardTitleclas sName="flexitems-centerspace-x-2">
<MapPinclas sName="h-5w-5text-success"/>
<span>DestinationServiceCenter</span>
</CardTitle>
</CardHeader>
<CardContent>
<divclas sName="gridgap-4md:grid-cols-2">
<div>
<pclas sName="font-mediumtext-lg">{selectedOrderData.serviceCenter.name}</p>
<pclas sName="text-muted-foreground">{selectedOrderData.serviceCenter.address}</p>
</div>
<divclas sName="space-y-2">
<divclas sName="flexitems-centerspace-x-2">
<Factoryclas sName="h-4w-4text-muted-foreground"/>
<spanclas sName="text-sm">Contact:{selectedOrderData.serviceCenter.contactPerson}</span>
</div>
<divclas sName="flexitems-centerspace-x-2">
<Phoneclas sName="h-4w-4text-muted-foreground"/>
<spanclas sName="text-sm">{selectedOrderData.serviceCenter.phone}</span>
</div>
</div>
</div>
</CardContent>
</Card>

{/*ItemsProcessing*/}
<Card>
<CardHeader>
<CardTitleclas sName="flexitems-centerjustify-between">
<divclas sName="flexitems-centerspace-x-2">
<Packageclas sName="h-5w-5"/>
<span>ItemstoShip({selectedOrderData.items.length})</span>
</div>
<divclas sName="text-smtext-muted-foreground">
{selectedOrderData.items.filter(item=>getItemCompletionStatus(item)==="complete").length}of{selectedOrderData.items.length}ready
</div>
</CardTitle>
</CardHeader>
<CardContent>
<divclas sName="space-y-4">
{selectedOrderData.items.map((item,index)=>{
const completionStatus=getItemCompletionStatus(item);

return(
<Cardkey={item.partId}clas sName="border-l-4border-l-primary">
<CardContentclas sName="p-4">
<divclas sName="space-y-4">
{/*ItemHeader*/}
<divclas sName="flexitems-centerjustify-between">
<div>
<pclas sName="font-medium">{item.partName}</p>
<pclas sName="text-smtext-muted-foreground">{item.partType}-{item.partId}</p>
</div>
<divclas sName="flexitems-centerspace-x-2">
<Badgevariant="outline">Qty:{item.quantity}</Badge>
<Badgevariant={
completionStatus==="complete"" success":
completionStatus==="partial"" warning":" secondary"
}>
{completionStatus==="complete"" Ready":
completionStatus==="partial"" Partial":" Pending"}
</Badge>
</div>
</div>

{/*SerialNumberScanning*/}
{item.requiresSerial&&(
<divclas sName="space-y-3">
<divclas sName="flexitems-centerjustify-between">
<pclas sName="text-smfont-medium">SerialNumbersRequired:</p>
<spanclas sName="text-smtext-muted-foreground">
{item.scannedSerials.length}of{item.quantity}scanned
</span>
</div>

{/*ExpectedSerialNumbers*/}
<divclas sName="gridgap-2md:grid-cols-2">
{item.serialNumbers.map((serial,serialIndex)=>{
const isScanned=item.scannedSerials.includes(serial);

return(
<divkey={serialIndex}clas sName={`p-3rounded-lgborder-2${
isScanned'border-successbg-success/10':'border-borderbg-muted/30'
}`}>
<divclas sName="flexitems-centerjustify-between">
<div>
<pclas sName="font-monotext-smfont-medium">{serial}</p>
<pclas sName="text-xstext-muted-foreground">ExpectedSerial#{serialIndex+1}</p>
</div>
{isScanned(
<CheckCircleclas sName="h-5w-5text-success"/>
):(
<divclas sName="flexspace-x-1">
<Button
size="sm"
variant="outline"
onClick={()=>setScanningMode(`${item.partId}-${serialIndex}`)}
>
<Cameraclas sName="h-3w-3mr-1"/>
Scan
</Button>
</div>
)}
</div>

{/*ManualSerialInput*/}
{scanningMode===`${item.partId}-${serialIndex}`&&(
<divclas sName="mt-3pt-3border-tborder-border">
<divclas sName="flexspace-x-2">
<Input
placeholder="Scanorenterserialnumber..."
value={tempSerial}
onChange={(e)=>setTempSerial(e.target.value)}
clas sName="font-mono"
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
<Cardclas sName={`${isOrderComplete()'border-successbg-success/5':'border-warningbg-warning/5'}`}>
<CardContentclas sName="p-4">
<divclas sName="flexitems-centerjustify-between">
<divclas sName="flexitems-centerspace-x-3">
{isOrderComplete()(
<CheckCircleclas sName="h-6w-6text-success"/>
):(
<AlertTriangleclas sName="h-6w-6text-warning"/>
)}
<div>
<pclas sName="font-medium">
{isOrderComplete()"OrderReadyforShipment":" OrderIncomplete"}
</p>
<pclas sName="text-smtext-muted-foreground">
{isOrderComplete()
"Allitemshavebeenscannedandverified"
:"Pleas ecompleteserialnumberscanningforallitems"
}
</p>
</div>
</div>

{isOrderComplete()&&(
<Buttonvariant="gradient" onClick={()=>setShowShipDialog(true)}>
<Printerclas sName="mr-2h-4w-4"/>
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
<DialogContentclas sName="max-w-2xl">
<DialogHeader>
<DialogTitle>ConfirmShipment</DialogTitle>
<DialogDescription>
Pleas ereviewandconfirmtheshipmentdetailsbeforeproceeding.
</DialogDescription>
</DialogHeader>

{selectedOrderData&&(
<divclas sName="space-y-4">
<divclas sName="gridgap-4md:grid-cols-2">
<div>
<pclas sName="font-mediumtext-smmb-1">DispatchOrder</p>
<pclas sName="font-monotext-lgfont-bold">{selectedOrderData.id}</p>
</div>
<div>
<pclas sName="font-mediumtext-smmb-1">Destination</p>
<p>{selectedOrderData.serviceCenter.name}</p>
</div>
</div>

<div>
<pclas sName="font-mediumtext-smmb-2">ItemsSummary</p>
<divclas sName="bg-muted/50p-3rounded-lg">
{selectedOrderData.items.map(item=>(
<divkey={item.partId}clas sName="flexjustify-betweentext-sm">
<span>{item.partName}</span>
<span>Qty:{item.quantity}</span>
</div>
))}
</div>
</div>

<divclas sName="flexjustify-endspace-x-2">
<Buttonvariant="outline" onClick={()=>setShowShipDialog(false)}>
Cancel
</Button>
<Buttonvariant="gradient" onClick={handleConfirmShipment}>
<Truckclas sName="mr-2h-4w-4"/>
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