import { createPortal } from "react-dom";
import XIcon from "../assets/icons/XIcon";
import { useEffect } from "react";

interface ToastNotificationProps {
  toast_icon: React.ReactElement;
  title: string;
  container: Element;
  displayState: "close" | "open";
  setDisplayState: React.Dispatch<React.SetStateAction<"close" | "open">>;
  duration: number;
  callBack?: () => void;
}

export default function ToastNotification({
  toast_icon,
  title,
  container,
  displayState,
  setDisplayState,
  duration,
  callBack,
}: ToastNotificationProps) {
  // const [display, setDisplay] = useState(displayState);

  useEffect(() => {
    const id = setTimeout(() => {
      setDisplayState("close");
    }, duration);
    if (callBack && displayState === "close") callBack();
    return () => {
      clearTimeout(id);
    };
  }, [displayState]);

  const content = (
    <div className={`toast_container ${displayState}`}>
      <div className="toast_icon_container">{toast_icon}</div>
      <div className="toast_text_container">
        <p className="toast_text">{title}</p>
      </div>
      <div className="toast_close_button_container">
        <a
          className="toast_close_button"
          role="button"
          onClick={() => setDisplayState("close")}
        >
          <XIcon width={25} height={25} color="rgba(255,255,255,.8)" />
        </a>
      </div>
    </div>
  );
  return <>{createPortal(content, container)}</>;
}
