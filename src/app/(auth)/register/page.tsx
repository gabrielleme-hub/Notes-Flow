import { MyButton } from "@/components/button";
import { MyTextButton } from "@/components/buttonText/index ";
import InputText from "@/components/inputText";
import Link from "next/link";
export default function Register() {
  return (
    <div className="flex flex-row overflow-y-hidden h-screen ">
      <div className="flex-1 bg-[url('/Assets/background_login.png')] bg-cover bg-no-repeat bg-center opacity-80" />

      <form className="px-[136px] flex flex-col justify-center">
        <h1 className="text-[48px] font-bold text-center text-[#FF9000]">
          RocketNotes
        </h1>
        <p className="text-[#999591] text-[14px] text-center mb-[40px]">
          Aplicação para salvar e gerenciar seus links úteis.
        </p>
        <div className=" flex flex-col mb-[50px] gap-[10px]">
          <h1 className="text-[24px] font-medium text-center">
            Crie sua conta
          </h1>
          <InputText placeholder="Nome" />
          <InputText placeholder="E-mail" />
          <InputText placeholder="Senha" type="password" />
          <div className="mt-[5px]">
            <MyButton title="Cadastrar" />
          </div>
        </div>
        <Link href="/login" className="flex flex-row justify-center">
          <MyTextButton title="Voltar para o login " direction="end" />
        </Link>
      </form>
    </div>
  );
}
