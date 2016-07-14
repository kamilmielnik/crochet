export default function generateId(prefix) {
  const datePart = Date.now().toString(36);
  const randomPart = Math.random().toString(36);
  const randomPartTrailingZeroRemoved = randomPart.substring(2);
  const id = `${datePart}-${randomPartTrailingZeroRemoved}`;

  if (prefix) {
    return `${prefix}-${id}`;
  }

  return id;
}
