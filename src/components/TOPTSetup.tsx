import { COGNITO_ATTRIBUTES, MFA_METHOD } from "@/constants/amplify";
import useSetPreferredMFAMutation from "@/hooks/use-set-preferred-mfa-mutation";
import useSetupTOPTAuthCode from "@/hooks/use-setup-topt-auth-code-query";
import useUpdateUserAttributeMutation from "@/hooks/use-update-user-attribute-mutation";
import useVerifyTOTPAuthCodeMutation from "@/hooks/use-verify-totp-auth-code-mutation";
import { useAuthStore } from "@/stores/auth";
import { Button, Spinner, Note } from "@geist-ui/core";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";
import { Balancer } from "react-wrap-balancer";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
  onCancel: () => void;
  onSuccess: () => void;
}

const TOPTSetup = ({ className, onSuccess, onCancel }: Props) => {
  const {
    data: code,
    error,
    isLoading: isAuthCodeLoading,
  } = useSetupTOPTAuthCode();
  const verifyTOTPAuthCodeMutation = useVerifyTOTPAuthCodeMutation();
  const setUserPreferredMfaMutation = useSetPreferredMFAMutation();
  const updateUserAttributesMutation = useUpdateUserAttributeMutation();

  const user = useAuthStore((state) => state.user);

  const [challengeAnswer, setChallengerAnswer] = useState<string>("");
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(
    null
  );

  const onCodeChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setChallengerAnswer(event.target.value);
  };

  const setupTotp = async () => {
    try {
      setServerErrorMessage(null);
      await verifyTOTPAuthCodeMutation.mutateAsync({
        challengeAnswer: challengeAnswer as string,
      });
      toast.success("Verified TOPT Auth Code");
      await setUserPreferredMfaMutation.mutateAsync({
        mfaMethod: MFA_METHOD.SOFTWARE_TOKEN_MFA,
      });
      toast.success("Set TOTP as preferred two factor method");
      // Call onSuccess method
      onSuccess();

      // use a custom attribute to know whether the user has software mfa configured
      if (user?.attributes["custom:soft_mfa_configured"] !== "true") {
        await updateUserAttributesMutation.mutateAsync({
          attributes: {
            [COGNITO_ATTRIBUTES.SOFTWARE_MFA_CONFIGURED]: "true",
          },
        });
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setServerErrorMessage(error.message);
      }
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  const qrCodeSearchParams = new URLSearchParams();

  if (code) {
    qrCodeSearchParams.set("secret", code);
    qrCodeSearchParams.set("issuer", `Cognito MFA : ${user!.attributes.email}`);
  }

  const qrCodeString = `otpauth://totp/AWSCognito:${
    user!.username
  }?${qrCodeSearchParams.toString()}`;

  return (
    <div className={twMerge("w-full flex flex-col gap-5", className)}>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-medium">Setup Authenticator App</h3>
        <span className="text-gray-500">
          <Balancer>
            A security feature used by various apps that generates unique
            temporary passwords based on the current time and a shared secret.
            Examples of apps utilizing TOTP for multi-factor authentication
            include Google Authenticator, Microsoft Authenticator, and Authy.
          </Balancer>
        </span>
      </div>
      <div className="flex flex-col gap-3 pb-4 border-b border-b-gray-300">
        <span className="font-medium text-zinc-950">
          Scan the code with an authenticator app
        </span>
        <div>
          {/* Loading */}
          {isAuthCodeLoading && <Spinner />}
          {/* Error */}
          {error !== null && <Note type="error">Error loading QR code</Note>}
          {code && (
            <div className="flex flex-col gap-4">
              <QRCodeCanvas value={qrCodeString} />
              <span>
                Unable to scan the code? You can get the key and enter in the
                app manually.
              </span>
              <div className="flex flex-col gap-2">
                <label htmlFor="code" className="text-sm font-semibold">
                  Enter code here
                </label>
                <input
                  id="code"
                  type="number"
                  max="999999"
                  value={challengeAnswer}
                  onChange={onCodeChange}
                  className="max-w-[128px] text-base"
                  placeholder="xxxxxx"
                ></input>
              </div>
              {serverErrorMessage && (
                <Note type="error">{serverErrorMessage}</Note>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end w-full gap-2">
        <Button type="abort" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          type="success-light"
          disabled={challengeAnswer === "" || challengeAnswer === undefined}
          onClick={setupTotp}
          loading={
            verifyTOTPAuthCodeMutation.isLoading ||
            setUserPreferredMfaMutation.isLoading
          }
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default TOPTSetup;
