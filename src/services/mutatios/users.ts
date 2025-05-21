import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateUsers, User } from "@/types/userType";
import { PostCreateUser } from "../webApi/userApi";
import { AxiosError } from "axios";
import { queryKeys } from "../queryKeys";
import { useRouter } from "next/navigation";

export function useCreateUsers() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation<User, AxiosError, CreateUsers>({
    mutationFn: async (payload: CreateUsers) => await PostCreateUser(payload),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.USERS.FIND_ALL],
        exact: false,
        refetchType: "all",
      });

      router.push("/login");
    },
    onError(error) {
      console.error("Error creating user:", error);
    },
  });
}
