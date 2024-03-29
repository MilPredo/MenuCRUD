import { Box, Center, Flex, Input, Square, Text } from "@chakra-ui/react";
import { FormikProps } from "formik";
import { FormikProductData } from "../../types";
import useFileDropZone from "../../hooks/useImageDropZone";
import useHover from "../../hooks/useHover";
import { useEffect} from "react";
// import useMultiRef from "../../hooks/useMultiRef";

function InputImage({
  formik,
  newImage,
  newImageName,
  setImage,
  setImageFile,
  setImageName,
}: {
  formik: FormikProps<FormikProductData>;
  newImage?: string | null;
  newImageName?: string;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
  setImageFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  setImageName: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const { dropZoneRef, imageInputRef, image, imageName, isDraggedOver, isInValid, imageFile } = useFileDropZone(
    newImage ?? formik.values.image
  );
  const { ref, isHovering } = useHover();

  useEffect(() => {
    //formik.values.image = image ?? undefined;
    setImage(image);
    setImageName(imageName);
    setImageFile(imageFile);
  }, [image]);
  return (
    <Flex flexDir="column" align="center">
      <Box
        backgroundImage={image ?? undefined}
        backgroundSize="cover"
        backgroundPosition="center"
        as="button"
        ref={dropZoneRef}
        boxSize="300px"
        borderRadius="lg"
        borderWidth={"4px"}
        borderColor={isInValid ? "#E53E3E" : isDraggedOver ? "#3182ce" : "GrayText"}
        transform={`scale(${isDraggedOver || isHovering ? 1.05 : 1})`}
        transition="transform 0.3s ease"
        type="button"
      >
        <Center ref={ref} h="100%">
          <Square size="50%" flexDir="column" bg="rgba(255,255,255,0.6)" backdropFilter={"blur(4px)"} borderRadius="lg">
            <Text fontWeight="bold" fontSize="large">
              Drag & Drop Image Here
            </Text>
            <Text fontWeight="bold" fontSize="smaller">
              or click to upload
            </Text>
            <Text fontSize="smaller">Recommended resolution: 300x300</Text>
          </Square>
        </Center>
      </Box>
      <Input ref={imageInputRef} type="file" accept="image/*" display="none" />
      {(imageName ?? newImageName) && (
        <Text m="2">
          <Text as="span" fontWeight="bold" fontSize="medium">
            Selected file:{" "}
          </Text>
          <Text as="span" fontWeight="bold" fontSize="large" color="#3182ce">
            {imageName ?? newImageName} {((imageFile?.size ?? 0) / 1048576).toFixed(2)}MB
          </Text>
        </Text>
      )}
    </Flex>
  );
}
export default InputImage;
