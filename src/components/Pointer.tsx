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
  const [location, setLocation] = useState<null | { x: number; y: number }>(
    null
  );
  const [handlePointerMouseDown, handlePointerMouseUp] = usePointer({
    location: coordinates,
    handleSetPath: handleSetPath,
    id: id,
    setLocation: setLocation,
  });

  useEffect(() => {
    setLocation(null);
  }, [coordinates]);

  return (
    <div
      className="clip_path_pointer"
      onMouseDown={(e) => handlePointerMouseDown(e)}
      onMouseUp={() => handlePointerMouseUp()}
      style={{
        top: `${location ? location.y : MAX_SIZE * (coordinates.y / 100)}px`,
        left: `${location ? location.x : MAX_SIZE * (coordinates.x / 100)}px`,
      }}
    ></div>
  );
}
