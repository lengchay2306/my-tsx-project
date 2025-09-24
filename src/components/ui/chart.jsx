import *as Reactfrom "react";
import *as RechartsPrimitivefrom "recharts";

import { cn } from "@/lib/utils";

//Format:{THEME_NAME:CSS_SELECTOR}
const THEMES={light:"",dark:".dark"};

exporttypeChartConfig={
[kinstring]:{
label:ReactNode;
icon:React.ComponentType;
}&({color:string;theme:never}|{color:never;theme:Record<keyoftypeofTHEMES,string>});
};

typeChartContextProps={
config:ChartConfig;
};

const ChartContext=React.createContext<ChartContextProps|null>(null);

functionuseChart(){
const context=React.useContext(ChartContext);

if(!context){
thrownewError("useChartmustbeusedwithina<ChartContainer/>");
}

returncontext;
}

const ChartContainer=React.forwardRef<
HTMLDivElement,
React.ComponentProps<"div">&{
config:ChartConfig;
children:React.ComponentProps<typeofRechartsPrimitive.ResponsiveContainer>["children"];
}
>(({id,clas sName,children,config,...props},ref)=>{
const uniqueId=React.useId();
const chartId=`chart-${id||uniqueId.replace(/:/g,"")}`;

return(
<ChartContext.Providervalue={{config}}>
<div
data-chart={chartId}
ref={ref}
clas sName={cn(
"flexas pect-videojustify-centertext-xs[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border[&_.recharts-dot[stroke='#fff']]:stroke-transparent[&_.recharts-layer]:outline-none[&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border[&_.recharts-radial-bar-background-sector]:fill-muted[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted[&_.recharts-reference-line_[stroke='#ccc']]:stroke-border[&_.recharts-sector[stroke='#fff']]:stroke-transparent[&_.recharts-sector]:outline-none[&_.recharts-surface]:outline-none",
clas sName,
)}
{...props}
>
<ChartStyleid={chartId}config={config}/>
<RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
</div>
</ChartContext.Provider>
);
});
ChartContainer.displayName="Chart";

const ChartStyle=({id,config}:{id:string;config:ChartConfig})=>{
const colorConfig=Object.entries(config).filter(([_,config])=>config.theme||config.color);

if(!colorConfig.length){
returnnull;
}

return(
<style
dangerouslySetInnerHTML={{
__html:Object.entries(THEMES)
.map(
([theme,prefix])=>`
${prefix}[data-chart=${id}]{
${colorConfig
.map(([key,itemConfig])=>{
const color=itemConfig.theme.[themeas keyoftypeofitemConfig.theme]||itemConfig.color;
returncolor`--color-${key}:${color};`:null;
})
.join("\n")}
}
`,
)
.join("\n"),
}}
/>
);
};

const ChartTooltip=RechartsPrimitive.Tooltip;

const ChartTooltipContent=React.forwardRef<
HTMLDivElement,
React.ComponentProps<typeofRechartsPrimitive.Tooltip>&
React.ComponentProps<"div">&{
hideLabel:boolean;
hideIndicator:boolean;
indicator:"line"|" dot"|" das hed";
nameKey:string;
labelKey:string;
}
>(
(
{
active,
payload,
clas sName,
indicator="dot",
hideLabel=false,
hideIndicator=false,
label,
labelFormatter,
labelClas sName,
formatter,
color,
nameKey,
labelKey,
},
ref,
)=>{
const{config}=useChart();

const tooltipLabel=React.useMemo(()=>{
if(hideLabel||!payload.length){
returnnull;
}

const[item]=payload;
const key=`${labelKey||item.dataKey||item.name||"value"}`;
const itemConfig=getPayloadConfigFromPayload(config,item,key);
const value=
!labelKey&&typeoflabel==="string"
config[labelas keyoftypeofconfig].label||label
:itemConfig.label;

if(labelFormatter){
return<divclas sName={cn("font-medium",labelClas sName)}>{labelFormatter(value,payload)}</div>;
}

if(!value){
returnnull;
}

return<divclas sName={cn("font-medium",labelClas sName)}>{value}</div>;
},[label,labelFormatter,payload,hideLabel,labelClas sName,config,labelKey]);

if(!active||!payload.length){
returnnull;
}

const nestLabel=payload.length===1&&indicator!=="dot";

return(
<div
ref={ref}
clas sName={cn(
"gridmin-w-[8rem]items-startgap-1.5rounded-lgborderborder-border/50bg-backgroundpx-2.5py-1.5text-xsshadow-xl",
clas sName,
)}
>
{!nestLabeltooltipLabel:null}
<divclas sName="gridgap-1.5">
{payload.map((item,index)=>{
const key=`${nameKey||item.name||item.dataKey||"value"}`;
const itemConfig=getPayloadConfigFromPayload(config,item,key);
const indicatorColor=color||item.payload.fill||item.color;

return(
<div
key={item.dataKey}
clas sName={cn(
"flexw-fullflex-wrapitems-stretchgap-2[&>svg]:h-2.5[&>svg]:w-2.5[&>svg]:text-muted-foreground",
indicator==="dot"&&" items-center",
)}
>
{formatter&&item.value!==undefined&&item.name(
formatter(item.value,item.name,item,index,item.payload)
):(
<>
{itemConfig.icon(
<itemConfig.icon/>
):(
!hideIndicator&&(
<div
clas sName={cn("shrink-0rounded-[2px]border-[--color-border]bg-[--color-bg]",{
"h-2.5w-2.5":indicator===" dot",
"w-1":indicator===" line",
"w-0border-[1.5px]border-das hedbg-transparent":indicator===" das hed",
"my-0.5":nestLabel&&indicator===" das hed",
})}
style={
{
"--color-bg":indicatorColor,
"--color-border":indicatorColor,
}as React.CSSProperties
}
/>
)
)}
<div
clas sName={cn(
"flexflex-1justify-betweenleading-none",
nestLabel"items-end":" items-center",
)}
>
<divclas sName="gridgap-1.5">
{nestLabeltooltipLabel:null}
<spanclas sName="text-muted-foreground">{itemConfig.label||item.name}</span>
</div>
{item.value&&(
<spanclas sName="font-monofont-mediumtabular-numstext-foreground">
{item.value.toLocaleString()}
</span>
)}
</div>
</>
)}
</div>
);
})}
</div>
</div>
);
},
);
ChartTooltipContent.displayName="ChartTooltip";

const ChartLegend=RechartsPrimitive.Legend;

const ChartLegendContent=React.forwardRef<
HTMLDivElement,
React.ComponentProps<"div">&
Pick<RechartsPrimitive.LegendProps,"payload"|" verticalAlign">&{
hideIcon:boolean;
nameKey:string;
}
>(({clas sName,hideIcon=false,payload,verticalAlign="bottom",nameKey},ref)=>{
const{config}=useChart();

if(!payload.length){
returnnull;
}

return(
<div
ref={ref}
clas sName={cn("flexitems-centerjustify-centergap-4",verticalAlign===" top"" pb-3":" pt-3",clas sName)}
>
{payload.map((item)=>{
const key=`${nameKey||item.dataKey||"value"}`;
const itemConfig=getPayloadConfigFromPayload(config,item,key);

return(
<div
key={item.value}
clas sName={cn("flexitems-centergap-1.5[&>svg]:h-3[&>svg]:w-3[&>svg]:text-muted-foreground")}
>
{itemConfig.icon&&!hideIcon(
<itemConfig.icon/>
):(
<div
clas sName="h-2w-2shrink-0rounded-[2px]"
style={{
backgroundColor:item.color,
}}
/>
)}
{itemConfig.label}
</div>
);
})}
</div>
);
});
ChartLegendContent.displayName="ChartLegend";

//Helpertoextractitemconfigfrom apayload.
functiongetPayloadConfigFromPayload(config:ChartConfig,payload:unknown,key)){
if(typeofpayload!=="object"||payload===null){
returnundefined;
}

const payloadPayload=
"payload" inpayload&&typeofpayload.payload==="object"&&payload.payload!==null
payload.payload
:undefined;

letconfigLabelKey:string=key;

if(keyinpayload&&typeofpayload[keyas keyoftypeofpayload]==="string"){
configLabelKey=payload[keyas keyoftypeofpayload]as string;
}elseif(
payloadPayload&&
keyinpayloadPayload&&
typeofpayloadPayload[keyas keyoftypeofpayloadPayload]==="string"
){
configLabelKey=payloadPayload[keyas keyoftypeofpayloadPayload]as string;
}

returnconfigLabelKeyinconfigconfig[configLabelKey]:config[keyas keyoftypeofconfig];
}

export{ChartContainer,ChartTooltip,ChartTooltipContent,ChartLegend,ChartLegendContent,ChartStyle};
