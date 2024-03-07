import { Flex, Grid, GridItem } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { KeyValuePair, ProductData, ProductDataFirebase } from "../types";
import { productDataFirebaseConvertKVToArrays } from "../helperFunctions";

function CardList({ products }: { products: KeyValuePair<ProductDataFirebase> | ProductData[] }) {
  return (
    <Grid
      w={{
        base: "0px",
        sm: "320px",
        md: "768px",
        lg: "960px",
        xl: "1200px",
        "2xl": "1536px",
      }}
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(1, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
        xl: "repeat(5, 1fr)",
        "2xl": "repeat(5, 1fr)",
      }}
      rowGap={2}
      columnGap={4}
      p={4}
    >
      {productDataFirebaseConvertKVToArrays(products as KeyValuePair<ProductDataFirebase>).map((data, key) => (
        <GridItem key={data.name + key} flexDir={"column"}>
          <Flex flexDir="column" align="center" h="100%">
            <ProductCard productData={data} />
          </Flex>
        </GridItem>
      ))}
    </Grid>
  );
}

export default CardList;
