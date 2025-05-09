import { MyButton } from "@/components/button";
import { MyTextButton } from "@/components/buttonText/index ";
import InputText from "@/components/inputText";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-row overflow-y-hidden h-screen ">
      <form className="px-[136px] flex flex-col justify-center ">
        <h1 className="text-[48px] font-bold text-center text-[#FF9000]">
          RocketNotes
        </h1>
        <p className="text-[#999591] text-[14px] text-center mb-[66px]">
          Aplicação para salvar e gerenciar seus links úteis.
        </p>
        <div className=" flex flex-col mb-[50px] gap-[20px] ">
          <h1 className="text-[24px] font-medium text-center">
            Faça seu login
          </h1>
          <InputText placeholder="E-mail" />
          <InputText placeholder="Senha" type="password" />
          <MyButton title="Entrar" />
        </div>
        <Link href="/register" className="flex flex-row justify-center">
          <MyTextButton title="Criar Conta" direction="center" />
        </Link>
      </form>

      <div className="flex-1 bg-[url('/Assets/background_login.png')] bg-cover bg-no-repeat bg-center opacity-80" />
    </div>
  );
}
