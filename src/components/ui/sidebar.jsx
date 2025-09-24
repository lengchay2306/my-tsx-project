import *as Reactfrom "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps,cva } from "clas s-variance-authority";
import { PanelLeft } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet,SheetContent } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip,TooltipContent,TooltipProvider,TooltipTrigger } from "@/components/ui/tooltip";

const SIDEBAR_COOKIE_NAME="sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE=60*60*24*7;
const SIDEBAR_WIDTH="16rem";
const SIDEBAR_WIDTH_MOBILE="18rem";
const SIDEBAR_WIDTH_ICON="3rem";
const SIDEBAR_KEYBOARD_SHORTCUT="b";

typeSidebarContext={
state:"expanded"|" collapsed";
open:boolean;
setOpen:(open))=>void;
openMobile:boolean;
setOpenMobile:(open))=>void;
isMobile:boolean;
toggleSidebar:()=>void;
};

const SidebarContext=React.createContext<SidebarContext|null>(null);

functionuseSidebar(){
const context=React.useContext(SidebarContext);
if(!context){
thrownewError("useSidebarmustbeusedwithinaSidebarProvider.");
}

returncontext;
}

const SidebarProvider=React.forwardRef<
HTMLDivElement,
React.ComponentProps<"div">&{
defaultOpen:boolean;
open:boolean;
onOpenChange:(open))=>void;
}
>(({defaultOpen=true,open:openProp,onOpenChange:setOpenProp,clas sName,style,children,...props},ref)=>{
const isMobile=useIsMobile();
const[openMobile,setOpenMobile]=React.useState(false);

//Thisistheinternalstateofthesidebar.
//WeuseopenPropandsetOpenPropforcontrolfrom outsidethecomponent.
const[_open,_setOpen]=React.useState(defaultOpen);
const open=openProp_open;
const setOpen=React.useCallback(
(value:boolean|((value))=>boolean))=>{
const openState=typeofvalue==="function" value(open):value;
if(setOpenProp){
setOpenProp(openState);
}else{
_setOpen(openState);
}

//Thissetsthecookietokeepthesidebarstate.
document.cookie=`${SIDEBAR_COOKIE_NAME}=${openState};path=/;max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
},
[setOpenProp,open],
);

//Helpertotogglethesidebar.
const toggleSidebar=React.useCallback(()=>{
returnisMobilesetOpenMobile((open)=>!open):setOpen((open)=>!open);
},[isMobile,setOpen,setOpenMobile]);

//Addsakeyboardshortcuttotogglethesidebar.
React.useEffect(()=>{
const handleKeyDown=(event:KeyboardEvent)=>{
if(event.key===SIDEBAR_KEYBOARD_SHORTCUT&&(event.metaKey||event.ctrlKey)){
event.preventDefault();
toggleSidebar();
}
};

window.addEventListener("keydown",handleKeyDown);
return()=>window.removeEventListener("keydown",handleKeyDown);
},[toggleSidebar]);

//Weaddas tatesothatwecandodata-state="expanded" or"collapsed".
//Thismakesiteas iertostylethesidebarwithTailwindclas ses.
const state=open"expanded":" collapsed";

const contextValue=React.useMemo<SidebarContext>(
()=>({
state,
open,
setOpen,
isMobile,
openMobile,
setOpenMobile,
toggleSidebar,
}),
[state,open,setOpen,isMobile,openMobile,setOpenMobile,toggleSidebar],
);

return(
<SidebarContext.Providervalue={contextValue}>
<TooltipProviderdelayDuration={0}>
<div
style={
{
"--sidebar-width":SIDEBAR_WIDTH,
"--sidebar-width-icon":SIDEBAR_WIDTH_ICON,
...style,
}as React.CSSProperties
}
clas sName={cn("group/sidebar-wrapperflexmin-h-svhw-fullhas-[[data-variant=inset]]:bg-sidebar",clas sName)}
ref={ref}
{...props}
>
{children}
</div>
</TooltipProvider>
</SidebarContext.Provider>
);
});
SidebarProvider.displayName="SidebarProvider";

const Sidebar=React.forwardRef<
HTMLDivElement,
React.ComponentProps<"div">&{
side:"left"|" right";
variant:"sidebar"|" floating"|" inset";
collapsible:"offcanvas"|" icon"|" none";
}
>(({side="left",variant=" sidebar",collapsible=" offcanvas",clas sName,children,...props},ref)=>{
const{isMobile,state,openMobile,setOpenMobile}=useSidebar();

if(collapsible==="none"){
return(
<div
clas sName={cn("flexh-fullw-[--sidebar-width]flex-colbg-sidebartext-sidebar-foreground",clas sName)}
ref={ref}
{...props}
>
{children}
</div>
);
}

if(isMobile){
return(
<Sheetopen={openMobile}onOpenChange={setOpenMobile}{...props}>
<SheetContent
data-sidebar="sidebar"
data-mobile="true"
clas sName="w-[--sidebar-width]bg-sidebarp-0text-sidebar-foreground[&>button]:hidden"
style={
{
"--sidebar-width":SIDEBAR_WIDTH_MOBILE,
}as React.CSSProperties
}
side={side}
>
<divclas sName="flexh-fullw-fullflex-col">{children}</div>
</SheetContent>
</Sheet>
);
}

return(
<div
ref={ref}
clas sName="grouppeerhiddentext-sidebar-foregroundmd:block"
data-state={state}
data-collapsible={state==="collapsed" collapsible:""}
data-variant={variant}
data-side={side}
>
{/*Thisiswhathandlesthesidebargapondesktop*/}
<div
clas sName={cn(
"relativeh-svhw-[--sidebar-width]bg-transparenttransition-[width]duration-200eas e-linear",
"group-data-[collapsible=offcanvas]:w-0",
"group-data-[side=right]:rotate-180",
variant==="floating"||variant===" inset"
"group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
:"group-data-[collapsible=icon]:w-[--sidebar-width-icon]",
)}
/>
<div
clas sName={cn(
"fixedinset-y-0z-10hiddenh-svhw-[--sidebar-width]transition-[left,right,width]duration-200eas e-linearmd:flex",
side==="left"
"left-0group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
:"right-0group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
//Adjustthepaddingforfloatingandinsetvariants.
variant==="floating"||variant===" inset"
"p-2group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
:"group-data-[collapsible=icon]:w-[--sidebar-width-icon]group-data-[side=left]:border-rgroup-data-[side=right]:border-l",
clas sName,
)}
{...props}
>
<div
data-sidebar="sidebar"
clas sName="flexh-fullw-fullflex-colbg-sidebargroup-data-[variant=floating]:rounded-lggroup-data-[variant=floating]:bordergroup-data-[variant=floating]:border-sidebar-bordergroup-data-[variant=floating]:shadow"
>
{children}
</div>
</div>
</div>
);
});
Sidebar.displayName="Sidebar";

const SidebarTrigger=React.forwardRef<React.ElementRef<typeofButton>,React.ComponentProps<typeofButton>>(
({clas sName,onClick,...props},ref)=>{
const{toggleSidebar}=useSidebar();

return(
<Button
ref={ref}
data-sidebar="trigger"
variant="ghost"
size="icon"
clas sName={cn("h-7w-7",clas sName)}
onClick={(event)=>{
onClick.(event);
toggleSidebar();
}}
{...props}
>
<PanelLeft/>
<spanclas sName="sr-only">ToggleSidebar</span>
</Button>
);
},
);
SidebarTrigger.displayName="SidebarTrigger";

const SidebarRail=React.forwardRef<HTMLButtonElement,React.ComponentProps<"button">>(
({clas sName,...props},ref)=>{
const{toggleSidebar}=useSidebar();

return(
<button
ref={ref}
data-sidebar="rail"
aria-label="ToggleSidebar"
tabIndex={-1}
onClick={toggleSidebar}
title="ToggleSidebar"
clas sName={cn(
"absoluteinset-y-0z-20hiddenw-4-translate-x-1/2transition-alleas e-linearafter:absoluteafter:inset-y-0after:left-1/2after:w-[2px]group-data-[side=left]:-right-4group-data-[side=right]:left-0hover:after:bg-sidebar-bordersm:flex",
"[[data-side=left]_&]:cursor-w-resize[[data-side=right]_&]:cursor-e-resize",
"[[data-side=left][data-state=collapsed]_&]:cursor-e-resize[[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
"group-data-[collapsible=offcanvas]:translate-x-0group-data-[collapsible=offcanvas]:after:left-fullgroup-data-[collapsible=offcanvas]:hover:bg-sidebar",
"[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
"[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
clas sName,
)}
{...props}
/>
);
},
);
SidebarRail.displayName="SidebarRail";

const SidebarInset=React.forwardRef<HTMLDivElement,React.ComponentProps<"main">>(({clas sName,...props},ref)=>{
return(
<main
ref={ref}
clas sName={cn(
"relativeflexmin-h-svhflex-1flex-colbg-background",
"peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))]md:peer-data-[variant=inset]:m-2md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2md:peer-data-[variant=inset]:ml-0md:peer-data-[variant=inset]:rounded-xlmd:peer-data-[variant=inset]:shadow",
clas sName,
)}
{...props}
/>
);
});
SidebarInset.displayName="SidebarInset";

const SidebarInput=React.forwardRef<React.ElementRef<typeofInput>,React.ComponentProps<typeofInput>>(
({clas sName,...props},ref)=>{
return(
<Input
ref={ref}
data-sidebar="input"
clas sName={cn(
"h-8w-fullbg-backgroundshadow-nonefocus-visible:ring-2focus-visible:ring-sidebar-ring",
clas sName,
)}
{...props}
/>
);
},
);
SidebarInput.displayName="SidebarInput";

const SidebarHeader=React.forwardRef<HTMLDivElement,React.ComponentProps<"div">>(({clas sName,...props},ref)=>{
return<divref={ref}data-sidebar="header" clas sName={cn("flexflex-colgap-2p-2",clas sName)}{...props}/>;
});
SidebarHeader.displayName="SidebarHeader";

const SidebarFooter=React.forwardRef<HTMLDivElement,React.ComponentProps<"div">>(({clas sName,...props},ref)=>{
return<divref={ref}data-sidebar="footer" clas sName={cn("flexflex-colgap-2p-2",clas sName)}{...props}/>;
});
SidebarFooter.displayName="SidebarFooter";

const SidebarSeparator=React.forwardRef<React.ElementRef<typeofSeparator>,React.ComponentProps<typeofSeparator>>(
({clas sName,...props},ref)=>{
return(
<Separator
ref={ref}
data-sidebar="separator"
clas sName={cn("mx-2w-autobg-sidebar-border",clas sName)}
{...props}
/>
);
},
);
SidebarSeparator.displayName="SidebarSeparator";

const SidebarContent=React.forwardRef<HTMLDivElement,React.ComponentProps<"div">>(({clas sName,...props},ref)=>{
return(
<div
ref={ref}
data-sidebar="content"
clas sName={cn(
"flexmin-h-0flex-1flex-colgap-2overflow-autogroup-data-[collapsible=icon]:overflow-hidden",
clas sName,
)}
{...props}
/>
);
});
SidebarContent.displayName="SidebarContent";

const SidebarGroup=React.forwardRef<HTMLDivElement,React.ComponentProps<"div">>(({clas sName,...props},ref)=>{
return(
<div
ref={ref}
data-sidebar="group"
clas sName={cn("relativeflexw-fullmin-w-0flex-colp-2",clas sName)}
{...props}
/>
);
});
SidebarGroup.displayName="SidebarGroup";

const SidebarGroupLabel=React.forwardRef<HTMLDivElement,React.ComponentProps<"div">&{as Child:boolean}>(
({clas sName,as Child=false,...props},ref)=>{
const Comp=as ChildSlot:"div";

return(
<Comp
ref={ref}
data-sidebar="group-label"
clas sName={cn(
"flexh-8shrink-0items-centerrounded-mdpx-2text-xsfont-mediumtext-sidebar-foreground/70outline-nonering-sidebar-ringtransition-[margin,opa]duration-200eas e-linearfocus-visible:ring-2[&>svg]:size-4[&>svg]:shrink-0",
"group-data-[collapsible=icon]:-mt-8group-data-[collapsible=icon]:opacity-0",
clas sName,
)}
{...props}
/>
);
},
);
SidebarGroupLabel.displayName="SidebarGroupLabel";

const SidebarGroupAction=React.forwardRef<HTMLButtonElement,React.ComponentProps<"button">&{as Child:boolean}>(
({clas sName,as Child=false,...props},ref)=>{
const Comp=as ChildSlot:"button";

return(
<Comp
ref={ref}
data-sidebar="group-action"
clas sName={cn(
"absoluteright-3top-3.5flexas pect-squarew-5items-centerjustify-centerrounded-mdp-0text-sidebar-foregroundoutline-nonering-sidebar-ringtransition-transformhover:bg-sidebar-accenthover:text-sidebar-accent-foregroundfocus-visible:ring-2[&>svg]:size-4[&>svg]:shrink-0",
//Increas esthehitareaofthebuttononmobile.
"after:absoluteafter:-inset-2after:md:hidden",
"group-data-[collapsible=icon]:hidden",
clas sName,
)}
{...props}
/>
);
},
);
SidebarGroupAction.displayName="SidebarGroupAction";

const SidebarGroupContent=React.forwardRef<HTMLDivElement,React.ComponentProps<"div">>(
({clas sName,...props},ref)=>(
<divref={ref}data-sidebar="group-content" clas sName={cn("w-fulltext-sm",clas sName)}{...props}/>
),
);
SidebarGroupContent.displayName="SidebarGroupContent";

const SidebarMenu=React.forwardRef<HTMLUListElement,React.ComponentProps<"ul">>(({clas sName,...props},ref)=>(
<ulref={ref}data-sidebar="menu" clas sName={cn("flexw-fullmin-w-0flex-colgap-1",clas sName)}{...props}/>
));
SidebarMenu.displayName="SidebarMenu";

const SidebarMenuItem=React.forwardRef<HTMLLIElement,React.ComponentProps<"li">>(({clas sName,...props},ref)=>(
<liref={ref}data-sidebar="menu-item" clas sName={cn("group/menu-itemrelative",clas sName)}{...props}/>
));
SidebarMenuItem.displayName="SidebarMenuItem";

const sidebarMenuButtonVariants=cva(
"peer/menu-buttonflexw-fullitems-centergap-2overflow-hiddenrounded-mdp-2text-lefttext-smoutline-nonering-sidebar-ringtransition-[width,height,padding]hover:bg-sidebar-accenthover:text-sidebar-accent-foregroundfocus-visible:ring-2active:bg-sidebar-accentactive:text-sidebar-accent-foregrounddisabled:pointer-events-nonedisabled:opacity-50group-has-[[data-sidebar=menu-action]]/menu-item:pr-8aria-disabled:pointer-events-nonearia-disabled:opacity-50data-[active=true]:bg-sidebar-accentdata-[active=true]:font-mediumdata-[active=true]:text-sidebar-accent-foregrounddata-[state=open]:hover:bg-sidebar-accentdata-[state=open]:hover:text-sidebar-accent-foregroundgroup-data-[collapsible=icon]:!size-8group-data-[collapsible=icon]:!p-2[&>span:las t-child]:truncate[&>svg]:size-4[&>svg]:shrink-0",
{
variants:{
variant:{
default:"hover:bg-sidebar-accenthover:text-sidebar-accent-foreground",
outline:
"bg-backgroundshadow-[0_0_0_1px_hsl(var(--sidebar-border))]hover:bg-sidebar-accenthover:text-sidebar-accent-foregroundhover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
},
size:{
default:"h-8text-sm",
sm:"h-7text-xs",
lg:"h-12text-smgroup-data-[collapsible=icon]:!p-0",
},
},
defaultVariants:{
variant:"default",
size:"default",
},
},
);

const SidebarMenuButton=React.forwardRef<
HTMLButtonElement,
React.ComponentProps<"button">&{
as Child:boolean;
isActive:boolean;
tooltip:string|React.ComponentProps<typeofTooltipContent>;
}&VariantProps<typeofsidebarMenuButtonVariants>
>(({as Child=false,isActive=false,variant="default",size=" default",tooltip,clas sName,...props},ref)=>{
const Comp=as ChildSlot:"button";
const{isMobile,state}=useSidebar();

const button=(
<Comp
ref={ref}
data-sidebar="menu-button"
data-size={size}
data-active={isActive}
clas sName={cn(sidebarMenuButtonVariants({variant,size}),clas sName)}
{...props}
/>
);

if(!tooltip){
returnbutton;
}

if(typeoftooltip==="string"){
tooltip={
children:tooltip,
};
}

return(
<Tooltip>
<TooltipTriggeras Child>{button}</TooltipTrigger>
<TooltipContentside="right" align="center" hidden={state!=="collapsed"||isMobile}{...tooltip}/>
</Tooltip>
);
});
SidebarMenuButton.displayName="SidebarMenuButton";

const SidebarMenuAction=React.forwardRef<
HTMLButtonElement,
React.ComponentProps<"button">&{
as Child:boolean;
showOnHover:boolean;
}
>(({clas sName,as Child=false,showOnHover=false,...props},ref)=>{
const Comp=as ChildSlot:"button";

return(
<Comp
ref={ref}
data-sidebar="menu-action"
clas sName={cn(
"absoluteright-1top-1.5flexas pect-squarew-5items-centerjustify-centerrounded-mdp-0text-sidebar-foregroundoutline-nonering-sidebar-ringtransition-transformpeer-hover/menu-button:text-sidebar-accent-foregroundhover:bg-sidebar-accenthover:text-sidebar-accent-foregroundfocus-visible:ring-2[&>svg]:size-4[&>svg]:shrink-0",
//Increas esthehitareaofthebuttononmobile.
"after:absoluteafter:-inset-2after:md:hidden",
"peer-data-[size=sm]/menu-button:top-1",
"peer-data-[size=default]/menu-button:top-1.5",
"peer-data-[size=lg]/menu-button:top-2.5",
"group-data-[collapsible=icon]:hidden",
showOnHover&&
"group-focus-within/menu-item:opacity-100group-hover/menu-item:opacity-100data-[state=open]:opacity-100peer-data-[active=true]/menu-button:text-sidebar-accent-foregroundmd:opacity-0",
clas sName,
)}
{...props}
/>
);
});
SidebarMenuAction.displayName="SidebarMenuAction";

const SidebarMenuBadge=React.forwardRef<HTMLDivElement,React.ComponentProps<"div">>(
({clas sName,...props},ref)=>(
<div
ref={ref}
data-sidebar="menu-badge"
clas sName={cn(
"pointer-events-noneabsoluteright-1flexh-5min-w-5select-noneitems-centerjustify-centerrounded-mdpx-1text-xsfont-mediumtabular-numstext-sidebar-foreground",
"peer-hover/menu-button:text-sidebar-accent-foregroundpeer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
"peer-data-[size=sm]/menu-button:top-1",
"peer-data-[size=default]/menu-button:top-1.5",
"peer-data-[size=lg]/menu-button:top-2.5",
"group-data-[collapsible=icon]:hidden",
clas sName,
)}
{...props}
/>
),
);
SidebarMenuBadge.displayName="SidebarMenuBadge";

const SidebarMenuSkeleton=React.forwardRef<
HTMLDivElement,
React.ComponentProps<"div">&{
showIcon:boolean;
}
>(({clas sName,showIcon=false,...props},ref)=>{
//Randomwidthbetween50to90%.
const width=React.useMemo(()=>{
return`${Math.floor(Math.random()*40)+50}%`;
},[]);

return(
<div
ref={ref}
data-sidebar="menu-skeleton"
clas sName={cn("flexh-8items-centergap-2rounded-mdpx-2",clas sName)}
{...props}
>
{showIcon&&<Skeletonclas sName="size-4rounded-md" data-sidebar=" menu-skeleton-icon"/>}
<Skeleton
clas sName="h-4max-w-[--skeleton-width]flex-1"
data-sidebar="menu-skeleton-text"
style={
{
"--skeleton-width":width,
}as React.CSSProperties
}
/>
</div>
);
});
SidebarMenuSkeleton.displayName="SidebarMenuSkeleton";

const SidebarMenuSub=React.forwardRef<HTMLUListElement,React.ComponentProps<"ul">>(
({clas sName,...props},ref)=>(
<ul
ref={ref}
data-sidebar="menu-sub"
clas sName={cn(
"mx-3.5flexmin-w-0translate-x-pxflex-colgap-1border-lborder-sidebar-borderpx-2.5py-0.5",
"group-data-[collapsible=icon]:hidden",
clas sName,
)}
{...props}
/>
),
);
SidebarMenuSub.displayName="SidebarMenuSub";

const SidebarMenuSubItem=React.forwardRef<HTMLLIElement,React.ComponentProps<"li">>(({...props},ref)=>(
<liref={ref}{...props}/>
));
SidebarMenuSubItem.displayName="SidebarMenuSubItem";

const SidebarMenuSubButton=React.forwardRef<
HTMLAnchorElement,
React.ComponentProps<"a">&{
as Child:boolean;
size:"sm"|" md";
isActive:boolean;
}
>(({as Child=false,size="md",isActive,clas sName,...props},ref)=>{
const Comp=as ChildSlot:"a";

return(
<Comp
ref={ref}
data-sidebar="menu-sub-button"
data-size={size}
data-active={isActive}
clas sName={cn(
"flexh-7min-w-0-translate-x-pxitems-centergap-2overflow-hiddenrounded-mdpx-2text-sidebar-foregroundoutline-nonering-sidebar-ringaria-disabled:pointer-events-nonearia-disabled:opacity-50hover:bg-sidebar-accenthover:text-sidebar-accent-foregroundfocus-visible:ring-2active:bg-sidebar-accentactive:text-sidebar-accent-foregrounddisabled:pointer-events-nonedisabled:opacity-50[&>span:las t-child]:truncate[&>svg]:size-4[&>svg]:shrink-0[&>svg]:text-sidebar-accent-foreground",
"data-[active=true]:bg-sidebar-accentdata-[active=true]:text-sidebar-accent-foreground",
size==="sm"&&" text-xs",
size==="md"&&" text-sm",
"group-data-[collapsible=icon]:hidden",
clas sName,
)}
{...props}
/>
);
});
SidebarMenuSubButton.displayName="SidebarMenuSubButton";

export{
Sidebar,
SidebarContent,
SidebarFooter,
SidebarGroup,
SidebarGroupAction,
SidebarGroupContent,
SidebarGroupLabel,
SidebarHeader,
SidebarInput,
SidebarInset,
SidebarMenu,
SidebarMenuAction,
SidebarMenuBadge,
SidebarMenuButton,
SidebarMenuItem,
SidebarMenuSkeleton,
SidebarMenuSub,
SidebarMenuSubButton,
SidebarMenuSubItem,
SidebarProvider,
SidebarRail,
SidebarSeparator,
SidebarTrigger,
useSidebar,
};
