import { useEffect } from "react";
import ClipBoardIcon from "../assets/icons/ClipBoardIcon";
import CheckIcon from "../assets/icons/CheckIcon";

interface ClipBoardCopyButtonProp {
  handleClipBoardCopy: () => void;
  duration: number;
  clipState: "copied" | "default";
  setClipState: React.Dispatch<React.SetStateAction<"copied" | "default">>;
}

export default function ClipBoardCopyButton({
  handleClipBoardCopy,
  duration,
  clipState,
  setClipState,
}: ClipBoardCopyButtonProp) {
  useEffect(() => {
    const id = setTimeout(() => {
      setClipState("default");
    }, duration);
    return () => clearTimeout(id);
  }, [clipState]);

  return (
    <a className="clip_board_copy_btn" onClick={handleClipBoardCopy}>
      {clipState === "copied" ? (
        <CheckIcon width={20} height={20} color="rgba(0,255,0,1)" />
      ) : (
        <ClipBoardIcon width={20} height={20} color="#fefefe" />
      )}
    </a>
  );
}
