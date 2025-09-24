import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

const AddCustomer = ({ onClose }: { onClose: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const [customerData, setCustomerData] = useState({
    fullName: '',
    phone: '',
    email: '',
    idNumber: '',
    idType: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    company: '',
    jobTitle: '',
    emergencyContact: '',
    emergencyPhone: '',
    notes: ''
  });

  const cities = [
    'TP. Hồ Chí Minh',
    'Hà Nội',
    'Đà Nẵng',
    'Hải Phòng',
    'Cần Thơ',
    'Nha Trang',
    'Huế',
    'Vũng Tàu'
  ];

  const idTypes = [
    { value: 'cccd', label: 'Căn cước công dân' },
    { value: 'cmnd', label: 'Chứng minh nhân dân' },
    { value: 'passport', label: 'Hộ chiếu' },
    { value: 'other', label: 'Khác' }
  ];

  const handleInputChange = (field) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    // Validation
    if (!customerData.fullName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter full name",
        variant: "destructive"
      });
      return;
    }

    if (!validatePhone(customerData.phone)) {
      toast({
        title: "Validation Error", 
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return;
    }

    if (customerData.email && !validateEmail(customerData.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const customerId = `CUST-${Date.now()}`;
      toast({
        title: "Customer Added Successfully!",
        description: `${customerData.fullName} has been added with ID: ${customerId}`,
      });
      setIsLoading(false);
      onClose();
    }, 2000);
  };

  const isValid = customerData.fullName && customerData.phone && customerData.address;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                Add New Customer</span>
              </CardTitle>
              
                Register a new customer in the system
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-8">
            {/* Personal Information */}
            
              
                <CardTitle className="flex items-center space-x-2 text-base">
                  <IdCard className="h-4 w-4" />
                  Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="Enter full name"
                      value={customerData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                    />
                  </div>

                  
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      placeholder="0901234567"
                      value={customerData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>

                  
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="customer@email.com"
                      value={customerData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>

                  
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={customerData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    />
                  </div>

                  
                    Gender</Label>
                    <Select value={customerData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                      
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  
                    ID Type</Label>
                    <Select value={customerData.idType} onValueChange={(value) => handleInputChange('idType', value)}>
                      
                        <SelectValue placeholder="Select ID type" />
                      </SelectTrigger>
                      
                        {idTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  
                    <Label htmlFor="idNumber">ID Number</Label>
                    <Input
                      id="idNumber"
                      placeholder="Enter ID number"
                      value={customerData.idNumber}
                      onChange={(e) => handleInputChange('idNumber', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Address Information */}
            
              
                <CardTitle className="flex items-center space-x-2 text-base">
                  <MapPin className="h-4 w-4" />
                  Address Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    placeholder="Enter street address"
                    value={customerData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  
                    <Label htmlFor="ward">Ward</Label>
                    <Input
                      id="ward"
                      placeholder="Enter ward"
                      value={customerData.ward}
                      onChange={(e) => handleInputChange('ward', e.target.value)}
                    />
                  </div>

                  
                    <Label htmlFor="district">District</Label>
                    <Input
                      id="district"
                      placeholder="Enter district"
                      value={customerData.district}
                      onChange={(e) => handleInputChange('district', e.target.value)}
                    />
                  </div>

                  
                    City</Label>
                    <Select value={customerData.city} onValueChange={(value) => handleInputChange('city', value)}>
                      
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Information */}
            
              
                <CardTitle className="flex items-center space-x-2 text-base">
                  <Building className="h-4 w-4" />
                  Professional Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      placeholder="Company name"
                      value={customerData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                    />
                  </div>

                  
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      placeholder="Job title"
                      value={customerData.jobTitle}
                      onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            
              
                <CardTitle className="flex items-center space-x-2 text-base">
                  <Phone className="h-4 w-4" />
                  Emergency Contact</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  
                    <Label htmlFor="emergencyContact">Contact Name</Label>
                    <Input
                      id="emergencyContact"
                      placeholder="Emergency contact name"
                      value={customerData.emergencyContact}
                      onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    />
                  </div>

                  
                    <Label htmlFor="emergencyPhone">Contact Phone</Label>
                    <Input
                      id="emergencyPhone"
                      placeholder="Emergency contact phone"
                      value={customerData.emergencyPhone}
                      onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Notes */}
            
              
                <CardTitle className="text-base">Additional Notes</CardTitle>
              </CardHeader>
              
                
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Additional notes about the customer..."
                    value={customerData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Summary Preview */}
            <Card className="bg-accent/20">
              
                <CardTitle className="text-base">Customer Summary</CardTitle>
              </CardHeader>
              
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  
                    Name:</strong> {customerData.fullName || 'Not entered'}</p>
                    Phone:</strong> {customerData.phone || 'Not entered'}</p>
                    Email:</strong> {customerData.email || 'Not entered'}</p>
                    ID:</strong> {customerData.idType && customerData.idNumber ? `${customerData.idType}: ${customerData.idNumber}` : 'Not entered'}</p>
                  </div>
                  
                    Address:</strong> {customerData.address || 'Not entered'}</p>
                    City:</strong> {customerData.city || 'Not selected'}</p>
                    Company:</strong> {customerData.company || 'Not entered'}</p>
                    Registered by:</strong> {user?.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>

        {/* Footer */}
        <div className="border-t p-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              * Required fields
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                variant="gradient"
                onClick={handleSubmit}
                disabled={!isValid || isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Adding...</span>
                  </div>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Add Customer
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

export default AddCustomer;