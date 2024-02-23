import BackgroundImage from "../assets/pittsburgh.jpg";
import PointerFactoryService from "../service/PointerFactoryService";

export default function Canvas() {
  const [xLocation1, yLocation1, Pointer1] = PointerFactoryService({
    x: 50,
    y: 10,
  });

  const [xLocation2, yLocation2, Pointer2] = PointerFactoryService({
    x: 10,
    y: 50,
  });

  const [xLocation3, yLocation3, Pointer3] = PointerFactoryService({
    x: 80,
    y: 50,
  });
  return (
    <div className="image_canvas">
      {Pointer1}
      {Pointer2}
      {Pointer3}
      <img
        src={BackgroundImage}
        style={{
          clipPath: `polygon(${xLocation1}% ${yLocation1}%,${xLocation2}% ${yLocation2}%,${xLocation3}% ${yLocation3}%)`,
        }}
        width={300}
        height={300}
      />
    </div>
  );
}
