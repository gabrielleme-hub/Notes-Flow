"use client";
import { MyButton } from "@/components/button";
import { InputPassword } from "@/components/inputPassword";
import InputText from "@/components/inputText";
import Link from "next/link";
import { useState } from "react";
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi";
import Image from "next/image";

export default function Profile() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  return (
    <div>
      <header className="flex items-start h-30 py-12 px-36 bg-[#232129] mb-[-125px]">
        <Link href="/">
          <FiArrowLeft
            size={25}
            className="text-[#999591] hover:text-[#FF9000] "
          />
        </Link>
      </header>
      <form className="max-w-[400px] mx-auto flex flex-col  justify-center gap-2 pt-20">
        <div className="relative mx-auto mt-0 w-[186px] h-[186px] rounded-full">
          <Image
            src="/Assets/foto_perfil_gabriel.jpeg"
            alt="Image de perfil"
            width={150}
            height={100}
            className="rounded-full mx-auto "
          />
          <label className="bg-[#FF9000]  w-[48px] h-[48px] rounded-full flex items-center justify-center cursor-pointer absolute top-9/13 left-9/12 -translate-x-1/2 -translate-y-1/2">
            <input type="file" accept="image/*" className="hidden" />
            <FiCamera
              size={20}
              className="text-[#312E38] hover:text-[#000000]"
            />
          </label>
        </div>
        <InputText type="text" placeholder="Nome" icon={<FiUser />} />
        <InputText type="text" placeholder="E-mail" icon={<FiMail />} />
        <InputPassword
          placeholder="Senha atual"
          error={false}
          errorMessage="Senha incorreta"
          password={password}
          setPassword={setPassword}
          icon={<FiLock />}
        />
        <InputPassword
          placeholder="Nova senha"
          password={newPassword}
          setPassword={setNewPassword}
          icon={<FiLock />}
        />
        <MyButton title="Salvar" />
      </form>
    </div>
  );
}
