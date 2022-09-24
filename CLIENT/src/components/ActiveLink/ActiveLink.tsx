import { useRouter } from "next/router";
import { FC } from "react";

type ActiveLinkProps = {
  children: any;
  href: any;
  className: string;
};
const ActiveLink: FC<ActiveLinkProps> = ({ children, href, className }) => {
  const router = useRouter();

  const linkIsActive = () => {
    return router.asPath === href;
  };

  const handleRedirect = (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  const activeLinkClassName = linkIsActive() ? className : undefined;

  return (
    <a href={href} onClick={handleRedirect} className={activeLinkClassName}>
      {children}
    </a>
  );
};

export default ActiveLink;
