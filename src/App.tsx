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
      <div className="main_container">
        <Canvas activePreset={activePreset} setActivePreset={setActivePreset} />
      </div>
      <PresetBar handlePresetButtonClick={handlePresetButtonClick} />
    </>
  );
}

export default App;
