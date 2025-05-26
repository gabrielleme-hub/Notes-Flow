import { api, PostFetch } from "@/config/api";
import { urls } from "@/constants/api";
import { AuthContextData, AuthData } from "@/types/AuthType";
import { UpdateUserDTO, User } from "@/types/userType";
import {
  getFromLocalStorage,
  RemoveFromLocalStorage,
  SetFromLocalStorage,
} from "@/utils/storage";
import React, { useContext, createContext, useState, useEffect } from "react";
interface AuthContextProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextData | undefined>(
  undefined
);

export function AuthProvider({ children }: AuthContextProps) {
  //states
  const [data, setData] = useState<AuthData | null>({
    token: null,
    user: null,
  });
  //query
  async function signIn(email: string, password: string) {
    const response = await PostFetch(urls.SESSIONS.POST_SESSIONS, {
      email,
      password,
    });

    const { user, token } = response.data;
    api.defaults.headers.authorization = `Bearer ${token}`;
    setData({ user, token });
    SetFromLocalStorage("USER", JSON.stringify(user));
    SetFromLocalStorage("JWT_HASH", token);
  }

  async function signOut() {
    RemoveFromLocalStorage("JWT_HASH");
    RemoveFromLocalStorage("USER");
    setData({
      token: null,
      user: null,
    });
  }

  async function updateUser(
    user: UpdateUserDTO,
    avatarFile: File | null
  ): Promise<User> {
    try {
      // 1. Atualiza os dados do usuário (nome, email, senhas)
      const userUpdateResponse = await api.put(urls.USER.PUT_USER, user);
      let updatedUser: User = userUpdateResponse.data; // Assumindo que o PUT retorna os dados do usuário

      // 2. Se houver um arquivo de avatar, faz o upload separado
      if (avatarFile) {
        const fileUploadForm = new FormData();
        fileUploadForm.append("avatar", avatarFile); // "avatar" deve ser o nome do campo esperado pelo seu backend

        // IMPORTANTE: Seu backend deve retornar o NOVO CAMINHO/NOME do avatar após o upload
        const avatarUploadResponse = await api.patch(
          urls.USER.AVATAR,
          fileUploadForm,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Necessário para enviar arquivos
            },
          }
        );
        // Assumimos que avatarUploadResponse.data.avatar contém o novo caminho do avatar
        updatedUser = {
          ...updatedUser,
          avatar: avatarUploadResponse.data.avatar,
        };
      }

      // 3. Atualiza o estado do contexto de autenticação com o usuário COMPLETAMENTE atualizado
      SetFromLocalStorage("USER", JSON.stringify(updatedUser));
      const storedToken = getFromLocalStorage("JWT_HASH");
      setData({
        user: updatedUser,
        token: storedToken,
      });

      console.log(
        "Contexto de autenticação atualizado com novo avatar:",
        updatedUser.avatar
      );
      alert("User updated successfully");

      return updatedUser; // RETORNA O USUÁRIO ATUALIZADO
    } catch (error) {
      console.error("Erro ao atualizar usuário no contexto:", error);
      alert("Erro ao atualizar perfil."); // Feedback de erro
      throw error; // Propaga o erro para o componente que chamou
    }
  }

  useEffect(() => {
    const storedUser = getFromLocalStorage("USER");
    const storedToken = getFromLocalStorage("JWT_HASH");

    if (storedUser && storedToken) {
      api.defaults.headers.authorization = `Bearer ${storedToken}`;
      setData({
        user: JSON.parse(storedUser),
        token: storedToken,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, data, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
}
