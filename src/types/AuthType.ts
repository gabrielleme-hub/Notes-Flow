import { UpdateUserDTO, User } from "./userType";

export type Sessions = {
  email: string;
  password: string;
};

export interface AuthData {
  user: User | null;
  token: string | null;
}
export type AuthContextData = {
  updateUser: (user: UpdateUserDTO, avatarFile: File | null) => Promise<User>;
  signOut: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  data: AuthData | null;
};
