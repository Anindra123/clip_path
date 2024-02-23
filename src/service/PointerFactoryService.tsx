import usePointer from "../hooks/usePointer";

interface pointerLocation {
  x: number;
  y: number;
}

export default function PointerFactoryService(location: pointerLocation) {
  const [
    xLocation,
    yLocation,
    pointerPosition,
    handlePointerMouseDown,
    handlePointerMouseUp,
  ] = usePointer(location);

  const pointer = (
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

  return [xLocation, yLocation, pointer] as const;
}
