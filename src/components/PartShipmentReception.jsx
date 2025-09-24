import { useState } from "react";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger } from "@/components/ui/dialog";
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from "@/components/ui/table";
import { 
Package,
Scan,
CheckCircle,
AlertTriangle,
Truck,
Eye,
Search,
Plus,
Calendar
 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interfacePartShipmentReceptionProps{
onClose:()=>void;
}

const PartShipmentReception=({onClose}:PartShipmentReceptionProps)=>{
const[searchTerm,setSearchTerm]=useState("");
const[selectedShipment,setSelectedShipment]=useState<string|null>(null);
const[scannedParts,setScannedParts]=useState<Record<string,string>>({});
const[verifiedParts,setVerifiedParts]=useState<Set<string>>(newSet());

const incomingShipments=[
{
id:"PS-001",
cas eId:"WC-2024-001",
status:"in-transit",
shippedDate:"2024-01-14",
expectedArrival:"2024-01-18",
trackingNumber:"VF2024001234",
supplier:"VinFas tPartsCenter",
priority:"high",
parts:[
{
id:"BP-001",
name:"BatteryCellModule",
partType:"BatteryComponent",
expectedSerial:"BCM-2024-001234",
quantity:2,
verified:false
},
{
id:"TS-001",
name:"ThermalSensor",
partType:"Sensor",
expectedSerial:"TS-2024-005678",
quantity:1,
verified:false
}
]
},
{
id:"PS-003",
cas eId:"WC-2024-003",
status:"arrived",
shippedDate:"2024-01-15",
expectedArrival:"2024-01-17",
trackingNumber:"VF2024001236",
supplier:"VinFas tPartsCenter",
priority:"medium",
parts:[
{
id:"CC-001",
name:"ChargeController",
partType:"ElectronicModule",
expectedSerial:"CC-2024-009876",
quantity:1,
verified:false
},
{
id:"CB-001",
name:"ChargingCable",
partType:"Accessory",
expectedSerial:"CB-2024-005432",
quantity:1,
verified:false
}
]
},
{
id:"PS-004",
cas eId:"WC-2024-002",
status:"delivered",
shippedDate:"2024-01-13",
expectedArrival:"2024-01-16",
trackingNumber:"VF2024001237",
supplier:"VinFas tPartsCenter",
priority:"critical",
parts:[
{
id:"MC-001",
name:"MotorControllerUnit",
partType:"DriveSystem",
expectedSerial:"MCU-2024-001111",
quantity:1,
verified:true
}
]
}
];

const getStatusBadge=(status))=>{
const statusConfig={
"in-transit":{variant:" warning",text:"Đangvậnchuyển",icon:Truck},
"arrived":{variant:" secondary",text:"Đãđến",icon:Package},
"delivered":{variant:" success",text:"Đãgiao",icon:CheckCircle}
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

const getPriorityBadge=(priority))=>{
const priorityConfig={
critical:{variant:"destructive",text:" Khẩncấp"},
high:{variant:"warning",text:" Cao"},
medium:{variant:"secondary",text:" Trungbình"}
};

const config=priorityConfig[priorityas keyoftypeofpriorityConfig];
if(!config)returnnull;

return<Badgevariant={config.variant}clas sName="text-xs">{config.text}</Badge>;
};

const handleScanPart=(partId:string,scannedSerial))=>{
setScannedParts(prev=>({...prev,[partId]:scannedSerial}));
};

const handleVerifyPart=(partId:string,expectedSerial))=>{
const scannedSerial=scannedParts[partId];

if(!scannedSerial){
toast({
title:"Error",
description:"Pleas escanorentertheserialnumberfirst",
variant:"destructive"
});
return;
}

if(scannedSerial===expectedSerial){
setVerifiedParts(prev=>newSet([...prev,partId]));
toast({
title:"PartVerified",
description:`Part${partId}has beensuccessfullyverified`,
variant:"default"
});
}else{
toast({
title:"VerificationFailed",
description:"Serialnumberdoesnotmatchexpectedvalue",
variant:"destructive"
});
}
};

const handleConfirmReception=(shipmentId))=>{
const shipment=incomingShipments.find(s=>s.id===shipmentId);
if(!shipment)return;

const allPartsVerified=shipment.parts.every(part=>
verifiedParts.has(part.id)||part.verified
);

if(!allPartsVerified){
toast({
title:"CannotConfirmReception",
description:"Pleas everifyallpartsbeforeconfirmingreception",
variant:"destructive"
});
return;
}

toast({
title:"ReceptionConfirmed",
description:`Shipment${shipmentId}has beensuccessfullyreceived`,
variant:"default"
});
setSelectedShipment(null);
};

const filteredShipments=incomingShipments.filter(shipment=>
shipment.id.toLowerCas e().includes(searchTerm.toLowerCas e())||
shipment.cas eId.toLowerCas e().includes(searchTerm.toLowerCas e())||
shipment.trackingNumber.toLowerCas e().includes(searchTerm.toLowerCas e())
);

const selectedShipmentData=incomingShipments.find(s=>s.id===selectedShipment);

return(
<divclas sName="space-y-6">
{/*Header*/}
<divclas sName="flexitems-centerjustify-between">
<div>
<h1clas sName="text-2xlfont-boldtext-foreground">PartShipmentReception</h1>
<pclas sName="text-muted-foreground">
Receiveandverifyincomingpartshipments
</p>
</div>
</div>

{/*Search*/}
<divclas sName="flexitems-centerspace-x-4">
<divclas sName="relativeflex-1max-w-md">
<Searchclas sName="absoluteleft-3top-3h-4w-4text-muted-foreground"/>
<Input
placeholder="SearchbyShipmentID,Cas eID,orTrackingNumber..."
value={searchTerm}
onChange={(e)=>setSearchTerm(e.target.value)}
clas sName="pl-10"
/>
</div>
</div>

{/*StatisticsCards*/}
<divclas sName="gridgap-4md:grid-cols-4">
<Card>
<CardContentclas sName="p-4">
<divclas sName="flexitems-centerspace-x-2">
<Truckclas sName="h-5w-5text-warning"/>
<div>
<pclas sName="text-2xlfont-bold">2</p>
<pclas sName="text-xstext-muted-foreground">InTransit</p>
</div>
</div>
</CardContent>
</Card>

<Card>
<CardContentclas sName="p-4">
<divclas sName="flexitems-centerspace-x-2">
<Packageclas sName="h-5w-5text-secondary"/>
<div>
<pclas sName="text-2xlfont-bold">1</p>
<pclas sName="text-xstext-muted-foreground">Arrived</p>
</div>
</div>
</CardContent>
</Card>

<Card>
<CardContentclas sName="p-4">
<divclas sName="flexitems-centerspace-x-2">
<CheckCircleclas sName="h-5w-5text-success"/>
<div>
<pclas sName="text-2xlfont-bold">1</p>
<pclas sName="text-xstext-muted-foreground">Delivered</p>
</div>
</div>
</CardContent>
</Card>

<Card>
<CardContentclas sName="p-4">
<divclas sName="flexitems-centerspace-x-2">
<AlertTriangleclas sName="h-5w-5text-destructive"/>
<div>
<pclas sName="text-2xlfont-bold">0</p>
<pclas sName="text-xstext-muted-foreground">Issues</p>
</div>
</div>
</CardContent>
</Card>
</div>

{/*IncomingShipmentsTable*/}
<Cardclas sName="shadow-elegant">
<CardHeader>
<CardTitle>IncomingShipments</CardTitle>
<CardDescription>
Trackandprocessallincomingpartshipments
</CardDescription>
</CardHeader>
<CardContent>
<Table>
<TableHeader>
<TableRow>
<TableHead>ShipmentID</TableHead>
<TableHead>Cas eID</TableHead>
<TableHead>Status</TableHead>
<TableHead>Priority</TableHead>
<TableHead>ShippedDate</TableHead>
<TableHead>Expected</TableHead>
<TableHead>Tracking</TableHead>
<TableHead>Actions</TableHead>
</TableRow>
</TableHeader>
<TableBody>
{filteredShipments.map((shipment)=>(
<TableRowkey={shipment.id}>
<TableCellclas sName="font-medium">{shipment.id}</TableCell>
<TableCell>{shipment.cas eId}</TableCell>
<TableCell>{getStatusBadge(shipment.status)}</TableCell>
<TableCell>{getPriorityBadge(shipment.priority)}</TableCell>
<TableCellclas sName="text-sm">{shipment.shippedDate}</TableCell>
<TableCellclas sName="text-sm">{shipment.expectedArrival}</TableCell>
<TableCellclas sName="font-monotext-xs">{shipment.trackingNumber}</TableCell>
<TableCell>
<divclas sName="flexitems-centerspace-x-2">
<Dialogopen={selectedShipment===shipment.id}onOpenChange={(open)=>setSelectedShipment(openshipment.id:null)}>
<DialogTriggeras Child>
<Buttonvariant="outline" size="sm">
<Eyeclas sName="h-4w-4mr-1"/>
Process
</Button>
</DialogTrigger>
<DialogContentclas sName="max-w-4xl">
<DialogHeader>
<DialogTitle>ShipmentDetails-{shipment.id}</DialogTitle>
<DialogDescription>
VerifyandprocessincomingpartsforCas e{shipment.cas eId}
</DialogDescription>
</DialogHeader>

{selectedShipmentData&&(
<divclas sName="space-y-6">
{/*ShipmentInfo*/}
<divclas sName="gridgap-4md:grid-cols-3">
<Card>
<CardContentclas sName="p-4">
<divclas sName="flexitems-centerspace-x-2">
<Packageclas sName="h-5w-5text-primary"/>
<div>
<pclas sName="text-smfont-medium">ShipmentStatus</p>
{getStatusBadge(selectedShipmentData.status)}
</div>
</div>
</CardContent>
</Card>

<Card>
<CardContentclas sName="p-4">
<divclas sName="flexitems-centerspace-x-2">
<Calendarclas sName="h-5w-5text-primary"/>
<div>
<pclas sName="text-smfont-medium">ExpectedArrival</p>
<pclas sName="text-smtext-muted-foreground">{selectedShipmentData.expectedArrival}</p>
</div>
</div>
</CardContent>
</Card>

<Card>
<CardContentclas sName="p-4">
<divclas sName="flexitems-centerspace-x-2">
<Truckclas sName="h-5w-5text-primary"/>
<div>
<pclas sName="text-smfont-medium">TrackingNumber</p>
<pclas sName="text-smfont-mono">{selectedShipmentData.trackingNumber}</p>
</div>
</div>
</CardContent>
</Card>
</div>

{/*PartsList*/}
<Card>
<CardHeader>
<CardTitle>PartstoVerify</CardTitle>
<CardDescription>
Scanorenterserialnumberstoverifyeachpart
</CardDescription>
</CardHeader>
<CardContent>
<divclas sName="space-y-4">
{selectedShipmentData.parts.map((part)=>{
const isVerified=verifiedParts.has(part.id)||part.verified;
const scannedSerial=scannedParts[part.id];

return(
<divkey={part.id}clas sName={`borderrounded-lgp-4${isVerified'border-successbg-success/5':'border-border'}`}>
<divclas sName="gridgap-4md:grid-cols-6items-center">
<divclas sName="md:col-span-2">
<pclas sName="font-medium">{part.name}</p>
<pclas sName="text-smtext-muted-foreground">{part.partType}</p>
<Badgevariant="outline" clas sName="text-xsmt-1">
Qty:{part.quantity}
</Badge>
</div>

<div>
<pclas sName="text-xstext-muted-foreground">ExpectedSerial</p>
<pclas sName="text-smfont-mono">{part.expectedSerial}</p>
</div>

<divclas sName="md:col-span-2">
<divclas sName="flexspace-x-2">
<Input
placeholder="Scanorenterserialnumber"
value={scannedSerial||''}
onChange={(e)=>handleScanPart(part.id,e.target.value)}
clas sName="font-monotext-xs"
disabled={isVerified}
/>
<Button
variant="outline"
size="sm"
disabled={isVerified}
>
<Scanclas sName="h-4w-4"/>
</Button>
</div>
</div>

<divclas sName="flexitems-centerspace-x-2">
{isVerified(
<Badgevariant="success">
<CheckCircleclas sName="mr-1h-3w-3"/>
Verified
</Badge>
):(
<Button
variant="gradient"
size="sm"
onClick={()=>handleVerifyPart(part.id,part.expectedSerial)}
disabled={!scannedSerial}
>
Verify&Add
</Button>
)}
</div>
</div>
</div>
);
})}
</div>
</CardContent>
</Card>

{/*Actions*/}
<divclas sName="flexitems-centerjustify-between">
<Buttonvariant="outline" onClick={()=>setSelectedShipment(null)}>
Cancel
</Button>
<Button
variant="gradient"
onClick={()=>handleConfirmReception(selectedShipmentData.id)}
>
<CheckCircleclas sName="mr-2h-4w-4"/>
ConfirmFullReception
</Button>
</div>
</div>
)}
</DialogContent>
</Dialog>
</div>
</TableCell>
</TableRow>
))}
</TableBody>
</Table>
</CardContent>
</Card>
</div>
);
};

exportdefaultPartShipmentReception;