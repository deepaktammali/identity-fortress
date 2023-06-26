import { MFA_METHOD } from "@/constants/amplify";
import { useAuthStore } from "@/stores/auth";
import { useMemo } from "react";

const TwoFactorEnabledContent = () => {
  const user = useAuthStore((state) => state.user);

  const content = useMemo(() => {
    switch (user?.preferredMFA) {
      case MFA_METHOD.SMS_MFA: {
        return "You have enabled SMS as second authentication factor";
      }
      case MFA_METHOD.SOFTWARE_TOKEN_MFA: {
        return "You have enabled software token as two factor";
      }
    }
  }, [user?.preferredMFA]);

  return (
    <div>
      <span>{content}</span>
    </div>
  );
};

export default TwoFactorEnabledContent;
