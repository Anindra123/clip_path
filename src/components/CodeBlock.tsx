export default function CodeBlock({
  clip_path_function,
  children,
}: {
  clip_path_function: string;
  children: React.ReactElement;
}) {
  return (
    <div className="code_block">
      <div className="clip_path_code_container">
        <p className="code_text">clip-path: {clip_path_function} </p>
      </div>
      <div className="clipboard_copy_button_container">{children}</div>
    </div>
  );
}
