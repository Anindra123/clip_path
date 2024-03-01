import { useEffect, useState } from "react";
import { MAX_SIZE } from "../constants/Sizes";
import usePointer from "../hooks/usePointer";
import PercentageToPixel from "../util/PercentageToPixel";

interface PointerProps {
  coordinates: {
    x: number;
    y: number;
  };
  handleSetPath: (new_path: { x: number; y: number }, id: number) => void;
  deletedPoints: number[];
  setDeletedPoints: React.Dispatch<React.SetStateAction<number[]>>;
  id: number;
}

export default function Pointer({
  coordinates,
  handleSetPath,
  deletedPoints,
  setDeletedPoints,
  id,
}: PointerProps) {
  const temp_location = { ...coordinates };
  temp_location.x = PercentageToPixel(MAX_SIZE, temp_location.x);
  temp_location.y = PercentageToPixel(MAX_SIZE, temp_location.y);

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

  const handleClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();

    if (e.button === 2) {
      const temp_delete_points = [...deletedPoints];

      if (temp_delete_points.includes(id)) {
        const filtered_delete_points = temp_delete_points.filter(
          (curr_id) => id !== curr_id
        );
        setDeletedPoints(filtered_delete_points);
      } else {
        temp_delete_points.push(id);
        setDeletedPoints(temp_delete_points);
      }
    }
  };

  useEffect(() => {
    const temp_location = { ...coordinates };

    temp_location.x = PercentageToPixel(MAX_SIZE, temp_location.x);
    temp_location.y = PercentageToPixel(MAX_SIZE, temp_location.y);

    if (temp_location.x <= 0) temp_location.x -= 10;
    if (temp_location.x >= MAX_SIZE) temp_location.x += 10;
    if (temp_location.y <= 0) temp_location.y -= 10;
    if (temp_location.y >= MAX_SIZE) temp_location.y += 10;

    setLocation({ x: temp_location.x, y: temp_location.y });
  }, [coordinates]);

  return (
    <svg
      className="clip_path_pointer"
      onMouseDown={(e) => handlePointerMouseDown(e)}
      onMouseUp={() => handlePointerMouseUp()}
      onContextMenu={handleClick}
      width={20}
      height={20}
      style={{
        top: `${location.y}`,
        left: `${location.x}`,
        backgroundColor: `${
          deletedPoints.includes(id) ? "rgba(200,0,0,1)" : "rgba(0,200,0,1)"
        }`,
      }}
    >
      <circle radius={10} cx={10} cy={10} />
    </svg>
  );
}
