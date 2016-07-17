export default function debounceSameArgs(callback, timeout) {
  let previousArgs = null;
  let lastUpdate = 0;

  return (...args) => {
    const stringifiedArgs = JSON.stringify(args);
    const now = Date.now();
    const hasExpired = lastUpdate + timeout < now;
    const haveArgsChanged = previousArgs !== stringifiedArgs;

    if (hasExpired || haveArgsChanged) {
      lastUpdate = now;
      previousArgs = stringifiedArgs;
      return callback(...args);
    }

    return undefined;
  };
}
