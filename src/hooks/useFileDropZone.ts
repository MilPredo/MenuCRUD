import { useState, useEffect, useRef } from "react";

interface FileDropZoneHook {
  dropZoneRef: React.RefObject<HTMLDivElement>;
  filename: string;
  file: File | null;
}

const useFileDropZone = (): FileDropZoneHook => {
  const [filename, setFilename] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      const dataTransfer = event.dataTransfer;
      if (dataTransfer && dataTransfer.files.length > 0) {
        const droppedFile = dataTransfer.files[0];
        setFilename(droppedFile.name);
        setFile(droppedFile);
      }
    };

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
    };

    const dropZone = dropZoneRef.current;
    if (dropZone) {
      dropZone.addEventListener("drop", handleDrop);
      dropZone.addEventListener("dragover", handleDragOver);
    }

    return () => {
      if (dropZone) {
        dropZone.removeEventListener("drop", handleDrop);
        dropZone.removeEventListener("dragover", handleDragOver);
      }
    };
  }, []);

  return { dropZoneRef, filename, file };
};

export default useFileDropZone;
