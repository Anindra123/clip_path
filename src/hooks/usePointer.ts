import { useState } from "react";
const CANVAS_WIDTH = 300;
const POINTER_SIZE = 30;
const MAX_SIZE = CANVAS_WIDTH - POINTER_SIZE;
interface usePointerProp {
  x: number;
  y: number;
}

export default function usePointer(location: usePointerProp) {
  const [pointerLocation, setPointerLocation] = useState(location);
  const [pointerPosition, setPointerPosition] = useState({
    x: MAX_SIZE * (pointerLocation.x / 100),
    y: MAX_SIZE * (pointerLocation.y / 100),
  });
  const initial_position = { ...pointerPosition };
  function handlePointerMouseDown(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    initial_position.x = event.clientX - pointerPosition.x;
    initial_position.y = event.clientY - pointerPosition.y;

    document.body.addEventListener("mousemove", handlePointerMouseMove);
    document.body.addEventListener("mouseup", handlePointerMouseUp);
  }
  function handlePointerMouseMove(event: MouseEvent) {
    const new_x_position =
      event.clientX -
      (initial_position.x === 0 ? event.clientX : initial_position.x);

    const new_y_position =
      event.clientY -
      (initial_position.y === 0 ? event.clientY : initial_position.y);

    const boundedX = Math.max(Math.min(new_x_position, MAX_SIZE), 0);
    const boundedY = Math.max(Math.min(new_y_position, MAX_SIZE), 0);

    const pointerLocationX = 100 * (boundedX / MAX_SIZE);
    const pointerLocationY = 100 * (boundedY / MAX_SIZE);

    setPointerPosition({ x: boundedX, y: boundedY });
    setPointerLocation({ x: pointerLocationX, y: pointerLocationY });
  }
  function handlePointerMouseUp() {
    document.body.removeEventListener("mousemove", handlePointerMouseMove);
    document.body.removeEventListener("mouseup", handlePointerMouseUp);
  }

  return [
    pointerLocation.x,
    pointerLocation.y,
    pointerPosition,
    handlePointerMouseDown,
    handlePointerMouseUp,
  ] as const;
}
