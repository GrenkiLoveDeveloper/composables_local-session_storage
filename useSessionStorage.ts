export const useSessionStorage = () => {
  const storagePrefix = "scratchy__";

  const get = <T>(key: string): T | null => {
    const item = window.sessionStorage.getItem(storagePrefix + key);

    if (!item || item === "null") {
      return null;
    }

    try {
      return JSON.parse(item);
    } catch (e) {
      let message = "Ошибка парсинга значения из сессии: ";
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
      window.sessionStorage.setItem(
        storagePrefix + key,
        stringiFieldValue ?? "null"
      );
      return true;
    } catch (e) {
      let message = "Ошибка сохранения в сессии: ";
      console.log(message + e, "warning");
      return false;
    }
  };

  const remove = (key: string): void => {
    window.sessionStorage.removeItem(storagePrefix + key);
  };

  return {
    get,
    set,
    remove,
  };
};
