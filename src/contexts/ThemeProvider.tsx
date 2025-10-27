import {useEffect, useState} from 'react';
import type { ReactNode } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { THEME_STORAGE_KEY, ThemeContext } from './theme';
import type { Theme } from './theme';

export const ThemeProvider = ({ children }: { children: ReactNode}) => {
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        const savedTheme = loadFromStorage<Theme>(THEME_STORAGE_KEY);
        if(savedTheme){
            setTheme(savedTheme);
        } else {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark )').matches;
            setTheme(systemPrefersDark ? 'dark' : 'light');
        }
    }, []);

    useEffect(() => {
        document.body.className = theme;
        saveToStorage(THEME_STORAGE_KEY, theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme}}>
            { children }
        </ThemeContext.Provider>
    )
}