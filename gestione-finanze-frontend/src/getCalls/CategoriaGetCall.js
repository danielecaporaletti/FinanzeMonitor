import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';
import { useAuth } from '../api/AuthContext';

const CategorieGetCall = createContext();

export const useCategorieGetCall = () => {
    return useContext(CategorieGetCall);
};

export const CategoriaGetCallProvider = ({ children }) => {
    const [categorie, setCategorie] = useState('');

    const { auth } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/categorie_movimenti', {
                    auth: {
                        username: auth.username,
                        password: auth.password,
                    },
                });
                setCategorie(response.data);
            } catch (error) {
                console.error(`Error: ${error}`);
            }
        };
        
        if (auth && auth.username && auth.password) {
        fetchData();
        }
    }, [auth]);

    const value = {
        categorie,
    };

    return <CategorieGetCall.Provider value={value}>{children}</CategorieGetCall.Provider>;
};