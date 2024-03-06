import BackgroundImage from "../assets/pittsburgh.jpg";
import CreatePathString from "../util/CreatePathString";
import Indicator from "./Indicator";
import { ElementRef, useEffect, useRef, useState } from "react";
import Pointer from "./Pointer";
import CodeBlock from "./CodeBlock";
import ClipPathMover from "./ClipPathMover";
import useDeletePointer from "../hooks/useDeletePointer";
import usePointerScale from "../hooks/usePointerScale";
import ToastNotification from "./ToastNotification";
import XIconCircle from "../assets/icons/XIconCircle";
import CheckIconCircle from "../assets/icons/CheckIconCircle";
import ClipBoardCopyButton from "./ClipboardCopyButton";

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
  const [deletedPoints, errorMessage, setDeletedPoints, setErrorMessage] =
    useDeletePointer({
      path: path,
      setActivePreset: setActivePreset,
    });
  const [errorToast, setErrorToast] = useState<"open" | "close">("close");
  const [clipBoardToast, setClipBoardToast] = useState<"open" | "close">(
    "close"
  );
  const [clipBoardCopyState, setClipBoardCopy] = useState<"copied" | "default">(
    "default"
  );
  const [handleScale] = usePointerScale({
    activePreset: activePreset,
    setActivePreset: setActivePreset,
  });

  function handleSetPath(updated_path: { x: number; y: number }, id: number) {
    const temp_path = [...path];
    temp_path[id] = updated_path;
    setActivePreset(temp_path);
  }

  useEffect(() => {
    setPath([...activePreset]);
  }, [activePreset]);

  useEffect(() => {
    window.addEventListener("wheel", handleScale, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", handleScale);
    };
  });
  useEffect(() => {
    if (errorMessage.trim().length > 0) {
      setErrorToast("open");
    }
  }, [errorMessage]);

  async function handleClipBoardCopy() {
    navigator.clipboard.writeText(`clip-path:${CreatePathString(path)}`);
    setClipBoardCopy("copied");
    setClipBoardToast("open");
  }

  return (
    <>
      <ToastNotification
        displayState={errorToast}
        setDisplayState={setErrorToast}
        toast_icon={
          <XIconCircle width={20} height={20} color="rgba(255,0,0,1)" />
        }
        title={errorMessage}
        container={document.body}
        duration={3000}
        callBack={() => {
          setErrorMessage("");
        }}
      />

      <ToastNotification
        displayState={clipBoardToast}
        setDisplayState={setClipBoardToast}
        toast_icon={
          <CheckIconCircle width={20} height={20} color="rgba(0,255,0,1)" />
        }
        title={"Copied to clipboard"}
        container={document.body}
        duration={3000}
      />
      <div className="content_container">
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
                  setDeletedPoints={setDeletedPoints}
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
                  setDeletedPoints={setDeletedPoints}
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
      </div>

      <CodeBlock clip_path_function={CreatePathString(path)}>
        <ClipBoardCopyButton
          duration={3000}
          setClipState={setClipBoardCopy}
          clipState={clipBoardCopyState}
          handleClipBoardCopy={handleClipBoardCopy}
        />
      </CodeBlock>
    </>
  );
}
