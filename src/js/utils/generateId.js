export default function generateId() {
  const datePart = Date.now().toString(36);
  const randomPart = Math.random().toString(36);
  const randomPartTrailingZeroRemoved = randomPart.substring(2);
  return `${datePart}-${randomPartTrailingZeroRemoved}`;
}
