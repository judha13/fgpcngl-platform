import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('churchhub_user');
    localStorage.removeItem('churchhub_token');
    localStorage.removeItem('churchhub_expires_at');
    delete api.defaults.headers.common['Authorization'];
  };

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('churchhub_user');
    const savedToken = localStorage.getItem('churchhub_token');
    const expiresAt = localStorage.getItem('churchhub_expires_at');

    try {
      if (savedUser && savedToken && expiresAt) {
        const expirationTime = new Date(expiresAt).getTime();
        const currentTime = new Date().getTime();

        if (currentTime < expirationTime) {
          setUser(JSON.parse(savedUser));
          api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
          
          // Set a timer to logout when the session expires
          const timeout = expirationTime - currentTime;
          const timer = setTimeout(() => {
            logout();
          }, timeout);

          return () => clearTimeout(timer);
        } else {
          logout(); // Session expired
        }
      }
    } catch (err) {
      console.error("Auth initialization error:", err);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Set up API interceptor for 401 errors
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          console.warn('Unauthorized request, logging out...');
          logout();
          // Optional: redirect to login if not already there
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.success) {
        const { access_token, user: userData, expires_at } = response.data.data;
        
        const authenticatedUser = {
          id: userData.id,
          name: userData.name || userData.email.split('@')[0], // Fallback name
          email: userData.email,
          role: userData.role
        };

        setUser(authenticatedUser);
        localStorage.setItem('churchhub_user', JSON.stringify(authenticatedUser));
        localStorage.setItem('churchhub_token', access_token);
        localStorage.setItem('churchhub_expires_at', expires_at);
        
        // Set Authorization header for future requests
        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

        // Set logout timer
        const timeout = new Date(expires_at).getTime() - new Date().getTime();
        setTimeout(() => {
          logout();
        }, timeout);

        setIsLoading(false);
        return true;
      }
    } catch (error) {
      console.error('Login error:', error);
    }
    
    setIsLoading(false);
    return false;
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}