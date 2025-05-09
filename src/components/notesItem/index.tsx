import { FiX } from "react-icons/fi";
import { VscAdd } from "react-icons/vsc";

interface NotesItemProps {
  value: string;
  isNew: boolean;
  onClick: () => void;
}

export function NotesItem({ isNew, value, onClick, ...rest }: NotesItemProps) {
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
          value={value}
          readOnly={!isNew}
          {...rest}
          className="flex items-center justify-between border-none text-[#ffffff] w-full p-2 text-[16px] gap-2 outline-none"
        />
        <button onClick={onClick}>
          {isNew ? (
            <VscAdd size={20} className="text-[#FF9000]" />
          ) : (
            <FiX size={20} className="text-[#FF002E]" />
          )}
        </button>
      </div>
    </div>
  );
}
