import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { User, LoginCredentials, RegisterData, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const clearError = useCallback(() => setError(null), []);

  const login = useCallback(async ({ email, password }: LoginCredentials): Promise<void> => {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    setLoading(true);
    clearError();
    
    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,  // Django expects 'username' field
          password: password,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Login failed. Please check your credentials.');
      }
      
      const data = await response.json();
      
      // Store the token and user data
      localStorage.setItem('token', data.token);
      setUser({
        id: data.user.id.toString(),
        name: data.user.username,
        email: data.user.email,
      });
      
      // Redirect to dashboard or intended URL
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err; // Re-throw to allow error handling in the component
    } finally {
      setLoading(false);
    }
  }, [clearError, navigate, location.state]);

  const register = useCallback(async (userData: RegisterData): Promise<void> => {
    setLoading(true);
    clearError();
    
    try {
      // Mock API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful registration
      const mockUser: User = {
        id: '1',
        name: userData.name,
        email: userData.email,
      };
      
      localStorage.setItem('token', 'mock-jwt-token');
      setUser(mockUser);
      
      // Redirect to dashboard after registration
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [clearError, navigate]);

  const logout = useCallback((): void => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login', { replace: true });
  }, [navigate]);

  // Check for existing token on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Validate token with backend
          const response = await fetch('http://localhost:8000/api/me/', {
            headers: {
              'Authorization': `Token ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser({
              id: userData.id.toString(),
              name: userData.username,
              email: userData.email,
            });
          } else {
            // Token is invalid or expired
            localStorage.removeItem('token');
            setUser(null);
          }
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Auto-clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
  }), [user, loading, error, login, register, logout, clearError]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

