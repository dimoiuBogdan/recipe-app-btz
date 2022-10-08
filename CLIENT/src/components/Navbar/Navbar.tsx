import { useRouter } from "next/router";
import React, { FC, ReactNode } from "react";
import { FaHome, FaPlusSquare, FaUserTie } from "react-icons/fa";

const Navbar: FC<any> = () => {
  const navbarElements: NavbarElementProps[] = [
    {
      icon: <FaHome />,
      page: "Overview",
      href: "/overview",
    },
    {
      icon: <FaPlusSquare />,
      page: "Add New",
      href: "/new-recipe",
    },
    {
      icon: <FaUserTie />,
      page: "Profile",
      href: "/profile",
    },
  ];

  const getNavbarContent = () => {
    return navbarElements.map((el) => {
      const { icon, page, href } = el;

      return <NavbarElement key={page} icon={icon} href={href} page={page} />;
    });
  };

  return (
    <div className="fixed z-50 bottom-0 flex items-center justify-evenly text-2xl py-3 shadow-inner rounded-md max-w-[400px] px-3 w-full left-1/2 transform -translate-x-1/2 bg-orange-50">
      {getNavbarContent()}
    </div>
  );
};

type NavbarElementProps = {
  page: string;
  href: string;
  icon: ReactNode;
};
const NavbarElement: FC<NavbarElementProps> = ({ icon, page, href }) => {
  const router = useRouter();

  const linkIsActive = () => {
    return router.asPath === href;
  };

  const redirectToHref = () => {
    router.push(href);
  };

  const elementClassNames = linkIsActive()
    ? "text-orange-500 bg-orange-200 rounded-lg shadow-sm"
    : "text-zinc-700";

  return (
    <div className="w-1/3 text-center flex justify-center">
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
