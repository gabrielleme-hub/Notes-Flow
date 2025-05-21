import { PostFetch } from "@/config/api";
import { urls } from "@/constants/api";
import { CreateUsers } from "@/types/userType";

export const PostCreateUser = async (params: CreateUsers) => {
  const reponse = await PostFetch(urls.USER.POST_USER, params);
  return reponse.data;
};
