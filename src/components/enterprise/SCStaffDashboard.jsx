import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Car, 
  Users, 
  Package, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Search,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Activity,
  FileText
} from "lucide-react";

const KPICard = ({ title, value, change, trend, icon: Icon }) => (
  <Card className="hover:shadow-elegant transition-all duration-200">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-center space-x-2">
            <h3 className="text-3xl font-bold text-foreground">{value}</h3>
            {change && (
              <span className={`text-sm flex items-center ${
                trend === 'up' ? 'text-success'  === 'down' ? 'text-destructive' : 'text-muted-foreground'
              }`}>
                <TrendingUp className="h-3 w-3 mr-1" />
                {change}
              </span>
            )}
          </div>
        </div>
        <div className="p-3 rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const SCStaffDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for attention required cases
  const attentionCases = [
    {
      id: "WC-25-09-001",
      customer: "Nguyễn Văn A",
      vin: "VF8ABC123456789",
      status: "pending-manufacturer",
      assignedTech: "Trần Minh B",
      dateCreated: "2025-01-15",
      priority: "high"
    },
    {
      id: "WC-25-09-002", 
      customer: "Lê Thị C",
      vin: "VF9DEF987654321",
      status: "awaiting-parts",
      assignedTech: "Phạm Văn D",
      dateCreated: "2025-01-14",
      priority: "medium"
    },
    {
      id: "WC-25-09-003",
      customer: "Hoàng Minh E",
      vin: "VF8GHI456789123",
      status: "ready-handover",
      assignedTech: "Nguyễn Thị F",
      dateCreated: "2025-01-13", 
      priority: "low"
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      "pending-manufacturer": { variant: "pending", text: "Pending Manufacturer" },
      "awaiting-parts": { variant: "warning", text: "Awaiting Parts" },
      "ready-handover": { variant: "success", text: "Ready for Handover" },
      "in-progress": { variant: "default", text: "In Progress" }
    };
    
    const config = statusConfig[status];
    return config ? <Badge variant={config.variant}>{config.text}</Badge> ;
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { variant: "destructive", text: "High" },
      medium: { variant: "warning", text: "Medium" },
      low: { variant: "secondary", text: "Low" }
    };
    
    const config = priorityConfig[priority];
    return config ? <Badge variant={config.variant} className="text-xs">{config.text}</Badge> ;
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        
          <h1 className="text-3xl font-bold text-foreground">Service Center Dashboard</h1>
          <p className="text-muted-foreground">Monitor warranty cases and service operations</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="gradient">
            <Plus className="mr-2 h-4 w-4" />
            Create New Case
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Open Cases"
          value={24}
          change="+3 today"
          trend="up"
          icon={Car}
        />
        <KPICard
          title="Pending Manufacturer Approval"
          value={8}
          change="+2 this week"
          trend="up"
          icon={Clock}
        />
        <KPICard
          title="Awaiting Parts"
          value={6}
          change="-1 today"
          trend="down"
          icon={Package}
        />
        <KPICard
          title="Ready for Handover"
          value={3}
          change="+1 today"
          trend="up"
          icon={CheckCircle}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content - Attention Required Cases */}
        <div className="lg:col-span-2">
          
            
              <div className="flex items-center justify-between">
                
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    Cases Requiring Attention</span>
                  </CardTitle>
                  
                    High priority cases needing immediate action
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </CardHeader>
            
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search cases, VIN, or customer..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                
                
                  
                    
                      Case ID</TableHead>
                      Customer</TableHead>
                      VIN</TableHead>
                      Status</TableHead>
                      Priority</TableHead>
                      Assigned Tech</TableHead>
                      Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  
                    {attentionCases.map((case_) => (
                      <TableRow key={case_.id} className="hover:bg-muted/50 cursor-pointer">
                        <TableCell className="font-medium font-mono">{case_.id}</TableCell>
                        {case_.customer}</TableCell>
                        <TableCell className="font-mono text-xs">{case_.vin}</TableCell>
                        {getStatusBadge(case_.status)}</TableCell>
                        {getPriorityBadge(case_.priority)}</TableCell>
                        {case_.assignedTech}</TableCell>
                        
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          
            
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Car className="mr-2 h-4 w-4" />
                Register New Vehicle
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Create Warranty Case
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Assign Technician
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Package className="mr-2 h-4 w-4" />
                Track Part Shipment
              </Button>
            </CardContent>
          </Card>

          {/* Activity Feed */}
          
            
              <CardTitle className="text-lg flex items-center space-x-2">
                <Activity className="h-4 w-4" />
                Recent Activity</span>
              </CardTitle>
            </CardHeader>
            
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">Case WC-25-09-001 approved by manufacturer</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">Parts shipment PS-2025-001 in transit</p>
                    <p className="text-xs text-muted-foreground">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">New technician assigned to Case WC-25-09-003</p>
                    <p className="text-xs text-muted-foreground">6 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SCStaffDashboard;