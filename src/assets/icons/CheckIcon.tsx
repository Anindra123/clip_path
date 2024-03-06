export default function CheckIcon({
  width,
  height,
  color,
}: {
  width: number;
  height: number;
  color: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${width}`}
      height={`${height}`}
      viewBox="0 0 24 24"
      style={{ fill: color }}
    >
      <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
    </svg>
  );
}
