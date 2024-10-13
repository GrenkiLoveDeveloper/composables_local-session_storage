export const useLocalStorage = () => {
  const storagePrefix = "scratchy__";

  const get = <T>(key: string): T | null => {
    const item = window.localStorage.getItem(storagePrefix + key);

    if (!item || item === "null") {
      return null;
    }

    try {
      return JSON.parse(item);
    } catch (e) {
      let message = "Ошибка парсинга значения из локального хранилища: ";
      console.log(message + e, "warning");
      return null;
    }
  };

  const set = (key: string, value: any): boolean => {
    let stringiFieldValue;

    if (value === undefined) {
      stringiFieldValue = null;
    } else {
      stringiFieldValue = JSON.stringify(value);
    }

    try {
      window.localStorage.setItem(
        storagePrefix + key,
        stringiFieldValue ?? "null"
      );
      return true;
    } catch (e) {
      let message = "Ошибка сохранения в локальное хранилище: ";
      console.log(message + e, "warning");
      return false;
    }
  };

  const remove = (key: string): void => {
    window.localStorage.removeItem(storagePrefix + key);
  };

  return {
    get,
    set,
    remove,
  };
};
