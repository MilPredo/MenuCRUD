import { useRef, useState } from "react";
import { ProductCardProps } from "../types";
import { Box, ButtonGroup, Divider, Flex, Heading, Image, Spacer, Stack, Text } from "@chakra-ui/react";
import DropDownAccordion from "./DropDownAccordion";
import OptionSection from "./OptionSection";
import InputProductModal from "./InputProductModal";
import DeleteProductButton from "./DeleteProductButton";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

import "@fontsource-variable/quicksand";
import "@fontsource/anton";
import "@fontsource/poppins/800.css";



function ProductCard({ productData }: ProductCardProps) {
  // function calculateProductCostAndPrice() {
  //   let [cost, price] = [productData.baseCost, productData.basePrice];
  //   if (productData.optionSets) {
  //     for (let optionSet of productData.optionSets) {
  //       if (optionSet) {
  //         for (let option of optionSet.options) {
  //           cost += option.costModifier;
  //           price += option.priceModifier;
  //         }
  //       }
  //     }
  //   }
  //   return [cost, price]
  // }
  // const [cost, price] = calculateProductCostAndPrice()
  const titleRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  function formatCurrency(amount: number) {
    // Round to two decimal places
    const roundedAmount = Math.round(amount * 100) / 100;

    // Format as currency string
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
      flexGrow={1}
      flexDir={"column"}
      maxW="300"
      p={2}
      gap={2}
    >
      <Box
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
            src={productData.image}
            alt={productData.imageAlt}
            // w={"300px"}
            // h={"300px"}
            aspectRatio={1 / 1}
            objectFit="cover"
            bgPosition="center"
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
      </Box>
      <Spacer />
      <Stack divider={<Divider />} spacing="0" p={2} bg="white" borderRadius={16} boxShadow={"md"} gap={2}>
        <Stack direction="row" divider={<Divider orientation="vertical" />} spacing="0" gap={2}>
          <Flex flex={1} flexDir="column">
            <Text fontWeight={"600"} textAlign="center" fontSize={"16px"} color="GrayText">
              Base Cost
            </Text>
            <Heading textAlign="center" size="lg">
              {formatCurrency(productData.baseCost)}
            </Heading>
          </Flex>
          <Flex flex={1} flexDir="column">
            <Text fontWeight={"600"} textAlign="center" fontSize={"16px"} color="GrayText">
              Base Price
            </Text>
            <Heading size="lg">{formatCurrency(productData.basePrice)}</Heading>
          </Flex>
        </Stack>
        <Stack direction="row" divider={<Divider orientation="vertical" />} spacing="0" gap={2}>
          <Flex flex={1} flexDir="column">
            <Text fontWeight={"600"} textAlign="center" fontSize={"16px"} color="GrayText">
              Category
            </Text>
            <Heading textAlign="center" size="sm">
              {productData.category}
            </Heading>
          </Flex>
          <Flex flex={1} flexDir="column">
            <Text fontWeight={"600"} textAlign="center" fontSize={"16px"} color="GrayText">
              Available Stock
            </Text>
            <Heading textAlign="center" size="sm">
              {productData.stock}
            </Heading>
          </Flex>
        </Stack>
        {/* <Accordion allowToggle>
          <AccordionItem borderColor={'transparent'}>
            <AccordionButton p={0} >
              <Heading size="md">Options</Heading>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel p={0}>
              <Divider my="2"/>
              <OptionSection optionSets={productData.optionSets} />
            </AccordionPanel>
          </AccordionItem>
        </Accordion> */}
        {productData.optionSets ? (
          <DropDownAccordion size="sm" title={"Options"}>
            <OptionSection
              key={productData.name + productData.category}
              size="sm"
              optionSets={productData.optionSets}
            />
          </DropDownAccordion>
        ) : (
          <></>
        )}
        <ButtonGroup spacing="2">
          {/* <Button borderRadius={8} rightIcon={<EditIcon />} variant="solid" colorScheme="blue">
            Edit
          </Button> */}
          <Spacer />
          <InputProductModal productData={productData} rightIcon={<EditIcon />} title={`Edit "${productData.name}"`}>
            Edit
          </InputProductModal>
          <DeleteProductButton productData={productData} rightIcon={<DeleteIcon />} />
          {/* <Button borderRadius={8} rightIcon={<DeleteIcon />} variant="solid" colorScheme="red">
            Delete
          </Button> */}
        </ButtonGroup>
      </Stack>
      <Spacer />
    </Flex>
  );
}

export default ProductCard;
