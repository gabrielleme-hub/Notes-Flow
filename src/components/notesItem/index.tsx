import { FiX } from "react-icons/fi";
import { VscAdd } from "react-icons/vsc";

interface NotesItemProps {
  value: string;
  isNew: boolean;
  onClick: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export function NotesItem({
  isNew,
  value,
  onClick,
  onChange,
  placeholder,
}: NotesItemProps) {
  return (
    <div className="flex justify-center w-full cursor-pointer mb-5">
      <div
        className={`${
          isNew
            ? "flex items-center justify-around border-2 border-dashed border-zinc-500 rounded-md p-2 w-full "
            : "flex items-center justify-around border-2 bg-[#232129] border-none rounded-md p-2 w-full"
        }`}
      >
        <input
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          readOnly={!isNew}
          className="flex items-center justify-between border-none text-[#ffffff] w-full p-2 text-[16px] gap-2 outline-none"
        />
        <button type="button" onClick={onClick}>
          {isNew ? (
            <VscAdd size={20} className="text-[#FF9000] cursor-pointer" />
          ) : (
            <FiX size={20} className="text-[#FF002E] cursor-pointer" />
          )}
        </button>
      </div>
    </div>
  );
}
