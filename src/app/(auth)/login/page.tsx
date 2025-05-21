"use client";
import { MyButton } from "@/components/button";
import { MyTextButton } from "@/components/buttonText/index ";
import InputText from "@/components/inputText";
import { useAuth } from "@/context/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Query
  const { signIn } = useAuth();

  // Functions
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await signIn(email, password);
      setMessage("Login realizado com sucesso");
      setErrorMessage(null);
      router.push("/home");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        "Erro ao fazer login. Tente novamente.";
      setErrorMessage(msg);
      setMessage(null);
    }
  };

  return (
    <div className="flex flex-row overflow-y-hidden h-screen ">
      <form
        onSubmit={handleLogin}
        className="px-[136px] flex flex-col justify-center "
      >
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
          <InputText
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputText
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <MyButton message="Entrar" type="submit" />
          {message && <p className="text-green-500">{message}</p>}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
        <Link href="/register" className="flex flex-row justify-center">
          <MyTextButton title="Criar Conta" direction="center" />
        </Link>
      </form>

      <div className="flex-1 bg-[url('/Assets/background_login.png')] bg-cover bg-no-repeat bg-center opacity-80" />
    </div>
  );
}
