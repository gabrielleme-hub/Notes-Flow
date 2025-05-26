export type CreateUsers = {
  name: string;
  email: string;
  password: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateUserDTO = {
  name?: string;
  email?: string;
  password?: string | null;
  old_password?: string | null;
  avatar?: File;
};
