import BackgroundImage from "../assets/pittsburgh.jpg";
import Pointer from "./Pointer";
import CreatePathString from "../util/CreatePathString";

interface CanvasProp {
  activePreset: { x: number; y: number }[];
  setActivePreset: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }[]>
  >;
}

export default function Canvas({ activePreset, setActivePreset }: CanvasProp) {
  function handleSetPath(updated_path: { x: number; y: number }, id: number) {
    const temp_path = [...activePreset];
    temp_path[id] = updated_path;
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
      <img
        src={BackgroundImage}
        style={{
          clipPath: CreatePathString(activePreset),
        }}
        width={300}
        height={300}
      />
    </div>
  );
}
