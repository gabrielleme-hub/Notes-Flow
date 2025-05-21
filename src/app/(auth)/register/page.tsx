"use client";
import { MyButton } from "@/components/button";
import { MyTextButton } from "@/components/buttonText/index ";
import InputText from "@/components/inputText";
import { useCreateUsers } from "@/services/mutatios/users";
import Link from "next/link";
import { useState } from "react";
import { FiLock, FiMail, FiUser } from "react-icons/fi";

export default function Register() {
  // States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [menssage, setMessage] = useState<string | null>("");
  const [error, setError] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  //Query
  const { mutate: createUser } = useCreateUsers();

  // Functions
  const handleSingUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || !email || !password) {
      return alert("Preencha todos os campos!");
    }
    createUser(
      { name, email, password },

      {
        onSuccess: () => {
          setMessage("Usuário criado com sucesso!");
          setErrorMessage(null);
          setTimeout(() => {
            window.location.href = "/login";
          }, 2 * 10000);
        },
        onError: () => {
          setErrorMessage("Erro ao criar usuário: Usuário ja cadastrado!");
          setMessage(null);
        },
      }
    );
  };

  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setName(inputValue);

    if (inputValue.length < 3) {
      return setError((state) => ({
        ...state,
        name: "O nome deve ter no mínimo 3 caracteres",
      }));
    }

    setError((state) => ({ ...state, name: undefined }));
  };

  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setEmail(inputValue);

    if (inputValue.length < 3) {
      return setError((state) => ({
        ...state,
        email: "Insira um email válido",
      }));
    }
    setError((state) => ({ ...state, email: undefined }));
  };

  const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setPassword(inputValue);

    if (inputValue.length < 7) {
      return setError((state) => ({
        ...state,
        password: "A senha deve ter no mínimo 7 caracteres",
      }));
    }
    setError((state) => ({ ...state, password: undefined }));
  };

  return (
    <div className="flex flex-row overflow-y-hidden h-screen ">
      <div className="flex-1 bg-[url('/Assets/background_login.png')] bg-cover bg-no-repeat bg-center opacity-80" />

      <form
        onSubmit={handleSingUp}
        className="px-[136px] flex flex-col justify-center"
      >
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
          <InputText
            placeholder="Nome"
            value={name}
            icon={<FiUser />}
            onChange={handleNameInput}
            error={error?.name}
          />
          <InputText
            placeholder="E-mail"
            value={email}
            icon={<FiMail />}
            onChange={handleEmailInput}
            error={error?.email}
          />
          <InputText
            placeholder="Senha"
            value={password}
            type="password"
            icon={<FiLock />}
            onChange={handlePasswordInput}
            error={error?.password}
          />
          {errorMessage && <span className="text-red-500">{errorMessage}</span>}
          {menssage && <span className="text-green-500">{menssage}</span>}
          <div className="mt-[5px]">
            <MyButton message="Cadastrar" type="submit" />
          </div>
        </div>
        <Link href="/login" className="flex flex-row justify-center">
          <MyTextButton title="Voltar para o login " direction="end" />
        </Link>
      </form>
    </div>
  );
}
