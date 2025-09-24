import*asReactfrom"react";
import { OTPInput,OTPInputContext } from"input-otp";
import { Dot } from"lucide-react";

import { cn } from"@/lib/utils";

const InputOTP=React.forwardRef<React.ElementRef<typeofOTPInput>,React.ComponentPropsWithoutRef<typeofOTPInput>>(
({className,containerClassName,...props},ref)=>(
<OTPInput
ref={ref}
containerClassName={cn("flexitems-centergap-2has-[:disabled]:opacity-50",containerClassName)}
className={cn("disabled:cursor-not-allowed",className)}
{...props}
/>
),
);
InputOTP.displayName="InputOTP";

const InputOTPGroup=React.forwardRef<React.ElementRef<"div">,React.ComponentPropsWithoutRef<"div">>(
({className,...props},ref)=><divref={ref}className={cn("flexitems-center",className)}{...props}/>,
);
InputOTPGroup.displayName="InputOTPGroup";

const InputOTPSlot=React.forwardRef<
React.ElementRef<"div">,
React.ComponentPropsWithoutRef<"div">&{index:number}
>(({index,className,...props},ref)=>{
const inputOTPContext=React.useContext(OTPInputContext);
const{char,hasFakeCaret,isActive}=inputOTPContext.slots[index];

return(
<div
ref={ref}
className={cn(
"relativeflexh-10w-10items-centerjustify-centerborder-yborder-rborder-inputtext-smtransition-allfirst:rounded-l-mdfirst:border-llast:rounded-r-md",
isActive&&"z-10ring-2ring-ringring-offset-background",
className,
)}
{...props}
>
{char}
{hasFakeCaret&&(
<divclassName="pointer-events-noneabsoluteinset-0flexitems-centerjustify-center">
<divclassName="animate-caret-blinkh-4w-pxbg-foregroundduration-1000"/>
</div>
)}
</div>
);
});
InputOTPSlot.displayName="InputOTPSlot";

const InputOTPSeparator=React.forwardRef<React.ElementRef<"div">,React.ComponentPropsWithoutRef<"div">>(
({...props},ref)=>(
<divref={ref}role="separator"{...props}>
<Dot/>
</div>
),
);
InputOTPSeparator.displayName="InputOTPSeparator";

export{InputOTP,InputOTPGroup,InputOTPSlot,InputOTPSeparator};
