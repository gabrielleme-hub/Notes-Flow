import { Notes } from "@/types/notesType";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../queryClient";
import { queryKeys } from "../queryKeys";
import { PostCreateNote } from "../webApi/notesApi";
import { DeleteFetch } from "@/config/api";
import { urls } from "@/constants/api";

export function useCreateNote() {
  return useMutation<Notes, Error, Notes>({
    mutationFn: async (payload: Notes) => await PostCreateNote(payload),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.NOTES.FIND_ALL],
        exact: false,
        refetchType: "all",
      });
    },
    onError(error) {
      console.error("Error creating note:", error);
      throw error;
    },
  });
}

export function useDeleteNoteMutation() {
  return useMutation<string, Error, string>({
    mutationFn: async (noteId: string) => {
      const response = await DeleteFetch(
        urls.NOTES.DELETE_NOTES + `/${noteId}`
      );
      if (response.status !== 204) {
        console.error("Failed to delete note:", response);
        throw new Error("Failed to delete note");
      }
      return response;
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.NOTES.FIND_ALL],
        exact: false,
        refetchType: "all",
      });
    },
  });
}
