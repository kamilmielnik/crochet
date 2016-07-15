export default function formatPercent(value, precision = 2) {
  const precisionFactor = Math.pow(10, precision);
  const multipliedValue = Math.round(value * 100 * precisionFactor);
  const beforeDecimalPoint = Math.floor(value * 100);
  const afterDecimalPoint = multipliedValue % precisionFactor;
  const afterDecimalPointFormatted = formatAfterDecimalPoint(afterDecimalPoint, precision);

  return `${beforeDecimalPoint}.${afterDecimalPointFormatted}%`;
}

function formatAfterDecimalPoint(value, precision = 2) {
  const stringifiedValue = String(value);
  const padding = Array(precision + 1).join('0');
  return padding.substring(0, padding.length - stringifiedValue.length) + stringifiedValue;
}
