import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { GetFile } from "../webApi/filesApi";

export const useGetFile = (url?: string) => {
  return useQuery({
    queryKey: [queryKeys.FILES.GET_FILE.concat(url ?? "")],
    queryFn: async () => {
      const response = await GetFile(url ?? "");

      return response;
    },
    enabled: !!url,
  });
};
