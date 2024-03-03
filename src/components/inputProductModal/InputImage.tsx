import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { FormikProps } from "formik";
import { FormikProductData } from "../../types";
import { useState, useRef } from "react";
import useFileDropZone from "../../hooks/useImageDropZone";
function InputImage({ formik }: { formik: FormikProps<FormikProductData> }) {
  // const [selectedImage, setSelectedImage] = useState<string | null>(
  //   formik.values?.image ?? null
  // );
  const {
    dropZoneRef,
    imageInputRef,
    image,
    imageName,
    isDraggedOver,
    isInValid,
  } = useFileDropZone(formik.values.image);
  // const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     setSelectedImage(reader.result as string);
  //   };

  //   if (file) {
  //     setSelectedFileName(file.name);
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const inputFileRef = useRef<HTMLInputElement>(null);

  // const handleBoxClick = () => {
  //   if (inputFileRef.current) {
  //     inputFileRef.current.click();
  //   }
  // };
  return (
    <Flex flexDir="column"> 
      <Box
        backgroundImage={image ?? undefined}
        backgroundSize="cover"
        backgroundPosition="center"
        as="button"
        ref={dropZoneRef}
        boxSize="300px"
        borderRadius="lg"
        borderWidth={"4px"}
        borderColor={isDraggedOver ? (isInValid ? "#E53E3E" : "#3182ce") : "GrayText"}
        transform={`scale(${isDraggedOver ? 1.05 : 1})`}
        transition="transform 0.3s ease"
        type="button"
      >
        <Box
          bg="rgba(255,255,255,0.6)"
          backdropFilter={"blur(4px)"}
          borderRadius="lg"
        >
          <Text fontWeight="bold" fontSize="medium">
            Click here to upload image
          </Text>
          <Text fontWeight="bold" fontSize="medium">
            Recommended resolution: 300x300
          </Text>
          {imageName && (
            <Text fontWeight="bold" fontSize="medium">
              Selected file: {imageName}
            </Text>
          )}
        </Box>
      </Box>
      <Input ref={imageInputRef} type="file" accept="image/*" display="none" />
    </Flex>
  );
}

export default InputImage;
