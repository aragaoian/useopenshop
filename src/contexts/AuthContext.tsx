import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, mockUsers } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isBusinessOwner: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  toggleRole: () => void;
  favorites: string[];
  toggleFavorite: (productId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(mockUsers[0]); // start logged in for demo
  const [favorites, setFavorites] = useState<string[]>(['p4', 'p10']);

  const isBusinessOwner = user?.role === 'business';

  const login = useCallback((email: string, _password: string) => {
    const found = mockUsers.find(u => u.email === email);
    if (found) {
      setUser(found);
      return true;
    }
    // Default: log in as customer
    setUser(mockUsers[0]);
    return true;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const toggleRole = useCallback(() => {
    setUser(prev => {
      if (!prev) return mockUsers[0];
      return prev.role === 'customer' ? mockUsers[1] : mockUsers[0];
    });
  }, []);

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isBusinessOwner, login, logout, toggleRole, favorites, toggleFavorite }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
