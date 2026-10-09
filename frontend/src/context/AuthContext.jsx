import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Demo default initialized user (Pooja - Customer)
  const [user, setUser] = useState({
    id: 5,
    name: 'Pooja Sharma',
    email: 'pooja@example.com',
    role: 'ROLE_CUSTOMER',
    neighborhood: 'Lajpat Nagar',
    city: 'Delhi NCR'
  });

  const [token, setToken] = useState('JWT_DEMO_CUSTOMER_TOKEN');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authDefaultTab, setAuthDefaultTab] = useState('CUSTOMER'); // CUSTOMER, PARTNER, ADMIN

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem('darzi_user', JSON.stringify(userData));
    localStorage.setItem('darzi_token', jwtToken);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('darzi_user');
    localStorage.removeItem('darzi_token');
  };

  const openAuthModal = (tab = 'CUSTOMER') => {
    setAuthDefaultTab(tab);
    setIsAuthModalOpen(true);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('darzi_user');
    const savedToken = localStorage.getItem('darzi_token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      isAuthModalOpen,
      setIsAuthModalOpen,
      openAuthModal,
      authDefaultTab
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
