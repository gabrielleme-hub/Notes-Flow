interface MyButtonProps {
  title: string;
  loading?: boolean;
  onClick?: () => void;
}

export function MyButton({ title, loading, onClick }: MyButtonProps) {
  return (
    <div>
      <button
        onClick={onClick}
        disabled={loading}
        className="w-full bg-[#ff9000] text-[#312E38] rounded-[10px] h-[56px] cursor-pointer hover:bg-[#ff9100a9] text-[16px]"
      >
        {title}
      </button>
    </div>
  );
}
