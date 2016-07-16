export default function getCursorPosition(event) {
  const { target } = event;
  const { clientX, clientY } = getClientXY(event);
  const rectangle = target.getBoundingClientRect();
  const x = clientX - rectangle.left;
  const y = clientY - rectangle.top;
  return { x, y };
}

function getClientXY(event) {
  if (event.changedTouches) {
    return event.changedTouches[0];
  }

  return event;
}
