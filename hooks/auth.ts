import { getUserInfo, login } from "@/lib/api";
import { ApiError, LoginResponse, User } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    LoginResponse,
    ApiError,
    {
      email: string;
      password: string;
    }
  >({
    mutationFn: login,
    onSuccess: (data) => {
      // Store token in cookie (removed httpOnly since it can't be set from client-side)
      Cookies.set("MSAR-TOKEN", data.token, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict" as const,
        expires: 7, // HARDCODED: 7 days
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useUserInfoQuery = (
  token: string | null,
  enabled: boolean = true
) => {
  return useQuery<User, ApiError>({
    queryKey: ["user", token],
    queryFn: () => getUserInfo(token!),
    enabled: enabled && !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, void>({
    mutationFn: async () => {
      // or API call to invalidate token server-side
      Cookies.remove("MSAR-TOKEN");
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
