import { useState } from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import PresetBar from "./components/PresetBar";
import { Presets } from "./constants/Presets";

function App() {
  const [activePreset, setActivePreset] = useState(Presets.TRIANGLE);

  function handlePresetButtonClick(currentPreset: { x: number; y: number }[]) {
    setActivePreset(currentPreset);
  }

  return (
    <>
      <Canvas activePreset={activePreset} />
      <PresetBar handlePresetButtonClick={handlePresetButtonClick} />
    </>
  );
}

export default App;
