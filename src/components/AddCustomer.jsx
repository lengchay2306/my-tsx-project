import { useState } from 'react';
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { 
User,
Phone,
Mail,
MapPin,
Save,
X,
IdCard,
Calendar,
Building
 } from 'lucide-react';

interfaceCustomerData{
fullName:string;
phone:string;
email:string;
idNumber:string;
idType:string;
dateOfBirth:string;
gender:string;
address:string;
city:string;
district:string;
ward:string;
company:string;
jobTitle:string;
emergencyContact:string;
emergencyPhone:string;
notes:string;
}

const AddCustomer=({onClose}:{onClose:()=>void})=>{
const[isLoading,setIsLoading]=useState(false);
const{user}=useAuth();
const{toast}=useToast();

const[customerData,setCustomerData]=useState<CustomerData>({
fullName:'',
phone:'',
email:'',
idNumber:'',
idType:'',
dateOfBirth:'',
gender:'',
address:'',
city:'',
district:'',
ward:'',
company:'',
jobTitle:'',
emergencyContact:'',
emergencyPhone:'',
notes:''
});

const cities=[
'TP.HồChíMinh',
'HàNội',
'ĐàNẵng',
'HảiPhòng',
'CầnThơ',
'NhaTrang',
'Huế',
'VũngTàu'
];

const idTypes=[
{value:'cccd',label:'Căncướccôngdân'},
{value:'cmnd',label:'Chứngminhnhândân'},
{value:'pas sport',label:'Hộchiếu'},
{value:'other',label:'Khác'}
];

const handleInputChange=(field:keyofCustomerData,value))=>{
setCustomerData(prev=>({...prev,[field]:value}));
};

const validatePhone=(phone))=>{
const phoneRegex=/^[0-9]{10,11}$/;
returnphoneRegex.test(phone);
};

const validateEmail=(email))=>{
const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
returnemailRegex.test(email);
};

const handleSubmit=()=>{
//Validation
if(!customerData.fullName.trim()){
toast({
title:"ValidationError",
description:"Pleas eenterfullname",
variant:"destructive"
});
return;
}

if(!validatePhone(customerData.phone)){
toast({
title:"ValidationError",
description:"Pleas eenteravalidphonenumber",
variant:"destructive"
});
return;
}

if(customerData.email&&!validateEmail(customerData.email)){
toast({
title:"ValidationError",
description:"Pleas eenteravalidemailaddress",
variant:"destructive"
});
return;
}

setIsLoading(true);
setTimeout(()=>{
const customerId=`CUST-${Date.now()}`;
toast({
title:"CustomerAddedSuccessfully!",
description:`${customerData.fullName}has beenaddedwithID:${customerId}`,
});
setIsLoading(false);
onClose();
},2000);
};

const isValid=customerData.fullName&&customerData.phone&&customerData.address;

return(
<divclas sName="fixedinset-0bg-black/50flexitems-centerjustify-centerp-4z-50">
<Cardclas sName="w-fullmax-w-4xlmax-h-[90vh]overflow-hidden">
<CardHeaderclas sName="border-b">
<divclas sName="flexitems-centerjustify-between">
<div>
<CardTitleclas sName="flexitems-centerspace-x-2">
<Userclas sName="h-5w-5text-primary"/>
<span>AddNewCustomer</span>
</CardTitle>
<CardDescription>
Registeranewcustomerinthesystem
</CardDescription>
</div>
<Buttonvariant="ghost" size="sm" onClick={onClose}>
<Xclas sName="h-4w-4"/>
</Button>
</div>
</CardHeader>

<CardContentclas sName="p-6overflow-y-automax-h-[calc(90vh-200px)]">
<divclas sName="space-y-8">
{/*PersonalInformation*/}
<Card>
<CardHeader>
<CardTitleclas sName="flexitems-centerspace-x-2text-bas e">
<IdCardclas sName="h-4w-4"/>
<span>PersonalInformation</span>
</CardTitle>
</CardHeader>
<CardContentclas sName="space-y-4">
<divclas sName="gridmd:grid-cols-2gap-4">
<div>
<LabelhtmlFor="fullName">FullName*</Label>
<Input
id="fullName"
placeholder="Enterfullname"
value={customerData.fullName}
onChange={(e)=>handleInputChange('fullName',e.target.value)}
/>
</div>

<div>
<LabelhtmlFor="phone">PhoneNumber*</Label>
<Input
id="phone"
placeholder="0901234567"
value={customerData.phone}
onChange={(e)=>handleInputChange('phone',e.target.value)}
/>
</div>

<div>
<LabelhtmlFor="email">Email</Label>
<Input
id="email"
type="email"
placeholder="customer@email.com"
value={customerData.email}
onChange={(e)=>handleInputChange('email',e.target.value)}
/>
</div>

<div>
<LabelhtmlFor="dateOfBirth">DateofBirth</Label>
<Input
id="dateOfBirth"
type="date"
value={customerData.dateOfBirth}
onChange={(e)=>handleInputChange('dateOfBirth',e.target.value)}
/>
</div>

<div>
<Label>Gender</Label>
<Selectvalue={customerData.gender}onValueChange={(value)=>handleInputChange('gender',value)}>
<SelectTrigger>
<SelectValueplaceholder="Selectgender"/>
</SelectTrigger>
<SelectContent>
<SelectItemvalue="male">Male</SelectItem>
<SelectItemvalue="female">Female</SelectItem>
<SelectItemvalue="other">Other</SelectItem>
</SelectContent>
</Select>
</div>
</div>

<divclas sName="gridmd:grid-cols-2gap-4">
<div>
<Label>IDType</Label>
<Selectvalue={customerData.idType}onValueChange={(value)=>handleInputChange('idType',value)}>
<SelectTrigger>
<SelectValueplaceholder="SelectIDtype"/>
</SelectTrigger>
<SelectContent>
{idTypes.map((type)=>(
<SelectItemkey={type.value}value={type.value}>
{type.label}
</SelectItem>
))}
</SelectContent>
</Select>
</div>

<div>
<LabelhtmlFor="idNumber">IDNumber</Label>
<Input
id="idNumber"
placeholder="EnterIDnumber"
value={customerData.idNumber}
onChange={(e)=>handleInputChange('idNumber',e.target.value)}
/>
</div>
</div>
</CardContent>
</Card>

{/*AddressInformation*/}
<Card>
<CardHeader>
<CardTitleclas sName="flexitems-centerspace-x-2text-bas e">
<MapPinclas sName="h-4w-4"/>
<span>AddressInformation</span>
</CardTitle>
</CardHeader>
<CardContentclas sName="space-y-4">
<div>
<LabelhtmlFor="address">StreetAddress*</Label>
<Input
id="address"
placeholder="Enterstreetaddress"
value={customerData.address}
onChange={(e)=>handleInputChange('address',e.target.value)}
/>
</div>

<divclas sName="gridmd:grid-cols-3gap-4">
<div>
<LabelhtmlFor="ward">Ward</Label>
<Input
id="ward"
placeholder="Enterward"
value={customerData.ward}
onChange={(e)=>handleInputChange('ward',e.target.value)}
/>
</div>

<div>
<LabelhtmlFor="district">District</Label>
<Input
id="district"
placeholder="Enterdistrict"
value={customerData.district}
onChange={(e)=>handleInputChange('district',e.target.value)}
/>
</div>

<div>
<Label>City</Label>
<Selectvalue={customerData.city}onValueChange={(value)=>handleInputChange('city',value)}>
<SelectTrigger>
<SelectValueplaceholder="Selectcity"/>
</SelectTrigger>
<SelectContent>
{cities.map((city)=>(
<SelectItemkey={city}value={city}>{city}</SelectItem>
))}
</SelectContent>
</Select>
</div>
</div>
</CardContent>
</Card>

{/*ProfessionalInformation*/}
<Card>
<CardHeader>
<CardTitleclas sName="flexitems-centerspace-x-2text-bas e">
<Buildingclas sName="h-4w-4"/>
<span>ProfessionalInformation</span>
</CardTitle>
</CardHeader>
<CardContentclas sName="space-y-4">
<divclas sName="gridmd:grid-cols-2gap-4">
<div>
<LabelhtmlFor="company">Company</Label>
<Input
id="company"
placeholder="Companyname"
value={customerData.company}
onChange={(e)=>handleInputChange('company',e.target.value)}
/>
</div>

<div>
<LabelhtmlFor="jobTitle">JobTitle</Label>
<Input
id="jobTitle"
placeholder="Jobtitle"
value={customerData.jobTitle}
onChange={(e)=>handleInputChange('jobTitle',e.target.value)}
/>
</div>
</div>
</CardContent>
</Card>

{/*EmergencyContact*/}
<Card>
<CardHeader>
<CardTitleclas sName="flexitems-centerspace-x-2text-bas e">
<Phoneclas sName="h-4w-4"/>
<span>EmergencyContact</span>
</CardTitle>
</CardHeader>
<CardContentclas sName="space-y-4">
<divclas sName="gridmd:grid-cols-2gap-4">
<div>
<LabelhtmlFor="emergencyContact">ContactName</Label>
<Input
id="emergencyContact"
placeholder="Emergencycontactname"
value={customerData.emergencyContact}
onChange={(e)=>handleInputChange('emergencyContact',e.target.value)}
/>
</div>

<div>
<LabelhtmlFor="emergencyPhone">ContactPhone</Label>
<Input
id="emergencyPhone"
placeholder="Emergencycontactphone"
value={customerData.emergencyPhone}
onChange={(e)=>handleInputChange('emergencyPhone',e.target.value)}
/>
</div>
</div>
</CardContent>
</Card>

{/*AdditionalNotes*/}
<Card>
<CardHeader>
<CardTitleclas sName="text-bas e">AdditionalNotes</CardTitle>
</CardHeader>
<CardContent>
<div>
<LabelhtmlFor="notes">Notes</Label>
<Textarea
id="notes"
placeholder="Additionalnotesaboutthecustomer..."
value={customerData.notes}
onChange={(e)=>handleInputChange('notes',e.target.value)}
clas sName="min-h-[100px]"
/>
</div>
</CardContent>
</Card>

{/*SummaryPreview*/}
<Cardclas sName="bg-accent/20">
<CardHeader>
<CardTitleclas sName="text-bas e">CustomerSummary</CardTitle>
</CardHeader>
<CardContent>
<divclas sName="gridmd:grid-cols-2gap-4text-sm">
<div>
<p><strong>Name:</strong>{customerData.fullName||'Notentered'}</p>
<p><strong>Phone:</strong>{customerData.phone||'Notentered'}</p>
<p><strong>Email:</strong>{customerData.email||'Notentered'}</p>
<p><strong>ID:</strong>{customerData.idType&&customerData.idNumber`${customerData.idType}:${customerData.idNumber}`:'Notentered'}</p>
</div>
<div>
<p><strong>Address:</strong>{customerData.address||'Notentered'}</p>
<p><strong>City:</strong>{customerData.city||'Notselected'}</p>
<p><strong>Company:</strong>{customerData.company||'Notentered'}</p>
<p><strong>Registeredby:</strong>{user.name}</p>
</div>
</div>
</CardContent>
</Card>
</div>
</CardContent>

{/*Footer*/}
<divclas sName="border-tp-6">
<divclas sName="flexjustify-betweenitems-center">
<pclas sName="text-smtext-muted-foreground">
*Requiredfields
</p>
<divclas sName="flexspace-x-3">
<Buttonvariant="outline" onClick={onClose}>
Cancel
</Button>
<Button
variant="gradient"
onClick={handleSubmit}
disabled={!isValid||isLoading}
>
{isLoading(
<divclas sName="flexitems-centerspace-x-2">
<divclas sName="h-4w-4animate-spinrounded-fullborder-2border-primary-foregroundborder-t-transparent"/>
<span>Adding...</span>
</div>
):(
<>
<Saveclas sName="h-4w-4mr-2"/>
AddCustomer
</>
)}
</Button>
</div>
</div>
</div>
</Card>
</div>
);
};

exportdefaultAddCustomer;