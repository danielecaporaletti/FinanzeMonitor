import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';
import { useAuth } from '../api/AuthContext';

const ContiGetCall = createContext();

export const useContiGetCall = () => {
    return useContext(ContiGetCall);
};

export const ContiGetCallProvider = ({ children }) => {
    const [conti, setConti] = useState('');

    const { auth } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/conti', {
                    auth: {
                        username: auth.username,
                        password: auth.password,
                    },
                });
                setConti(response.data);
            } catch (error) {
                console.error(`Error: ${error}`);
            }
        };
        
        if (auth && auth.username && auth.password) {
        fetchData();
        }
    }, [auth]);

    const value = {
        conti,
    };

    return <ContiGetCall.Provider value={value}>{children}</ContiGetCall.Provider>;
};