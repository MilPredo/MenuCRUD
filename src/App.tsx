import { ChakraProvider, Flex, extendTheme, Heading, Button } from "@chakra-ui/react";
/*
A Category
A Name
Some of them should have the ability to have options e.g. Fries - Small, Medium, Large
Price
A Cost
Amount in stock
*/
import "@fontsource-variable/quicksand";
import "@fontsource-variable/hepta-slab";
import "@fontsource/concert-one";
import SearchBar from "./components/SearchBar";
import { useGetProductList } from "./hooks/firebaseHelperHooks";
import { AddIcon } from "@chakra-ui/icons";
import InputProductModal from "./components/inputProductModal/InputProductModal";
import CardList from "./components/CardList";
import ProductTable from "./components/ProductTable";
import { useState } from "react";
const customTheme = extendTheme({
  fonts: {
    body: "''Quicksand', sans-serif'",
    heading: "'Hepta Slab Variable', serif",
  },
});

function App() {
  const { products, setSearchQuery } = useGetProductList();
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  console.log("APP", products);

  return (
    <ChakraProvider theme={customTheme}>
      <Flex flexDir={"column"} backgroundColor={"#ead9c8"} h={"100vh"} overflow="hidden">
        <Flex align="center" boxShadow="md" bg="white">
          <Flex flex={1} gap={2}>
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
            <Flex flex={1} justify="center" align="center" gap={2}>
              <InputProductModal
                title="Add Item"
                button={(onOpen) => (
                  <Button variant="outline" colorScheme="green" onClick={onOpen} leftIcon={<AddIcon />}>
                    Add Item
                  </Button>
                )}
              />
            </Flex>
            <Flex flex={1} justify="center" align="center" gap={1}>
              <Button
                variant={viewMode === "card" ? "solid" : "outline"}
                onClick={() => {
                  setViewMode("card");
                }}
                colorScheme="blue"
              >
                Card View
              </Button>
              <Button
                variant={viewMode === "list" ? "solid" : "outline"}
                onClick={() => {
                  setViewMode("list");
                }}
                colorScheme="blue"
              >
                List View
              </Button>
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
          {viewMode === "card" ? <CardList products={products} /> : <ProductTable products={products} />}
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
