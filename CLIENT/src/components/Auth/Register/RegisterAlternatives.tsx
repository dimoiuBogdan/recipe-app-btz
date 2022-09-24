import React, { FC } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

const RegisterAlternatives: FC<any> = () => {
  const iconClassName =
    "rounded-full text-lg border-2 p-2 mx-1 cursor-pointer hover:shadow-lg hover:bg-transparent";

  return (
    <div className="text-center">
      <div className="font-medium mt-3 mb-2 text-gray-500">
        Or Sign Up Using
      </div>
      <div className="flex items-center text-white justify-center">
        <div
          className={`${iconClassName}  bg-blue-500 hover:border-blue-500  hover:text-blue-500`}
        >
          <FaFacebookF />
        </div>
        <div
          className={`${iconClassName}  bg-red-500 hover:border-red-500  hover:text-red-500`}
        >
          <FaGoogle />
        </div>
      </div>
    </div>
  );
};

export default RegisterAlternatives;
