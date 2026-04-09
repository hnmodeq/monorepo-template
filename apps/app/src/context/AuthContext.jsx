import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { performLogin, performLogout, getCurrentUser } from 'directus';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    const result = await getCurrentUser();
    if (result.success) {
      setUser(result.data);
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    const result = await performLogin(email, password);

    if (result.success) {
      await fetchUser();
      return { success: true };
    } else {
      setError(result.error);
      setLoading(false);
      return { success: false, error: result.error };
    }
  };

  const logout = async () => {
    setLoading(true);
    await performLogout();
    setUser(null);
    setLoading(false);
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    refreshUser: fetchUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
