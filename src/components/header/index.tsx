import Image from "next/image";
import Link from "next/link";
import { RiShutDownLine } from "react-icons/ri";

export function Header() {
  return (
    <div className="flex flex-row items-center justify-between pt-6 px-20 w-full mb-[6px]">
      <div className="flex flex-row items-center">
        <Image
          className="rounded-full"
          src="/Assets/foto_perfil_gabriel.jpeg"
          alt="Image de perfil"
          width={70}
          height={70}
        />
        <div className="flex flex-col items-start  ml-4">
          <span className="text-[#999591]">Bem vindo,</span>
          <h1>Gabriel Leme</h1>
        </div>
      </div>
      <Link href="/" aria-label="Logout" className="">
        <RiShutDownLine size={36} className="text-[#999591]" />
      </Link>
    </div>
  );
}
