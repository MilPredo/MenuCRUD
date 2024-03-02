import React, { ReactNode, useRef, useState } from "react";
import { ProductData } from "../types";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { FormikProps, useFormik } from "formik";

type FormikProductData = Omit<ProductData, "baseCost" | "basePrice" | "stock"> & {
  baseCost: string | number;
  basePrice: string | number;
  stock: string | number;
};

function InputOptionSet({
  //optionSets,
  //setFormProductData,
  formik,
}: {
  //optionSets?: Partial<Array<OptionSet>> | undefined;
  //setFormProductData?: React.Dispatch<React.SetStateAction<FormikProductData>>;
  formik: FormikProps<FormikProductData>;
}) {
  return (
    <Flex>
      <Button>New Set</Button>
      {formik.values.optionSets &&
        formik.values.optionSets.map((optionSet, index) => {
          return (
            <Flex flexDir="column" key={index} w="150px" h="150px">
              <Heading size="md">{optionSet && optionSet.optionSetName}</Heading>
              <Button>New Option</Button>
              {optionSet &&
                optionSet.options.map((option, index2) => {
                  return (
                    <Flex key={index2}>
                      <Text>{option.optionItemName}</Text>
                      <Text>Cost +{option.costModifier}</Text>
                      <Text>Price +{option.priceModifier}</Text>
                    </Flex>
                  );
                })}
            </Flex>
          );
        })}
      <Heading></Heading>
    </Flex>
  );
}

function InputProductModal({
  productData,
  title,
  children,
  colorScheme,
  borderRadius,
  rightIcon,
  leftIcon,
}: {
  productData?: ProductData;
  title: string;
  children: ReactNode;
  colorScheme?: string;
  borderRadius?: number | string;
  rightIcon?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
  leftIcon?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<string | null>(productData?.image ?? null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [formProductData, setFormProductData] = useState<FormikProductData>(
    productData ?? {
      name: "",
      image: "",
      imageAlt: "",
      category: "",
      baseCost: "",
      basePrice: "",
      stock: "",
    }
  );
  setFormProductData; //lol
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };

    if (file) {
      setSelectedFileName(file.name);
      reader.readAsDataURL(file);
    }
  };

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleBoxClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    category: Yup.string().required("Category is required"),
    baseCost: Yup.number().required("Base Cost is required"),
    basePrice: Yup.number().required("Base Price is required"),
    stock: Yup.number().required("Stock is required"),
    // Validation for optional fields
    image: Yup.string(),
    imageAlt: Yup.string(),
    optionSets: Yup.array().of(
      Yup.object().shape({
        optionSetName: Yup.string().required("Option Set Name is required"),
        options: Yup.array().of(
          Yup.object().shape({
            optionItemName: Yup.string().required("Option Item Name is required"),
            costModifier: Yup.number().required("Cost Modifier is required"),
            priceModifier: Yup.number().required("Price Modifier is required"),
            minQuantity: Yup.number(),
            maxQuantity: Yup.number(),
          })
        ),
        minOptions: Yup.number(),
        maxOptions: Yup.number(),
        defaultOption: Yup.array().of(Yup.number()),
      })
    ),
  });
  const formik = useFormik<FormikProductData>({
    initialValues: formProductData,
    validationSchema: validationSchema,
    onSubmit: (values, { validateForm, setSubmitting }) => {
      validateForm(values).then((errors) => {
        console.log(errors);
      });
      alert("Hallo");
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    },
    validateOnMount: true,
  });
  return (
    <>
      <Button
        onClick={onOpen}
        borderRadius={borderRadius ?? 8}
        rightIcon={rightIcon}
        leftIcon={leftIcon}
        variant="solid"
        colorScheme={colorScheme ?? "blue"}
      >
        {children}
      </Button>
      <Modal
        size="6xl"
        isOpen={isOpen}
        onClose={() => {
          setSelectedImage(productData?.image ?? null);
          setSelectedFileName(null);
          formik.resetForm();
          onClose();
        }}
      >
        <ModalOverlay backdropFilter="blur(2px)" />
        <ModalContent>
          <form onSubmit={formik.handleSubmit}>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack divider={<Divider orientation="vertical" />} spacing="0" gap={4}>
                <Flex align="center" gap={8}>
                  <Box
                    backgroundImage={selectedImage ?? undefined}
                    backgroundSize="cover"
                    backgroundPosition="center"
                    as="button"
                    onClick={handleBoxClick}
                    boxSize="300px"
                    borderRadius="lg"
                    borderWidth="4px"
                    borderColor="GrayText"
                    type="button"
                  >
                    <Box bg="rgba(255,255,255,0.6)" backdropFilter={"blur(4px)"} borderRadius="lg">
                      <Text fontWeight="bold" fontSize="medium">
                        Click here to upload image
                      </Text>
                      <Text fontWeight="bold" fontSize="medium">
                        Recommended resolution: 300x300
                      </Text>
                      {selectedFileName && (
                        <Text fontWeight="bold" fontSize="medium">
                          Selected file: {selectedFileName}
                        </Text>
                      )}
                    </Box>
                  </Box>
                  <Input
                    ref={inputFileRef}
                    type="file"
                    onChange={handleImageChange}
                    // onChange={(e) => {
                    //   e.preventDefault();
                    // }}
                    accept="image/*"
                    display="none"
                  />
                  <Stack flexDir="column" divider={<Divider />} spacing="0" gap={2}>
                    <VStack spacing={4} align="stretch">
                      <Flex gap={2}>
                        <FormControl isInvalid={typeof formik.errors.name === "string" && formik.touched.name}>
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
                          <FormErrorMessage fontFamily="sans-serif">{formik.errors.name}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={typeof formik.errors.category === "string" && formik.touched.category}>
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
                        <FormControl isInvalid={typeof formik.errors.baseCost === "string" && formik.touched.baseCost}>
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
                          isInvalid={typeof formik.errors.basePrice === "string" && formik.touched.basePrice}
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
                        <FormControl isInvalid={typeof formik.errors.stock === "string" && formik.touched.stock}>
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
                <InputOptionSet formik={formik} />
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button
                variant="solid"
                mr={3}
                onClick={() => {
                  setSelectedImage(productData?.image ?? null);
                  setSelectedFileName(null);
                  formik.resetForm();
                  onClose();
                }}
                type="button"
              >
                Close
              </Button>
              <Button type="submit" colorScheme="green" variant="solid" isLoading={formik.isSubmitting}>
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default InputProductModal;
