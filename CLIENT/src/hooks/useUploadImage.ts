import React, { useEffect, useRef, useState } from 'react'

const useUploadImage = () => {
    const [file, setFile] = useState<File | undefined>(undefined);
    const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(
        null
    );
    const filePickerRef = useRef<HTMLInputElement | null>(null);

    const getPickedImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files && files.length === 1) {
            const pickedFile = files[0];
            setFile(pickedFile);
            return pickedFile
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

    return {
        file, filePickerRef, getPickedImage, pickImage, previewUrl
    }
}

export default useUploadImage