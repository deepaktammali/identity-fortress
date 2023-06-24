import { VerifyTotpTokenParams, verifyTotpToken } from "@/utils/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useVerifyTOTPAuthCodeMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (params: VerifyTotpTokenParams) => {
      const response = await verifyTotpToken(params);
      await queryClient.invalidateQueries({
        queryKey: [
          {
            scope: "settings",
            item: "user-mfa-preference",
          },
        ],
      });
      return response;
    },
  });

  return mutation;
};

export default useVerifyTOTPAuthCodeMutation;
