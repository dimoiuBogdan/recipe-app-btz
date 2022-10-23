import React, { FC } from "react";

type InitialsProfileImageProps = {
  username: string;
};
const InitialsProfileImage: FC<InitialsProfileImageProps> = ({ username }) => {
  const firstLettersOfUsername = username.slice(0, 2).toUpperCase();

  return (
    <div className="h-full w-full bg-orange-300 bg-opacity-50 flex items-center justify-center text-2xl font-bold text-orange-500">
      {firstLettersOfUsername}
    </div>
  );
};

export default InitialsProfileImage;
