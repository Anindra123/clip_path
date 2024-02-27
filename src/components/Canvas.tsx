import { useState } from "react";
import BackgroundImage from "../assets/pittsburgh.jpg";
import Pointer from "./Pointer";
import CreatePathString from "../util/CreatePathString";

interface CanvasProp {
  activePreset: { x: number; y: number }[];
}

export default function Canvas({ activePreset }: CanvasProp) {
  // const [path, setPath] = useState<{ x: number; y: number }[]>([]);
  const [path, setPath] = useState(activePreset);
  console.log(path);

  function handleSetPath(updated_path: { x: number; y: number }, id: number) {
    const temp_path = [...path];
    temp_path[id] = updated_path;
    setPath(temp_path);
  }
  return (
    <div className="image_canvas">
      {activePreset.map((coordinates, id) => (
        <Pointer
          handleSetPath={handleSetPath}
          coordinates={coordinates}
          id={id}
        />
      ))}
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
