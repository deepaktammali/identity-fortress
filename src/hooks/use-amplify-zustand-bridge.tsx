import { useCallback, useEffect, useState } from "react";
import { Hub } from "@aws-amplify/core";
import { HUB_EVENTS } from "../constants/amplify";
import { getCurrentAuthenticatedUser } from "../utils/auth";
import { CognitoUser } from "../types/cognito";
import { AuthStoreUser, useAuthStore } from "../stores/auth";

const useAmplifyZustandBridge = () => {
  const [initiating, setIsInitiating] = useState(true);

  const signedIn = useAuthStore((state) => state.signedIn);
  const signedOut = useAuthStore((state) => state.signedOut);

  const handleUserSignIn = useCallback(
    (args: { user: CognitoUser }) => {
      const { user } = args;
      const attributes = user.attributes;

      console.log({ user });

      const authUser: AuthStoreUser = {
        attributes,
        preferredMFA: user.preferredMFA,
        username: user.username,
      };

      signedIn(authUser);
    },
    [signedIn]
  );

  const handleUserSignOut = useCallback(() => {
    signedOut();
  }, [signedOut]);

  useEffect(() => {
    const initiateAuthState = async () => {
      try {
        const user = await getCurrentAuthenticatedUser();
        console.log(user);
        if (user) {
          handleUserSignIn({ user });
        } else {
          handleUserSignOut();
        }
      } catch (error) {
        console.error("Error fetching current authenticated user");
        console.error(error);
        handleUserSignOut();
      }
      setIsInitiating(false);
    };

    initiateAuthState();
  }, [handleUserSignIn, handleUserSignOut]);

  useEffect(() => {
    const hubListenerCancelToken = Hub.listen("auth", (data) => {
      const { payload } = data;

      console.log(payload);

      switch (payload.event) {
        case HUB_EVENTS.AUTH.signIn: {
          handleUserSignIn({
            user: payload.data,
          });
          break;
        }
        case HUB_EVENTS.AUTH.signOut: {
          handleUserSignOut();
          break;
        }
      }
    });

    return () => hubListenerCancelToken();
  }, [handleUserSignIn, handleUserSignOut]);

  return {
    initiating,
  };
};

export default useAmplifyZustandBridge;
