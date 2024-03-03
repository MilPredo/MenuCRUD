import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { FormikProps } from "formik";
import { FormikProductData } from "../../types";
import { useState, useRef } from "react";
function InputImage({ formik }: { formik: FormikProps<FormikProductData> }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    formik.values?.image ?? null
  );
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };

    if (file) {
      setSelectedFileName(file.name);
      reader.readAsDataURL(file);
    }
  };

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleBoxClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };
  return (
    <Flex flexDir="column">
      {" "}
      <Box
        backgroundImage={selectedImage ?? undefined}
        backgroundSize="cover"
        backgroundPosition="center"
        as="button"
        onClick={handleBoxClick}
        boxSize="300px"
        borderRadius="lg"
        borderWidth="4px"
        borderColor="GrayText"
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
          {selectedFileName && (
            <Text fontWeight="bold" fontSize="medium">
              Selected file: {selectedFileName}
            </Text>
          )}
        </Box>
      </Box>
      <Input
        ref={inputFileRef}
        type="file"
        onChange={handleImageChange}
        // onChange={(e) => {
        //   e.preventDefault();
        // }}
        accept="image/*"
        display="none"
      />
    </Flex>
  );
}

export default InputImage;
