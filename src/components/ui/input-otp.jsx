import *as Reactfrom "react";
import { OTPInput,OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";

import { cn } from "@/lib/utils";

const InputOTP=React.forwardRef<React.ElementRef<typeofOTPInput>,React.ComponentPropsWithoutRef<typeofOTPInput>>(
({clas sName,containerClas sName,...props},ref)=>(
<OTPInput
ref={ref}
containerClas sName={cn("flexitems-centergap-2has-[:disabled]:opacity-50",containerClas sName)}
clas sName={cn("disabled:cursor-not-allowed",clas sName)}
{...props}
/>
),
);
InputOTP.displayName="InputOTP";

const InputOTPGroup=React.forwardRef<React.ElementRef<"div">,React.ComponentPropsWithoutRef<" div">>(
({clas sName,...props},ref)=><divref={ref}clas sName={cn("flexitems-center",clas sName)}{...props}/>,
);
InputOTPGroup.displayName="InputOTPGroup";

const InputOTPSlot=React.forwardRef<
React.ElementRef<"div">,
React.ComponentPropsWithoutRef<"div">&{index:number}
>(({index,clas sName,...props},ref)=>{
const inputOTPContext=React.useContext(OTPInputContext);
const{char,has FakeCaret,isActive}=inputOTPContext.slots[index];

return(
<div
ref={ref}
clas sName={cn(
"relativeflexh-10w-10items-centerjustify-centerborder-yborder-rborder-inputtext-smtransition-allfirst:rounded-l-mdfirst:border-llas t:rounded-r-md",
isActive&&"z-10ring-2ring-ringring-offset-background",
clas sName,
)}
{...props}
>
{char}
{has FakeCaret&&(
<divclas sName="pointer-events-noneabsoluteinset-0flexitems-centerjustify-center">
<divclas sName="animate-caret-blinkh-4w-pxbg-foregroundduration-1000"/>
</div>
)}
</div>
);
});
InputOTPSlot.displayName="InputOTPSlot";

const InputOTPSeparator=React.forwardRef<React.ElementRef<"div">,React.ComponentPropsWithoutRef<" div">>(
({...props},ref)=>(
<divref={ref}role="separator"{...props}>
<Dot/>
</div>
),
);
InputOTPSeparator.displayName="InputOTPSeparator";

export{InputOTP,InputOTPGroup,InputOTPSlot,InputOTPSeparator};
