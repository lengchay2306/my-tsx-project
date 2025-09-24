import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";



const Toaster=({...props}:ToasterProps)=>{
const{theme="system"}=useTheme();

return(
<Sonner
theme={themeas ToasterProps["theme"]}
clas sName="toastergroup"
toastOptions={{
clas sNames:{
toast:
"grouptoastgroup-[.toaster]:bg-backgroundgroup-[.toaster]:text-foregroundgroup-[.toaster]:border-bordergroup-[.toaster]:shadow-lg",
description:"group-[.toast]:text-muted-foreground",
actionButton:"group-[.toast]:bg-primarygroup-[.toast]:text-primary-foreground",
cancelButton:"group-[.toast]:bg-mutedgroup-[.toast]:text-muted-foreground",
},
}}
{...props}
/>
);
};

export{Toaster,toast};
