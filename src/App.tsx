import { ChakraProvider, Flex, extendTheme, Heading, Grid, GridItem, Button } from "@chakra-ui/react";
import { KeyValuePair, ProductDataFirebase } from "./types";
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
import { useGetProductList } from "./hooks/firebaseHelperHooks";
import { productDataFirebaseConvertKVToArrays } from "./helperFunctions";
import { AddIcon } from "@chakra-ui/icons";
import InputProductModal from "./components/inputProductModal/InputProductModal";
const customTheme = extendTheme({
  fonts: {
    body: "''Quicksand', sans-serif'",
    heading: "'Hepta Slab Variable', serif",
    // Add more font styles as needed
  },
});

function App() {
  // let productDataFirebase = keyValuePairsToArray<ProductDataFirebase>(
  //   useGetProductList()
  // );
  const { products, setSearchQuery } = useGetProductList();
  console.log("APP", products);
  // const [productData, setProductData] = useState<ProductData[]>([]);
  // setSearchQuery
  return (
    <ChakraProvider theme={customTheme}>
      <Flex flexDir={"column"} backgroundColor={"#ead9c8"} h={"100vh"} overflow="hidden">
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
            <Flex flex={1} justify="center" align="center">
              <InputProductModal
                title="Add Item"
                button={(onOpen) => (
                  <Button variant="outline" colorScheme="green" onClick={onOpen} leftIcon={<AddIcon />}>
                    Add Item
                  </Button>
                )}
              />
            </Flex>
          </Flex>
          <Flex flex={1}>
            <SearchBar
              onChange={setSearchQuery}
              onCancel={() => {
                setSearchQuery("");
              }}
            />
          </Flex>
          <Flex flex={1} />
        </Flex>
        <Flex flexDir={"column"} align="center" h="100%" overflow="auto">
          <Grid
            w="1280px"
            templateColumns="repeat(5, 1fr)"
            rowGap={2}
            columnGap={4}
            p={4}
            // mt={4}
          >
            {/* <GridItem flexDir={"column"}>
              <AddProductCard />
            </GridItem> */}
            {productDataFirebaseConvertKVToArrays(products as KeyValuePair<ProductDataFirebase>).map((data, key) => (
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
