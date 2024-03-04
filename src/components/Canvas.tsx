import BackgroundImage from "../assets/pittsburgh.jpg";
import CreatePathString from "../util/CreatePathString";
import Indicator from "./Indicator";
import { ElementRef, useEffect, useRef, useState } from "react";
import Pointer from "./Pointer";
import CodeBlock from "./CodeBlock";
import GetPolygonCenter from "../util/GetPolygonCenter";

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

  const image_canvas_ref = useRef<ElementRef<"div">>(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [deletedPoints, setDeletedPoints] = useState<number[]>([]);
  // const max_polygon_area = GetPolygonArea([...activePreset]);

  function handleSetPath(updated_path: { x: number; y: number }, id: number) {
    const temp_path = [...path];
    temp_path[id] = updated_path;
    setPath(temp_path);
  }

  useEffect(() => {
    setPath([...activePreset]);
  }, [activePreset]);

  function handleDelete(e: KeyboardEvent) {
    e.preventDefault();
    if (e.key === "Backspace" && deletedPoints.length > 0) {
      const temp_points = [...path];

      if (temp_points.length > 3) {
        const filtered_points = temp_points.filter((point, idx) => {
          if (!deletedPoints.includes(idx)) return point;
        });
        setDeletedPoints([]);
        setPath(filtered_points);
      } else {
        setErrorMessage("Minimum 3 pointers are required");
      }
    }
  }
  useEffect(() => {
    window.addEventListener("keyup", handleDelete);
    return () => window.removeEventListener("keyup", handleDelete);
  });

  function handleScale(e: WheelEvent) {
    e.preventDefault();
    const new_path: { x: number; y: number }[] = [];
    const temp_path = [...path];
    if (e.ctrlKey && e.deltaY) {
      const scaleFactor = e.deltaY * 0.03;
      const polygon_center = GetPolygonCenter([...activePreset]);

      temp_path.forEach((path, id) => {
        let { x, y } = { ...path };

        if (x > polygon_center.x) x -= scaleFactor;
        if (x < polygon_center.x) x += scaleFactor;
        if (y > polygon_center.y) y -= scaleFactor;
        if (y < polygon_center.y) y += scaleFactor;
        const boundedX = Math.min(Math.max(x, 0), activePreset[id].x);
        const boundedY = Math.min(Math.max(y, 0), activePreset[id].y);

        console.log(boundedX, boundedY);

        new_path.push({ x: x, y: y });
      });
      setPath(new_path);
    }
  }
  useEffect(() => {
    window.addEventListener("wheel", handleScale, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", handleScale);
    };
  });

  return (
    <>
      <div
        className="error_message_container"
        style={{
          opacity: `${errorMessage.trim().length > 0 ? "100%" : "0%"}`,
        }}
      >
        <p className="error_message">{errorMessage}</p>
      </div>
      <div className="image_canvas" ref={image_canvas_ref}>
        {path.map((coordinates, id) => (
          <Pointer
            handleSetPath={handleSetPath}
            coordinates={coordinates}
            deletedPoints={deletedPoints}
            setDeletedPoints={setDeletedPoints}
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
                point1={{ x1: coord.x, y1: coord.y }}
                point2={{
                  x2: path[id + 1]?.x,
                  y2: path[id + 1]?.y,
                }}
                key={id}
                id={id}
                setActivePreset={setActivePreset}
                path={path}
              />
            ) : (
              <Indicator
                point1={{ x1: coord.x, y1: coord.y }}
                point2={{ x2: path[0]?.x, y2: path[0]?.y }}
                key={id}
                id={id}
                setActivePreset={setActivePreset}
                path={path}
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

      <CodeBlock clip_path_function={CreatePathString(path)} />
    </>
  );
}
