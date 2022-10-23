import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC } from "react";
import InitialsProfileImage from "../Overview/InitialsProfileImage";

type UserImageProps = {
  image: string;
  username: string;
};
const UserImage: FC<UserImageProps> = ({ image, username }) => {
  const router = useRouter();

  const redirectToProfile = () => {
    router.push("/profile");
  };

  return (
    <div
      onClick={redirectToProfile}
      className="h-14 w-14 relative overflow-hidden cursor-pointer rounded-full shadow-md"
    >
      {image ? (
        <Image
          src={image}
          layout="fill"
          alt="profile_image"
          objectFit="cover"
          objectPosition="center"
        />
      ) : (
        <InitialsProfileImage username={username} />
      )}
    </div>
  );
};

export default UserImage;
