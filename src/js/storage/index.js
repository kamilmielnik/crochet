export default {
  key(index) {
    return localStorage.key(index);
  },

  getItem(key, defaultValue) {
    return JSON.parse(localStorage.getItem(key)) || defaultValue;
  },

  setItem(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
  },

  removeItem(key) {
    return localStorage.removeItem(key);
  },

  clear() {
    return localStorage.clear();
  }
};
