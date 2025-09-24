import { useState } from'react';
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from'@/components/ui/card';
import { Button } from'@/components/ui/button';
import { Badge } from'@/components/ui/badge';
import { Tabs,TabsContent,TabsList,TabsTrigger } from'@/components/ui/tabs';
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from'@/components/ui/select';
import { 
BarChart,
Bar,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
Legend,
ResponsiveContainer,
PieChart,
Pie,
Cell,
LineChart,
Line
 } from'recharts';
import { 
TrendingUp,
TrendingDown,
DollarSign,
Users,
Wrench,
AlertTriangle,
Car,
Package,
Clock,
CheckCircle
 } from'lucide-react';

interfaceDashboardStatsProps{
userRole:string;
}

const DashboardStats=({userRole}:DashboardStatsProps)=>{
const[selectedPeriod,setSelectedPeriod]=useState('month');
const[selectedModel,setSelectedModel]=useState('all');

//Mockdata-replacewithrealAPIcalls
const claimsByModel=[
{model:'EVModelXPro',claims:45,cost:680000000,failureRate:3.2},
{model:'EVCompactPlus',claims:32,cost:420000000,failureRate:2.8},
{model:'EVSportSeries',claims:18,cost:340000000,failureRate:4.1},
{model:'EVCityMini',claims:25,cost:180000000,failureRate:1.9}
];

const claimsByRegion=[
{region:'HàNội',claims:38,technicians:12,avgTime:2.3},
{region:'TP.HCM',claims:42,technicians:15,avgTime:1.9},
{region:'ĐàNẵng',claims:18,technicians:8,avgTime:2.8},
{region:'CầnThơ',claims:22,technicians:6,avgTime:3.1}
];

const topFailureParts=[
{part:'BatteryModule',failures:28,cost:420000000,criticality:'high'},
{part:'MotorController',failures:19,cost:152000000,criticality:'medium'},
{part:'ChargingPort',failures:15,cost:48000000,criticality:'low'},
{part:'DisplayUnit',failures:12,cost:36000000,criticality:'low'},
{part:'CoolingSystem',failures:8,cost:64000000,criticality:'medium'}
];

const technicianPerformance=[
{name:'NguyễnVănA',completedClaims:15,avgTime:1.8,qualityScore:9.2,efficiency:95},
{name:'TrầnThịB',completedClaims:18,avgTime:2.1,qualityScore:8.9,efficiency:92},
{name:'LêMinhC',completedClaims:12,avgTime:2.5,qualityScore:8.5,efficiency:88},
{name:'PhạmThuD',completedClaims:14,avgTime:1.9,qualityScore:9.0,efficiency:93}
];

const monthlyTrends=[
{month:'T1',claims:32,cost:280000000,satisfaction:8.5},
{month:'T2',claims:28,cost:320000000,satisfaction:8.7},
{month:'T3',claims:35,cost:410000000,satisfaction:8.3},
{month:'T4',claims:42,cost:520000000,satisfaction:8.1},
{month:'T5',claims:38,cost:480000000,satisfaction:8.4},
{month:'T6',claims:45,cost:620000000,satisfaction:8.2}
];

const COLORS=['#0088FE','#00C49F','#FFBB28','#FF8042','#8884d8'];

const getCriticalityBadge=(level))=>{
const configs={
high:{variant:'destructive',text:'Cao'},
medium:{variant:'warning',text:'Trungbình'},
low:{variant:'secondary',text:'Thấp'}
};
const config=configs[levelaskeyoftypeofconfigs];
return<Badgevariant={config.variant}>{config.text}</Badge>;
};

const formatCurrency=(amount))=>{
returnnewIntl.NumberFormat('vi-VN',{
style:'currency',
currency:'VND',
minimumFractionDigits:0,
maximumFractionDigits:0
}).format(amount);
};

return(
<divclassName="space-y-6">
{/*Period&ModelFilters*/}
<divclassName="flexgap-4">
<Selectvalue={selectedPeriod}onValueChange={setSelectedPeriod}>
<SelectTriggerclassName="w-48">
<SelectValue/>
</SelectTrigger>
<SelectContent>
<SelectItemvalue="week">Tuầnnày</SelectItem>
<SelectItemvalue="month">Thángnày</SelectItem>
<SelectItemvalue="quarter">Quýnày</SelectItem>
<SelectItemvalue="year">Nămnày</SelectItem>
</SelectContent>
</Select>

<Selectvalue={selectedModel}onValueChange={setSelectedModel}>
<SelectTriggerclassName="w-48">
<SelectValue/>
</SelectTrigger>
<SelectContent>
<SelectItemvalue="all">Tấtcảdòngxe</SelectItem>
<SelectItemvalue="model-x">EVModelXPro</SelectItem>
<SelectItemvalue="compact">EVCompactPlus</SelectItem>
<SelectItemvalue="sport">EVSportSeries</SelectItem>
<SelectItemvalue="city">EVCityMini</SelectItem>
</SelectContent>
</Select>
</div>

<TabsdefaultValue="overview"className="space-y-6">
<TabsListclassName="gridw-fullgrid-cols-5">
<TabsTriggervalue="overview">Tổngquan</TabsTrigger>
<TabsTriggervalue="claims">ClaimstheoModel</TabsTrigger>
<TabsTriggervalue="parts">Phụtùnglỗi</TabsTrigger>
<TabsTriggervalue="technicians">HiệusuấtKTV</TabsTrigger>
<TabsTriggervalue="regions">Theokhuvực</TabsTrigger>
</TabsList>

<TabsContentvalue="overview"className="space-y-6">
{/*KeyMetrics*/}
<divclassName="gridgap-4md:grid-cols-4">
<CardclassName="shadow-elegant">
<CardContentclassName="p-6">
<divclassName="flexitems-centerjustify-between">
<div>
<pclassName="text-smfont-mediumtext-muted-foreground">TổngClaims</p>
<pclassName="text-2xlfont-bold">120</p>
<pclassName="text-xstext-successflexitems-center">
<TrendingUpclassName="mr-1h-3w-3"/>
+12%sovớithángtrước
</p>
</div>
<CarclassName="h-8w-8text-primary"/>
</div>
</CardContent>
</Card>

<CardclassName="shadow-elegant">
<CardContentclassName="p-6">
<divclassName="flexitems-centerjustify-between">
<div>
<pclassName="text-smfont-mediumtext-muted-foreground">Chiphíbảohành</p>
<pclassName="text-2xlfont-bold">1.64tỷ</p>
<pclassName="text-xstext-destructiveflexitems-center">
<TrendingUpclassName="mr-1h-3w-3"/>
+18%sovớithángtrước
</p>
</div>
<DollarSignclassName="h-8w-8text-warning"/>
</div>
</CardContent>
</Card>

<CardclassName="shadow-elegant">
<CardContentclassName="p-6">
<divclassName="flexitems-centerjustify-between">
<div>
<pclassName="text-smfont-mediumtext-muted-foreground">ThờigianxửlýTB</p>
<pclassName="text-2xlfont-bold">2.3ngày</p>
<pclassName="text-xstext-successflexitems-center">
<TrendingDownclassName="mr-1h-3w-3"/>
-8%sovớithángtrước
</p>
</div>
<ClockclassName="h-8w-8text-automotive-steel"/>
</div>
</CardContent>
</Card>

<CardclassName="shadow-elegant">
<CardContentclassName="p-6">
<divclassName="flexitems-centerjustify-between">
<div>
<pclassName="text-smfont-mediumtext-muted-foreground">Tỷlệhàilòng</p>
<pclassName="text-2xlfont-bold">8.4/10</p>
<pclassName="text-xstext-successflexitems-center">
<TrendingUpclassName="mr-1h-3w-3"/>
+0.3điểm
</p>
</div>
<CheckCircleclassName="h-8w-8text-success"/>
</div>
</CardContent>
</Card>
</div>

{/*TrendsChart*/}
<CardclassName="shadow-elegant">
<CardHeader>
<CardTitle>Xuhướngtheotháng</CardTitle>
<CardDescription>Sốlượngclaimsvàchiphíbảohành</CardDescription>
</CardHeader>
<CardContent>
<ResponsiveContainerwidth="100%"height={300}>
<LineChartdata={monthlyTrends}>
<CartesianGridstrokeDasharray="33"/>
<XAxisdataKey="month"/>
<YAxisyAxisId="left"/>
<YAxisyAxisId="right"orientation="right"/>
<Tooltip
formatter={(value,name)=>{
if(name==='cost')return[formatCurrency(valueasnumber),'Chiphí'];
if(name==='claims')return[value,'Claims'];
if(name==='satisfaction')return[value+'/10','Hàilòng'];
return[value,name];
}}
/>
<Legend/>
<BaryAxisId="left"dataKey="claims"fill="hsl(var(--primary))"name="Claims"/>
<LineyAxisId="right"type="monotone"dataKey="satisfaction"stroke="hsl(var(--success))"name="Hàilòng"/>
</LineChart>
</ResponsiveContainer>
</CardContent>
</Card>
</TabsContent>

<TabsContentvalue="claims"className="space-y-6">
<CardclassName="shadow-elegant">
<CardHeader>
<CardTitle>PhântíchClaimstheoModelxe</CardTitle>
<CardDescription>Thốngkêsốlượng,chiphívàtỷlệhỏnghóc</CardDescription>
</CardHeader>
<CardContentclassName="space-y-6">
<ResponsiveContainerwidth="100%"height={300}>
<BarChartdata={claimsByModel}>
<CartesianGridstrokeDasharray="33"/>
<XAxisdataKey="model"/>
<YAxis/>
<Tooltipformatter={(value)=>[value,'Claims']}/>
<Legend/>
<BardataKey="claims"fill="hsl(var(--primary))"name="SốClaims"/>
</BarChart>
</ResponsiveContainer>

<divclassName="gridgap-4">
{claimsByModel.map((model,index)=>(
<Cardkey={model.model}className="border-l-4" style={{borderLeftColor:COLORS[index%COLORS.length]}}>
<CardContentclassName="pt-4">
<divclassName="gridgrid-cols-4gap-4">
<div>
<pclassName="font-medium">{model.model}</p>
<pclassName="text-smtext-muted-foreground">Modelxe</p>
</div>
<div>
<pclassName="text-2xlfont-bold">{model.claims}</p>
<pclassName="text-smtext-muted-foreground">Claims</p>
</div>
<div>
<pclassName="text-lgfont-semibold">{formatCurrency(model.cost)}</p>
<pclassName="text-smtext-muted-foreground">Chiphí</p>
</div>
<div>
<pclassName="text-lgfont-semibold">{model.failureRate}%</p>
<pclassName="text-smtext-muted-foreground">Tỷlệhỏnghóc</p>
</div>
</div>
</CardContent>
</Card>
))}
</div>
</CardContent>
</Card>
</TabsContent>

<TabsContentvalue="parts"className="space-y-6">
<CardclassName="shadow-elegant">
<CardHeader>
<CardTitle>Topphụtùnghayhỏng</CardTitle>
<CardDescription>Phântíchchitiếtcácphụtùngcótỷlệhỏngcao</CardDescription>
</CardHeader>
<CardContentclassName="space-y-4">
{topFailureParts.map((part,index)=>(
<Cardkey={part.part}className="border">
<CardContentclassName="pt-4">
<divclassName="flexitems-centerjustify-between">
<divclassName="flexitems-centerspace-x-4">
<divclassName="flexh-10w-10items-centerjustify-centerrounded-fullbg-accenttext-accent-foregroundfont-bold">
{index+1}
</div>
<div>
<pclassName="font-medium">{part.part}</p>
<divclassName="flexitems-centerspace-x-2">
<Badgevariant="outline">{part.failures}lầnhỏng</Badge>
{getCriticalityBadge(part.criticality)}
</div>
</div>
</div>
<divclassName="text-right">
<pclassName="text-lgfont-semibold">{formatCurrency(part.cost)}</p>
<pclassName="text-smtext-muted-foreground">Chiphíthaythế</p>
</div>
</div>
</CardContent>
</Card>
))}
</CardContent>
</Card>
</TabsContent>

<TabsContentvalue="technicians"className="space-y-6">
<CardclassName="shadow-elegant">
<CardHeader>
<CardTitle>HiệusuấtKỹthuậtviên</CardTitle>
<CardDescription>Đánhgiáchấtlượngvàhiệuquảcôngviệc</CardDescription>
</CardHeader>
<CardContentclassName="space-y-4">
{technicianPerformance.map((tech)=>(
<Cardkey={tech.name}className="border">
<CardContentclassName="pt-4">
<divclassName="gridgrid-cols-5gap-4">
<div>
<pclassName="font-medium">{tech.name}</p>
<pclassName="text-smtext-muted-foreground">Kỹthuậtviên</p>
</div>
<div>
<pclassName="text-xlfont-bold">{tech.completedClaims}</p>
<pclassName="text-smtext-muted-foreground">Claimshoànthành</p>
</div>
<div>
<pclassName="text-xlfont-bold">{tech.avgTime}ngày</p>
<pclassName="text-smtext-muted-foreground">ThờigianTB</p>
</div>
<div>
<pclassName="text-xlfont-bold">{tech.qualityScore}/10</p>
<pclassName="text-smtext-muted-foreground">Điểmchấtlượng</p>
</div>
<div>
<divclassName="flexitems-centerspace-x-2">
<divclassName="flex-1bg-mutedrounded-fullh-2">
<div
className="bg-primaryh-2rounded-full"
style={{width:`${tech.efficiency}%`}}
/>
</div>
<spanclassName="text-smfont-medium">{tech.efficiency}%</span>
</div>
<pclassName="text-smtext-muted-foreground">Hiệusuất</p>
</div>
</div>
</CardContent>
</Card>
))}
</CardContent>
</Card>
</TabsContent>

<TabsContentvalue="regions"className="space-y-6">
<CardclassName="shadow-elegant">
<CardHeader>
<CardTitle>Thốngkêtheokhuvực</CardTitle>
<CardDescription>Phântíchclaimsvàhiệusuấttheođịalý</CardDescription>
</CardHeader>
<CardContentclassName="space-y-6">
<ResponsiveContainerwidth="100%"height={300}>
<BarChartdata={claimsByRegion}>
<CartesianGridstrokeDasharray="33"/>
<XAxisdataKey="region"/>
<YAxis/>
<Tooltip/>
<Legend/>
<BardataKey="claims"fill="hsl(var(--primary))"name="Claims"/>
<BardataKey="technicians"fill="hsl(var(--success))"name="Kỹthuậtviên"/>
</BarChart>
</ResponsiveContainer>

<divclassName="gridgap-4md:grid-cols-2">
{claimsByRegion.map((region)=>(
<Cardkey={region.region}>
<CardHeader>
<CardTitleclassName="text-base">{region.region}</CardTitle>
</CardHeader>
<CardContentclassName="space-y-2">
<divclassName="flexjustify-between">
<span>Claims:</span>
<spanclassName="font-medium">{region.claims}</span>
</div>
<divclassName="flexjustify-between">
<span>Kỹthuậtviên:</span>
<spanclassName="font-medium">{region.technicians}</span>
</div>
<divclassName="flexjustify-between">
<span>ThờigianTB:</span>
<spanclassName="font-medium">{region.avgTime}ngày</span>
</div>
</CardContent>
</Card>
))}
</div>
</CardContent>
</Card>
</TabsContent>
</Tabs>
</div>
);
};

exportdefaultDashboardStats;