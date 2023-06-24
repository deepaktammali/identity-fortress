import { useAuthStore } from "@/stores/auth";
import { getTOTPSetupAuthorizationCode } from "@/utils/auth";
import { useQuery } from "@tanstack/react-query";

const useSetupTOPTAuthCodeQuery = () => {
  const user = useAuthStore((state) => state.user);

  const { data, error, isLoading } = useQuery({
    cacheTime: 0,
    refetchOnMount: true,
    queryFn: async () => {
      const response = await getTOTPSetupAuthorizationCode();
      return response;
    },
    queryKey: [
      {
        scope: "settings",
        item: "user-topt-auth-code",
        sub: user!.attributes.sub,
      },
    ],
  });

  return {
    data,
    error,
    isLoading,
  };
};

export default useSetupTOPTAuthCodeQuery;
