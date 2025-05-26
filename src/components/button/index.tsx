import { ComponentProps } from "react";

interface MyButtonProps extends ComponentProps<"button"> {
  message: string;
  isLoading?: boolean;
}

export function MyButton({ message, ...props }: MyButtonProps) {
  return (
    <div>
      <button
        {...props}
        disabled={props.disabled}
        className="w-full bg-[#ff9000] text-[#312E38] rounded-[10px] h-[56px] cursor-pointer hover:bg-[#ff9100a9] text-[16px]"
      >
        {message}
      </button>
    </div>
  );
}
