import { useState } from 'react';
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs,TabsContent,TabsList,TabsTrigger } from '@/components/ui/tabs';
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from '@/components/ui/select';
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
 } from 'recharts';
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
 } from 'lucide-react';

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
const config=configs[levelas keyoftypeofconfigs];
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
<divclas sName="space-y-6">
{/*Period&ModelFilters*/}
<divclas sName="flexgap-4">
<Selectvalue={selectedPeriod}onValueChange={setSelectedPeriod}>
<SelectTriggerclas sName="w-48">
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
<SelectTriggerclas sName="w-48">
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

<TabsdefaultValue="overview" clas sName="space-y-6">
<TabsListclas sName="gridw-fullgrid-cols-5">
<TabsTriggervalue="overview">Tổngquan</TabsTrigger>
<TabsTriggervalue="claims">ClaimstheoModel</TabsTrigger>
<TabsTriggervalue="parts">Phụtùnglỗi</TabsTrigger>
<TabsTriggervalue="technicians">HiệusuấtKTV</TabsTrigger>
<TabsTriggervalue="regions">Theokhuvực</TabsTrigger>
</TabsList>

<TabsContentvalue="overview" clas sName="space-y-6">
{/*KeyMetrics*/}
<divclas sName="gridgap-4md:grid-cols-4">
<Cardclas sName="shadow-elegant">
<CardContentclas sName="p-6">
<divclas sName="flexitems-centerjustify-between">
<div>
<pclas sName="text-smfont-mediumtext-muted-foreground">TổngClaims</p>
<pclas sName="text-2xlfont-bold">120</p>
<pclas sName="text-xstext-successflexitems-center">
<TrendingUpclas sName="mr-1h-3w-3"/>
+12%sovớithángtrước
</p>
</div>
<Carclas sName="h-8w-8text-primary"/>
</div>
</CardContent>
</Card>

<Cardclas sName="shadow-elegant">
<CardContentclas sName="p-6">
<divclas sName="flexitems-centerjustify-between">
<div>
<pclas sName="text-smfont-mediumtext-muted-foreground">Chiphíbảohành</p>
<pclas sName="text-2xlfont-bold">1.64tỷ</p>
<pclas sName="text-xstext-destructiveflexitems-center">
<TrendingUpclas sName="mr-1h-3w-3"/>
+18%sovớithángtrước
</p>
</div>
<DollarSignclas sName="h-8w-8text-warning"/>
</div>
</CardContent>
</Card>

<Cardclas sName="shadow-elegant">
<CardContentclas sName="p-6">
<divclas sName="flexitems-centerjustify-between">
<div>
<pclas sName="text-smfont-mediumtext-muted-foreground">ThờigianxửlýTB</p>
<pclas sName="text-2xlfont-bold">2.3ngày</p>
<pclas sName="text-xstext-successflexitems-center">
<TrendingDownclas sName="mr-1h-3w-3"/>
-8%sovớithángtrước
</p>
</div>
<Clockclas sName="h-8w-8text-automotive-steel"/>
</div>
</CardContent>
</Card>

<Cardclas sName="shadow-elegant">
<CardContentclas sName="p-6">
<divclas sName="flexitems-centerjustify-between">
<div>
<pclas sName="text-smfont-mediumtext-muted-foreground">Tỷlệhàilòng</p>
<pclas sName="text-2xlfont-bold">8.4/10</p>
<pclas sName="text-xstext-successflexitems-center">
<TrendingUpclas sName="mr-1h-3w-3"/>
+0.3điểm
</p>
</div>
<CheckCircleclas sName="h-8w-8text-success"/>
</div>
</CardContent>
</Card>
</div>

{/*TrendsChart*/}
<Cardclas sName="shadow-elegant">
<CardHeader>
<CardTitle>Xuhướngtheotháng</CardTitle>
<CardDescription>Sốlượngclaimsvàchiphíbảohành</CardDescription>
</CardHeader>
<CardContent>
<ResponsiveContainerwidth="100%" height={300}>
<LineChartdata={monthlyTrends}>
<CartesianGridstrokeDas harray="33"/>
<XAxisdataKey="month"/>
<YAxisyAxisId="left"/>
<YAxisyAxisId="right" orientation="right"/>
<Tooltip
formatter={(value,name)=>{
if(name==='cost')return[formatCurrency(valueas number),'Chiphí'];
if(name==='claims')return[value,'Claims'];
if(name==='satisfaction')return[value+'/10','Hàilòng'];
return[value,name];
}}
/>
<Legend/>
<BaryAxisId="left" dataKey="claims" fill="hsl(var(--primary))" name="Claims"/>
<LineyAxisId="right" type="monotone" dataKey="satisfaction" stroke="hsl(var(--success))" name="Hàilòng"/>
</LineChart>
</ResponsiveContainer>
</CardContent>
</Card>
</TabsContent>

<TabsContentvalue="claims" clas sName="space-y-6">
<Cardclas sName="shadow-elegant">
<CardHeader>
<CardTitle>PhântíchClaimstheoModelxe</CardTitle>
<CardDescription>Thốngkêsốlượng,chiphívàtỷlệhỏnghóc</CardDescription>
</CardHeader>
<CardContentclas sName="space-y-6">
<ResponsiveContainerwidth="100%" height={300}>
<BarChartdata={claimsByModel}>
<CartesianGridstrokeDas harray="33"/>
<XAxisdataKey="model"/>
<YAxis/>
<Tooltipformatter={(value)=>[value,'Claims']}/>
<Legend/>
<BardataKey="claims" fill="hsl(var(--primary))" name="SốClaims"/>
</BarChart>
</ResponsiveContainer>

<divclas sName="gridgap-4">
{claimsByModel.map((model,index)=>(
<Cardkey={model.model}clas sName="border-l-4" style={{borderLeftColor:COLORS[index%COLORS.length]}}>
<CardContentclas sName="pt-4">
<divclas sName="gridgrid-cols-4gap-4">
<div>
<pclas sName="font-medium">{model.model}</p>
<pclas sName="text-smtext-muted-foreground">Modelxe</p>
</div>
<div>
<pclas sName="text-2xlfont-bold">{model.claims}</p>
<pclas sName="text-smtext-muted-foreground">Claims</p>
</div>
<div>
<pclas sName="text-lgfont-semibold">{formatCurrency(model.cost)}</p>
<pclas sName="text-smtext-muted-foreground">Chiphí</p>
</div>
<div>
<pclas sName="text-lgfont-semibold">{model.failureRate}%</p>
<pclas sName="text-smtext-muted-foreground">Tỷlệhỏnghóc</p>
</div>
</div>
</CardContent>
</Card>
))}
</div>
</CardContent>
</Card>
</TabsContent>

<TabsContentvalue="parts" clas sName="space-y-6">
<Cardclas sName="shadow-elegant">
<CardHeader>
<CardTitle>Topphụtùnghayhỏng</CardTitle>
<CardDescription>Phântíchchitiếtcácphụtùngcótỷlệhỏngcao</CardDescription>
</CardHeader>
<CardContentclas sName="space-y-4">
{topFailureParts.map((part,index)=>(
<Cardkey={part.part}clas sName="border">
<CardContentclas sName="pt-4">
<divclas sName="flexitems-centerjustify-between">
<divclas sName="flexitems-centerspace-x-4">
<divclas sName="flexh-10w-10items-centerjustify-centerrounded-fullbg-accenttext-accent-foregroundfont-bold">
{index+1}
</div>
<div>
<pclas sName="font-medium">{part.part}</p>
<divclas sName="flexitems-centerspace-x-2">
<Badgevariant="outline">{part.failures}lầnhỏng</Badge>
{getCriticalityBadge(part.criticality)}
</div>
</div>
</div>
<divclas sName="text-right">
<pclas sName="text-lgfont-semibold">{formatCurrency(part.cost)}</p>
<pclas sName="text-smtext-muted-foreground">Chiphíthaythế</p>
</div>
</div>
</CardContent>
</Card>
))}
</CardContent>
</Card>
</TabsContent>

<TabsContentvalue="technicians" clas sName="space-y-6">
<Cardclas sName="shadow-elegant">
<CardHeader>
<CardTitle>HiệusuấtKỹthuậtviên</CardTitle>
<CardDescription>Đánhgiáchấtlượngvàhiệuquảcôngviệc</CardDescription>
</CardHeader>
<CardContentclas sName="space-y-4">
{technicianPerformance.map((tech)=>(
<Cardkey={tech.name}clas sName="border">
<CardContentclas sName="pt-4">
<divclas sName="gridgrid-cols-5gap-4">
<div>
<pclas sName="font-medium">{tech.name}</p>
<pclas sName="text-smtext-muted-foreground">Kỹthuậtviên</p>
</div>
<div>
<pclas sName="text-xlfont-bold">{tech.completedClaims}</p>
<pclas sName="text-smtext-muted-foreground">Claimshoànthành</p>
</div>
<div>
<pclas sName="text-xlfont-bold">{tech.avgTime}ngày</p>
<pclas sName="text-smtext-muted-foreground">ThờigianTB</p>
</div>
<div>
<pclas sName="text-xlfont-bold">{tech.qualityScore}/10</p>
<pclas sName="text-smtext-muted-foreground">Điểmchấtlượng</p>
</div>
<div>
<divclas sName="flexitems-centerspace-x-2">
<divclas sName="flex-1bg-mutedrounded-fullh-2">
<div
clas sName="bg-primaryh-2rounded-full"
style={{width:`${tech.efficiency}%`}}
/>
</div>
<spanclas sName="text-smfont-medium">{tech.efficiency}%</span>
</div>
<pclas sName="text-smtext-muted-foreground">Hiệusuất</p>
</div>
</div>
</CardContent>
</Card>
))}
</CardContent>
</Card>
</TabsContent>

<TabsContentvalue="regions" clas sName="space-y-6">
<Cardclas sName="shadow-elegant">
<CardHeader>
<CardTitle>Thốngkêtheokhuvực</CardTitle>
<CardDescription>Phântíchclaimsvàhiệusuấttheođịalý</CardDescription>
</CardHeader>
<CardContentclas sName="space-y-6">
<ResponsiveContainerwidth="100%" height={300}>
<BarChartdata={claimsByRegion}>
<CartesianGridstrokeDas harray="33"/>
<XAxisdataKey="region"/>
<YAxis/>
<Tooltip/>
<Legend/>
<BardataKey="claims" fill="hsl(var(--primary))" name="Claims"/>
<BardataKey="technicians" fill="hsl(var(--success))" name="Kỹthuậtviên"/>
</BarChart>
</ResponsiveContainer>

<divclas sName="gridgap-4md:grid-cols-2">
{claimsByRegion.map((region)=>(
<Cardkey={region.region}>
<CardHeader>
<CardTitleclas sName="text-bas e">{region.region}</CardTitle>
</CardHeader>
<CardContentclas sName="space-y-2">
<divclas sName="flexjustify-between">
<span>Claims:</span>
<spanclas sName="font-medium">{region.claims}</span>
</div>
<divclas sName="flexjustify-between">
<span>Kỹthuậtviên:</span>
<spanclas sName="font-medium">{region.technicians}</span>
</div>
<divclas sName="flexjustify-between">
<span>ThờigianTB:</span>
<spanclas sName="font-medium">{region.avgTime}ngày</span>
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