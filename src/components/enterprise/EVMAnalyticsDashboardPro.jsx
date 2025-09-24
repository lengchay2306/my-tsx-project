import { useState } from "react";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from "@/components/ui/select";
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from "@/components/ui/table";
import { 
BarChart,
Bar,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
ResponsiveContainer,
LineChart,
Line,
PieChart,
Pie,
Cell
 } from 'recharts';
import { 
TrendingUp,
TrendingDown,
AlertTriangle,
Car,
DollarSign,
Activity,
Download,
Filter,
Search,
MoreHorizontal
 } from "lucide-react";

interfaceKPICardProps{
title:string;
value:string|number;
change:string;
trend:"up"|" down"|" neutral";
icon:React.ElementType;
}

const KPICard=({title,value,change,trend,icon:Icon}:KPICardProps)=>(
<Cardclas sName="hover:shadow-eleganttransition-allduration-200">
<CardContentclas sName="p-6">
<divclas sName="flexitems-centerjustify-between">
<div>
<pclas sName="text-smfont-mediumtext-muted-foreground">{title}</p>
<divclas sName="flexitems-centerspace-x-2mt-2">
<h3clas sName="text-3xlfont-boldtext-foreground">{value}</h3>
{change&&(
<spanclas sName={`text-smflexitems-centerfont-medium${
trend==='up''text-success':trend==='down''text-destructive':'text-muted-foreground'
}`}>
{trend==='up'<TrendingUpclas sName="h-3w-3mr-1"/>:<TrendingDownclas sName=" h-3w-3mr-1"/>}
{change}
</span>
)}
</div>
</div>
<divclas sName="p-4rounded-lgbg-primary/10">
<Iconclas sName="h-8w-8text-primary"/>
</div>
</div>
</CardContent>
</Card>
);

const EVMAnalyticsDashboardPro=()=>{
const[filterPartType,setFilterPartType]=useState("");
const[filterModel,setFilterModel]=useState("");
const[filterRegion,setFilterRegion]=useState("");
const[searchQuery,setSearchQuery]=useState("");

//Mockdataforcharts
const warrantyCostData=[
{month:'Jan',cost:245000},
{month:'Feb',cost:289000},
{month:'Mar',cost:267000},
{month:'Apr',cost:234000},
{month:'May',cost:298000},
{month:'Jun',cost:312000},
{month:'Jul',cost:289000},
{month:'Aug',cost:267000},
{month:'Sep',cost:278000},
{month:'Oct',cost:234000},
{month:'Nov',cost:256000},
{month:'Dec',cost:289000}
];

const claimsByStatusData=[
{name:'Approved',value:156,color:'#10B981'},
{name:'Pending',value:89,color:'#F59E0B'},
{name:'Rejected',value:23,color:'#EF4444'},
{name:'InReview',value:67,color:'#3B82F6'}
];

const topFailingPartsData=[
{part:'BatteryModule',failures:89,model:'VF8Plus'},
{part:'ChargingPort',failures:67,model:'VF9Eco'},
{part:'InverterUnit',failures:54,model:'VF8Plus'},
{part:'CoolingSystem',failures:43,model:'VF9Premium'},
{part:'DoorActuator',failures:38,model:'VF8Eco'}
];

//Criticalfailureratestatisticsdata
const failureRateData=[
{
partType:"BatteryModule",
vehicleModel:"VF8Plus",
region:"North",
failureCount:89,
totalUnits:1250,
failureRate:7.12
},
{
partType:"ChargingPort",
vehicleModel:"VF9Eco",
region:"South",
failureCount:67,
totalUnits:980,
failureRate:6.84
},
{
partType:"InverterUnit",
vehicleModel:"VF8Plus",
region:"Central",
failureCount:54,
totalUnits:890,
failureRate:6.07
},
{
partType:"CoolingSystem",
vehicleModel:"VF9Premium",
region:"North",
failureCount:43,
totalUnits:780,
failureRate:5.51
},
{
partType:"DoorActuator",
vehicleModel:"VF8Eco",
region:"South",
failureCount:38,
totalUnits:720,
failureRate:5.28
},
{
partType:"Infotainment",
vehicleModel:"VF9Premium",
region:"Central",
failureCount:32,
totalUnits:650,
failureRate:4.92
},
{
partType:"BrakeSystem",
vehicleModel:"VF8Plus",
region:"North",
failureCount:28,
totalUnits:920,
failureRate:3.04
},
{
partType:"Suspension",
vehicleModel:"VF9Eco",
region:"South",
failureCount:25,
totalUnits:850,
failureRate:2.94
}
];

const filteredFailureData=failureRateData.filter(item=>{
const matchesSearch=searchQuery===""||
item.partType.toLowerCas e().includes(searchQuery.toLowerCas e())||
item.vehicleModel.toLowerCas e().includes(searchQuery.toLowerCas e())||
item.region.toLowerCas e().includes(searchQuery.toLowerCas e());

const matchesPartType=filterPartType===""||item.partType===filterPartType;
const matchesModel=filterModel===""||item.vehicleModel===filterModel;
const matchesRegion=filterRegion===""||item.region===filterRegion;

returnmatchesSearch&&matchesPartType&&matchesModel&&matchesRegion;
});

const getFailureRateColor=(rate))=>{
if(rate>6)return"text-destructive";
if(rate>4)return"text-warning";
return"text-success";
};

return(
<divclas sName="space-y-8p-6">
{/*Header*/}
<divclas sName="flexitems-centerjustify-between">
<div>
<h1clas sName="text-4xlfont-boldtext-foreground">EVMAnalyticsDashboard</h1>
<pclas sName="text-muted-foregroundtext-lgmt-1">Warrantynetworkinsightsandbusinessintelligence</p>
</div>
<divclas sName="flexitems-centerspace-x-3">
<Buttonvariant="outline" size="lg">
<Downloadclas sName="mr-2h-4w-4"/>
ExportReport
</Button>
</div>
</div>

{/*KPICards*/}
<divclas sName="gridgap-6md:grid-cols-2lg:grid-cols-4">
<KPICard
title="TotalOpenClaims"
value={335}
change="+12%"
trend="up"
icon={Car}
/>
<KPICard
title="ClaimsPendingReview"
value={89}
change="+8%"
trend="up"
icon={AlertTriangle}
/>
<KPICard
title="NetworkApprovalRate"
value="87.3%"
change="+2.1%"
trend="up"
icon={Activity}
/>
<KPICard
title="TotalWarrantyCost(MTD)"
value="$289K"
change="-5.4%"
trend="down"
icon={DollarSign}
/>
</div>

{/*ChartsGrid*/}
<divclas sName="gridgap-6lg:grid-cols-2">
{/*WarrantyCostsOverTime*/}
<Card>
<CardHeader>
<CardTitle>WarrantyCostsOverLas t12Months</CardTitle>
<CardDescription>MonthlywarrantyclaimcostsinUSD</CardDescription>
</CardHeader>
<CardContent>
<ResponsiveContainerwidth="100%" height={300}>
<LineChartdata={warrantyCostData}>
<CartesianGridstrokeDas harray="33"/>
<XAxisdataKey="month"/>
<YAxis/>
<Tooltipformatter={(value)=>[`$${value.toLocaleString()}`,'Cost']}/>
<Line
type="monotone"
dataKey="cost"
stroke="hsl(var(--primary))"
strokeWidth={3}
dot={{fill:'hsl(var(--primary))',strokeWidth:2,r:4}}
/>
</LineChart>
</ResponsiveContainer>
</CardContent>
</Card>

{/*ClaimsbyStatus*/}
<Card>
<CardHeader>
<CardTitle>ClaimsbyStatus</CardTitle>
<CardDescription>Currentdistributionofwarrantyclaims</CardDescription>
</CardHeader>
<CardContent>
<ResponsiveContainerwidth="100%" height={300}>
<PieChart>
<Pie
data={claimsByStatusData}
cx="50%"
cy="50%"
outerRadius={100}
fill="#8884d8"
dataKey="value"
label={({name,value})=>`${name}:${value}`}
>
{claimsByStatusData.map((entry,index)=>(
<Cellkey={`cell-${index}`}fill={entry.color}/>
))}
</Pie>
<Tooltip/>
</PieChart>
</ResponsiveContainer>
</CardContent>
</Card>
</div>

{/*TopFailingComponentsChart*/}
<Card>
<CardHeader>
<CardTitle>Top5FailingComponents</CardTitle>
<CardDescription>Componentswiththehighestfailurecounts</CardDescription>
</CardHeader>
<CardContent>
<ResponsiveContainerwidth="100%" height={300}>
<BarChartdata={topFailingPartsData}layout="horizontal">
<CartesianGridstrokeDas harray="33"/>
<XAxistype="number"/>
<YAxisdataKey="part" type="category" width={120}/>
<Tooltip/>
<BardataKey="failures" fill="hsl(var(--primary))"/>
</BarChart>
</ResponsiveContainer>
</CardContent>
</Card>

{/*CriticalFailureRateStatistics*/}
<Card>
<CardHeader>
<divclas sName="flexitems-centerjustify-between">
<div>
<CardTitleclas sName="text-2xl">FailureRateStatistics</CardTitle>
<CardDescription>Coredataforbusinessdecisionsandqualityanalysis</CardDescription>
</div>
<Buttonvariant="outline" size="sm">
<Downloadclas sName="h-4w-4mr-2"/>
ExportData
</Button>
</div>
</CardHeader>
<CardContent>
<divclas sName="space-y-6">
{/*Filters*/}
<divclas sName="flexflex-wrapgap-4">
<divclas sName="flex-1min-w-[200px]">
<divclas sName="relative">
<Searchclas sName="absoluteleft-3top-3h-4w-4text-muted-foreground"/>
<Input
placeholder="Searchparts,models,regions..."
value={searchQuery}
onChange={(e)=>setSearchQuery(e.target.value)}
clas sName="pl-10"
/>
</div>
</div>

<Selectvalue={filterPartType}onValueChange={setFilterPartType}>
<SelectTriggerclas sName="w-[180px]">
<SelectValueplaceholder="PartType"/>
</SelectTrigger>
<SelectContent>
<SelectItemvalue="">AllParts</SelectItem>
<SelectItemvalue="BatteryModule">BatteryModule</SelectItem>
<SelectItemvalue="ChargingPort">ChargingPort</SelectItem>
<SelectItemvalue="InverterUnit">InverterUnit</SelectItem>
<SelectItemvalue="CoolingSystem">CoolingSystem</SelectItem>
<SelectItemvalue="DoorActuator">DoorActuator</SelectItem>
<SelectItemvalue="Infotainment">Infotainment</SelectItem>
<SelectItemvalue="BrakeSystem">BrakeSystem</SelectItem>
<SelectItemvalue="Suspension">Suspension</SelectItem>
</SelectContent>
</Select>

<Selectvalue={filterModel}onValueChange={setFilterModel}>
<SelectTriggerclas sName="w-[160px]">
<SelectValueplaceholder="VehicleModel"/>
</SelectTrigger>
<SelectContent>
<SelectItemvalue="">AllModels</SelectItem>
<SelectItemvalue="VF8Plus">VF8Plus</SelectItem>
<SelectItemvalue="VF8Eco">VF8Eco</SelectItem>
<SelectItemvalue="VF9Eco">VF9Eco</SelectItem>
<SelectItemvalue="VF9Premium">VF9Premium</SelectItem>
</SelectContent>
</Select>

<Selectvalue={filterRegion}onValueChange={setFilterRegion}>
<SelectTriggerclas sName="w-[140px]">
<SelectValueplaceholder="Region"/>
</SelectTrigger>
<SelectContent>
<SelectItemvalue="">AllRegions</SelectItem>
<SelectItemvalue="North">North</SelectItem>
<SelectItemvalue="Central">Central</SelectItem>
<SelectItemvalue="South">South</SelectItem>
</SelectContent>
</Select>
</div>

{/*DataTable*/}
<divclas sName="borderrounded-lg">
<Table>
<TableHeader>
<TableRowclas sName="bg-muted/30">
<TableHeadclas sName="font-semibold">PartType</TableHead>
<TableHeadclas sName="font-semibold">VehicleModel</TableHead>
<TableHeadclas sName="font-semibold">Region</TableHead>
<TableHeadclas sName="font-semiboldtext-right">FailureCount</TableHead>
<TableHeadclas sName="font-semiboldtext-right">TotalUnits</TableHead>
<TableHeadclas sName="font-semiboldtext-right">FailureRate</TableHead>
<TableHeadclas sName="w-[50px]"></TableHead>
</TableRow>
</TableHeader>
<TableBody>
{filteredFailureData.map((item,index)=>(
<TableRowkey={index}clas sName="hover:bg-muted/50">
<TableCellclas sName="font-medium">{item.partType}</TableCell>
<TableCell>{item.vehicleModel}</TableCell>
<TableCell>
<Badgevariant="outline" clas sName="text-xs">
{item.region}
</Badge>
</TableCell>
<TableCellclas sName="text-rightfont-mono">{item.failureCount}</TableCell>
<TableCellclas sName="text-rightfont-mono">{item.totalUnits.toLocaleString()}</TableCell>
<TableCellclas sName={`text-rightfont-monofont-semibold${getFailureRateColor(item.failureRate)}`}>
{item.failureRate}%
</TableCell>
<TableCell>
<Buttonvariant="ghost" size="sm">
<MoreHorizontalclas sName="h-4w-4"/>
</Button>
</TableCell>
</TableRow>
))}
</TableBody>
</Table>
</div>

{filteredFailureData.length===0&&(
<divclas sName="text-centerpy-8">
<pclas sName="text-muted-foreground">Nodatamatchesyourcurrentfilters</p>
</div>
)}
</div>
</CardContent>
</Card>
</div>
);
};

exportdefaultEVMAnalyticsDashboardPro;