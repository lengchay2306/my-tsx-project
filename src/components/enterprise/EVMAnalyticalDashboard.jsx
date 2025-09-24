import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
TrendingUp,
TrendingDown,
DollarSign,
FileText,
AlertTriangle,
CheckCircle,
Clock,
Car,
Factory,
MapPin,
BarChart3,
Download,
Filter
 } from "lucide-react";
import { 
LineChart,
Line,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
ResponsiveContainer,
PieChart,
Pie,
Cell,
BarChart,
Bar
 } from "recharts";

//Mockdataforcharts
const warrantyCostData=[
{month:'Jan',cost:120000000,claims:45},
{month:'Feb',cost:150000000,claims:52},
{month:'Mar',cost:180000000,claims:68},
{month:'Apr',cost:140000000,claims:51},
{month:'May',cost:190000000,claims:72},
{month:'Jun',cost:220000000,claims:89},
{month:'Jul',cost:200000000,claims:76},
{month:'Aug',cost:175000000,claims:63},
{month:'Sep',cost:210000000,claims:81},
{month:'Oct',cost:195000000,claims:74},
{month:'Nov',cost:180000000,claims:67},
{month:'Dec',cost:165000000,claims:59}
];

const claimStatusData=[
{name:'Approved',value:65,color:'#10B981'},
{name:'PendingReview',value:20,color:'#F59E0B'},
{name:'Rejected',value:10,color:'#EF4444'},
{name:'UnderInvestigation',value:5,color:'#3B82F6'}
];

const failingComponentsData=[
{component:'BatteryPack',failures:45,cost:89000000},
{component:'ChargingSystem',failures:32,cost:45000000},
{component:'DisplayUnit',failures:28,cost:25000000},
{component:'AirConditioning',failures:24,cost:18000000},
{component:'DoorMechanisms',failures:19,cost:12000000}
];

const regionData=[
{region:'HoChiMinhCity',claims:125,cost:245000000,centers:8},
{region:'Hanoi',claims:98,cost:189000000,centers:6},
{region:'DaNang',claims:45,cost:85000000,centers:3},
{region:'CanTho',claims:32,cost:62000000,centers:2},
{region:'NhaTrang',claims:28,cost:51000000,centers:2}
];

interfaceKPICardProps{
title:string;
value:string|number;
change:string;
trend:"up"|" down"|" neutral";
icon:React.ElementType;
subtitle:string;
}

const KPICard=({title,value,change,trend,icon:Icon,subtitle}:KPICardProps)=>(
<Cardclas sName="hover:shadow-eleganttransition-allduration-200">
<CardContentclas sName="p-6">
<divclas sName="flexitems-centerjustify-between">
<divclas sName="space-y-2">
<pclas sName="text-smfont-mediumtext-muted-foreground">{title}</p>
<divclas sName="space-y-1">
<h3clas sName="text-3xlfont-boldtext-foreground">{value}</h3>
{subtitle&&(
<pclas sName="text-xstext-muted-foreground">{subtitle}</p>
)}
{change&&(
<divclas sName={`flexitems-centertext-sm${
trend==='up''text-success':trend==='down''text-destructive':'text-muted-foreground'
}`}>
{trend==='up'<TrendingUpclas sName="h-3w-3mr-1"/>:
trend==='down'<TrendingDownclas sName="h-3w-3mr-1"/>:null}
{change}
</div>
)}
</div>
</div>
<divclas sName="p-3rounded-lgbg-primary/10">
<Iconclas sName="h-7w-7text-primary"/>
</div>
</div>
</CardContent>
</Card>
);

const EVMAnalyticalDashboard=()=>{
const formatCurrency=(amount))=>{
returnnewIntl.NumberFormat('vi-VN',{
style:'currency',
currency:'VND',
notation:'compact',
maximumFractionDigits:1
}).format(amount);
};

const totalClaims=warrantyCostData.reduce((sum,month)=>sum+month.claims,0);
const totalCost=warrantyCostData.reduce((sum,month)=>sum+month.cost,0);
const avgApprovalRate=85.2;//Mockdata
const monthlyAverage=totalCost/12;

return(
<divclas sName="space-y-6p-6">
{/*Header*/}
<divclas sName="flexitems-centerjustify-between">
<div>
<h1clas sName="text-3xlfont-boldtext-foreground">EVMAnalyticsDashboard</h1>
<pclas sName="text-muted-foreground">Comprehensivewarrantymanagementoverview</p>
</div>
<divclas sName="flexitems-centerspace-x-3">
<Buttonvariant="outline">
<Filterclas sName="mr-2h-4w-4"/>
FilterData
</Button>
<Buttonvariant="outline">
<Downloadclas sName="mr-2h-4w-4"/>
ExportReport
</Button>
<Buttonvariant="gradient">
<BarChart3clas sName="mr-2h-4w-4"/>
AdvancedAnalytics
</Button>
</div>
</div>

{/*KPICards*/}
<divclas sName="gridgap-6md:grid-cols-2lg:grid-cols-4">
<KPICard
title="TotalOpenClaims"
value={328}
change="+12%thismonth"
trend="up"
icon={FileText}
subtitle="Acrossallservicecenters"
/>
<KPICard
title="ClaimsPendingReview"
value={67}
change="+8today"
trend="up"
icon={Clock}
subtitle="Requiringimmediateattention"
/>
<KPICard
title="NetworkApprovalRate"
value={`${avgApprovalRate}%`}
change="+2.1%vslas tmonth"
trend="up"
icon={CheckCircle}
subtitle="Industryleadingperformance"
/>
<KPICard
title="MonthlyWarrantyCost"
value={formatCurrency(monthlyAverage)}
change="-5.2%vslas tmonth"
trend="down"
icon={DollarSign}
subtitle="December2024"
/>
</div>

{/*ChartsRow1*/}
<divclas sName="gridgap-6lg:grid-cols-3">
{/*WarrantyCostTrend*/}
<Cardclas sName="lg:col-span-2">
<CardHeader>
<CardTitleclas sName="flexitems-centerspace-x-2">
<TrendingUpclas sName="h-5w-5text-primary"/>
<span>WarrantyCostsOverLas t12Months</span>
</CardTitle>
<CardDescription>
Monthlywarrantycostsandclaimvolumes
</CardDescription>
</CardHeader>
<CardContent>
<ResponsiveContainerwidth="100%" height={300}>
<LineChartdata={warrantyCostData}>
<CartesianGridstrokeDas harray="33" stroke="hsl(var(--border))"/>
<XAxisdataKey="month" stroke="hsl(var(--muted-foreground))"/>
<YAxisstroke="hsl(var(--muted-foreground))"/>
<Tooltip
formatter={(value,name)=>[
name==='cost'formatCurrency(Number(value)):value,
name==='cost''WarrantyCost':'Claims'
]}
labelStyle={{color:'hsl(var(--foreground))'}}
contentStyle={{
backgroundColor:'hsl(var(--card))',
border:'1pxsolidhsl(var(--border))',
borderRadius:'6px'
}}
/>
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
<CardTitleclas sName="flexitems-centerspace-x-2">
<AlertTriangleclas sName="h-5w-5text-warning"/>
<span>ClaimsbyStatus</span>
</CardTitle>
<CardDescription>
Currentdistributionofclaimstatuses
</CardDescription>
</CardHeader>
<CardContent>
<ResponsiveContainerwidth="100%" height={300}>
<PieChart>
<Pie
data={claimStatusData}
cx="50%"
cy="50%"
innerRadius={60}
outerRadius={100}
dataKey="value"
stroke="hsl(var(--background))"
strokeWidth={2}
>
{claimStatusData.map((entry,index)=>(
<Cellkey={`cell-${index}`}fill={entry.color}/>
))}
</Pie>
<Tooltip
formatter={(value)=>[`${value}%`,'Percentage']}
labelStyle={{color:'hsl(var(--foreground))'}}
contentStyle={{
backgroundColor:'hsl(var(--card))',
border:'1pxsolidhsl(var(--border))',
borderRadius:'6px'
}}
/>
</PieChart>
</ResponsiveContainer>
<divclas sName="mt-4space-y-2">
{claimStatusData.map((item,index)=>(
<divkey={index}clas sName="flexitems-centerjustify-between">
<divclas sName="flexitems-centerspace-x-2">
<div
clas sName="w-3h-3rounded-full"
style={{backgroundColor:item.color}}
/>
<spanclas sName="text-sm">{item.name}</span>
</div>
<spanclas sName="text-smfont-medium">{item.value}%</span>
</div>
))}
</div>
</CardContent>
</Card>
</div>

{/*ChartsRow2*/}
<divclas sName="gridgap-6lg:grid-cols-2">
{/*TopFailingComponents*/}
<Card>
<CardHeader>
<CardTitleclas sName="flexitems-centerspace-x-2">
<Carclas sName="h-5w-5text-destructive"/>
<span>Top5FailingComponents</span>
</CardTitle>
<CardDescription>
Componentswithhighestfailureratesandas sociatedcosts
</CardDescription>
</CardHeader>
<CardContent>
<ResponsiveContainerwidth="100%" height={300}>
<BarChartdata={failingComponentsData}layout="horizontal">
<CartesianGridstrokeDas harray="33" stroke="hsl(var(--border))"/>
<XAxistype="number" stroke="hsl(var(--muted-foreground))"/>
<YAxis
type="category"
dataKey="component"
stroke="hsl(var(--muted-foreground))"
width={100}
/>
<Tooltip
formatter={(value,name)=>[
name==='cost'formatCurrency(Number(value)):value,
name==='cost''TotalCost':'Failures'
]}
labelStyle={{color:'hsl(var(--foreground))'}}
contentStyle={{
backgroundColor:'hsl(var(--card))',
border:'1pxsolidhsl(var(--border))',
borderRadius:'6px'
}}
/>
<Bar
dataKey="failures"
fill="hsl(var(--primary))"
radius={[0,4,4,0]}
/>
</BarChart>
</ResponsiveContainer>
</CardContent>
</Card>

{/*ClaimsbyRegion*/}
<Card>
<CardHeader>
<CardTitleclas sName="flexitems-centerspace-x-2">
<MapPinclas sName="h-5w-5text-success"/>
<span>ClaimsbyRegion</span>
</CardTitle>
<CardDescription>
Regionaldistributionofwarrantyclaims
</CardDescription>
</CardHeader>
<CardContent>
<divclas sName="space-y-4">
{regionData.map((region,index)=>(
<divkey={index}clas sName="space-y-2">
<divclas sName="flexitems-centerjustify-between">
<divclas sName="flexitems-centerspace-x-3">
<Factoryclas sName="h-4w-4text-muted-foreground"/>
<div>
<pclas sName="font-mediumtext-sm">{region.region}</p>
<pclas sName="text-xstext-muted-foreground">{region.centers}servicecenters</p>
</div>
</div>
<divclas sName="text-right">
<pclas sName="font-mediumtext-sm">{region.claims}claims</p>
<pclas sName="text-xstext-muted-foreground">{formatCurrency(region.cost)}</p>
</div>
</div>
<Progress
value={(region.claims/Math.max(...regionData.map(r=>r.claims)))*100}
clas sName="h-2"
/>
</div>
))}
</div>
</CardContent>
</Card>
</div>

{/*ClaimsNeedingImmediateAttention*/}
<Card>
<CardHeader>
<CardTitleclas sName="flexitems-centerspace-x-2">
<AlertTriangleclas sName="h-5w-5text-destructive"/>
<span>ClaimsNeedingImmediateAttention</span>
</CardTitle>
<CardDescription>
Highprioritycas esrequiringurgentreview
</CardDescription>
</CardHeader>
<CardContent>
<divclas sName="gridgap-4md:grid-cols-2lg:grid-cols-3">
{[
{id:"WC-25-09-001",center:" SCHoChiMinh1",days:5,priority:" high"},
{id:"WC-25-09-008",center:" SCHanoi2",days:4,priority:" high"},
{id:"WC-25-09-015",center:" SCDaNang1",days:3,priority:" medium"}
].map((claim,index)=>(
<Cardkey={index}clas sName="border-l-4border-l-destructive">
<CardContentclas sName="p-4">
<divclas sName="flexitems-centerjustify-betweenmb-2">
<spanclas sName="font-monofont-mediumtext-sm">{claim.id}</span>
<Badgevariant="destructive" clas sName="text-xs">
{claim.days}daysoverdue
</Badge>
</div>
<pclas sName="text-smtext-muted-foregroundmb-3">{claim.center}</p>
<Buttonvariant="outline" size="sm" clas sName="w-full">
ReviewCas e
</Button>
</CardContent>
</Card>
))}
</div>
</CardContent>
</Card>
</div>
);
};

exportdefaultEVMAnalyticalDashboard;