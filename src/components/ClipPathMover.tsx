import PercentageToPixel from "../util/PercentageToPixel";
import PixelToPercentage from "../util/PixeltoPercentage";
import { CONTAINER_SIZE } from "../constants/Sizes";
import { ElementRef, useRef } from "react";

interface ClipPathMoverProps {
  path: { x: number; y: number }[];
  image_canvas_ref: React.RefObject<ElementRef<"div">>;
  setActivePreset: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }[]>
  >;
}

export default function ClipPathMover({
  path,
  image_canvas_ref,
  setActivePreset,
}: ClipPathMoverProps) {
  const polygon_ref = useRef<ElementRef<"polygon">>(null);
  const initial_mouse_position = { x: 0, y: 0 };

  function handleMouseDown(e: React.MouseEvent<SVGPolygonElement, MouseEvent>) {
    const image_canvas = image_canvas_ref.current;
    const distance_x = e.clientX - image_canvas!.getBoundingClientRect().x;
    const distance_y = e.clientY - image_canvas!.getBoundingClientRect().y;
    const mouseX = PixelToPercentage(CONTAINER_SIZE, distance_x);
    const mouseY = PixelToPercentage(CONTAINER_SIZE, distance_y);

    initial_mouse_position.x = mouseX;
    initial_mouse_position.y = mouseY;

    polygon_ref.current!.style.cursor = "move";

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleMouseUp);
  }

  function handleMove(e: MouseEvent) {
    const image_canvas = image_canvas_ref.current;
    const distance_x = e.clientX - image_canvas!.getBoundingClientRect().x;
    const distance_y = e.clientY - image_canvas!.getBoundingClientRect().y;
    const mouseX = PixelToPercentage(CONTAINER_SIZE, distance_x);
    const mouseY = PixelToPercentage(CONTAINER_SIZE, distance_y);
    let cornerHit = false;
    const moveDistanceX =
      initial_mouse_position.x === 0 ? 0 : mouseX - initial_mouse_position.x;
    const moveDistanceY =
      initial_mouse_position.y === 0 ? 0 : mouseY - initial_mouse_position.y;

    const temp_path = [...path];
    const new_path: { x: number; y: number }[] = [];

    temp_path.forEach((path) => {
      let { x, y } = { ...path };
      x += moveDistanceX;
      y += moveDistanceY;
      if (x > 100 || x < -1 || y > 100 || y < -1) {
        cornerHit = true;
      }

      new_path.push({ x: x, y: y });
    });

    if (cornerHit) return;
    setActivePreset(new_path);
  }
  function handleMouseUp() {
    initial_mouse_position.x = 0;
    initial_mouse_position.y = 0;
    polygon_ref.current!.style.cursor = "default";
    window.removeEventListener("mouseup", handleMouseUp);
    window.removeEventListener("mousemove", handleMove);
  }

  return (
    <polygon
      onMouseDown={handleMouseDown}
      ref={polygon_ref}
      points={`${path
        .map(
          (path) =>
            `${PercentageToPixel(CONTAINER_SIZE, path.x)} ${PercentageToPixel(
              CONTAINER_SIZE,
              path.y
            )}`
        )
        .join(",")}`}
      style={{ fill: "transparent", zIndex: "11" }}
    />
  );
}
