import CreatePathString from "../util/CreatePathString";

interface PresetButtonProp {
  preset_path: { x: number; y: number }[];
  title: string;

  handlePresetButtonClick: (current_preset: { x: number; y: number }[]) => void;
}

export default function PresetButton({
  preset_path,
  title,
  handlePresetButtonClick,
}: PresetButtonProp) {
  return (
    <a
      className="preset_button"
      role="button"
      onClick={() => {
        handlePresetButtonClick(preset_path);
      }}
    >
      <div className="preset_button_icon_container">
        <div
          className="preset_button_icon"
          style={{ clipPath: CreatePathString(preset_path) }}
        ></div>
      </div>
      <div className="preset_button_title_container">
        <p className="preset_button_title">{title}</p>
      </div>
    </a>
  );
}
