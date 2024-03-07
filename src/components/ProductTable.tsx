import { Flex, IconButton, Image, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useState } from "react";
import { KeyValuePair, ProductData, ProductDataFirebase } from "../types";
import { productDataFirebaseConvertKVToArrays } from "../helperFunctions";
import InputProductModal from "./inputProductModal/InputProductModal";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import DeleteProductButton from "./DeleteProductButton";

import "@fontsource-variable/hepta-slab";
import DropDownAccordion from "./DropDownAccordion";
import OptionSection from "./OptionSection";
function ProductTable({ products }: { products: KeyValuePair<ProductDataFirebase> | ProductData[] }) {
  const [ImageLoading, setIsImageLoading] = useState(true);
  return (
    <Flex
      flexDirection="column"
      flex={1}
      w={{
        base: "0px",
        sm: "320px",
        md: "768px",
        lg: "960px",
        xl: "1200px",
        "2xl": "1536px",
      }}
      bg="white"
      m={5}
      borderRadius={16}
    >
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th></Th>
              <Th>Product Name</Th>
              <Th>Category</Th>
              <Th isNumeric>Cost</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Available Stock</Th>
              <Th>Options</Th>
            </Tr>
          </Thead>
          <Tbody>
            {productDataFirebaseConvertKVToArrays(products as KeyValuePair<ProductDataFirebase>).map((data, key) => (
              <Tr key={data.name + key}>
                <Td>
                  <Image
                    borderRadius={16}
                    src={data.image}
                    alt={data.name}
                    onLoad={() => {
                      setIsImageLoading(false);
                    }}
                    opacity={ImageLoading ? "0" : "1"}
                    transition="opacity 1s ease"
                    objectFit="cover"
                    w={128}
                    aspectRatio={1}
                  />
                </Td>
                <Td>
                  <Flex gap={2}>
                    <InputProductModal
                      productData={data}
                      title={`Edit "${data.name}"`}
                      button={(onOpen) => (
                        <IconButton
                          onClick={onOpen}
                          borderRadius={8}
                          variant="solid"
                          colorScheme={"blue"}
                          icon={<EditIcon />}
                          aria-label="Edit"
                        />
                      )}
                    />
                    <DeleteProductButton productData={data} isIconButton leftIcon={<DeleteIcon />} size="md" />
                  </Flex>
                </Td>
                <Td>
                  <Text fontWeight="400" fontSize="18px" textTransform="capitalize">
                    {data.name}
                  </Text>
                </Td>
                <Td>
                  <Text fontWeight="400" fontSize="18px">
                    {data.category}
                  </Text>
                </Td>
                <Td isNumeric>
                  <Text fontWeight="600" fontSize="18px" fontFamily="'Hepta Slab Variable', serif">
                    ₱
                    {data.baseCost.toLocaleString("en-PH", {
                      style: "currency",
                      currency: "PHP",
                    })}
                  </Text>
                </Td>
                <Td isNumeric>
                  <Text fontWeight="600" fontSize="18px" fontFamily="'Hepta Slab Variable', serif">
                    ₱
                    {data.basePrice.toLocaleString("en-PH", {
                      style: "currency",
                      currency: "PHP",
                    })}
                  </Text>
                </Td>
                <Td isNumeric>
                  <Text fontWeight="400" fontSize="18px">
                    {data.stock}
                  </Text>
                </Td>
                <Td>
                  <DropDownAccordion isDisabled={(data.optionSets?.length ?? 0) <= 0} size="xs" title={"Options"}>
                    <OptionSection key={data.name + data.category} size="sm" optionSets={data.optionSets} />
                  </DropDownAccordion>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}

export default ProductTable;
