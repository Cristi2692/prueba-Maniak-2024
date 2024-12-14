const DEFAULT_STORAGE_KEY = "shopping-cart";

function save(data, storageKey = DEFAULT_STORAGE_KEY) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

function get(storageKey = DEFAULT_STORAGE_KEY) {
  const data = localStorage.getItem(storageKey);
  return data ? JSON.parse(data) : [];
}

function clear(storageKey = DEFAULT_STORAGE_KEY) {
  localStorage.removeItem(storageKey);
}

export default {
  save,
  get,
  clear,
};
