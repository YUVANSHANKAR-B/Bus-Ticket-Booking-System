import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token or set user from token
      // For simplicity, assume token is valid and decode or fetch user
      // In real app, decode JWT or call /me endpoint
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL || '/api'}/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
    } catch (err) {
      throw err;
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL || '/api'}/auth/register`, { name, email, password });
      console.log('Registration response:', res.data);
      localStorage.setItem('token', res.data.token);
      // Set user from token or fetch user info
      setUser({ name, email });
    } catch (err) {
      console.error('Registration request error:', err);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};