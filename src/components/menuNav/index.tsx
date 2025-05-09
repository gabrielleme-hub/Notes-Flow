"use client";
import { DividerInline } from "../dividerInline";
import { MyTextButton } from "../buttonText/index ";
import { VscAdd } from "react-icons/vsc";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function MenuNav() {
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
        <div className="flex flex-col items-center gap-[24px]">
          <MyTextButton title="Todos" />
          <MyTextButton title="Frontend" />
          <MyTextButton title="Node" />
          <MyTextButton title="React" />
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
