import { Presets } from "../constants/Presets";
import PresetButton from "./PresetButton";

interface PresetBarProp {
  handlePresetButtonClick: (current_preset: { x: number; y: number }[]) => void;
}

export default function PresetBar({ handlePresetButtonClick }: PresetBarProp) {
  return (
    <div className="preset_bar">
      <div className="preset_button_container">
        <PresetButton
          handlePresetButtonClick={handlePresetButtonClick}
          preset_path={Presets.TRIANGLE}
          title="Triangle"
        />
        <PresetButton
          preset_path={Presets.PARALLELLOGRAM}
          title="Parallelogram"
          handlePresetButtonClick={handlePresetButtonClick}
        />
        <PresetButton
          handlePresetButtonClick={handlePresetButtonClick}
          preset_path={Presets.TRAPEZOID}
          title="Trapezoid"
        />
        <PresetButton
          handlePresetButtonClick={handlePresetButtonClick}
          preset_path={Presets.RHOMBUS}
          title="Rhombus"
        />
      </div>
    </div>
  );
}
