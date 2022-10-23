import { useRouter } from "next/router";
import React, { FC, ReactNode, useContext } from "react";
import { FaHome, FaPlusSquare, FaUserTie } from "react-icons/fa";
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { AuthContext } from "../../redux/AuthContext";

const Navbar: FC<any> = () => {
  const { token, userId } = useContext(AuthContext);

  const navbarElements: NavbarElementProps[] = [
    {
      icon: <FaHome />,
      page: "Overview",
      href: "/overview",
      requiresLogin: false,
    },
    {
      icon: <FaPlusSquare />,
      page: "Add New",
      href: "/new-recipe",
      requiresLogin: true,
    },
    {
      icon: <FaUserTie />,
      page: "Profile",
      href: "/profile",
      requiresLogin: true,
    },
    token && userId
      ? {
          icon: <MdOutlineLogout />,
          page: "Login",
          href: "/login",
          requiresLogin: true,
        }
      : {
          icon: <MdOutlineLogin />,
          page: "Login",
          href: "/login",
          requiresLogin: false,
        },
  ];

  const getNavbarContent = () => {
    return navbarElements.map((el, index) => {
      const { icon, page, href, requiresLogin } = el;

      return (
        <NavbarElement
          key={index}
          icon={icon}
          href={href}
          page={page}
          requiresLogin={requiresLogin}
        />
      );
    });
  };

  return (
    <div className="fixed z-50 bottom-0 px-6 flex items-center text-2xl py-3 shadow-inner rounded-md gap-10 left-1/2 transform -translate-x-1/2 bg-orange-50">
      {getNavbarContent()}
    </div>
  );
};

type NavbarElementProps = {
  page: string;
  href: string;
  icon: ReactNode;
  requiresLogin: boolean;
};
const NavbarElement: FC<NavbarElementProps> = ({
  icon,
  page,
  href,
  requiresLogin,
}) => {
  const router = useRouter();
  const { token, userId } = useContext(AuthContext);

  const linkIsActive = () => {
    return router.asPath === href;
  };

  const redirectToHref = () => {
    router.push(href);
  };

  if (requiresLogin && (!token || !userId)) {
    return null;
  }

  const elementClassNames = linkIsActive()
    ? "text-orange-500 bg-orange-200 bg-opacity-60 rounded-lg shadow-sm"
    : "text-zinc-700";

  return (
    <div className="text-center flex justify-center">
      <div
        className={`cursor-pointer w-max flex items-center px-2 py-1 justify-center hover:scale-105 ${elementClassNames}`}
        onClick={redirectToHref}
      >
        {icon}
        {linkIsActive() && (
          <div className="text-lg pl-1 font-medium">{page}</div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
