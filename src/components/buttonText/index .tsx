interface MyTextButtonProps {
  title: string;
  loading?: boolean;
  direction?: "start" | "center" | "end";
  onClick?: () => void;
  isActive?: boolean;
}

export function MyTextButton({
  title,
  loading,
  direction,
  onClick,
  isActive = false,
}: MyTextButtonProps) {
  //State

  const className = `self-${
    direction === "start" ? "start" : direction === "end" ? "end" : "center"
  }`;
  const activeClass = isActive ? "text-[#FF9000]" : "text-[#999591]";

  return (
    <div className={className}>
      <button
        onClick={onClick}
        disabled={loading}
        className={`bg-none border-none rounded text-[#999591] text-[20px]  cursor-pointer focus:outline-none  ${activeClass} self-end`}
      >
        {title}
      </button>
    </div>
  );
}
