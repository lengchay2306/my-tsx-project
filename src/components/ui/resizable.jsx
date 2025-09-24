import { GripVertical } from"lucide-react";
import*asResizablePrimitivefrom"react-resizable-panels";

import { cn } from"@/lib/utils";

const ResizablePanelGroup=({className,...props}:React.ComponentProps<typeofResizablePrimitive.PanelGroup>)=>(
<ResizablePrimitive.PanelGroup
className={cn("flexh-fullw-fulldata-[panel-group-direction=vertical]:flex-col",className)}
{...props}
/>
);

const ResizablePanel=ResizablePrimitive.Panel;

const ResizableHandle=({
withHandle,
className,
...props
}:React.ComponentProps<typeofResizablePrimitive.PanelResizeHandle>&{
withHandle:boolean;
})=>(
<ResizablePrimitive.PanelResizeHandle
className={cn(
"relativeflexw-pxitems-centerjustify-centerbg-borderafter:absoluteafter:inset-y-0after:left-1/2after:w-1after:-translate-x-1/2data-[panel-group-direction=vertical]:h-pxdata-[panel-group-direction=vertical]:w-fulldata-[panel-group-direction=vertical]:after:left-0data-[panel-group-direction=vertical]:after:h-1data-[panel-group-direction=vertical]:after:w-fulldata-[panel-group-direction=vertical]:after:-translate-y-1/2data-[panel-group-direction=vertical]:after:translate-x-0focus-visible:outline-nonefocus-visible:ring-1focus-visible:ring-ringfocus-visible:ring-offset-1[&[data-panel-group-direction=vertical]>div]:rotate-90",
className,
)}
{...props}
>
{withHandle&&(
<divclassName="z-10flexh-4w-3items-centerjustify-centerrounded-smborderbg-border">
<GripVerticalclassName="h-2.5w-2.5"/>
</div>
)}
</ResizablePrimitive.PanelResizeHandle>
);

export{ResizablePanelGroup,ResizablePanel,ResizableHandle};
