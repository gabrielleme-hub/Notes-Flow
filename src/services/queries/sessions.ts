import { PostFetch } from "@/config/api";
import { urls } from "@/constants/api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { Sessions } from "@/types/AuthType";
interface useAuthSessionsProps {
  email: string;
  password: string;
}
export function useAuthSessions({ email, password }: useAuthSessionsProps) {
  return useQuery<Sessions>({
    queryKey: [queryKeys.SESSIONS.POST_SESSIONS, email, password],
    queryFn: async () => {
      const { data } = await PostFetch(urls.SESSIONS.POST_SESSIONS, {});
      return data;
    },
  });
}
