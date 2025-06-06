"use client";
import { DividerInline } from "../dividerInline";
import { MyTextButton } from "../buttonText/index ";
import { VscAdd } from "react-icons/vsc";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface MenuNavProps {
  tags?: string[];
  onSelectTag?: (tagName: string) => void;
  selectedTags?: string[];
}
export function MenuNav({
  tags,
  onSelectTag,
  selectedTags = [],
}: MenuNavProps) {
  const router = useRouter();
  const handleOpenCreateNote = () => {
    router.push("/create");
  };

  return (
    <div className="flex flex-col bg-[#232129] relative top-0 left-0 w-[300px] h-screen justify-between ">
      <div className="flex flex-col items-center mt-[50px]">
        <Image
          width={150}
          height={32}
          src="/Assets/logo.svg"
          alt="logo"
          className="mb-[29px] w-auto"
        />
        <DividerInline />
      </div>

      <div>
        <div className="flex flex-col items-start px-20 gap-[10px] scroll-auto">
          <MyTextButton
            title="Todos"
            onClick={() => onSelectTag?.("")}
            isActive={selectedTags.length === 0}
          />
          {tags?.map((tagName) => (
            <MyTextButton
              key={tagName}
              title={tagName}
              onClick={() => onSelectTag?.(tagName)}
              isActive={selectedTags.includes(tagName)}
            />
          ))}
        </div>
      </div>

      <div
        onClick={handleOpenCreateNote}
        className="flex flex-row text-[#232129] text-[20px] bg-[#FF9000] p-[20px] items-center justify-center cursor-pointer"
      >
        <button className="flex flex-row items-center gap-[10px] cursor-pointer">
          <VscAdd size={20} className="text-[#232129]" />
          Criar nota
        </button>
      </div>
    </div>
  );
}
