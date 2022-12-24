class LocalStorage {
    set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    get(key: string, defaultValue = undefined) {
        try {
            return JSON.parse(localStorage.getItem(key)) || defaultValue;
        } catch (e) {
            console.error('ls error' + e.toString());
            return defaultValue;
        }
    }

    exist(key: string) {
        return (key in localStorage);
    }
}

const LocalStorageService = new LocalStorage();

export default LocalStorageService;
