import React, { ReactNode, useState } from "react";
import { FormikProductData, ProductData } from "../../types";
import {
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import InputImage from "./InputImage";
import InputProductDetails from "./InputProductDetails";
import InputOptionSets from "./InputOptionSets";

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
  rightIcon?:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | undefined;
  leftIcon?:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | undefined;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
            optionItemName: Yup.string().required(
              "Option Item Name is required"
            ),
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
        size="sm"
      >
        {children}
      </Button>
      <Modal
        size="6xl"
        isOpen={isOpen}
        onClose={() => {
          // setSelectedImage(productData?.image ?? null);
          // setSelectedFileName(null);
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
              <Stack
                divider={<Divider orientation="vertical" />}
                spacing="0"
                gap={4}
              >
                <Flex align="center" gap={8}>
                  <InputImage formik={formik} />
                  <InputProductDetails formik={formik} />
                </Flex>
                <InputOptionSets formik={formik} />
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button
                variant="solid"
                mr={3}
                onClick={() => {
                  // setSelectedImage(productData?.image ?? null);
                  // setSelectedFileName(null);
                  formik.resetForm();
                  onClose();
                }}
                type="button"
              >
                Close
              </Button>
              <Button
                type="submit"
                colorScheme="green"
                variant="solid"
                isLoading={formik.isSubmitting}
              >
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
