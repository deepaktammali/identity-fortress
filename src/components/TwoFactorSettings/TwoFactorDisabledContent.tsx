import { Button } from "@geist-ui/core";
import { Link } from "react-router-dom";

const TwoFactorDisabledContent = () => {
  return (
    <div className="flex flex-col gap-2">
      <span>You don't have two factor authentication enabled</span>
      <Link to="/settings/two-factor/setup">
        <Button type="success-light" className="w-max">
          Enable
        </Button>
      </Link>
    </div>
  );
};

export default TwoFactorDisabledContent;
