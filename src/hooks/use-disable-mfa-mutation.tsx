import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setPreferredMFA } from "../utils/auth";
import { MFA_METHOD } from "@/constants/amplify";

const useDisableMFAMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await setPreferredMFA({
        mfaMethod: MFA_METHOD.NOMFA,
      });
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

export default useDisableMFAMutation;
