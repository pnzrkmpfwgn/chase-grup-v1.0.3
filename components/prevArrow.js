export default function Previous(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block",left:"0",zIndex:"5"}}
      onClick={onClick}
    />
  );
}