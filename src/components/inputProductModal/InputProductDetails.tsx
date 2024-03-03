import {
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { FormikProps } from "formik";
import React from "react";
import { FormikProductData } from "../../types";

function InputProductDetails({
  formik,
}: {
  formik: FormikProps<FormikProductData>;
}) {
  return (
    <Flex flexDir="column">
      <Stack flexDir="column" divider={<Divider />} spacing="0" gap={2}>
        <VStack spacing={4} align="stretch">
          <Flex gap={2}>
            <FormControl
              isInvalid={
                typeof formik.errors.name === "string" && formik.touched.name
              }
            >
              <FormLabel>Product Name</FormLabel>
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                type="text"
                name="name"
                placeholder="Name"
                autoFocus
              />
              <FormErrorMessage fontFamily="sans-serif">
                {formik.errors.name}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                typeof formik.errors.category === "string" &&
                formik.touched.category
              }
            >
              <FormLabel>Category</FormLabel>
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category}
                type="text"
                name="category"
                placeholder="Category"
              />
              <FormErrorMessage>{formik.errors.category}</FormErrorMessage>
            </FormControl>
          </Flex>
        </VStack>

        <VStack spacing={4} align="stretch">
          <Flex gap={2}>
            <FormControl
              isInvalid={
                typeof formik.errors.baseCost === "string" &&
                formik.touched.baseCost
              }
            >
              <FormLabel>Cost</FormLabel>
              <InputGroup>
                <InputLeftAddon>₱</InputLeftAddon>
                <Input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.baseCost}
                  name="baseCost"
                  placeholder="Cost"
                  type="number"
                  inputMode="decimal"
                />
              </InputGroup>
              <FormErrorMessage>{formik.errors.baseCost}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                typeof formik.errors.basePrice === "string" &&
                formik.touched.basePrice
              }
            >
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <InputLeftAddon>₱</InputLeftAddon>
                <Input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.basePrice}
                  name="basePrice"
                  placeholder="Price"
                  type="number"
                  inputMode="decimal"
                />
              </InputGroup>
              <FormErrorMessage>{formik.errors.basePrice}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                typeof formik.errors.stock === "string" && formik.touched.stock
              }
            >
              <FormLabel>Stock</FormLabel>
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.stock}
                type="number"
                inputMode="decimal"
                name="stock"
                placeholder="Stock"
              />
              <FormErrorMessage>{formik.errors.stock}</FormErrorMessage>
            </FormControl>
          </Flex>
        </VStack>
      </Stack>
    </Flex>
  );
}

export default InputProductDetails;
