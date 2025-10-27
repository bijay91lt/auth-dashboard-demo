//AuthContext.ts

import { createContext, useEffect, useState} from "react";
import type { ReactNode } from "react";
import { saveToStorage, loadFromStorage, removeFromStorage } from "../utils/storage";

type User = {
    id: string;
    name: string;
    email:string;
}

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined> (undefined);

const fakeAuth = async (email: string, password: string) : Promise<User | null> => {
    return new Promise((resolve) => {
       setTimeout(() => {
         if(email === 'user@example.com' && password === '123456'){
            resolve({
                id:'1',
                email: 'user@example.com',
                name: 'Demo User',
            });
        } else {
            resolve(null);
        }
    }, 500);
    });
};

const STORAGE_KEY = 'auth-user';

export const AuthProvider = ({ children }: {children: ReactNode}) => {
    const [user, setUser] = useState<User | null> (null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect (() => {
        const initAuth = async () => {
            const savedUser = loadFromStorage<User>(STORAGE_KEY);
            if(savedUser){
                setUser(savedUser)
            }
            setIsLoading(false);
        };
        initAuth();
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        const userData = await fakeAuth(email, password);
        if(userData) {
            setUser(userData);
            saveToStorage(STORAGE_KEY, userData);
        } else {
            //toast add garnu pachhi
            throw new Error("Invalid Credentials");
        }
        setIsLoading(false);
    };

    const logout = () => {
        setUser(null);
        removeFromStorage(STORAGE_KEY);
    };

    return (
        <AuthContext.Provider value = { {user, login, logout, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}