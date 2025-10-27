export const saveToStorage = (key: string, value: unknown): void => {
    try{
        const serialized = JSON.stringify(value);
        localStorage.setItem(key, serialized);
    } catch (error){
        console.log(`Failed to save ${key} to local storage:`, error);
    }
};

export const loadFromStorage = <T>(key: string): T | null => {
    try{
        const item = localStorage.getItem(key);
        if(item === null ) return null;
        return JSON.parse(item) as T;
    } catch (error){
        console.error(`Failed to load ${key} from local storage`, error);
        return null;
    }
}

export const removeFromStorage = (key: string): void => {
    localStorage.removeItem(key);
}