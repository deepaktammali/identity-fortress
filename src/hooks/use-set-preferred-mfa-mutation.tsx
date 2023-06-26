import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  SetPreferredMFAParams,
  getCurrentAuthenticatedUser,
  setPreferredMFA,
} from "../utils/auth";

const useSetPreferredMFAMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (params: SetPreferredMFAParams) => {
      const response = await setPreferredMFA(params);
      // update cognito user
      await getCurrentAuthenticatedUser({
        bypassCache: true,
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

export default useSetPreferredMFAMutation;
