import { useMemo, useState } from "react";
import { ProductCardProps } from "../types";
import {
  Box,
  Button,
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
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

import "@fontsource-variable/quicksand";
import "@fontsource/anton";
import "@fontsource/poppins/800.css";
import useHover from "../hooks/useHover";

function ProductCard({ productData }: ProductCardProps) {
  // const [isHovering, setIsHovering] = useState(false);
  const [ImageLoading, setIsImageLoading] = useState(true);
  const { ref, isHovering } = useHover();

  function formatCurrency(amount: number) {
    console.log("hallo");
    const roundedAmount = Math.round(amount * 100) / 100;
    const formattedAmount = roundedAmount.toLocaleString("en-PH", {
      style: "currency",
      currency: "PHP",
    });
    const [whole, fraction] = formattedAmount.split(".");
    let a = whole.split("");
    a.shift();
    return { whole: a, fraction };
  }
  const formattedCost = useMemo(() => formatCurrency(productData.baseCost), [productData.baseCost]);
  const formattedPrice = useMemo(() => formatCurrency(productData.basePrice), [productData.basePrice]);

  return (
    <Flex ref={ref} flexDir={"column"} w="100%" h="100%" align="">
      <Flex
        mx={4}
        pos={"relative"}
        mb={`6px`}
        transform={
          isHovering ? `scale(1) rotate(${0}deg)` : `scale(0.90) translateY(5%) rotate(${Math.random() * 6 - 3}deg)`
        }
        transition="transform 0.3s ease"
        borderRadius={16}
        zIndex={1}
      >
        <Flex pos={"relative"} flexDir="column" aspectRatio={1} minW="100%" bg="gray.100" borderRadius={16}>
          <Center borderRadius={16} pos="absolute" w="100%" h="100%">
            {ImageLoading && <Spinner />}
          </Center>
          <Flex
            borderRadius={16}
            pos="absolute"
            w="100%"
            h="100%"
            boxShadow={
              isHovering
                ? `md`
                : `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), inset 0 0 150px -75px rgba(0, 0, 0, 1)`
            }
            opacity={ImageLoading ? "0" : "1"}
            transition="box-shadow 0.3s ease, opacity 0.5s ease 1s"
          />
          <Image
            borderRadius={16}
            src={productData.image}
            alt={productData.name}
            onLoad={() => {
              setIsImageLoading(false);
            }}
            opacity={ImageLoading ? "0" : "1"}
            transition="opacity 1s ease"
            aspectRatio={1 / 1}
            objectFit="cover"
          />
        </Flex>
        <Box
          overflow={"auto"}
          // ref={titleRef}
          maxW={300}
          boxShadow={"md"}
          pos={"absolute"}
          top={"100%"}
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
              fontSize="18px"
              textAlign={"center"}
              noOfLines={3}
              textShadow="0px 0px 2px white"
              textTransform="capitalize"
            >
              {productData.name}
            </Heading>
          </Box>
        </Box>
      </Flex>
      <Flex align="end">
        <Stack
          divider={<Divider />}
          spacing="0"
          p={2}
          bg="white"
          borderRadius={16}
          boxShadow={"md"}
          w="100%"
          justify="end"
          h="150%"
          gap={1}
        >
          <></>
          <Stack direction="row" divider={<Divider orientation="vertical" />} spacing="0" gap={1}>
            <Flex flex={1} flexDir="column" justify="space-between" minH="60px">
              <Text fontWeight={"600"} textAlign="center" fontSize={"12px"} color="GrayText">
                Cost
              </Text>
              <Heading textAlign="center" size="sm">
                <Heading as="span" fontSize={formattedCost.whole.toString().split("").length > 3 ? "18px" : "24px"}>
                  ₱
                </Heading>
                <Heading as="span" size={formattedCost.whole.toString().split("").length > 3 ? "md" : "lg"}>
                  {formattedCost.whole}
                </Heading>
                <Heading as="span" size="sm">
                  .
                </Heading>
                <Heading as="span" fontSize="12px">
                  {formattedCost.fraction}
                </Heading>
              </Heading>
            </Flex>
            <Flex flex={1} flexDir="column" justify="space-between">
              <Text fontWeight={"600"} textAlign="center" fontSize={"12px"} color="GrayText">
                Price
              </Text>
              <Heading textAlign="center" size="sm">
                <Heading as="span" fontSize={formattedPrice.whole.toString().split("").length > 3 ? "18px" : "24px"}>
                  ₱
                </Heading>
                <Heading as="span" size={formattedPrice.whole.toString().split("").length > 3 ? "md" : "lg"}>
                  {formattedPrice.whole}
                </Heading>
                <Heading as="span" size="sm">
                  .
                </Heading>
                <Heading as="span" fontSize="12px">
                  {formattedPrice.fraction}
                </Heading>
              </Heading>
            </Flex>
          </Stack>
          <Stack direction="row" divider={<Divider orientation="vertical" />} spacing="0" gap={1}>
            <Flex flex={1} flexDir="column" justify="center">
              <Text fontWeight={"600"} textAlign="center" fontSize={"12px"} color="GrayText">
                Category
              </Text>
              <Heading textAlign="center" fontSize={"12px"}>
                {productData.category}
              </Heading>
            </Flex>
            <Flex flex={1} flexDir="column" justify="center">
              <Text fontWeight={"600"} textAlign="center" fontSize={"12px"} color="GrayText">
                Available Stock
              </Text>
              <Heading textAlign="center" fontSize={"12px"}>
                {productData.stock}
              </Heading>
            </Flex>
          </Stack>
          <DropDownAccordion isDisabled={(productData.optionSets?.length ?? 0) <= 0} size="xs" title={"Options"}>
            <OptionSection
              key={productData.name + productData.category}
              size="sm"
              optionSets={productData.optionSets}
            />
          </DropDownAccordion>
          <ButtonGroup spacing="1">
            <Spacer />
            <InputProductModal
              productData={productData}
              title={`Edit "${productData.name}"`}
              button={(onOpen) => (
                <Button
                  onClick={onOpen}
                  borderRadius={8}
                  rightIcon={<EditIcon />}
                  variant="solid"
                  colorScheme={"blue"}
                  size="sm"
                >
                  Edit
                </Button>
              )}
            />
            <DeleteProductButton productData={productData} rightIcon={<DeleteIcon />} />
          </ButtonGroup>
        </Stack>
      </Flex>
    </Flex>
  );
}

export default ProductCard;
