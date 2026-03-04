import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('jwtToken') || null);

    useEffect(() => {
        if (token) {
            localStorage.setItem('jwtToken', token);
        } else {
            localStorage.removeItem('jwtToken');
        }
    }, [token]);

    const login = async (username, password) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (response.ok) {
                setToken(data.token);
                return { success: true };
            }
            return { success: false, error: data.error };
        } catch (error) {
            return { success: false, error: 'Network error occurred. Is the backend running on port 3001?' };
        }
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};
