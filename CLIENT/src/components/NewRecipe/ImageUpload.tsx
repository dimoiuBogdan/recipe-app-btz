import { Field, ErrorMessage, useFormikContext } from "formik";
import Image from "next/image";
import React, { FC, useEffect, useRef, useState } from "react";
import { NewRecipeModel } from "../../models/RecipeModels";

const ImageUpload: FC<any> = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(
    null
  );
  const filePickerRef = useRef<HTMLInputElement | null>(null);
  const { setFieldValue } = useFormikContext<NewRecipeModel>();

  const handlePickedImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length === 1) {
      const pickedFile = files[0];
      setFile(pickedFile);
      setFieldValue("image", pickedFile);
      return;
    }
  };

  const pickImage = () => {
    filePickerRef?.current?.click();
  };

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

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
                onChange={(e) => handlePickedImage(e)}
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
