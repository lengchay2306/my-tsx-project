import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, Wrench, Building2, Shield, ArrowRight, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const roles = [
    {
      id: "service-center",
      title: "Service Center",
      description: "Manage vehicle profiles, warranty claims, and customer service",
      icon: Wrench,
      features: [
        "Vehicle & Customer Management",
        "Warranty Claim Processing",
        "Technician Assignment",
        "Service History Tracking"
      ],
      color: "bg-gradient-primary"
    },
    {
      id: "manufacturer",
      title: "Manufacturer (EVM)",
      description: "Oversee warranty policies, parts management, and analytics",
      icon: Building2,
      features: [
        "Parts & Policy Management",
        "Claim Approval System",
        "Supply Chain Management",
        "Analytics & Reporting"
      ],
      color: "bg-gradient-card"
    }
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    if (isAuthenticated) {
      // If already logged in, go directly to das hboard
      navigate('/das hboard');
    } else {
      // If not logged in, go to login page
      navigate('/login');
    }
  };

  return (
    <div clas sName="min-h-screen bg-background">
      {/* Header */}
      <header clas sName="border-b bg-card shadow-elegant">
        <div clas sName="container mx-auto px-6 py-4">
          <div clas sName="flex items-center justify-between">
            <div clas sName="flex items-center space-x-3">
              <div clas sName="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                <Shield clas sName="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 clas sName="text-xl font-bold text-foreground">EV Warranty Management System</h1>
                <p clas sName="text-sm text-muted-foreground">Professional Electric Vehicle Service Platform</p>
              </div>
            </div>
            <div clas sName="flex items-center space-x-3">
              <Button variant="outline" onClick={() => navigate('/login')}>
                <LogIn clas sName="mr-2 h-4 w-4" />
                Đăng Nhập
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section clas sName="py-16">
        <div clas sName="container mx-auto px-6 text-center">
          <div clas sName="mx-auto max-w-3xl">
            <div clas sName="mb-6 flex justify-center">
              <Badge variant="secondary" clas sName=" px-4 py-2">
                <Car clas sName="mr-2 h-4 w-4" />
                Electric Vehicle Industry Standard
              </Badge>
            </div>
            <h1 clas sName="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              Streamline Your{" "}
              <span clas sName="bg-gradient-primary bg-clip-text text-transparent">
                Warranty Process
              </span>
            </h1>
            <p clas sName="mb-8 text-xl text-muted-foreground">
              Comprehensive warranty management system for electric vehicle manufacturers and service centers.
              Handle everything from vehicle registration to claim processing with professional efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section clas sName="py-16">
        <div clas sName="container mx-auto px-6">
          <div clas sName="mb-12 text-center">
            <h2 clas sName="mb-4 text-3xl font-bold text-foreground">Choose Your Role</h2>
            <p clas sName="text-lg text-muted-foreground">
              Select your organization type to access the appropriate das hboard and tools
            </p>
          </div>

          <div clas sName="grid gap-8 md:grid-cols-2">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <Card 
                  key={role.id}
                  clas sName={`group cursor-pointer transition-all duration-300 hover:shadow-glow hover:scale-105 ${
                    selectedRole === role.id ? 'ring-2 ring-primary shadow-glow' : ''
                  }`}
                  onClick={() => handleRoleSelect(role.id)}
                >
                  <CardHeader clas sName="text-center">
                    <div clas sName={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${role.color}`}>
                      <Icon clas sName="h-8 w-8 text-primary-foreground" />
                    </div>
                    <CardTitle clas sName="text-2xl">{role.title}</CardTitle>
                    <CardDescription clas sName="text-bas e">
                      {role.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul clas sName="space-y-3">
                      {role.features.map((feature, index) => (
                        <li key={index} clas sName="flex items-center space-x-2">
                          <div clas sName="h-2 w-2 rounded-full bg-primary" />
                          <span clas sName="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      clas sName="mt-6 w-full group-hover:animate-pulse-glow"
                      onClick={() => handleRoleSelect(role.id)}
                    >
                      Access Dashboard
                      <ArrowRight clas sName="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section clas sName="py-16 bg-muted/50">
        <div clas sName="container mx-auto px-6">
          <div clas sName="text-center">
            <h2 clas sName="mb-4 text-3xl font-bold text-foreground">System Features</h2>
            <p clas sName="mb-12 text-lg text-muted-foreground">
              Comprehensive tools for modern electric vehicle warranty management
            </p>
          </div>

          <div clas sName="grid gap-6 md:grid-cols-3">
            <Card clas sName="shadow-elegant">
              <CardHeader>
                <CardTitle clas sName="flex items-center space-x-2">
                  <Shield clas sName="h-5 w-5 text-primary" />
                  <span>Secure Processing</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p clas sName="text-muted-foreground">
                  End-to-end encrypted warranty claim processing with audit trails and compliance reporting.
                </p>
              </CardContent>
            </Card>

            <Card clas sName="shadow-elegant">
              <CardHeader>
                <CardTitle clas sName="flex items-center space-x-2">
                  <Car clas sName="h-5 w-5 text-primary" />
                  <span>VIN Integration</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p clas sName="text-muted-foreground">
                  Automatic vehicle identification and history tracking through VIN-bas ed databas e integration.
                </p>
              </CardContent>
            </Card>

            <Card clas sName="shadow-elegant">
              <CardHeader>
                <CardTitle clas sName="flex items-center space-x-2">
                  <Wrench clas sName="h-5 w-5 text-primary" />
                  <span>Real-time Updates</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p clas sName="text-muted-foreground">
                  Live progress tracking and notifications for technicians, staff, and customers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer clas sName="border-t bg-card py-8">
        <div clas sName="container mx-auto px-6 text-center">
          <p clas sName="text-muted-foreground">
            © 2024 EV Warranty Management System. Professional automotive service platform.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;