import { useState, useRef, useEffect } from "react";

const useImageDropZone = (initialImage?: string) => {
  const [image, setImage] = useState<string | null>(initialImage ?? null);
  const [imageName, setImageName] = useState<string>();
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);
  const [isInValid, setIsInValid] = useState<boolean>(false);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const dropZone = dropZoneRef.current;
  const imageInput = imageInputRef.current;

  useEffect(() => {
    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      setIsDraggedOver(true);
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer?.files[0];
      if (file && !file.type.startsWith("image/")) {
        setIsInValid(true);
      }
      setIsDraggedOver(true);
    };

    const handleDragLeave = () => {
      setIsDraggedOver(false);

      setIsInValid(false);
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setIsDraggedOver(false);
      const file = e.dataTransfer?.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
        setImageName(file.name);
      } else {
        setIsInValid(true);
      }
    };

    const handleChange = (e: Event) => {
      e.preventDefault();
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
        setImageName(file.name);
      }
    };

    const handleFileInputClick = () => {
      imageInput?.click();
    };

    if (dropZone) {
      dropZone.addEventListener("dragenter", handleDragEnter);
      dropZone.addEventListener("dragover", handleDragOver);
      dropZone.addEventListener("dragleave", handleDragLeave);
      dropZone.addEventListener("drop", handleDrop);
      dropZone.addEventListener("click", handleFileInputClick);
    }

    if (imageInput) {
      imageInput.addEventListener("change", handleChange);
    }

    return () => {
      if (dropZone) {
        dropZone.removeEventListener("dragenter", handleDragEnter);
        dropZone.removeEventListener("dragover", handleDragOver);
        dropZone.removeEventListener("dragleave", handleDragLeave);
        dropZone.removeEventListener("drop", handleDrop);
        dropZone.removeEventListener("click", handleFileInputClick);
      }

      if (imageInput) {
        imageInput.removeEventListener("change", handleChange);
      }
    };
  }, [dropZone, imageInput]);

  return {
    dropZoneRef,
    imageInputRef,
    image,
    imageName,
    isInValid,
    isDraggedOver,
  };
};

export default useImageDropZone;
