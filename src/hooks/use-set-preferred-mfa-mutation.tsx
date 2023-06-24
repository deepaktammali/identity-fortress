import { useMutation } from "@tanstack/react-query";
import { SetPreferredMFAParams, setPreferredMFA } from "../utils/auth";

const useSetPreferredMFAMutation = () => {
  const mutation = useMutation({
    mutationFn: async (params: SetPreferredMFAParams) => {
      const response = await setPreferredMFA(params);
      return response;
    },
  });

  return mutation;
};

export default useSetPreferredMFAMutation;
