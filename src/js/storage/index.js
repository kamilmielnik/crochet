import _ from 'underscore';

const getLocalStorageUsage = _.throttle(maxSize => {
  const storageData = JSON.stringify(localStorage);
  const usedSpace = storageData.length;
  return Math.min(1, usedSpace / maxSize);
}, 500);

export default {
  get length() {
    return localStorage.length;
  },

  get maxSize() {
    return 5 * 1024 * 1024;
  },

  get usage() {
    return getLocalStorageUsage(this.maxSize);
  },

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
