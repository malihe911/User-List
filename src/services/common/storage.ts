const setItem = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getItem = (key: string): any | false => {
  const item = localStorage.getItem(key);
  if (item) return JSON.parse(item);
  return false;
};

const getItemGeneric = (key: string): string | false => {
  const item = localStorage.getItem(key);
  if (item) return item;
  return false;
};

const setItemGeneric = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

const removeItem = (key: string): void => {
  if (getItem(key) === false) return;
  localStorage.removeItem(key);
};

const clearStorage = (): void => {
  localStorage.clear();
};

export {
  setItemGeneric,
  clearStorage,
  getItem,
  setItem,
  removeItem,
  getItemGeneric,
};
