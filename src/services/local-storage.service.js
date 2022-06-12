class LocalStorage {
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    get(key, defaultValue) {
        try {
            return JSON.parse(localStorage.getItem(key)) || defaultValue;
        } catch (e) {
            console.error('ls error' + e.toString());
            return defaultValue;
        }

    }
}

const LocalStorageService = new LocalStorage();

export default LocalStorageService;