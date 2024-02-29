import { useEffect, useState } from "react";
import { MAX_SIZE } from "../constants/Sizes";
import usePointer from "../hooks/usePointer";

interface PointerProps {
  coordinates: {
    x: number;
    y: number;
  };
  handleSetPath: (new_path: { x: number; y: number }, id: number) => void;
  id: number;
}

export default function Pointer({
  coordinates,
  handleSetPath,
  id,
}: PointerProps) {
  const temp_location = { ...coordinates };
  temp_location.x = MAX_SIZE * (temp_location.x / 100);
  temp_location.y = MAX_SIZE * (temp_location.y / 100);

  const [location, setLocation] = useState<{ x: number; y: number }>({
    x: temp_location.x,
    y: temp_location.y,
  });

  const [handlePointerMouseDown, handlePointerMouseUp] = usePointer({
    pointerLocation: { ...location },
    setLocation: setLocation,
    handleSetPath: handleSetPath,
    id: id,
  });

  useEffect(() => {
    const temp_location = { ...coordinates };

    temp_location.x = MAX_SIZE * (temp_location.x / 100);
    temp_location.y = MAX_SIZE * (temp_location.y / 100);

    if (temp_location.x <= 0) temp_location.x -= 15;
    if (temp_location.x >= MAX_SIZE) temp_location.x += 15;
    if (temp_location.y <= 0) temp_location.y -= 15;
    if (temp_location.y >= MAX_SIZE) temp_location.y += 15;

    setLocation({ x: temp_location.x, y: temp_location.y });
  }, [coordinates]);

  return (
    <div
      className="clip_path_pointer"
      onMouseDown={(e) => handlePointerMouseDown(e)}
      onMouseUp={() => handlePointerMouseUp()}
      style={{
        top: `${location.y}px`,
        left: `${location.x}px`,
      }}
    ></div>
  );
}
