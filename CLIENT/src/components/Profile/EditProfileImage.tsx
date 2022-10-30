import Image from "next/image";
import React, { FC } from "react";
import { FaRegEdit } from "react-icons/fa";
import useUploadImage from "../../hooks/useUploadImage";

type EditProfileImageProps = {
  showEditIcon?: boolean;
};
const EditProfileImage: FC<EditProfileImageProps> = ({ showEditIcon }) => {
  const { filePickerRef, getPickedImage, pickImage, previewUrl } =
    useUploadImage();

  if (!showEditIcon) {
    return null;
  }

  return (
    <div>
      {showEditIcon && (
        <div
          onClick={pickImage}
          className="absolute -bottom-2 -left-2 rounded-full text-orange-50 z-10 bg-orange-400 shadow-sm cursor-pointer p-1"
        >
          <FaRegEdit />
          <>
            <input
              ref={filePickerRef}
              className="hidden"
              type={"file"}
              accept=".jpg,.png,.jpeg"
              onChange={(e) => {
                const image = getPickedImage(e);
              }}
            />
          </>
        </div>
      )}
    </div>
  );
};

export default EditProfileImage;
