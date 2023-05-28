export const setToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key: string, defaultValue = undefined) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || defaultValue;
  } catch (e) {
    console.error("ls error" + e.toString());
    return defaultValue;
  }
};

export const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const localStorageHas = (key: string) => {
  return key in localStorage;
};
