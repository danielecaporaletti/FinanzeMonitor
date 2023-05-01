import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';
import { useAuth } from '../api/AuthContext';

const AnniGetCall = createContext();

export const useAnniGetCall = () => {
    return useContext(AnniGetCall);
};

export const AnniGetCallProvider = ({ children }) => {
    const [anni, setAnni] = useState('');

    const { auth } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/years', {
                    auth: {
                        username: auth.username,
                        password: auth.password,
                    },
                });
                setAnni(response.data);
            } catch (error) {
                console.error(`Error: ${error}`);
            }
        };
        
        if (auth && auth.username && auth.password) {
        fetchData();
        }
    }, [auth]);

    const value = {
        anni,
    };

    return <AnniGetCall.Provider value={value}>{children}</AnniGetCall.Provider>;
};