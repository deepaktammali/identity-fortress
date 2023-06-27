import SMSSetup from "@/components/SMSSetup/SMSSetup";
import TOPTSetup from "@/components/TOPTSetup";
import { MFA_METHOD } from "@/constants/amplify";
import { Button } from "@geist-ui/core";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {}

type MFAOption = {
  label: string;
  slug: string;
  mfaMethod: keyof typeof MFA_METHOD;
  description: string;
};

const availableMFAOptions: MFAOption[] = [
  {
    label: "Authenticator App",
    slug: "software-topt-based",
    mfaMethod: MFA_METHOD.TOTP,
    description:
      "A security method that creates special passwords using the current time and a secret code.",
  },
  {
    label: "SMS Authentication",
    slug: "sms-based",
    mfaMethod: MFA_METHOD.SMS_MFA,
    description:
      "An authentication system that sends temporary codes via text messages for added security.",
  },
];

const Setup = ({}: Props) => {
  const [selectedMFAOptionIdx, setSelectedMFAOptionIdx] = useState<number>(0);
  const navigate = useNavigate();

  const SetupElement = useMemo(() => {
    const mfaOption = availableMFAOptions[selectedMFAOptionIdx];

    const navigateToAuthenticationSettings = () => {
      navigate("/settings/authentication");
    };

    switch (mfaOption.mfaMethod) {
      case MFA_METHOD.TOTP: {
        return (
          <TOPTSetup
            onSuccess={navigateToAuthenticationSettings}
            onCancel={navigateToAuthenticationSettings}
            className="w-full"
          />
        );
      }
      case MFA_METHOD.SMS_MFA: {
        return (
          <SMSSetup
            className="w-full"
            onSuccess={navigateToAuthenticationSettings}
            onCancel={navigateToAuthenticationSettings}
          />
        );
      }
    }
  }, [selectedMFAOptionIdx]);

  return (
    <div className="flex flex-col gap-8">
      {/* Setup Element */}
      <div className="flex flex-col items-center">
        <div className="max-w-6xl px-5 py-4 border border-gray-200 bg-gray-50">
          {SetupElement}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <span className="font-medium text-zinc-600">
          Available Two Factor Options
        </span>
        <ul className="flex flex-col">
          {availableMFAOptions.map((mfaOption, idx) => {
            if (idx === selectedMFAOptionIdx) {
              return null;
            }

            return (
              <li
                key={mfaOption.slug}
                className="flex flex-col justify-between w-full gap-2 px-3 py-2 border border-gray-200 sm:flex-row sm:gap-1 bg-gray-50"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-medium">{mfaOption.label}</span>
                  <span className="text-zinc-600">{mfaOption.description}</span>
                </div>
                <Button
                  onClick={() => {
                    setSelectedMFAOptionIdx(idx);
                  }}
                >
                  Select
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Setup;
