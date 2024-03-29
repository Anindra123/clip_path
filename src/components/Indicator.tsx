import { ElementRef } from "react";
import { CONTAINER_SIZE } from "../constants/Sizes";
import PercentageToPixel from "../util/PercentageToPixel";
import PixelToPercentage from "../util/PixeltoPercentage";

interface IndicatorProp {
  point1: { x1: number; y1: number };
  point2: { x2: number; y2: number };
  path: { x: number; y: number }[];
  setActivePreset: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }[]>
  >;
  imageCanvasRef: React.RefObject<ElementRef<"div">>;
  setDeletedPoints: React.Dispatch<React.SetStateAction<number[]>>;
  id: number;
}

export default function Indicator({
  point1,
  point2,
  path,
  setActivePreset,
  imageCanvasRef,
  setDeletedPoints,
  id,
}: IndicatorProp) {
  const x1 = PercentageToPixel(CONTAINER_SIZE, point1.x1);
  const x2 = PercentageToPixel(CONTAINER_SIZE, point2.x2);
  const y1 = PercentageToPixel(CONTAINER_SIZE, point1.y1);
  const y2 = PercentageToPixel(CONTAINER_SIZE, point2.y2);
  const path_string = `${x1} ${y1}, ${x2} ${y2}`;

  function handleSetPoint(e: React.MouseEvent<SVGPolylineElement, MouseEvent>) {
    const image_canvas = imageCanvasRef.current;
    const distance_X = e.clientX - image_canvas!.getBoundingClientRect().x;
    const distance_Y = e.clientY - image_canvas!.getBoundingClientRect().y;
    const pointerX = PixelToPercentage(CONTAINER_SIZE, distance_X);
    const pointerY = PixelToPercentage(CONTAINER_SIZE, distance_Y);

    const curr_id = Number(e.currentTarget.id);

    const temp_path = [...path];

    temp_path.splice(curr_id + 1, 0, { x: pointerX, y: pointerY });
    setDeletedPoints([]);
    setActivePreset(temp_path);
  }
  return (
    <polyline
      points={path_string}
      stroke="transparent"
      strokeWidth={2}
      className="indicator"
      onClick={handleSetPoint}
      id={`${id}`}
    />
  );
}
