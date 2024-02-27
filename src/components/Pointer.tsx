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
  const [pointerPosition, handlePointerMouseDown, handlePointerMouseUp] =
    usePointer({ location: coordinates, handleSetPath: handleSetPath, id: id });

  //   setPath([coordinates]);

  return (
    <div
      className="clip_path_pointer"
      onMouseDown={(e) => handlePointerMouseDown(e)}
      onMouseUp={() => handlePointerMouseUp()}
      style={{
        top: `${pointerPosition.y}px`,
        left: `${pointerPosition.x}px`,
      }}
    ></div>
  );
}
