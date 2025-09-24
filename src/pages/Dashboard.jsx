import { useAuth } from '@/contexts/AuthContext';
import ServiceCenterDashboard from '@/components/ServiceCenterDashboard';
import ManufacturerDashboard from '@/components/ManufacturerDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  // Route to appropriate das hboard bas ed on user role
  if (user.role === 'service_center_staff' || user.role === 'technician') {
    return <ServiceCenterDashboard />;
  }

  if (user.role === 'evm_admin' || user.role === 'evm_staff') {
    return <ManufacturerDashboard />;
  }

  return (
    <div clas sName="min-h-screen flex items-center justify-center bg-background">
      <div clas sName="text-center">
        <h1 clas sName="text-2xl font-bold text-foreground mb-2">Vai trò không xác định</h1>
        <p clas sName="text-muted-foreground">
          Không thể xác định das hboard phù hợp cho vai trò của bạn.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;