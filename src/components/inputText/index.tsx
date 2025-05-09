interface InputTextProps {
  placeholder?: string;
  children?: React.ReactNode;
  type?: "text" | "password" | "number" | "textarea";
  icon?: React.ReactNode;
}

export default function InputText({
  placeholder,
  children,
  type,
  icon,
}: InputTextProps) {
  return (
    <div className="relative text-[#999591] ">
      {icon && (
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#666360]">
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={
          placeholder || (typeof children === "string" ? children : undefined)
        }
        className="w-full bg-[#232129] rounded-[10px] px-4 h-14 cursor-pointer text-[14px] font-bold pl-10"
      ></input>
    </div>
  );
}
