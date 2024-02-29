import BackgroundImage from "../assets/pittsburgh.jpg";

import CreatePathString from "../util/CreatePathString";
import Indicator from "./Indicator";
import { CONTAINER_SIZE } from "../constants/Sizes";
import { useEffect, useState } from "react";
import Pointer from "./Pointer";

interface CanvasProp {
  activePreset: { x: number; y: number }[];
  setActivePreset: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }[]>
  >;
}

export default function Canvas({ activePreset, setActivePreset }: CanvasProp) {
  const [path, setPath] = useState<{ x: number; y: number }[]>([
    ...activePreset,
  ]);

  function handleSetPath(updated_path: { x: number; y: number }, id: number) {
    const temp_path = [...path];
    temp_path[id] = updated_path;
    setPath(temp_path);
  }

  useEffect(() => {
    setPath([...activePreset]);
  }, [activePreset]);

  function handleSetPoint(e: React.MouseEvent<SVGPolylineElement, MouseEvent>) {
    const image_canvas = document.querySelector(".image_canvas");
    const pointerX =
      (100 * (e.clientX - image_canvas!.getBoundingClientRect().x)) /
      CONTAINER_SIZE;

    const pointerY =
      (100 * (e.clientY - image_canvas!.getBoundingClientRect().y)) /
      CONTAINER_SIZE;

    const curr_id = Number(e.currentTarget.id);

    const temp_path = [...path];

    temp_path.splice(curr_id + 1, 0, { x: pointerX, y: pointerY });

    setActivePreset(temp_path);
  }

  return (
    <div className="image_canvas">
      {activePreset.map((coordinates, id) => (
        <Pointer
          handleSetPath={handleSetPath}
          coordinates={coordinates}
          id={id}
          key={id}
        />
      ))}
      <svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 10,
        }}
      >
        {path.map((coord, id) =>
          id < path.length - 1 ? (
            <Indicator
              handleSetPoint={handleSetPoint}
              point1={{ x1: coord.x, y1: coord.y }}
              point2={{
                x2: path[id + 1]?.x,
                y2: path[id + 1]?.y,
              }}
              key={id}
              id={id}
            />
          ) : (
            <Indicator
              handleSetPoint={handleSetPoint}
              point1={{ x1: coord.x, y1: coord.y }}
              point2={{ x2: path[0]?.x, y2: path[0]?.y }}
              key={id}
              id={id}
            />
          )
        )}
      </svg>
      <img
        src={BackgroundImage}
        style={{
          clipPath: CreatePathString(path),
        }}
        width={300}
        height={300}
      />
    </div>
  );
}
