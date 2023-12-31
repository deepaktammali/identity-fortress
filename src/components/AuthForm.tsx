import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Note, Button, Checkbox } from "@geist-ui/core";
import { ErrorMessage } from "@hookform/error-message";
import { useCallback, useState } from "react";
import { mapErrorToErrorMessage } from "../utils/cognito";

// Types

export type ActionHandler = (args: {
  email: string;
  password: string;
}) => Promise<void>;

interface Props {
  action: {
    label: string;
    handler: ActionHandler;
  };
}

// Types

// Auth Form Schema

const AuthFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    // Generated by chatgpt
    .regex(
      /^(?=.*\d)(?=.*[!@#$%^&*()])(?=.*[A-Z])(?=.*[a-z]).*$/,
      "Password should contain at least 1 number, 1 special character, 1 uppercase letter, and 1 lowercase letter"
    ),
});

type AuthFormType = z.infer<typeof AuthFormSchema>;

// Auth Form Schema

const AuthForm = ({ action }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormType>({
    resolver: zodResolver(AuthFormSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<AuthFormType> = async (args) => {
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

  const toggleShowPassword = useCallback(() => {
    setShowPassword((s) => !s);
  }, [setShowPassword]);

  return (
    <form
      className="flex flex-col w-full max-w-md gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {serverError && <Note type="error">{serverError}</Note>}
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
              <span className="text-xs text-red-600">{message}</span>
            )}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-xs" placeholder="password">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="password"
            {...register("password")}
          />
          <ErrorMessage
            name="password"
            errors={errors}
            render={({ message }) => (
              <span className="text-xs text-red-600">{message}</span>
            )}
          />
        </div>
        <Checkbox
          id="showPassword"
          checked={showPassword}
          onChange={toggleShowPassword}
          className="self-start"
        >
          Show Password
        </Checkbox>
        <Button htmlType="submit" loading={isSubmitting} type="success-light">
          {action.label}
        </Button>
      </div>
    </form>
  );
};

export default AuthForm;
