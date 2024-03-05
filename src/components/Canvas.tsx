import BackgroundImage from "../assets/pittsburgh.jpg";
import CreatePathString from "../util/CreatePathString";
import Indicator from "./Indicator";
import { ElementRef, useEffect, useRef, useState } from "react";
import Pointer from "./Pointer";
import CodeBlock from "./CodeBlock";
import GetPolygonCenter from "../util/GetPolygonCenter";
import ClipPathMover from "./ClipPathMover";

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

  function handleSetPath(updated_path: { x: number; y: number }, id: number) {
    const temp_path = [...path];
    temp_path[id] = updated_path;
    setActivePreset(temp_path);
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
        setActivePreset(filtered_points);
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
    const temp_path = [...activePreset];
    if (e.ctrlKey && e.deltaY) {
      const scaleFactor = e.deltaY < 1 ? 1.05 : 0.98;
      const polygon_center = GetPolygonCenter([...activePreset]);
      let isBoundaryCrossed = false;

      temp_path.forEach((path) => {
        const { x, y } = { ...path };
        const distance_x = x - polygon_center.x;
        const distance_y = y - polygon_center.y;

        const scaled_x = distance_x * scaleFactor;
        const scaled_y = distance_y * scaleFactor;

        const newX = scaled_x + polygon_center.x;
        const newY = scaled_y + polygon_center.y;

        if (newX > 100 || newX < 0 || newY > 100 || newY < 0)
          isBoundaryCrossed = true;

        new_path.push({ x: newX, y: newY });
      });
      setActivePreset((prev) => {
        return isBoundaryCrossed ? prev : new_path;
      });
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
        {activePreset.map((coordinates, id) => (
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
                imageCanvasRef={image_canvas_ref}
                key={id}
                id={id}
                setActivePreset={setActivePreset}
                path={path}
              />
            ) : (
              <Indicator
                point1={{ x1: coord.x, y1: coord.y }}
                point2={{ x2: path[0]?.x, y2: path[0]?.y }}
                imageCanvasRef={image_canvas_ref}
                key={id}
                id={id}
                setActivePreset={setActivePreset}
                path={path}
              />
            )
          )}
          <ClipPathMover
            setActivePreset={setActivePreset}
            image_canvas_ref={image_canvas_ref}
            path={path}
          />
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
