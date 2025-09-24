import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Package, FileText, Image, AlertTriangle } from 'lucide-react';

;
  };
  issueCategory;
  issueDescription;
  diagnostic: {
    mainTechnician;
    assistantTechnicians;
    finalDiagnosis;
    images;
    reportDocument;
  };
  partsNeeded: Array<{
    partCode;
    partName;
    quantity;
    estimatedCost;
  }>;
}

const ManufacturerApproval = ({ claimData, onApproval, onClose }) => {
  const [decision, setDecision] = useState<'approved' | 'rejected' | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [approvalNotes, setApprovalNotes] = useState('');
  const [partsToShip, setPartsToShip] = useState<Array<{
    partCode;
    partName;
    quantity;
    shippingDate;
  }>>([]);
  const { toast } = useToast();

  const handlePartQuantityChange = (partCode) => {
    setPartsToShip(prev => {
      const existing = prev.find(p => p.partCode === partCode);
      if (existing) {
        return prev.map(p => p.partCode === partCode ? { ...p, quantity } );
      } else {
        const part = claimData.partsNeeded.find(p => p.partCode === partCode);
        return [...prev, {
          partCode,
          partName: part?.partName || '',
          quantity,
          shippingDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 3 days from now
        }];
      }
    });
  };

  const handleApprove = () => {
    if (!approvalNotes.trim()) {
      toast({
        title: "Thiếu ghi chú phê duyệt",
        description: "Vui lòng nhập ghi chú cho việc phê duyệt.",
        variant: "destructive"
      });
      return;
    }

    const approvalData = {
      decision: 'approved',
      notes: approvalNotes,
      partsToShip: partsToShip.length > 0 ? partsToShip : claimData.partsNeeded.map(part => ({
        partCode: part.partCode,
        partName: part.partName,
        quantity: part.quantity,
        shippingDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      })),
      approvedAt: new Date().toISOString(),
      approvedBy: 'EVM Admin' // In real app, get from user context
    };

    toast({
      title: "Yêu cầu đã được phê duyệt",
      description: `Yêu cầu bảo hành ${claimData.id} đã được phê duyệt. Phụ kiện sẽ được gửi đến trung tâm dịch vụ.`
    });

    onApproval('approved', approvalData);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Thiếu lý do từ chối",
        description: "Vui lòng nhập lý do từ chối yêu cầu.",
        variant: "destructive"
      });
      return;
    }

    const rejectionData = {
      decision: 'rejected',
      reason: rejectionReason,
      rejectedAt: new Date().toISOString(),
      rejectedBy: 'EVM Admin' // In real app, get from user context
    };

    toast({
      title: "Yêu cầu đã bị từ chối",
      description: `Yêu cầu bảo hành ${claimData.id} đã bị từ chối và gửi về trung tâm dịch vụ.`,
      variant: "destructive"
    });

    onApproval('rejected', rejectionData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Xét duyệt yêu cầu bảo hành #{claimData.id}
          </CardTitle>
          
            Xem xét và quyết định phê duyệt hoặc từ chối yêu cầu bảo hành từ trung tâm dịch vụ
          </CardDescription>
        </CardHeader>

        <CardContent className="overflow-y-auto max-h-[calc(90vh-200px)] space-y-6">
          {/* Vehicle and Customer Info */}
          
            
              <CardTitle className="text-base">Thông tin xe và khách hàng</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              
                <h4 className="font-medium mb-2">Thông tin xe</h4>
                <div className="text-sm space-y-1">
                  VIN:</strong> {claimData.vehicleInfo.vin}</p>
                  Model:</strong> {claimData.vehicleInfo.model}</p>
                  Năm:</strong> {claimData.vehicleInfo.year}</p>
                </div>
              </div>
              
                <h4 className="font-medium mb-2">Thông tin khách hàng</h4>
                <div className="text-sm space-y-1">
                  Tên:</strong> {claimData.vehicleInfo.customer.name}</p>
                  SĐT:</strong> {claimData.vehicleInfo.customer.phone}</p>
                  Email:</strong> {claimData.vehicleInfo.customer.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Issue Description */}
          
            
              <CardTitle className="text-base">Mô tả sự cố</CardTitle>
            </CardHeader>
            
              <div className="mb-2">
                <Badge variant="outline">{claimData.issueCategory}</Badge>
              </div>
              <p className="text-sm">{claimData.issueDescription}</p>
            </CardContent>
          </Card>

          {/* Diagnostic Report */}
          
            
              <CardTitle className="text-base">Báo cáo chẩn đoán</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              
                <p className="text-sm">Kỹ thuật viên chính:</strong> {claimData.diagnostic.mainTechnician}</p>
                {claimData.diagnostic.assistantTechnicians.length > 0 && (
                  <p className="text-sm">KTV hỗ trợ:</strong> {claimData.diagnostic.assistantTechnicians.join(', ')}</p>
                )}
              </div>
              
                <h5 className="font-medium mb-2">Chẩn đoán cuối cùng:</h5>
                <p className="text-sm bg-accent/20 p-3 rounded border">{claimData.diagnostic.finalDiagnosis}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Image className="h-4 w-4 mr-2" />
                  Xem hình ảnh ({claimData.diagnostic.images.length})
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Tải báo cáo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Parts Needed */}
          
            
              <CardTitle className="text-base">Phụ kiện cần thiết</CardTitle>
            </CardHeader>
            
              <div className="space-y-3">
                {claimData.partsNeeded.map((part) => (
                  <div key={part.partCode} className="flex items-center justify-between p-3 border rounded">
                    
                      <p className="font-medium">{part.partName}</p>
                      <p className="text-sm text-muted-foreground">Mã: {part.partCode}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">SL: {part.quantity}</p>
                      <p className="text-sm text-muted-foreground">{part.estimatedCost.toLocaleString('vi-VN')}đ</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-accent/20 rounded">
                <p className="font-medium">
                  Tổng chi phí ước tính: {claimData.partsNeeded.reduce((sum, part) => sum + (part.estimatedCost * part.quantity), 0).toLocaleString('vi-VN')}đ
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Decision Section */}
          <Card className="border-2 border-primary/20">
            
              <CardTitle className="text-base text-primary">Quyết định xét duyệt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Button
                  variant={decision === 'approved' ? 'default' : 'outline'}
                  onClick={() => setDecision('approved')}
                  className="flex-1"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Phê duyệt
                </Button>
                <Button
                  variant={decision === 'rejected' ? 'destructive' : 'outline'}
                  onClick={() => setDecision('rejected')}
                  className="flex-1"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Từ chối
                </Button>
              </div>

              {decision === 'approved' && (
                <div className="space-y-4">
                  
                    <Label htmlFor="approval-notes">Ghi chú phê duyệt *</Label>
                    <Textarea
                      id="approval-notes"
                      placeholder="Nhập ghi chú cho việc phê duyệt yêu cầu..."
                      value={approvalNotes}
                      onChange={(e) => setApprovalNotes(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  
                    <h5 className="font-medium mb-2 flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Xác nhận phụ kiện gửi đi
                    </h5>
                    <div className="space-y-2">
                      {claimData.partsNeeded.map((part) => (
                        <div key={part.partCode} className="flex items-center gap-4 p-2 border rounded">
                          <div className="flex-1">
                            <p className="font-medium">{part.partName}</p>
                            <p className="text-sm text-muted-foreground">Mã: {part.partCode}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Label className="text-sm">SL:</Label>
                            <input
                              type="number"
                              min="1"
                              max={part.quantity}
                              defaultValue={part.quantity}
                              onChange={(e) => handlePartQuantityChange(part.partCode, parseInt(e.target.value) || 1)}
                              className="w-16 px-2 py-1 border rounded text-sm text-center"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {decision === 'rejected' && (
                
                  <Label htmlFor="rejection-reason">Lý do từ chối *</Label>
                  <Textarea
                    id="rejection-reason"
                    placeholder="Nhập lý do từ chối yêu cầu bảo hành..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="mt-1"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-between pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <div className="flex gap-2">
              {decision === 'approved' && (
                <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Xác nhận phê duyệt
                </Button>
              )}
              {decision === 'rejected' && (
                <Button variant="destructive" onClick={handleReject}>
                  <XCircle className="h-4 w-4 mr-2" />
                  Xác nhận từ chối
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManufacturerApproval;