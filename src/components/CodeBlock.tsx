export default function CodeBlock({
  clip_path_function,
}: {
  clip_path_function: string;
}) {
  return (
    <div className="code_block">
      <p className="code_text">clip-path: {clip_path_function} </p>
    </div>
  );
}
