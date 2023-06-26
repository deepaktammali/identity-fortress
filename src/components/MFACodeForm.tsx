import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, StatusLabel } from "hds-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { mapErrorToErrorMessage } from "../utils/cognito";
import { MFA_METHOD } from "@/constants/amplify";

// Types

export type ActionHandler = (args: { code: string }) => Promise<void>;

interface Props {
  action: {
    label: string;
    handler: ActionHandler;
  };
  email: string;
  mfaMethod: "SMS_MFA" | "SOFTWARE_TOKEN_MFA";
}

// Types

// MFA Form Schema

const MFAFormSchema = z.object({
  code: z
    .string()
    .length(6)
    .regex(/^\d{6}$/, "Code should be 6 digit number"),
});

type MFAFormType = z.infer<typeof MFAFormSchema>;

// Auth Form Schema

const MFACodeForm = ({ action, email, mfaMethod }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MFAFormType>({
    resolver: zodResolver(MFAFormSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<MFAFormType> = async (args) => {
    try {
      setIsSubmitting(true);
      await action.handler(args);
    } catch (error) {
      if (error instanceof Error) {
        const name = error.name;
        if (name) {
          const errorMessage = mapErrorToErrorMessage(name);
          setServerError(errorMessage);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="flex flex-col w-full max-w-md gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {serverError && <StatusLabel type="error">{serverError}</StatusLabel>}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start gap-1 py-2">
          <span className="text-sm text-zinc-600">email:</span>
          <span className="font-medium">{email}</span>
        </div>
        <span className="text-base">
          {mfaMethod === MFA_METHOD.SMS_MFA &&
            "Please enter the six digit code sent to your registered number."}
          {mfaMethod === MFA_METHOD.SOFTWARE_TOKEN_MFA &&
            "Please enter the six digit code from your authenticator app"}
        </span>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="mfa-code"
            className="text-sm font-semibold text-black"
            placeholder="email"
          >
            MFA Code
          </label>
          <input id="mfa-code" type="text" {...register("code")} />
          <ErrorMessage
            name="code"
            errors={errors}
            render={({ message }) => (
              <span className="text-xs text-red-600">{message}</span>
            )}
          />
        </div>
        <Button
          type="submit"
          isLoading={isSubmitting}
          loadingText={action.label}
        >
          {action.label}
        </Button>
      </div>
    </form>
  );
};

export default MFACodeForm;
