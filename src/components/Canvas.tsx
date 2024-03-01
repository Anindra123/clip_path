import BackgroundImage from "../assets/pittsburgh.jpg";
import CreatePathString from "../util/CreatePathString";
import Indicator from "./Indicator";
import { useEffect, useState } from "react";
import Pointer from "./Pointer";
import CodeBlock from "./CodeBlock";

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

  const [errorMessage, setErrorMessage] = useState("");
  const [deletedPoints, setDeletedPoints] = useState<number[]>([]);

  function handleSetPath(updated_path: { x: number; y: number }, id: number) {
    const temp_path = [...path];
    temp_path[id] = updated_path;
    setPath(temp_path);
  }

  useEffect(() => {
    setPath([...activePreset]);
  }, [activePreset]);

  useEffect(() => {
    function handleDelete(e: KeyboardEvent) {
      const temp_points = [...activePreset];

      if (e.key === "Backspace" && deletedPoints.length > 0) {
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
    document.body.addEventListener("keyup", handleDelete);
    return () => document.body.removeEventListener("keyup", handleDelete);
  });

  function handleScale(e: KeyboardEvent | MouseEvent) {
    console.log(e.ctrlKey);
    //TODO : implement scaling
  }

  useEffect(() => {
    document.body.addEventListener("keydown", handleScale);
    document.body.addEventListener("wheel", handleScale, {
      passive: false,
    });

    return () => {
      document.body.removeEventListener("keydown", handleScale);
      document.body.removeEventListener("wheel", handleScale);
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
      <div className="image_canvas">
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
