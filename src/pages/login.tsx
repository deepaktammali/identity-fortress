import { Link } from "react-router-dom";
import AuthForm, { ActionHandler } from "../components/AuthForm";
import { logInUser } from "../utils/auth";

const LoginPage = () => {
  const onSubmit: ActionHandler = async (args) => {
    const { email, password } = args;

    try {
      const response = await logInUser({
        email,
        password,
      });
      console.log({ response });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <h1 className="text-lg font-semibold">Log In</h1>
      <AuthForm
        action={{
          label: "Log In",
          handler: onSubmit,
        }}
      />
    </div>
  );
};

export default LoginPage;
