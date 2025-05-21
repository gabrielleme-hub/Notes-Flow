"use client";
import { MyButton } from "@/components/button";
import { InputPassword } from "@/components/inputPassword";
import InputText from "@/components/inputText";
import Link from "next/link";
import { useEffect, useState } from "react"; // Importe useEffect
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi";
import Image from "next/image";
import { useAuth } from "@/context/auth";
import { useGetFile } from "@/services/queries/files"; // Certifique-se que useGetFile retorna um Blob ou similar

export default function Profile() {
  // hooks
  const { data: auth, updateUser } = useAuth();
  console.log("Avatar from auth context:", auth?.user?.avatar); // Log para verificar o caminho

  // queries
  // Assumimos que useGetFile agora retorna um Blob (ou ArrayBuffer) corretamente
  const {
    data: userAvatar,
    isLoading: isAvatarLoading,
    isError: isAvatarError,
  } = useGetFile(auth?.user?.avatar ?? undefined);
  console.log("User Avatar from useGetFile query (raw data):", userAvatar);
  console.log("Is Avatar Loading:", isAvatarLoading);
  console.log("Is Avatar Error:", isAvatarError);

  // states
  const [avatar, setAvatar] = useState("/Assets/default_avatar.jpg"); // Defina um valor inicial padrão
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // form states
  const [name, setName] = useState<string>(auth?.user?.name ?? "");
  const [email, setEmail] = useState<string>(auth?.user?.email ?? "");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [password, setNewPassword] = useState<string>("");
  const [newAvatar, setNewAvatar] = useState<File | null>(null);

  // Efeito para preencher os campos do formulário quando os dados do usuário estiverem disponíveis
  useEffect(() => {
    if (auth?.user) {
      setName(auth.user.name ?? "");
      setEmail(auth.user.email ?? "");
    }
  }, [auth?.user]);

  // --- NOVO/AJUSTADO: Efeito para carregar o avatar existente do backend ou a imagem padrão ---
  useEffect(() => {
    if (userAvatar instanceof Blob) {
      // Se userAvatar é um Blob, crie uma URL para ele
      const imageUrl = URL.createObjectURL(userAvatar);
      setAvatar(imageUrl);
      // Limpa a URL do objeto quando o componente desmonta ou userAvatar muda
      return () => {
        URL.revokeObjectURL(imageUrl);
        console.log("Revoked object URL:", imageUrl); // Log para depuração
      };
    } else if (userAvatar instanceof ArrayBuffer) {
      // Se for um ArrayBuffer, converta para Blob primeiro
      // IMPORTANTE: O tipo MIME deve ser correto!
      const blob = new Blob([userAvatar], { type: "image/jpeg" }); // Ajuste para o tipo MIME correto!
      const imageUrl = URL.createObjectURL(blob);
      setAvatar(imageUrl);
      return () => {
        URL.revokeObjectURL(imageUrl);
        console.log("Revoked object URL:", imageUrl); // Log para depuração
      };
    }
    // Se o backend por algum motivo retornar uma URL direta (string) ou Data URL (Base64)
    else if (
      typeof userAvatar === "string" &&
      (userAvatar.startsWith("http://") ||
        userAvatar.startsWith("https://") ||
        userAvatar.startsWith("data:image"))
    ) {
      setAvatar(userAvatar);
    }
    // Lógica para definir o avatar padrão se a busca falhou ou não há avatar
    else if (!isAvatarLoading && !isAvatarError && auth?.user?.avatar) {
      // Se não há userAvatar, mas auth.user.avatar existe (significa que deveria ter um avatar),
      // e não está carregando/com erro, algo pode estar errado no retorno, então usa o padrão.
      console.log(
        "No userAvatar data, but auth.user.avatar exists. Setting default."
      );
      setAvatar("/Assets/default_avatar.jpg");
    } else if (isAvatarError) {
      // Se a query deu erro
      console.error("Error fetching avatar, setting default:", isAvatarError);
      setAvatar("/Assets/default_avatar.jpg");
    } else if (!auth?.user?.avatar && !isAvatarLoading) {
      // Se não há avatar no contexto do usuário e não está carregando
      console.log("No avatar in auth context, setting default.");
      setAvatar("/Assets/default_avatar.jpg");
    }
    // Removido o 'else' genérico para evitar sobrescrever com warns desnecessários
  }, [userAvatar, isAvatarLoading, isAvatarError, auth?.user?.avatar]); // Dependências do useEffect

  const handleUpdateUser = async (event: React.FormEvent) => {
    event.preventDefault();

    const user = {
      name,
      email,
      password,
      oldPassword,
    };
    if (!name) {
      setErrorMessage("Nome não pode ser vazio");
      return;
    }
    if (!email) {
      setErrorMessage("Email não pode ser vazio");
      return;
    }
    if (email.length === 0) {
      Object.assign(user, {
        email: undefined,
      });
    }

    if (password.length === 0) {
      Object.assign(user, {
        password: undefined,
      });
    }
    if (oldPassword.length === 0) {
      Object.assign(user, {
        oldPassword: undefined,
      });
    }

    await updateUser(user, newAvatar);
  };

  const handleChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imagePreview = URL.createObjectURL(file);
      setNewAvatar(file);
      setAvatar(imagePreview); // Define o preview da nova imagem
    }
  };

  return (
    <div className="w-full h-screen bg-[#312E38]">
      <header className="flex items-start h-30 py-12 px-36 bg-[#232129] mb-[-125px]">
        <Link href="/home">
          <FiArrowLeft
            size={25}
            className="text-[#999591] hover:text-[#FF9000]"
          />
        </Link>
      </header>
      <form className="max-w-[400px] mx-auto flex flex-col justify-center gap-2 py-20">
        <div className="relative mx-auto mt-0 w-[186px] h-[186px] rounded-full">
          <Image
            key={avatar} // Chave para forçar a re-renderização quando o src muda
            src={avatar} // Agora 'avatar' sempre terá uma URL válida
            alt="Image de perfil"
            width={150}
            height={100}
            className="rounded-full mx-auto"
            style={{ objectFit: "cover" }}
          />

          <label className="bg-[#FF9000] w-[48px] h-[48px] rounded-full flex items-center justify-center cursor-pointer absolute top-9/13 left-9/12 -translate-x-1/2 -translate-y-1/2">
            <input
              onChange={handleChangeAvatar}
              type="file"
              accept="image/*"
              className="hidden"
            />
            <FiCamera
              size={20}
              className="text-[#312E38] hover:text-[#000000]"
            />
          </label>
        </div>
        <InputText
          type="text"
          placeholder="Nome"
          icon={<FiUser />}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputText
          type="text"
          placeholder="E-mail"
          icon={<FiMail />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputPassword
          placeholder="Senha atual"
          error={false}
          errorMessage="Senha incorreta"
          password={oldPassword}
          setPassword={setOldPassword}
          icon={<FiLock />}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <InputPassword
          placeholder="Nova senha"
          password={password}
          setPassword={setNewPassword}
          icon={<FiLock />}
          error={false}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <MyButton message="Salvar" onClick={handleUpdateUser} />
        {errorMessage && (
          <span className="text-red-500 text-sm">{errorMessage}</span>
        )}
      </form>
    </div>
  );
}
