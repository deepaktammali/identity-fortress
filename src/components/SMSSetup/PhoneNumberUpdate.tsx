import useUpdateUserAttributeMutation from "@/hooks/use-update-user-attribute-mutation";
import { Button } from "hds-react";
import { useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";

type Props = {
  showCancel?: boolean;
  onCancel?: () => void;
};

const PhoneNumberUpdate = (props: Props) => {
  const { showCancel = false, onCancel } = props;

  const [userEnteredPhoneNumber, setUserEnteredPhoneNumber] =
    useState<string>("");
  const updateUserAttributesMutation = useUpdateUserAttributeMutation();

  const updateUserPhoneNumber = async () => {
    try {
      await updateUserAttributesMutation.mutateAsync({
        attributes: {
          phone_number: userEnteredPhoneNumber,
        },
      });
      toast.success("Phone number update success");
    } catch (error) {
      console.error(error);
      toast.error("Phone number updated failed!");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="userPhonenumber" className="text-base font-semibold">
        Phone number
      </label>
      <PhoneInput
        smartCaret
        id="userPhonenumber"
        className="max-w-sm"
        value={userEnteredPhoneNumber}
        onChange={(value) => {
          if (value) {
            setUserEnteredPhoneNumber(value as string);
          }
        }}
      ></PhoneInput>
      <div className="flex items-center gap-2">
        <Button
          size="small"
          className="w-max"
          isLoading={updateUserAttributesMutation.isLoading}
          disabled={!isValidPhoneNumber(userEnteredPhoneNumber)}
          loadingText="Update Phone Number"
          onClick={updateUserPhoneNumber}
        >
          Update Phone Number
        </Button>
        {showCancel && (
          <Button size="small" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default PhoneNumberUpdate;
