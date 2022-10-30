import { Field, ErrorMessage, useFormikContext } from "formik";
import Image from "next/image";
import React, { FC } from "react";
import useUploadImage from "../../hooks/useUploadImage";

const ImageUpload: FC<any> = () => {
  const { setFieldValue } = useFormikContext();
  const { filePickerRef, getPickedImage, pickImage, previewUrl } =
    useUploadImage();

  return (
    <div className="fieldWrapperClassName w-1/3">
      <div className="labelClassName">Image</div>
      <div className="mt-1">
        <Field
          placeholder="Hours"
          name="image"
          render={({ field }: any) => (
            <>
              <input
                ref={filePickerRef}
                className="hidden"
                type={"file"}
                accept=".jpg,.png,.jpeg"
                onChange={(e) => {
                  const image = getPickedImage(e);
                  setFieldValue("image", image);
                }}
              />
              <div
                onClick={pickImage}
                className="shadow-sm mb-2 rounded-md w-full px-2 h-9 flex items-center justify-center text-white bg-orange-400 font-medium cursor-pointer hover:bg-orange-500"
              >
                Upload Image
              </div>
              {previewUrl && (
                <div className="w-full relative h-48">
                  <Image
                    className="rounded-sm"
                    src={previewUrl.toString()}
                    alt="recipe-image"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>
              )}
              <ErrorMessage
                component="div"
                className="errorMessageClassName"
                name="image"
              />
            </>
          )}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
