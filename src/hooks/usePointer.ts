import { MAX_SIZE } from "../constants/Sizes";

interface usePointerProp {
  pointerLocation: {
    x: number;
    y: number;

  },
  handleSetPath: (new_path: { x: number; y: number }, id: number) => void;
  setLocation: React.Dispatch<React.SetStateAction<{ x: number, y: number }>>;
  id: number
}

export default function usePointer({ pointerLocation, setLocation, handleSetPath, id }: usePointerProp) {

  const temp_location = { ...pointerLocation };

  const initial_position = { x: 0, y: 0 };



  function handlePointerMouseDown(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {

    initial_position.x = event.clientX - temp_location.x;
    initial_position.y = event.clientY - temp_location.y;

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



    const boundedX = Math.max(Math.min(new_x_position, MAX_SIZE + 15), -15);
    const boundedY = Math.max(Math.min(new_y_position, MAX_SIZE + 15), -15);

    const pointerLocationX = 100 * ((boundedX) / MAX_SIZE);
    const pointerLocationY = 100 * ((boundedY) / MAX_SIZE);

    const clip_locationX = Math.max(Math.min(pointerLocationX, 100), 0);
    const clip_locationY = Math.max(Math.min(pointerLocationY, 100), 0);

    setLocation({ x: boundedX, y: boundedY });
    handleSetPath({ x: clip_locationX, y: clip_locationY }, id);
  }

  function handlePointerMouseUp() {
    document.body.removeEventListener("mousemove", handlePointerMouseMove);
    document.body.removeEventListener("mouseup", handlePointerMouseUp);
  }

  return [
    handlePointerMouseDown,
    handlePointerMouseUp,
  ] as const;
}
