import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

// Demo accounts - hardcoded for frontend simulation
const DEMO_ACCOUNTS = {
  'staff@evservice.com': {
    password: 'staff123',
    user: {
      id: 'sc-staff-1',
      email: 'staff@evservice.com',
      name: 'Nguyễn Văn Minh',
      role: 'service_center_staff',
      serviceCenter: 'EV Service Hà Nội',
      department: 'Customer Service'
    }
  },
  'tech@evservice.com': {
    password: 'tech123',
    user: {
      id: 'tech-1',
      email: 'tech@evservice.com', 
      name: 'Trần Thị Hoa',
      role: 'technician',
      serviceCenter: 'EV Service Hà Nội',
      department: 'Technical Repair'
    }
  },
  'admin@evm.com': {
    password: 'admin123',
    user: {
      id: 'evm-admin-1',
      email: 'admin@evm.com',
      name: 'Lê Hoàng Nam',
      role: 'evm_admin',
      department: 'System Administration'
    }
  },
  'evmstaff@evm.com': {
    password: 'evm123',
    user: {
      id: 'evm-staff-1', 
      email: 'evmstaff@evm.com',
      name: 'Phạm Thị Linh',
      role: 'evm_staff',
      department: 'Warranty Management'
    }
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('ev_warranty_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('ev_warranty_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const account = DEMO_ACCOUNTS[email];
    if (account && account.password === password) {
      setUser(account.user);
      localStorage.setItem('ev_warranty_user', JSON.stringify(account.user));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ev_warranty_user');
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};