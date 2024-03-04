import { AddIcon } from "@chakra-ui/icons";
import {
  ChakraProvider,
  Flex,
  extendTheme,
  Heading,
  Grid,
  GridItem,
  Box,
  Square,
  Center,
} from "@chakra-ui/react";
import { ProductData } from "./types";
import ProductCard from "./components/ProductCard";
// import { motion } from "framer-motion";
/*
A Category
A Name
Some of them should have the ability to have options e.g. Fries - Small, Medium, Large
Price
A Cost
Amount in stock
*/
import "@fontsource-variable/quicksand";
// Supports weights 100-900
import "@fontsource-variable/hepta-slab";
import "@fontsource/concert-one";
import SearchBar from "./components/SearchBar";
import AddProductCard from "./components/AddProductCard";
import InputProductModal from "./components/inputProductModal/InputProductModal";
import useHover from "./hooks/useHover";
const customTheme = extendTheme({
  fonts: {
    body: "''Quicksand', sans-serif'",
    heading: "'Hepta Slab Variable', serif",
    // Add more font styles as needed
  },
});

function App() {
  const mockData: Array<ProductData> = [
    {
      name: "Taro",
      image: "https://s1.zerochan.net/Kitashirakawa.Anko.600.1396696.jpg",
      imageAlt: "hehe",
      baseCost: 20,
      basePrice: 40,
      category: "Water-Based",
      stock: 100,
      optionSets: [
        {
          optionSetName: "Sizes",
          options: [
            {
              optionItemName: "Small",
              costModifier: 0,
              priceModifier: 0,
              defaultOption: true,
            },
            { optionItemName: "Medium", costModifier: 8, priceModifier: 10 },
            { optionItemName: "Large", costModifier: 16, priceModifier: 20 },
          ],
          maxOptions: 1,
        },
        {
          optionSetName: "Addons",
          options: [
            {
              optionItemName: "Tapioca Pearls",
              costModifier: 10,
              priceModifier: 10,
              defaultOption: true,
            },
            {
              optionItemName: "Cookies & Cream",
              costModifier: 8,
              priceModifier: 10,
            },
            { optionItemName: "Jelly", costModifier: 16, priceModifier: 20 },
          ],
          maxOptions: 1,
        },
      ],
    },
    {
      name: "Winter Melon",
      image:
        "https://i.pinimg.com/originals/5a/87/7b/5a877b23152374455565ff1708d8e5f8.jpg",
      imageAlt: "nani",
      baseCost: 20,
      basePrice: 40,
      category: "Water-Based",
      stock: 100,
      optionSets: [
        {
          optionSetName: "Sizes",
          options: [
            {
              optionItemName: "Small",
              costModifier: 0,
              priceModifier: 0,
              defaultOption: true,
            },
            { optionItemName: "Medium", costModifier: 8, priceModifier: 10 },
            { optionItemName: "Large", costModifier: 16, priceModifier: 20 },
          ],
          maxOptions: 1,
        },
        {
          optionSetName: "Addons",
          options: [
            {
              optionItemName: "Tapioca Pearls",
              costModifier: 10,
              priceModifier: 10,
              defaultOption: true,
            },
            {
              optionItemName: "Cookies & Cream",
              costModifier: 8,
              priceModifier: 10,
            },
            { optionItemName: "Small", costModifier: 16, priceModifier: 20 },
          ],
          maxOptions: 1,
        },
      ],
    },
    {
      name: "Okinawa",
      image:
        "https://firebasestorage.googleapis.com/v0/b/menucrud.appspot.com/o/Gemini_Generated_Image.jpg?alt=media&token=b35fc180-65f5-4af3-a334-f8e42cb969b6",
      imageAlt: "nani",
      baseCost: 20,
      basePrice: 40,
      category: "Water-Based",
      stock: 100,
      optionSets: [
        {
          optionSetName: "Sizes",
          options: [
            {
              optionItemName: "Small",
              costModifier: 0,
              priceModifier: 0,
              defaultOption: true,
            },
            { optionItemName: "Medium", costModifier: 8, priceModifier: 10 },
            { optionItemName: "Large", costModifier: 16, priceModifier: 20 },
          ],
          maxOptions: 1,
        },
        {
          optionSetName: "Addons",
          options: [
            {
              optionItemName: "Tapioca Pearls",
              costModifier: 10,
              priceModifier: 10,
              defaultOption: true,
            },
            {
              optionItemName: "Cookies & Cream",
              costModifier: 8,
              priceModifier: 10,
            },
            { optionItemName: "Small", costModifier: 16, priceModifier: 20 },
          ],
          maxOptions: 1,
        },
      ],
    },
    {
      name: "Hazelnut",
      image:
        "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/719f1aa1501e443bb1856bce121e74d6/BFV41761_DeliciousAsianDrinks_FBFINAL_v5.jpg",
      imageAlt: "hehe",
      baseCost: 50,
      basePrice: 7000,
      category: "Water-Based",
      stock: 100,
      optionSets: [
        {
          optionSetName: "Sizes",
          options: [
            {
              optionItemName: "Small",
              costModifier: 0,
              priceModifier: 0,
              defaultOption: true,
            },
            { optionItemName: "Medium", costModifier: 8, priceModifier: 10 },
            { optionItemName: "Large", costModifier: 16, priceModifier: 20 },
          ],
          maxOptions: 1,
        },
        {
          optionSetName: "Addons",
          options: [
            {
              optionItemName: "Tapioca Pearls",
              costModifier: 10,
              priceModifier: 10,
              defaultOption: true,
            },
            {
              optionItemName: "Cookies & Cream",
              costModifier: 8,
              priceModifier: 10,
            },
            { optionItemName: "Jelly", costModifier: 16, priceModifier: 20 },
          ],
          maxOptions: 1,
        },
      ],
    },
  ];

  // const { ref, isHovering } = useHover();
  return (
    <ChakraProvider theme={customTheme}>
      <Flex
        flexDir={"column"}
        backgroundColor={"#ead9c8"}
        h={"100vh"}
        overflow="hidden"
      >
        <Flex align="center" boxShadow="md" bg="white">
          <Flex flex={1}>
            <Heading
              borderWidth="6px"
              borderRadius="12px"
              borderColor="gray.700"
              color={"gray.700"}
              m={2}
              px={2}
              fontFamily="'Concert One', system-ui"
            >
              THE MENU
            </Heading>
          </Flex>
          <Flex flex={1}>
            <SearchBar />
          </Flex>
          <Flex flex={1}></Flex>
        </Flex>
        <Flex flexDir={"column"} align="center" h="100%" overflow="auto">
          <Grid
            w="1280px"
            templateColumns="repeat(5, 1fr)"
            gap={2}
            p={2}
            mt={4}
          >
            <GridItem flexDir={"column"}>
              <AddProductCard />
            </GridItem>
            {[
              ...mockData,
              ...mockData,
              ...mockData,
              ...mockData,
              ...mockData,
            ].map((data, key) => (
              <GridItem key={data.name + key} flexDir={"column"}>
                <Flex flexDir="column" align="center" h="100%">
                  <ProductCard productData={data} />
                </Flex>
              </GridItem>
            ))}
          </Grid>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
