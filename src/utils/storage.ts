import { is } from "./Is";

export const createStorage = <T extends any>(key: string) => {
  return {
    // APIである可能性も想定し、Promiseとする
    save: async (data: T): Promise<boolean> => {
      window.localStorage.setItem(key, JSON.stringify(data));
      return true;
    },
    load: async (): Promise<T | undefined> => {
      const result = window.localStorage.getItem(key);
      if (is.null(result)) return;
      return JSON.parse(result);
    },
  };
};
