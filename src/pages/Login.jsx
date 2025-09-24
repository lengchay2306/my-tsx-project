import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Car, Eye, EyeOff, LogIn, AlertCircle, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const demoAccounts = [
    {
      role: 'Service Center Staff',
      email: 'staff@evservice.com',
      password: 'staff123',
      description: 'Tạo hồ sơ xe, xử lý khách hàng',
      color: 'bg-primary'
    },
    {
      role: 'Technician', 
      email: 'tech@evservice.com',
      password: 'tech123',
      description: 'Chẩn đoán, sửa chữa, cập nhật tiến độ',
      color: 'bg-success'
    },
    {
      role: 'EVM Admin',
      email: 'admin@evm.com', 
      password: 'admin123',
      description: 'Quản lý toàn bộ hệ thống',
      color: 'bg-destructive'
    },
    {
      role: 'EVM Staff',
      email: 'evmstaff@evm.com',
      password: 'evm123', 
      description: 'Duyệt warranty claims, quản lý parts',
      color: 'bg-warning'
    }
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ email và mật khẩu');
      return;
    }

    const success = await login(email, password);
    if (success) {
      toast({
        title: "Đăng nhập thành công!",
        description: "Chào mừng bạn đến với hệ thống EV Warranty Management",
      });
      navigate('/das hboard');
    } else {
      setError('Email hoặc mật khẩu không chính xác');
    }
  };

  const quickLogin = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div clas sName="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/20">
      {/* Header */}
      <header clas sName="border-b bg-card/80 backdrop-blur-sm shadow-elegant">
        <div clas sName="container mx-auto px-6 py-4">
          <div clas sName="flex items-center space-x-3">
            <div clas sName="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
              <Shield clas sName="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 clas sName="text-xl font-bold text-foreground">EV Warranty Management</h1>
              <p clas sName="text-sm text-muted-foreground">Professional Service Platform</p>
            </div>
          </div>
        </div>
      </header>

      <div clas sName="flex min-h-[calc(100vh-80px)] items-center justify-center p-6">
        <div clas sName="w-full max-w-6xl grid gap-8 lg:grid-cols-2">
          
          {/* Login Form */}
          <div clas sName="flex items-center justify-center">
            <Card clas sName="w-full max-w-md shadow-glow">
              <CardHeader clas sName="text-center">
                <div clas sName="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
                  <LogIn clas sName="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle clas sName="text-2xl">Đăng Nhập Hệ Thống</CardTitle>
                <CardDescription>
                  Truy cập vào nền tảng quản lý bảo hành xe điện
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleLogin} clas sName="space-y-6">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle clas sName="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div clas sName="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Nhập địa chỉ email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      clas sName="h-11"
                    />
                  </div>

                  <div clas sName="space-y-2">
                    <Label htmlFor="password">Mật khẩu</Label>
                    <div clas sName="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        clas sName="h-11 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        clas sName="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff clas sName="h-4 w-4" />
                        ) : (
                          <Eye clas sName="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    clas sName="w-full h-11" 
                    variant="gradient"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div clas sName="flex items-center space-x-2">
                        <div clas sName="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                        <span>Đang đăng nhập...</span>
                      </div>
                    ) : (
                      <>
                        <LogIn clas sName="mr-2 h-4 w-4" />
                        Đăng Nhập
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Demo Accounts */}
          <div clas sName="space-y-6">
            <div clas sName="text-center">
              <div clas sName="inline-flex items-center space-x-2 rounded-full bg-accent px-4 py-2">
                <Users clas sName="h-4 w-4 text-accent-foreground" />
                <span clas sName="text-sm font-medium text-accent-foreground">Demo Accounts</span>
              </div>
              <h2 clas sName="mt-4 text-2xl font-bold text-foreground">Tài Khoản Demo</h2>
              <p clas sName="text-muted-foreground">Click vào tài khoản để đăng nhập nhanh</p>
            </div>

            <div clas sName="grid gap-4 sm:grid-cols-2">
              {demoAccounts.map((account, index) => (
                <Card 
                  key={index}
                  clas sName="cursor-pointer transition-all hover:shadow-glow hover:scale-105"
                  onClick={() => quickLogin(account.email, account.password)}
                >
                  <CardHeader clas sName="pb-3">
                    <div clas sName="flex items-center space-x-3">
                      <div clas sName={`flex h-10 w-10 items-center justify-center rounded-lg ${account.color}`}>
                        <Car clas sName="h-5 w-5 text-white" />
                      </div>
                      <div clas sName="flex-1">
                        <CardTitle clas sName="text-bas e">{account.role}</CardTitle>
                        <CardDescription clas sName="text-xs">
                          {account.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent clas sName="space-y-2 pt-0">
                    <div clas sName="flex items-center justify-between">
                      <span clas sName="text-sm text-muted-foreground">Email:</span>
                      <Badge variant="outline" clas sName=" text-xs">
                        {account.email}
                      </Badge>
                    </div>
                    <div clas sName="flex items-center justify-between">
                      <span clas sName="text-sm text-muted-foreground">Pas sword:</span>
                      <Badge variant="secondary" clas sName=" text-xs">
                        {account.password}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card clas sName="bg-accent/50 border-primary/20">
              <CardContent clas sName="pt-6">
                <div clas sName="flex items-start space-x-3">
                  <Shield clas sName="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 clas sName="font-semibold text-foreground">Lưu ý về Demo</h3>
                    <p clas sName="text-sm text-muted-foreground">
                      Đây là phiên bản demo với dữ liệu mẫu. Trong môi trường thực tế, 
                      hệ thống sẽ kết nối với databas e và có bảo mật cao hơn.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;