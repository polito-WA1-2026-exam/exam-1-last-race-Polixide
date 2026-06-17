import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext.js';
import * as authApi from '../api/auth.js'

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for an existing session on app startup
  useEffect(() => {
    authApi.getCurrentUser()
      .then(u => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (credentials) => {
    try {
      const u = await authApi.login(credentials);
      setUser(u);
    } catch (error) {
      throw new Error(error);
    }
    return u;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      throw new Error(error);
    }
    
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export {AuthProvider};