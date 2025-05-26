import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { GetFetch } from "@/config/api";
import { urls } from "@/constants/api";
import { NotesType } from "@/types/notesType";

export function useGetNotes(search?: string, tagsSelected?: string[]) {
  return useQuery<NotesType[]>({
    queryKey: [queryKeys.NOTES.GET_NOTES, search, tagsSelected],
    queryFn: async () => {
      const response = await GetFetch(urls.NOTES.GET_NOTES, {
        search,
        tags: tagsSelected?.join(","),
      });
      return response;
    },
  });
}

export function useGetNotesById(noteId: string) {
  return useQuery<NotesType | null>({
    queryKey: [queryKeys.NOTES.GET_NOTES_BY_ID, noteId],
    queryFn: async () => {
      if (!noteId) return null;

      const fullUrl = `${urls.NOTES.GET_NOTES_BY_ID}/${noteId}`;
      const response = await GetFetch(fullUrl);
      return response;
    },
    enabled: !!noteId, // Only run the query if noteId is not null
  });
}
