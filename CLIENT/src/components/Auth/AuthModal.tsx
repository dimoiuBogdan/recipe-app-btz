import { FC } from "react";
import ActiveLink from "../ActiveLink/ActiveLink";
import { AUTH } from "../../constants/routes";

type AuthModalProps = {
  children: any;
};
const AuthModal: FC<AuthModalProps> = ({ children }) => {
  const activeLinkClassName = "text-slate-900";

  return (
    <div className="max-w-xl w-full bg-btz-gray py-8 shadow-lg rounded-md">
      <div className="text-center text-2xl font-bold mb-4 flex items-center justify-center text-zinc-300">
        <ActiveLink className={activeLinkClassName} href={AUTH.REGISTER_PATH}>
          REGISTER
        </ActiveLink>
        <div className="mx-2">/</div>
        <ActiveLink className={activeLinkClassName} href={AUTH.LOGIN_PATH}>
          LOGIN
        </ActiveLink>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default AuthModal;