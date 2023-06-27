import { MFA_METHOD } from "@/constants/amplify";
import useSetPreferredMFAMutation from "@/hooks/use-set-preferred-mfa-mutation";
import { useAuthStore } from "@/stores/auth";
import { Button } from "@geist-ui/core";
import { useState } from "react";
import "react-phone-number-input/style.css";
import { Balancer } from "react-wrap-balancer";
import { twMerge } from "tailwind-merge";
import PhoneNumberUpdate from "./PhoneNumberUpdate";

interface Props {
  onCancel: () => void;
  onSuccess: () => void;
  className?: string;
}

const SMSSetup = (props: Props) => {
  const { className, onCancel, onSuccess } = props;

  const setUserPreferredMfaMutation = useSetPreferredMFAMutation();
  const [forceShowAddPhoneNumberInput, setForceShowAddPhoneNumberInput] =
    useState(false);

  const user = useAuthStore((state) => state.user);

  const setSMSMFA = async () => {
    try {
      await setUserPreferredMfaMutation.mutateAsync({
        mfaMethod: MFA_METHOD.SMS_MFA,
      });
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  const userAlreadyHasPhoneNumber = !!user!.attributes.phone_number;

  const showAddPhoneNumberInput =
    !userAlreadyHasPhoneNumber || forceShowAddPhoneNumberInput;

  return (
    <div
      className={twMerge("w-full flex flex-col gap-5 bg-gray-50", className)}
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-medium">Setup SMS Two Factor</h3>
        <span className="text-gray-500">
          <Balancer>
            A method of multi-factor authentication where a user receives a
            one-time verification code via text message to their registered
            mobile phone number. This code is used in addition to their regular
            username and password to enhance security.
          </Balancer>
        </span>
      </div>
      {userAlreadyHasPhoneNumber && (
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-1">
            <span className="whitespace-nowrap">You have</span>
            <span className="font-medium">{user!.attributes.phone_number}</span>
            <span className="whitespace-nowrap">
              as your current phone number
            </span>
          </div>
          {!showAddPhoneNumberInput && (
            <div className="w-max">
              <Button
                onClick={() => {
                  setForceShowAddPhoneNumberInput(true);
                }}
              >
                Update Phone Number
              </Button>
            </div>
          )}
        </div>
      )}
      {/* New Phone Number Input */}
      {showAddPhoneNumberInput && (
        <PhoneNumberUpdate
          showCancel={forceShowAddPhoneNumberInput}
          onCancel={() => setForceShowAddPhoneNumberInput(false)}
        />
      )}
      <div className="flex flex-col justify-end w-full gap-2 sm:flex-row">
        <Button type="abort" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          type="success-light"
          onClick={setSMSMFA}
          loading={setUserPreferredMfaMutation.isLoading}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SMSSetup;
