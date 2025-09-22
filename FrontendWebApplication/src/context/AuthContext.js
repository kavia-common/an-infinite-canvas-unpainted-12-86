import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';

/** Roles: viewer, editor, admin */
const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Provides authentication state and helpers. Replace local storage mock with backend JWT later. */
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  // Load from storage
  useEffect(() => {
    const saved = localStorage.getItem('blu_auth');
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed.user);
      setToken(parsed.token);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Replace with: const result = await api.post('/auth/login', { email, password })
    // Mocked:
    const mock = {
      token: 'mock-token',
      user: { id: 'u_1', name: 'Alex Morgan', email, role: email.includes('admin') ? 'admin' : (email.includes('edit') ? 'editor' : 'viewer') }
    };
    setUser(mock.user);
    setToken(mock.token);
    localStorage.setItem('blu_auth', JSON.stringify(mock));
    return mock;
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('blu_auth');
  };

  const value = useMemo(() => ({
    user,
    token,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
  }), [user, token, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAuth() {
  /** Hook to consume authentication context. */
  return useContext(AuthContext);
}
