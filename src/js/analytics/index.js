import generateId from 'utils/generateId';

const launchId = generateId('launch');

export default {
  launchApp() {
    firebase.database().ref(`appLaunches/${launchId}`).set({
      userAgent: window.navigator.userAgent,
      firstTimestamp: new Date().valueOf()
    });
  },

  saveCrochet() {
    firebase.database().ref(`appLaunches/${launchId}`).update({
      lastTimestamp: new Date().valueOf()
    });
  }
};
