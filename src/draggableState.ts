/**
 * The point of this file is to have a common state for the draggable popups.
 *
 * The idea is to know when a popup is being dragged from any component.
 *
 * This component include some delays to do the difference between clicks and drag events.
 *
 * It's a bit more vanilla javascript that what can be done with react.
 * */

let draggingState = false;
let startDraggingTimeout = 0;
let stopDraggingTimeout = 0;

export function startDragging(): void {
  if (stopDraggingTimeout) {
    clearTimeout(stopDraggingTimeout);
    stopDraggingTimeout = 0;
  }
  if (!draggingState && !startDraggingTimeout) {
    startDraggingTimeout = window.setTimeout(() => {
      draggingState = true;
      startDraggingTimeout = 0;
    }, 250);
  }
}

export function stopDragging(): void {
  if (startDraggingTimeout) {
    clearTimeout(startDraggingTimeout);
    startDraggingTimeout = 0;
  }

  if (!stopDraggingTimeout) {
    stopDraggingTimeout = window.setTimeout(() => {
      draggingState = false;
      stopDraggingTimeout = 0;
    }, 16);
  }
}

export function isDragging(): boolean {
  return draggingState;
}
