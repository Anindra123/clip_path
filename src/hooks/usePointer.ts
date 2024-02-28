import { MAX_SIZE } from "../constants/Sizes";

interface usePointerProp {
  location: {
    x: number;
    y: number;

  },
  handleSetPath: (new_path: { x: number; y: number }, id: number) => void;
  setLocation: React.Dispatch<React.SetStateAction<{ x: number, y: number } | null>>;
  id: number
}

export default function usePointer({ location, handleSetPath, id, setLocation }: usePointerProp) {

  const temp_location = { ...location };
  temp_location.x = MAX_SIZE * (temp_location.x / 100);
  temp_location.y = MAX_SIZE * (temp_location.y / 100);

  const initial_position = { ...temp_location };



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

    const boundedX = Math.max(Math.min(new_x_position, MAX_SIZE), 0);
    const boundedY = Math.max(Math.min(new_y_position, MAX_SIZE), 0);

    const pointerLocationX = 100 * (boundedX / MAX_SIZE);
    const pointerLocationY = 100 * (boundedY / MAX_SIZE);


    setLocation({ x: boundedX, y: boundedY });
    handleSetPath({ x: pointerLocationX, y: pointerLocationY }, id);
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
