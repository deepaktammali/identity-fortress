import {
  UpdateCognitoUserAttributesParams,
  getCurrentAuthenticatedUser,
  updateAmplifyUserAttributeParams,
} from "@/utils/auth";
import { useMutation } from "@tanstack/react-query";

const useUpdateUserAttributeMutation = () => {
  const mutation = useMutation({
    mutationFn: async (params: UpdateCognitoUserAttributesParams) => {
      const response = await updateAmplifyUserAttributeParams(params);
      // update cognito user
      await getCurrentAuthenticatedUser({
        bypassCache: true,
      });
      return response;
    },
  });
  return mutation;
};

export default useUpdateUserAttributeMutation;
