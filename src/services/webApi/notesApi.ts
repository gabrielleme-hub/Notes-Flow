import { PostFetch } from "@/config/api";
import { urls } from "@/constants/api";
import { Notes } from "@/types/notesType";

export const PostCreateNote = async (params: Notes) => {
  const response = await PostFetch(urls.NOTES.CREATE_NOTES, params);
  return response.data;
};
