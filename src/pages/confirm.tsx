import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { confirmUser } from "../utils/auth";
import { mapErrorToErrorMessage } from "../utils/cognito";
import { StatusLabel, Button } from "hds-react";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface Props {}

// Confirm Form Schema

const ConfirmFormSchema = z.object({
  email: z.string().email(),
  code: z
    .string()
    .refine((value) => value.length === 6 && !isNaN(Number(value)), {
      message: "String should be a number of length 6",
    }),
});

type ConfirmFormType = z.infer<typeof ConfirmFormSchema>;

// Confirm Form Schema

const ConfirmPage = ({}: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Whether we came from the registration form
  const fromRegistration = location.state?.fromRegistration ?? false;
  const registeredEmail = location.state?.registeredEmail ?? "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<ConfirmFormType>({
    resolver: zodResolver(ConfirmFormSchema),
    defaultValues: {
      email: registeredEmail,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<ConfirmFormType> = async (args) => {
    try {
      setIsSubmitting(true);
      await confirmUser(args);
      toast.success("User confirmed!");
      navigate("/auth/login");
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
    <div className="flex flex-col gap-4 w-full items-center">
      <h1 className="text-lg font-semibold">Confirm Account</h1>
      <form
        className="max-w-md flex flex-col gap-4 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        {fromRegistration && !isSubmitted && (
          <StatusLabel type="info">
            {`Please check ${registeredEmail} for code`}
          </StatusLabel>
        )}
        {serverError && <StatusLabel type="error">{serverError}</StatusLabel>}
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-xs" placeholder="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
            />
            <ErrorMessage
              name="email"
              errors={errors}
              render={({ message }) => (
                <span className="text-red-600 text-xs">{message}</span>
              )}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmationCode" className="text-xs">
              Code
            </label>
            <input id="confirmationCode" type="text" {...register("code")} />
            <ErrorMessage
              name="code"
              errors={errors}
              render={({ message }) => (
                <span className="text-red-600 text-xs">{message}</span>
              )}
            />
          </div>
          <Button
            type="submit"
            isLoading={isSubmitting}
            loadingText={"Confirm Account"}
          >
            Confirm Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ConfirmPage;
