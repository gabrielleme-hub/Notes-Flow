import { GetFetch } from "@/config/api";
import { queryKeys } from "../queryKeys";
import { urls } from "@/constants/api";
import { useQuery } from "@tanstack/react-query";
import { NotesType } from "@/types/notesType";
// import { NotesType } from "@/types/notesType";

export function useGetNotes(userId: string) {
  return useQuery<NotesType[]>({
    queryKey: [queryKeys.NOTES.GET_NOTES, userId],
    queryFn: async () => {
      const response = await GetFetch(urls.NOTES.GET_NOTES, {
        params: { userId },
      });
      return response.data;
    },
  });
}
