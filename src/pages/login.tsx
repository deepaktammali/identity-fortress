import { CognitoUser } from "@aws-amplify/auth";
import AuthForm, {
  ActionHandler as LoginActionHandler,
} from "../components/AuthForm";
import { ActionHandler as MFAActionHandler } from "../components/MFACodeForm";
import { completeMFAChallenge, logInUser } from "../utils/auth";
import { MFA_METHOD } from "@/constants/amplify";
import { useState } from "react";
import MFACodeForm from "@/components/MFACodeForm";

const LoginPage = () => {
  const [showMFAInputPage, setShowMFAInputPage] = useState(false);
  const [cognitoUser, setCognitoUser] = useState<CognitoUser | null>(null);
  const [email, setEmail] = useState<string>("");

  // handle Login
  const handleLogin: LoginActionHandler = async (args) => {
    const { email, password } = args;

    try {
      const response = await logInUser({
        email,
        password,
      });

      const challengeName = (response as CognitoUser).challengeName;

      if (
        challengeName === MFA_METHOD.SMS_MFA ||
        challengeName === MFA_METHOD.SOFTWARE_TOKEN_MFA
      ) {
        setShowMFAInputPage(true);
        setCognitoUser(response);
        setEmail(email);
      }

      response.mf;
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // handle MFA
  const handleMFA: MFAActionHandler = async (args) => {
    const { code } = args;

    try {
      const response = await completeMFAChallenge({
        code: code,
        // we come here if we have a mfa challenge i.e. either SMS_MFA or SOFTWARE_TOKEN_MFA
        mfaMethod: cognitoUser?.challengeName as
          | "SMS_MFA"
          | "SOFTWARE_TOKEN_MFA",
        user: cognitoUser as CognitoUser,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const showLoginForm = !showMFAInputPage;

  return (
    <div className="flex flex-col items-center w-full gap-4">
      <h1 className="text-lg font-semibold">
        {showLoginForm ? "Log In" : "Additional Verification Required"}
      </h1>
      {showLoginForm && (
        <AuthForm
          action={{
            label: "Log In",
            handler: handleLogin,
          }}
        />
      )}
      {/* MFA Code Form */}
      {showMFAInputPage && (
        <>
          {/* For SMS we would get masked phone number as well that we could use to display */}
          <MFACodeForm
            action={{
              label: "Log In",
              handler: handleMFA,
            }}
            email={email}
            mfaMethod={
              cognitoUser!.challengeName as "SMS_MFA" | "SOFTWARE_TOKEN_MFA"
            }
          />
        </>
      )}
    </div>
  );
};

export default LoginPage;
