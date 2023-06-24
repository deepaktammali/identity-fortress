import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../stores/auth";
import { getCurrentUserPreferredMfa } from "../utils/auth";

const useUserPreferredMfaQuery = () => {
  const user = useAuthStore((state) => state.user);

  const { data, isLoading, error } = useQuery({
    queryKey: [
      {
        scope: "settings",
        item: "user-mfa-preference",
        sub: user!.attributes.sub,
      },
    ],
    queryFn: async () => {
      const response = await getCurrentUserPreferredMfa({
        bypassCache: true,
      });
      return response;
    },
    staleTime: 60000,
    cacheTime: 600000,
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useUserPreferredMfaQuery;
