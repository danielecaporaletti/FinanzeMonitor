import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ username: null, password: null });

    useEffect(() => {
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        if (username && password) {
        setAuth({ username, password });
        }
    }, []);

    const setCredentials = (username, password, rememberMe) => {
        if (rememberMe) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
        }
        setAuth({ username, password });
    };

    const removeCredentials = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        setAuth({ username: null, password: null });
    };

    const value = {
        auth,
        setCredentials,
        removeCredentials,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
