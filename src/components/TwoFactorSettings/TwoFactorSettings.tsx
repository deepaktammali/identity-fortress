import { MFA_METHOD } from "@/constants/amplify";
import useDisableMFAMutation from "@/hooks/use-disable-mfa-mutation";
import { useAuthStore } from "@/stores/auth";
import { Button } from "hds-react";
import TwoFactorDisabledContent from "./TwoFactorDisabledContent";
import TwoFactorEnabledContent from "./TwoFactorEnabledContent";
import { useNavigate } from "react-router-dom";

const TwoFactorSettings = () => {
  const user = useAuthStore((state) => state.user);
  const disableMFAMutation = useDisableMFAMutation();
  const navigate = useNavigate();

  const disableMFA = async () => {
    try {
      await disableMFAMutation.mutateAsync();
    } catch (error) {
      console.error(error);
    }
  };

  const navigateToMFASetupPage = () => {
    navigate("/settings/two-factor/setup");
  };

  const preferredMFA = user!.preferredMFA;

  const isMFAEnabled =
    preferredMFA === MFA_METHOD.SMS_MFA ||
    preferredMFA === MFA_METHOD.SOFTWARE_TOKEN_MFA;

  console.log({ user });

  return (
    <section className="px-[--column-padding] flex flex-col gap-4">
      <div className="flex flex-col justify-between gap-2 pb-1 border-b border-b-zinc-200 sm:items-center sm:flex-row">
        <h2 className="text-lg font-semibold">Two Factor Authentication</h2>
        {isMFAEnabled && (
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="primary"
              size="small"
              onClick={navigateToMFASetupPage}
            >
              Edit
            </Button>
            <Button
              type="button"
              variant="danger"
              size="small"
              onClick={disableMFA}
              isLoading={disableMFAMutation.isLoading}
              loadingText="Disable"
            >
              Disable
            </Button>
          </div>
        )}
      </div>
      {preferredMFA === MFA_METHOD.NOMFA && <TwoFactorDisabledContent />}
      {isMFAEnabled && <TwoFactorEnabledContent />}
    </section>
  );
};

export default TwoFactorSettings;
