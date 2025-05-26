"use client";
import { useState } from "react";
import { GrFormView, GrFormViewHide } from "react-icons/gr";

interface inputPasswordProps {
  error?: boolean;
  errorMessage?: string;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  icon?: React.ReactNode;
  placeholder?: string;
  children?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputPassword({
  error,
  errorMessage,
  password,
  setPassword,
  icon,
  placeholder,
  children,
  ...props
}: inputPasswordProps) {
  const [isShow, setIsShow] = useState(false);

  const handleShowPassword = () => {
    setIsShow(!isShow);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div className="flex items-center relative text-[#999591]">
      {icon && (
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#666360]">
          {icon}
        </div>
      )}
      <input
        {...props}
        type={isShow ? "text" : "password"}
        placeholder={
          placeholder || (typeof children === "string" ? children : undefined)
        }
        value={password}
        onChange={handlePasswordChange}
        className={`w-full bg-[#232129] rounded-[10px] px-4 h-14 cursor-pointer text-[14px] font-bold pl-10 ${
          error ? "border-red-500" : ""
        }`}
        required
      />
      <div className="absolute right-4">
        {!isShow ? (
          <GrFormView
            onClick={handleShowPassword}
            size={25}
            className="text-[#666360]"
          />
        ) : (
          <GrFormViewHide
            onClick={handleShowPassword}
            size={25}
            className="text-[#666360]"
          />
        )}
      </div>
      {error && <span className="text-red-500">{errorMessage}</span>}
    </div>
  );
}
