import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC } from "react";
import InitialsProfileImage from "../Overview/InitialsProfileImage";
import EditProfileImage from "../Profile/EditProfileImage";

type UserImageProps = {
  image: string;
  username: string;
  showEditIcon?: boolean;
};
const UserImage: FC<UserImageProps> = ({ image, username, showEditIcon }) => {
  const router = useRouter();

  const redirectToProfile = () => {
    router.push("/profile");
  };

  return (
    <div className="relative">
      <EditProfileImage showEditIcon={showEditIcon} />
      <div
        onClick={redirectToProfile}
        className="h-14 w-14 relative overflow-hidden cursor-pointer rounded-full shadow-md"
      >
        {image ? (
          <Image
            src={image}
            layout="fill"
            objectFit="cover"
            alt="profile_image"
            objectPosition="center"
          />
        ) : (
          <InitialsProfileImage username={username} />
        )}
      </div>
    </div>
  );
};

export default UserImage;
