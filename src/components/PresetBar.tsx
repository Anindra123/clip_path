import { useState } from "react";
import { Presets } from "../constants/Presets";
import PresetButton from "./PresetButton";

interface PresetBarProp {
  handlePresetButtonClick: (current_preset: { x: number; y: number }[]) => void;
}

export default function PresetBar({ handlePresetButtonClick }: PresetBarProp) {
  const [currentSelected, setCurrentSelected] = useState("Triangle");

  return (
    <div className="preset_bar">
      <div className="preset_button_container">
        <PresetButton
          handlePresetButtonClick={handlePresetButtonClick}
          preset_path={Presets.TRIANGLE}
          title="Triangle"
          setCurrentSelected={setCurrentSelected}
          currentSelected={currentSelected}
        />
        <PresetButton
          preset_path={Presets.PARALLELLOGRAM}
          title="Parallelogram"
          handlePresetButtonClick={handlePresetButtonClick}
          setCurrentSelected={setCurrentSelected}
          currentSelected={currentSelected}
        />
        <PresetButton
          handlePresetButtonClick={handlePresetButtonClick}
          preset_path={Presets.TRAPEZOID}
          title="Trapezoid"
          setCurrentSelected={setCurrentSelected}
          currentSelected={currentSelected}
        />
        <PresetButton
          handlePresetButtonClick={handlePresetButtonClick}
          preset_path={Presets.RHOMBUS}
          title="Rhombus"
          setCurrentSelected={setCurrentSelected}
          currentSelected={currentSelected}
        />
      </div>
    </div>
  );
}
