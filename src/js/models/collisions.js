import { TOOLS, TOOL_NONE } from 'constants';

export function canApplyTool(canvas, { rowIndex, columnIndex }, toolId) {
  if (isRemoveTool(toolId)) {
    return [
      isOtherToolUsedAlready(canvas, rowIndex, columnIndex),
      areLeftOrUpperNeighborsBlocking(canvas, rowIndex, columnIndex)
    ].some(Boolean);
  }

  if (isOtherToolUsedAlready(canvas, rowIndex, columnIndex)) {
    return false;
  }

  const { width, height } = TOOLS[toolId];

  if (width === 2) {
    return [
      !areLeftOrUpperNeighborsBlocking(canvas, rowIndex, columnIndex),
      !isRightNeighborBlocking(canvas, rowIndex, columnIndex),
      !isTopRightNeighborBlocking(canvas, rowIndex, columnIndex)
    ].every(Boolean);
  }

  if (height === 2) {
    return [
      !areLeftOrUpperNeighborsBlocking(canvas, rowIndex, columnIndex),
      !isBottomNeighborBlocking(canvas, rowIndex, columnIndex),
      !isBottomLeftNeighborBlocking(canvas, rowIndex, columnIndex)
    ].every(Boolean);
  }

  return !areLeftOrUpperNeighborsBlocking(canvas, rowIndex, columnIndex);
}

export function isRemoveTool(toolId) {
  return toolId === TOOL_NONE;
}

export function isOtherToolUsedAlready(canvas, rowIndex, columnIndex) {
  return canvas[rowIndex][columnIndex] !== TOOL_NONE;
}

export function areLeftOrUpperNeighborsBlocking(canvas, rowIndex, columnIndex) {
  return [
    isLeftNeighborBlocking(canvas, rowIndex, columnIndex),
    isUpperNeighborBlocking(canvas, rowIndex, columnIndex)
  ].some(Boolean);
}

export function isLeftNeighborBlocking(canvas, rowIndex, columnIndex) {
  if (columnIndex === 0) {
    return false;
  }

  const toolId = canvas[rowIndex][columnIndex - 1];
  const { width } = TOOLS[toolId];

  return width === 2;
}

export function isUpperNeighborBlocking(canvas, rowIndex, columnIndex) {
  if (rowIndex === 0) {
    return false;
  }

  const toolId = canvas[rowIndex - 1][columnIndex];
  const { height } = TOOLS[toolId];

  return height === 2;
}

export function isRightNeighborBlocking(canvas, rowIndex, columnIndex) {
  if (columnIndex === canvas[0].length - 1) {
    return true;
  }

  return canvas[rowIndex][columnIndex + 1] !== TOOL_NONE;
}

export function isTopRightNeighborBlocking(canvas, rowIndex, columnIndex) {
  if (rowIndex === 0) {
    return false;
  }

  if (columnIndex === canvas[0].length - 1) {
    return false;
  }

  const topRightToolId = canvas[rowIndex - 1][columnIndex + 1];
  const { height: topRightToolHeight } = TOOLS[topRightToolId];
  return topRightToolHeight === 2;
}

export function isBottomNeighborBlocking(canvas, rowIndex, columnIndex) {
  if (rowIndex === canvas.length - 1) {
    return true;
  }

  return canvas[rowIndex + 1][columnIndex] !== TOOL_NONE;
}

export function isBottomLeftNeighborBlocking(canvas, rowIndex, columnIndex) {
  if (rowIndex === canvas.length - 1) {
    return false;
  }

  if (columnIndex === 0) {
    return false;
  }

  const bottomLeftToolId = canvas[rowIndex + 1][columnIndex - 1];
  const { width: bottomLeftToolWidth } = TOOLS[bottomLeftToolId];
  return bottomLeftToolWidth === 2;
}
