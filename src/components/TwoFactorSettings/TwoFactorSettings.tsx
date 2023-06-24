import { MFA_METHOD } from "@/constants/amplify";
import useDisableMFAMutation from "@/hooks/use-disable-mfa-mutation";
import useSetPreferredMFAMutation from "@/hooks/use-set-preferred-mfa-mutation";
import useUserPreferredMfa from "@/hooks/use-user-preferred-mfa-query";
import { Button, LoadingSpinner, Notification } from "hds-react";
import TwoFactorDisabledContent from "./TwoFactorDisabledContent";

const TwoFactorSettings = () => {
  const { data: preferredMFA, isLoading, error } = useUserPreferredMfa();
  const setPreferredMFAMutation = useSetPreferredMFAMutation();
  const disableMFAMutation = useDisableMFAMutation();

  const disableMFA = async () => {
    try {
      await disableMFAMutation.mutateAsync();
    } catch (error) {
      console.error(error);
    }
  };

  const isMFAEnabled =
    preferredMFA === MFA_METHOD.SMS ||
    preferredMFA === MFA_METHOD.SOFTWARE_TOKEN_MFA;

  console.log(preferredMFA, error);

  return (
    <section className="px-[--column-padding] flex flex-col gap-4">
      <div className="flex justify-between border-b border-b-zinc-200 pb-1 items-center">
        <h2 className="font-semibold text-lg">Two Factor Authentication</h2>
        {isMFAEnabled && (
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
        )}
      </div>
      {/* Loading */}
      {isLoading && <LoadingSpinner small />}
      {preferredMFA === MFA_METHOD.NOMFA && <TwoFactorDisabledContent />}
      {/* Error */}
      {error !== undefined && error !== null && (
        <Notification>Error loading your mfa configuration</Notification>
      )}
    </section>
  );
};

export default TwoFactorSettings;
