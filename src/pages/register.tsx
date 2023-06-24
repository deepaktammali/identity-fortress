import AuthForm, { ActionHandler } from "../components/AuthForm";
import { registerUser } from "../utils/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const onSubmit: ActionHandler = async (args) => {
    const { email, password } = args;
    await registerUser({ email, password });
    toast.success("User registered!");
    navigate("/auth/confirm", {
      state: {
        fromRegistration: true,
        registeredEmail: email,
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <h1 className="text-lg font-semibold">Register</h1>
      <AuthForm
        action={{
          label: "Register",
          handler: onSubmit,
        }}
      />
      {/* <div className="flex gap-1 items-center justify-center">
        <span>Already have an account?</span>
        <Link to="/auth/login" className="text-blue-800 font-medium">
          Login
        </Link>
      </div> */}
    </div>
  );
};

export default RegisterPage;
