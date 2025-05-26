import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { GetFetch } from "@/config/api";
import { urls } from "@/constants/api";
import { Tags } from "@/types/tagsType";

export function useGetTags() {
  return useQuery<Tags[]>({
    queryKey: [queryKeys.TAGS.GET_TAGS],
    queryFn: async () => {
      const response = await GetFetch(urls.TAGS.GET_TAGS);
      return response;
    },
  });
}
