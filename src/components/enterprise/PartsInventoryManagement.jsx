import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  Download,
  Upload,
  Eye
} from 'lucide-react';

const PartsInventoryManagement: React.FC = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [showDetailView, setShowDetailView] = useState(false);

  // Mock data
  const [parts, setParts] = useState([
    {
      id: '1',
      partCode: 'BAT-LI-001',
      partName: 'Lithium Battery Pack 60kWh',
      category: 'Battery',
      vehicleModel: 'EV Model X',
      currentStock: 5,
      minStock: 10,
      maxStock: 50,
      unitCost: 15000000,
      supplierName: 'BatteryTech Co',
      location: 'A1-01',
      status: 'low-stock',
      lastUpdated: '2024-09-18',
      stockMovements: [
        {
          id: '1',
          type: 'out',
          quantity: 2,
          reason: 'Warranty replacement',
          date: '2024-09-18',
          reference: 'WC-24-001',
          performedBy: 'Tech001'
        }
      ]
    },
    {
      id: '2',
      partCode: 'MOT-AC-002',
      partName: 'AC Motor 150kW',
      category: 'Motor',
      vehicleModel: 'EV Model Y',
      currentStock: 15,
      minStock: 5,
      maxStock: 30,
      unitCost: 8000000,
      supplierName: 'ElectroMotor Ltd',
      location: 'B2-05',
      status: 'active',
      lastUpdated: '2024-09-17',
      stockMovements: []
    },
    {
      id: '3',
      partCode: 'CHG-DC-003',
      partName: 'DC Fast Charger Port',
      category: 'Charging',
      vehicleModel: 'All Models',
      currentStock: 25,
      minStock: 15,
      maxStock: 40,
      unitCost: 2500000,
      supplierName: 'ChargeTech Inc',
      location: 'C1-12',
      status: 'active',
      lastUpdated: '2024-09-16',
      stockMovements: []
    }
  ]);

  const categories = ['all', 'Battery', 'Motor', 'Charging', 'Electronics', 'Mechanical'];

  const filteredParts = parts.filter(part => {
    const matchesSearch = part.partName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         part.partCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || part.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockParts = parts.filter(part => part.currentStock <= part.minStock);

  const getStockStatus = (part) => {
    if (part.currentStock <= part.minStock) {
      return { 
        status: 'low-stock', 
        label: 'Thiếu hàng', 
        variant: 'destructive',
        icon: <AlertTriangle className="w-3 h-3" />
      };
    } else if (part.currentStock >= part.maxStock * 0.8) {
      return { 
        status: 'high-stock', 
        label: 'Dư thừa', 
        variant: 'secondary',
        icon: <TrendingUp className="w-3 h-3" />
      };
    }
    return { 
      status: 'normal', 
      label: 'Bình thường', 
      variant: 'default',
      icon: <Package className="w-3 h-3" />
    };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const handleAddPart = (formData) => {
    const newPart = {
      id: Date.now().toString(),
      ...formData,
      currentStock: parseInt(formData.currentStock),
      minStock: parseInt(formData.minStock),
      maxStock: parseInt(formData.maxStock),
      unitCost: parseInt(formData.unitCost),
      status: 'active',
      lastUpdated: new Date().toISOString().split('T')[0],
      stockMovements: []
    };

    setParts(prev => [...prev, newPart]);
    setShowAddForm(false);
    toast.success('Đã thêm phụ tụng thành công');
  };

  const handleEditPart = (formData) => {
    setParts(prev => prev.map(part => 
      part.id === selectedPart?.id 
        ? { 
            ...part, 
            ...formData,
            currentStock: parseInt(formData.currentStock),
            minStock: parseInt(formData.minStock),
            maxStock: parseInt(formData.maxStock),
            unitCost: parseInt(formData.unitCost),
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : part
    ));
    setShowEditForm(false);
    setSelectedPart(null);
    toast.success('Đã cập nhật phụ tụng thành công');
  };

  const handleDeletePart = (partId) => {
    setParts(prev => prev.filter(part => part.id !== partId));
    toast.success('Đã xóa phụ tụng thành công');
  };

  const openEditForm = (part) => {
    setSelectedPart(part);
    setShowEditForm(true);
  };

  const openDetailView = (part) => {
    setSelectedPart(part);
    setShowDetailView(true);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Quản lý kho phụ tùng
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="inventory" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="inventory">Kho hàng</TabsTrigger>
            <TabsTrigger value="alerts">Cảnh báo ({lowStockParts.length})</TabsTrigger>
            <TabsTrigger value="movements">Xuất nhập kho</TabsTrigger>
            <TabsTrigger value="analytics">Phân tích</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm theo tên hoặc mã phụ tùng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'Tất cả danh mục' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={() => setShowAddForm(true)} className="shrink-0">
                <Plus className="w-4 h-4 mr-2" />
                Thêm phụ tùng
              </Button>
            </div>

            {/* Parts Table */}
            
              <CardContent className="p-0">
                
                  
                    
                      Mã phụ tùng</TableHead>
                      Tên phụ tùng</TableHead>
                      Danh mục</TableHead>
                      Tồn kho</TableHead>
                      Trạng thái</TableHead>
                      Giá</TableHead>
                      Vị trí</TableHead>
                      Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  
                    {filteredParts.map(part => {
                      const stockStatus = getStockStatus(part);
                      return (
                        <TableRow key={part.id}>
                          <TableCell className="font-medium">{part.partCode}</TableCell>
                          {part.partName}</TableCell>
                          {part.category}</TableCell>
                          
                            <span className="font-medium">{part.currentStock}</span>
                            <span className="text-muted-foreground">/{part.maxStock}</span>
                          </TableCell>
                          
                            <Badge variant={stockStatus.variant} className="gap-1">
                              {stockStatus.icon}
                              {stockStatus.label}
                            </Badge>
                          </TableCell>
                          {formatCurrency(part.unitCost)}</TableCell>
                          {part.location}</TableCell>
                          
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openDetailView(part)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openEditForm(part)}
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeletePart(part.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            
              
                <CardTitle className="flex items-center gap-2 text-orange-600">
                  <AlertTriangle className="w-5 h-5" />
                  Cảnh báo thiếu hàng ({lowStockParts.length} mặt hàng)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                
                  
                    
                      Mã phụ tùng</TableHead>
                      Tên phụ tùng</TableHead>
                      Tồn kho</TableHead>
                      Mức tối thiểu</TableHead>
                      Cần bổ sung</TableHead>
                      Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  
                    {lowStockParts.map(part => (
                      <TableRow key={part.id} className="bg-orange-50">
                        <TableCell className="font-medium">{part.partCode}</TableCell>
                        {part.partName}</TableCell>
                        <TableCell className="text-red-600 font-medium">{part.currentStock}</TableCell>
                        {part.minStock}</TableCell>
                        <TableCell className="font-medium text-blue-600">
                          {part.maxStock - part.currentStock}
                        </TableCell>
                        
                          <Button variant="outline" size="sm">
                            Đặt hàng
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="movements" className="space-y-4">
            
              
                Lịch sử xuất nhập kho</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                
                  
                    
                      Ngày</TableHead>
                      Phụ tùng</TableHead>
                      Loại</TableHead>
                      Số lượng</TableHead>
                      Lý do</TableHead>
                      Tham chiếu</TableHead>
                      Người thực hiện</TableHead>
                    </TableRow>
                  </TableHeader>
                  
                    {parts.flatMap(part => 
                      part.stockMovements.map(movement => (
                        <TableRow key={movement.id}>
                          {movement.date}</TableCell>
                          {part.partName}</TableCell>
                          
                            <Badge variant={movement.type === 'in' ? 'default' : 'secondary'}>
                              {movement.type === 'in' ? (
                                <>
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  Nhập
                                </>
                              ) : (
                                <>
                                  <TrendingDown className="w-3 h-3 mr-1" />
                                  Xuất
                                </>
                              )}
                            </Badge>
                          </TableCell>
                          {movement.quantity}</TableCell>
                          {movement.reason}</TableCell>
                          {movement.reference}</TableCell>
                          {movement.performedBy}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    
                      <p className="text-sm text-muted-foreground">Tổng phụ tùng</p>
                      <p className="text-2xl font-bold">{parts.length}</p>
                    </div>
                    <Package className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    
                      <p className="text-sm text-muted-foreground">Thiếu hàng</p>
                      <p className="text-2xl font-bold text-red-600">{lowStockParts.length}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
              
              
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    
                      <p className="text-sm text-muted-foreground">Giá trị tồn kho</p>
                      <p className="text-2xl font-bold">
                        {formatCurrency(parts.reduce((sum, part) => sum + (part.currentStock * part.unitCost), 0))}
                      </p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    
                      <p className="text-sm text-muted-foreground">Danh mục</p>
                      <p className="text-2xl font-bold">{categories.length - 1}</p>
                    </div>
                    <Filter className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Add Part Form */}
        {showAddForm && (
          <PartForm
            onSubmit={handleAddPart}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {/* Edit Part Form */}
        {showEditForm && selectedPart && (
          <PartForm
            initialData={selectedPart}
            onSubmit={handleEditPart}
            onCancel={() => {
              setShowEditForm(false);
              setSelectedPart(null);
            }}
          />
        )}

        {/* Detail View */}
        {showDetailView && selectedPart && (
          <PartDetailView
            part={selectedPart}
            onClose={() => {
              setShowDetailView(false);
              setSelectedPart(null);
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

// Part Form Component
const PartForm: React.FC<{
  initialData?;
  onSubmit: (data) => void;
  onCancel: () => void;
}> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    partCode: initialData?.partCode || '',
    partName: initialData?.partName || '',
    category: initialData?.category || '',
    vehicleModel: initialData?.vehicleModel || '',
    currentStock: initialData?.currentStock?.toString() || '',
    minStock: initialData?.minStock?.toString() || '',
    maxStock: initialData?.maxStock?.toString() || '',
    unitCost: initialData?.unitCost?.toString() || '',
    supplierName: initialData?.supplierName || '',
    location: initialData?.location || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-2xl">
        
          
            {initialData ? 'Chỉnh sửa phụ tùng' : 'Thêm phụ tùng mới'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            
              <Label htmlFor="partCode">Mã phụ tùng</Label>
              <Input
                id="partCode"
                value={formData.partCode}
                onChange={(e) => setFormData(prev => ({...prev, partCode: e.target.value}))}
                required
              />
            </div>
            
              <Label htmlFor="category">Danh mục</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({...prev, category: value}))}>
                
                  <SelectValue />
                </SelectTrigger>
                
                  <SelectItem value="Battery">Battery</SelectItem>
                  <SelectItem value="Motor">Motor</SelectItem>
                  <SelectItem value="Charging">Charging</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Mechanical">Mechanical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          
            <Label htmlFor="partName">Tên phụ tùng</Label>
            <Input
              id="partName"
              value={formData.partName}
              onChange={(e) => setFormData(prev => ({...prev, partName: e.target.value}))}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            
              <Label htmlFor="currentStock">Tồn kho hiện tại</Label>
              <Input
                id="currentStock"
                type="number"
                value={formData.currentStock}
                onChange={(e) => setFormData(prev => ({...prev, currentStock: e.target.value}))}
                required
              />
            </div>
            
              <Label htmlFor="minStock">Tồn kho tối thiểu</Label>
              <Input
                id="minStock"
                type="number"
                value={formData.minStock}
                onChange={(e) => setFormData(prev => ({...prev, minStock: e.target.value}))}
                required
              />
            </div>
            
              <Label htmlFor="maxStock">Tồn kho tối đa</Label>
              <Input
                id="maxStock"
                type="number"
                value={formData.maxStock}
                onChange={(e) => setFormData(prev => ({...prev, maxStock: e.target.value}))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            
              <Label htmlFor="unitCost">Đơn giá (VNĐ)</Label>
              <Input
                id="unitCost"
                type="number"
                value={formData.unitCost}
                onChange={(e) => setFormData(prev => ({...prev, unitCost: e.target.value}))}
                required
              />
            </div>
            
              <Label htmlFor="location">Vị trí kho</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({...prev, location: e.target.value}))}
                required
              />
            </div>
          </div>

          
            <Label htmlFor="supplierName">Nhà cung cấp</Label>
            <Input
              id="supplierName"
              value={formData.supplierName}
              onChange={(e) => setFormData(prev => ({...prev, supplierName: e.target.value}))}
              required
            />
          </div>

          
            <Label htmlFor="vehicleModel">Dòng xe áp dụng</Label>
            <Input
              id="vehicleModel"
              value={formData.vehicleModel}
              onChange={(e) => setFormData(prev => ({...prev, vehicleModel: e.target.value}))}
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Hủy
            </Button>
            <Button type="submit">
              {initialData ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Part Detail View Component
const PartDetailView: React.FC<{
  part;
  onClose: () => void;
}> = ({ part, onClose }) => {
  const stockStatus = part.currentStock <= part.minStock ? 'low-stock' : 
                     part.currentStock >= part.maxStock * 0.8 ? 'high-stock' : 'normal';
                     
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        
          Chi tiết phụ tùng: {part.partCode}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          
            
              <CardTitle className="text-base">Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              
                <Label className="text-sm text-muted-foreground">Mã phụ tùng</Label>
                <p className="font-medium">{part.partCode}</p>
              </div>
              
                <Label className="text-sm text-muted-foreground">Tên phụ tùng</Label>
                <p className="font-medium">{part.partName}</p>
              </div>
              
                <Label className="text-sm text-muted-foreground">Danh mục</Label>
                {part.category}</p>
              </div>
              
                <Label className="text-sm text-muted-foreground">Dòng xe</Label>
                {part.vehicleModel}</p>
              </div>
              
                <Label className="text-sm text-muted-foreground">Nhà cung cấp</Label>
                {part.supplierName}</p>
              </div>
              
                <Label className="text-sm text-muted-foreground">Vị trí kho</Label>
                {part.location}</p>
              </div>
            </CardContent>
          </Card>

          {/* Stock Info */}
          
            
              <CardTitle className="text-base">Thông tin tồn kho</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              
                <Label className="text-sm text-muted-foreground">Tồn kho hiện tại</Label>
                <p className={`text-2xl font-bold ${stockStatus === 'low-stock' ? 'text-red-600' : 'text-green-600'}`}>
                  {part.currentStock}
                </p>
              </div>
              
                <Label className="text-sm text-muted-foreground">Trạng thái</Label>
                <div className="mt-1">
                  <Badge variant={stockStatus === 'low-stock' ? 'destructive' : 'default'}>
                    {stockStatus === 'low-stock' ? 'Thiếu hàng'  === 'high-stock' ? 'Dư thừa' : 'Bình thường'}
                  </Badge>
                </div>
              </div>
              
                <Label className="text-sm text-muted-foreground">Mức tối thiểu</Label>
                {part.minStock}</p>
              </div>
              
                <Label className="text-sm text-muted-foreground">Mức tối đa</Label>
                {part.maxStock}</p>
              </div>
              
                <Label className="text-sm text-muted-foreground">Đơn giá</Label>
                <p className="font-medium">{formatCurrency(part.unitCost)}</p>
              </div>
              
                <Label className="text-sm text-muted-foreground">Giá trị tồn kho</Label>
                <p className="font-medium">{formatCurrency(part.currentStock * part.unitCost)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Recent Movements */}
          
            
              <CardTitle className="text-base">Xuất nhập kho gần đây</CardTitle>
            </CardHeader>
            
              {part.stockMovements.length > 0 ? (
                <div className="space-y-2">
                  {part.stockMovements.slice(0, 3).map(movement => (
                    <div key={movement.id} className="flex justify-between items-center p-2 bg-muted rounded">
                      
                        <p className="text-sm font-medium">{movement.reason}</p>
                        <p className="text-xs text-muted-foreground">{movement.date}</p>
                      </div>
                      <Badge variant={movement.type === 'in' ? 'default' : 'secondary'}>
                        {movement.type === 'in' ? '+' : '-'}{movement.quantity}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Chưa có giao dịch nào</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose}>Đóng</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PartsInventoryManagement;