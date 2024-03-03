import { useRef, useState } from "react";
import { ProductCardProps } from "../types";
import {
  Box,
  ButtonGroup,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  Spacer,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import DropDownAccordion from "./DropDownAccordion";
import OptionSection from "./OptionSection";
import InputProductModal from "./inputProductModal/InputProductModal";
import DeleteProductButton from "./DeleteProductButton";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

import "@fontsource-variable/quicksand";
import "@fontsource/anton";
import "@fontsource/poppins/800.css";
import { placeHolderImg } from "../assets/300";

function AddProductCard2() {
  const [isHovering, setIsHovering] = useState(false);
  const [isImageIsLoading, setIsImageLoading] = useState(true);

  function formatCurrency(amount: number) {
    const roundedAmount = Math.round(amount * 100) / 100;
    const formattedAmount = roundedAmount.toLocaleString("en-PH", {
      style: "currency",
      currency: "PHP",
    });
    return formattedAmount;
  }

  return (
    <Flex
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onFocus={() => setIsHovering(true)}
      onBlur={() => setIsHovering(false)} 
      flexDir={"column"}
      maxW="300px"
      h="100%"
      p={2}
      gap={2}
      bg='red' 
    > 
      {/* <Box
        mx={4}
        pos={"relative"}
        mb={`6px`}
        transform={
          isHovering
            ? `scale(1) rotate(${0}deg)`
            : `scale(0.90) translateY(5%) rotate(${Math.random() * 6 - 3}deg)`
        } 
        transition="transform 0.3s ease"
        bg={isImageIsLoading ? "gray" : undefined}
        borderRadius={16} 
      >
        <Box pos={"relative"}>
          <Center borderRadius={16} pos="absolute" w="100%" h="100%">
            {isImageIsLoading && <Spinner />}
          </Center>
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
            opacity={isImageIsLoading ? "0" : "1"}
            transition="box-shadow 0.3s ease, opacity 0.5s ease 1s"
          />
          <Image
            borderRadius={16}
            //src={productData.image}
            src={productData.image}
            alt={productData.imageAlt}
            onLoad={() => {
              setIsImageLoading(false);
            }}
            opacity={isImageIsLoading ? "0" : "1"}
            // opacity={0}
            transition="opacity 1s ease"
            aspectRatio={1 / 1}
            objectFit="cover"
            fallbackSrc={placeHolderImg}
            width="100%" // Ensure consistent width for both loaded and placeholder images
            height="100%" // Ensure consistent height for both loaded and placeholder images
          />
        </Box>
        <Box
          overflow={"auto"}
          // ref={titleRef}
          maxW={300}
          boxShadow={"md"}
          pos={"absolute"}
          left={"50%"}
          transform={
            isHovering
              ? `translate(-50%, -75%) rotate(${0}deg)`
              : `translate(-50%, -50%) rotate(${Math.random() * 6 - 3}deg)`
          }
          transition="transform 0.3s ease"
          borderRadius={"8px"}
          backdropFilter={"blur(2px)"}
        >
          <Box bg="rgba(255,255,255, 0.60)" px={"8px"} py={"4px"}>
            <Heading
              fontWeight="800"
              style={{ fontFamily: "'Poppins', sans-serif" }}
              fontSize="24px"
              textAlign={"center"}
              noOfLines={3}
            >
              {productData.name}
            </Heading>
          </Box>
        </Box>
      </Box> */} 
      <Flex flexDir="column" flex={1}/>
      <Flex bg='green' align="end" >
        <Stack
          divider={<Divider />}
          spacing="0"
          p={2}
          bg="white"
          borderRadius={16}
          boxShadow={"md"}
          w="100%"
          justify="end"
          h="125%"
          gap={2}
        >
          <></>
          <Stack direction="row" divider={<Divider orientation="vertical" />} spacing="0" gap={2}>
            <Flex flex={1} flexDir="column">
              <Text fontWeight={"600"} textAlign="center" fontSize={"16px"} color="GrayText">
                Cost
              </Text>
              <Heading textAlign="center" size="lg">
                {formatCurrency(100)}
              </Heading>
            </Flex>
            <Flex flex={1} flexDir="column">
              <Text fontWeight={"600"} textAlign="center" fontSize={"16px"} color="GrayText">
                Price
              </Text>
              <Heading size="lg">{formatCurrency(100)}</Heading>
            </Flex>
          </Stack>
          <Stack direction="row" divider={<Divider orientation="vertical" />} spacing="0" gap={2}>
            <Flex flex={1} flexDir="column">
              <Text fontWeight={"600"} textAlign="center" fontSize={"16px"} color="GrayText">
                Category
              </Text>
              <Heading textAlign="center" size="sm">
                {"Potato"}
              </Heading>
            </Flex>
            <Flex flex={1} flexDir="column">
              <Text fontWeight={"600"} textAlign="center" fontSize={"16px"} color="GrayText">
                Available Stock
              </Text>
              <Heading textAlign="center" size="sm">
                {"asd"}
              </Heading>
            </Flex>
          </Stack>
          <></>
          <ButtonGroup spacing="2">
            <Spacer />
            <InputProductModal rightIcon={<AddIcon />} title={`Add item`}>
              Add
            </InputProductModal>
          </ButtonGroup>
        </Stack>
      </Flex> 
    </Flex>
  );
}

export default AddProductCard2;
