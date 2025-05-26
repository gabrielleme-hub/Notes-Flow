import { useAuth } from "@/context/auth";
import { useGetFile } from "@/services/queries/files";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { RiShutDownLine } from "react-icons/ri";

export function Header() {
  const router = useRouter();

  //hook
  const { data: auth } = useAuth();
  console.log(auth);
  const {
    data: userAvatar,
    isLoading: isAvatarLoading,
    isError: isAvatarError,
  } = useGetFile(auth?.user?.avatar ?? undefined);

  const [avatar, setAvatar] = useState("/Assets/default_avatar.jpg");

  useEffect(() => {
    if (userAvatar instanceof Blob) {
      const imageUrl = URL.createObjectURL(userAvatar);
      setAvatar(imageUrl);
      return () => {
        URL.revokeObjectURL(imageUrl);
      };
    } else if (userAvatar instanceof ArrayBuffer) {
      const blob = new Blob([userAvatar], { type: "image/jpeg" });
      const imageUrl = URL.createObjectURL(blob);
      setAvatar(imageUrl);
      return () => {
        URL.revokeObjectURL(imageUrl);
      };
    } else if (
      typeof userAvatar === "string" &&
      (userAvatar.startsWith("http://") ||
        userAvatar.startsWith("https://") ||
        userAvatar.startsWith("data:image"))
    ) {
      setAvatar(userAvatar);
    } else if (!isAvatarLoading && !isAvatarError && auth?.user?.avatar) {
      setAvatar("/Assets/default_avatar.jpg");
    } else if (isAvatarError) {
      setAvatar("/Assets/default_avatar.jpg");
    } else if (!auth?.user?.avatar && !isAvatarLoading) {
      setAvatar("/Assets/default_avatar.jpg");
    }
  }, [userAvatar, isAvatarLoading, isAvatarError, auth?.user?.avatar]);

  const handleClickProfile = () => {
    router.push("/profile");
  };
  const { signOut } = useAuth();
  return (
    <div className="flex flex-row items-center justify-between pt-6 px-20 w-full mb-[6px]">
      <div className="flex flex-row items-center">
        <Image
          key={avatar}
          src={avatar}
          alt="Image de perfil"
          width={70}
          height={70}
          className="rounded-full cursor-pointer"
          onClick={handleClickProfile}
        />
        <div className="flex flex-col items-start  ml-4">
          <span className="text-[#999591]">Bem vindo,</span>
          <h1>Gabriel Leme</h1>
        </div>
      </div>
      <Link onClick={() => signOut()} href="/">
        <RiShutDownLine size={36} className="text-[#999591]" />
      </Link>
    </div>
  );
}
