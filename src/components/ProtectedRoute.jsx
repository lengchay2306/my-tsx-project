import { ReactNode } from'react';
import { Navigate } from'react-router-dom';
import { useAuth } from'@/contexts/AuthContext';

interfaceProtectedRouteProps{
children:ReactNode;
allowedRoles:string[];
}

const ProtectedRoute=({children,allowedRoles}:ProtectedRouteProps)=>{
const{user,isLoading}=useAuth();

if(isLoading){
return(
<divclassName="min-h-screenflexitems-centerjustify-centerbg-background">
<divclassName="text-center">
<divclassName="h-8w-8animate-spinrounded-fullborder-4border-primaryborder-t-transparentmx-automb-4"/>
<pclassName="text-muted-foreground">Đangtải...</p>
</div>
</div>
);
}

if(!user){
return<Navigateto="/login"replace/>;
}

if(allowedRoles&&!allowedRoles.includes(user.role)){
return(
<divclassName="min-h-screenflexitems-centerjustify-centerbg-background">
<divclassName="text-center">
<h1className="text-2xlfont-boldtext-foregroundmb-2">Khôngcóquyềntruycập</h1>
<pclassName="text-muted-foreground">
Bạnkhôngcóquyềntruycậpvàotrangnàyvớivaitròhiệntại.
</p>
</div>
</div>
);
}

return<>{children}</>;
};

exportdefaultProtectedRoute;