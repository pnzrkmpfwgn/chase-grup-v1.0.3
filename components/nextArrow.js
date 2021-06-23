export default function Next(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block",right:"0" }}
        onClick={onClick}
      />
    );
  }