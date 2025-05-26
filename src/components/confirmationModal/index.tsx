import React from "react";
interface ConfirmationModalProps {
  title: string;
  messageConfirm?: string;
  messageCancel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  isOpen?: boolean;
}
export function ConfirmationModal({
  isOpen,
  title,
  messageConfirm,
  messageCancel,
  onConfirm,
  onCancel,
  ...props
}: ConfirmationModalProps) {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-[#2321297a]  flex items-center justify-center z-50">
      <div className="bg-[#232129] p-8 rounded-lg shadow-lg text-white max-w-xl w-full text-center relative">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <button
            {...props}
            onClick={onConfirm}
            className="w-full bg-[#ff9000] text-[#312E38] rounded-[10px] h-[56px] cursor-pointer hover:bg-[#ff9100a9] text-[16px] font-bold"
          >
            {messageConfirm}
          </button>
          <button
            {...props}
            onClick={onCancel}
            className="w-full bg-transparent border-2 border-[#ff9000] text-[#ff9000] rounded-[10px] h-[56px] cursor-pointer hover:bg-[#ff900020] text-[16px] font-bold"
          >
            {messageCancel}
          </button>
        </div>
      </div>
    </div>
  );
}
