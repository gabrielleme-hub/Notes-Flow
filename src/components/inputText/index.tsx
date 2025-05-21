interface InputTextProps {
  placeholder?: string;
  value?: string;
  children?: React.ReactNode;
  type?: "text" | "password" | "number" | "textarea";
  icon?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  error?: string;
}

export default function InputText({
  placeholder,
  children,
  type,
  icon,
  onChange,
  className,
  value,
  error,
}: InputTextProps) {
  return (
    <div>
      <div className={`relative text-[#999591] ${className}`}>
        {icon && (
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#666360]">
            {icon}
          </div>
        )}
        <input
          value={value}
          type={type}
          placeholder={
            placeholder || (typeof children === "string" ? children : undefined)
          }
          onChange={onChange}
          className="w-full bg-[#232129] rounded-[10px] px-4 h-14 cursor-pointer text-[14px] font-bold pl-10"
        ></input>
      </div>
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
}
