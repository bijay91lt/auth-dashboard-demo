import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { saveToStorage, loadFromStorage, removeFromStorage } from "../utils/storage";
import { AUTH_STORAGE_KEY, AuthContext } from "./auth";
import type { User } from "./auth";

const fakeAuth = async (email: string, password: string): Promise<User | null> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if(email === 'user@example.com' && password === '12345678'){
                resolve({
                    id: '1', 
                    email: 'user@example.com',
                    name: 'Demo User',
                });
            } else {
                resolve(null);
            }
        }, 500);
    });
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = () => {
            const savedUser = loadFromStorage<User>(AUTH_STORAGE_KEY);
            if(savedUser){
                setUser(savedUser);
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
            saveToStorage(AUTH_STORAGE_KEY, userData);
        } else {
            throw new Error('Invalid credentials');
        }
        setIsLoading(false);
    };

    const logout = () => {
        setUser(null);
        removeFromStorage(AUTH_STORAGE_KEY);
    };

    return (
        <AuthContext.Provider value = {{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}