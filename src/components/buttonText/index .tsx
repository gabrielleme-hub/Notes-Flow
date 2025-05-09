interface MyTextButtonProps {
  title: string;
  loading?: boolean;
  direction?: "start" | "center" | "end";
  onClick?: () => void;
}

export function MyTextButton({
  title,
  loading,
  direction,
  onClick,
}: MyTextButtonProps) {
  //State

  const className = `self-${
    direction === "start" ? "start" : direction === "end" ? "end" : "center"
  }`;
  return (
    <div className={className}>
      <button
        onClick={onClick}
        disabled={loading}
        className="bg-none border-none rounded text-[#999591] text-[20px]  cursor-pointer focus:outline-none hover:text-[#FF9000] self-end"
      >
        {title}
      </button>
    </div>
  );
}
