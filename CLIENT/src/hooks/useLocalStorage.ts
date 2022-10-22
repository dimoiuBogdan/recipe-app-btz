type StorageType = "session" | "local";

const useLocalStorage = () => {
  const getItem = (key: string) => {
    return localStorage.getItem(key);
  };

  const setItem = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const removeItem = (key: string): void => {
    localStorage.removeItem(key);
  };

  return {
    getItem,
    setItem,
    removeItem,
  };
};

export default useLocalStorage;
