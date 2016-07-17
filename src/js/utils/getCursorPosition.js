export default function getCursorPosition(event) {
  const { clientX, clientY, target } = getOriginalEvent(event);
  const rectangle = target.getBoundingClientRect();
  const x = clientX - rectangle.left;
  const y = clientY - rectangle.top;
  return { x, y };
}

function getOriginalEvent(event) {
  if (event.evt) {
    return event.evt;
  }

  return event;
}
