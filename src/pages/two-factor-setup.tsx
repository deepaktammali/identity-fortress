import TwoFactorSetup from "../components/TwoFactorSetup";

interface Props {}

const TwoFactorSetupPage = ({}: Props) => {
  return (
    <main className="flex flex-col w-full items-center">
      <TwoFactorSetup />
    </main>
  );
};

export default TwoFactorSetupPage;
