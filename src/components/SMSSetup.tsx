import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
}

const SMSSetup = ({ className }: Props) => {
  return <div className={twMerge("w-full", className)}>SMS Setup</div>;
};

export default SMSSetup;
