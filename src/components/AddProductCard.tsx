import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, Image } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import InputProductModal from "./InputProductModal";

function AddProductCard() {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [randomNumber, setRandomNumber] = useState(Math.random());
  useEffect(() => {
    setRandomNumber(Math.random());
  }, []);
  return (
    <Flex flexGrow={1} flexDir={"column"} maxW="300" p={2} gap={2}>
      <Box
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onFocus={() => setIsHovering(true)}
        onBlur={() => setIsHovering(false)}
        pos={"relative"}
        mb={`6px`}
        transform={isHovering ? `scale(1) rotate(${0}deg)` : `scale(0.95) rotate(${Math.random() * 6 - 3}deg)`}
        transition="transform 0.3s ease"
      >
        <Box pos={"relative"}>
          <Box
            borderRadius={16}
            pos="absolute"
            w="100%"
            h="100%"
            boxShadow={
              isHovering
                ? `md`
                : `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), inset 0 0 150px -75px rgba(0, 0, 0, 1)`
            }
            transition="box-shadow 0.3s ease"
          />
          <Image
            borderRadius={16}
            //0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06),
            // w={"300px"}
            // h={"300px"}
            // boxShadow={"inset 0 0 10px rgba(0, 0, 0, 0.5)"}
            // style={{
            //   boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.5)"
            // }}
            aspectRatio={1 / 1}
            objectFit="cover"
            bgPosition="center"
            src={
              "https://image.pollinations.ai/prompt/" +
              `High Quality, Sharp, Advertisement, Professional Photography, Simple Background, Tapioca Pearls, Oreo Cookies, Straw, delicious milktea bubble tea, delicious milktea bubble tea, delicious milktea bubble tea, delicious milktea bubble tea, delicious milktea bubble tea, ${randomNumber}`
            } //
            fallbackSrc="https://via.placeholder.com/300"
          />
        </Box>
        <Box
          overflow={"auto"}
          ref={titleRef}
          maxW={300}
          // boxShadow={"0 4px 6px rgba(50, 50, 93, 1), 0 1px 3px rgba(0, 0, 0, 0.5)"}
          boxShadow={"md"}
          pos={"absolute"}
          left={"50%"}
          transform={
            isHovering
              ? `translate(-50%, -75%) rotate(${0}deg)`
              : `translate(-50%, -60%) rotate(${Math.random() * 6 - 3}deg)`
          }
          transition="transform 0.3s ease"
          borderRadius={"8px"}
        >
          <InputProductModal borderRadius={"8px"} colorScheme="green" rightIcon={<AddIcon />} title="Add Item">
            Add Item
          </InputProductModal>
        </Box>
      </Box>
    </Flex>
  );
}

export default AddProductCard;
