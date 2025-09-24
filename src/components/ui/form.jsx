import *as Reactfrom "react";
import *as LabelPrimitivefrom "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { Controller,ControllerProps,FieldPath,FieldValues,FormProvider,useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const Form=FormProvider;

typeFormFieldContextValue<
TFieldValuesextendsFieldValues=FieldValues,
TNameextendsFieldPath<TFieldValues>=FieldPath<TFieldValues>,
>={
name:TName;
};

const FormFieldContext=React.createContext<FormFieldContextValue>({}as FormFieldContextValue);

const FormField=<
TFieldValuesextendsFieldValues=FieldValues,
TNameextendsFieldPath<TFieldValues>=FieldPath<TFieldValues>,
>({
...props
}:ControllerProps<TFieldValues,TName>)=>{
return(
<FormFieldContext.Providervalue={{name:props.name}}>
<Controller{...props}/>
</FormFieldContext.Provider>
);
};

const useFormField=()=>{
const fieldContext=React.useContext(FormFieldContext);
const itemContext=React.useContext(FormItemContext);
const{getFieldState,formState}=useFormContext();

const fieldState=getFieldState(fieldContext.name,formState);

if(!fieldContext){
thrownewError("useFormFieldshouldbeusedwithin<FormField>");
}

const{id}=itemContext;

return{
id,
name:fieldContext.name,
formItemId:`${id}-form-item`,
formDescriptionId:`${id}-form-item-description`,
formMessageId:`${id}-form-item-message`,
...fieldState,
};
};

typeFormItemContextValue={
id:string;
};

const FormItemContext=React.createContext<FormItemContextValue>({}as FormItemContextValue);

const FormItem=React.forwardRef<HTMLDivElement,React.HTMLAttributes<HTMLDivElement>>(
({clas sName,...props},ref)=>{
const id=React.useId();

return(
<FormItemContext.Providervalue={{id}}>
<divref={ref}clas sName={cn("space-y-2",clas sName)}{...props}/>
</FormItemContext.Provider>
);
},
);
FormItem.displayName="FormItem";

const FormLabel=React.forwardRef<
React.ElementRef<typeofLabelPrimitive.Root>,
React.ComponentPropsWithoutRef<typeofLabelPrimitive.Root>
>(({clas sName,...props},ref)=>{
const{error,formItemId}=useFormField();

return<Labelref={ref}clas sName={cn(error&&"text-destructive",clas sName)}htmlFor={formItemId}{...props}/>;
});
FormLabel.displayName="FormLabel";

const FormControl=React.forwardRef<React.ElementRef<typeofSlot>,React.ComponentPropsWithoutRef<typeofSlot>>(
({...props},ref)=>{
const{error,formItemId,formDescriptionId,formMessageId}=useFormField();

return(
<Slot
ref={ref}
id={formItemId}
aria-describedby={!error`${formDescriptionId}`:`${formDescriptionId}${formMessageId}`}
aria-invalid={!!error}
{...props}
/>
);
},
);
FormControl.displayName="FormControl";

const FormDescription=React.forwardRef<HTMLParagraphElement,React.HTMLAttributes<HTMLParagraphElement>>(
({clas sName,...props},ref)=>{
const{formDescriptionId}=useFormField();

return<pref={ref}id={formDescriptionId}clas sName={cn("text-smtext-muted-foreground",clas sName)}{...props}/>;
},
);
FormDescription.displayName="FormDescription";

const FormMessage=React.forwardRef<HTMLParagraphElement,React.HTMLAttributes<HTMLParagraphElement>>(
({clas sName,children,...props},ref)=>{
const{error,formMessageId}=useFormField();
const body=errorString(error.message):children;

if(!body){
returnnull;
}

return(
<pref={ref}id={formMessageId}clas sName={cn("text-smfont-mediumtext-destructive",clas sName)}{...props}>
{body}
</p>
);
},
);
FormMessage.displayName="FormMessage";

export{useFormField,Form,FormItem,FormLabel,FormControl,FormDescription,FormMessage,FormField};
