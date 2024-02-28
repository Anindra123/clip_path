import { CONTAINER_SIZE } from "../constants/Sizes";
import PercentageToPixel from "../util/PercentageToPixel";

interface IndicatorProp {
  point1: { x1: number; y1: number };
  point2: { x2: number; y2: number };
  handleSetPoint: (e: React.MouseEvent<SVGPolylineElement, MouseEvent>) => void;
  id: number;
}

export default function Indicator({
  point1,
  point2,
  handleSetPoint,
  id,
}: IndicatorProp) {
  const x1 = PercentageToPixel(CONTAINER_SIZE, point1.x1);
  const x2 = PercentageToPixel(CONTAINER_SIZE, point2.x2);
  const y1 = PercentageToPixel(CONTAINER_SIZE, point1.y1);
  const y2 = PercentageToPixel(CONTAINER_SIZE, point2.y2);
  const path_string = `${x1} ${y1}, ${x2} ${y2}`;
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
