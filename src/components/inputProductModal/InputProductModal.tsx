import React, { ReactNode, useState } from "react";
import { FormikProductData, ProductData } from "../../types";
import {
  Box,
  Button,
  ButtonGroup,
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
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useDisclosure,
  useSteps,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import InputImage from "./InputImage";
import InputProductDetails from "./InputProductDetails";
import InputOptionSets from "./InputOptionSets";

const steps = [
  { title: "First", description: "Image" },
  { title: "Second", description: "Details" },
  { title: "Third", description: "Options" },
];

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
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });
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
      // alert("Hallo");
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
        size="xl"
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
                <Stepper index={activeStep}>
                  {steps.map((step, index) => (
                    <Step key={index}>
                      <StepIndicator>
                        <StepStatus
                          complete={<StepIcon />}
                          incomplete={<StepNumber />}
                          active={<StepNumber />}
                        />
                      </StepIndicator>

                      <Box flexShrink="0">
                        <StepTitle>{step.title}</StepTitle>
                        <StepDescription>{step.description}</StepDescription>
                      </Box>

                      <StepSeparator />
                    </Step>
                  ))}
                </Stepper>
                {activeStep === 1 && <InputImage formik={formik} />}
                {activeStep === 2 && <InputProductDetails formik={formik} />}
                {activeStep === 3 && <InputOptionSets formik={formik} />}
              </Stack>
            </ModalBody>

            <ModalFooter>
              <ButtonGroup>
                <Button
                  variant="solid"
                  onClick={() => {
                    formik.resetForm();
                    onClose();
                  }}
                  type="button"
                >
                  Close
                </Button>

                <Button
                  // type="submit"
                  isDisabled={activeStep === 1}
                  colorScheme="blue"
                  onClick={() => {
                    setActiveStep(Math.min(Math.max(activeStep - 1, 1), 3));
                  }}
                  // isLoading={formik.isSubmitting}
                >
                  Previous
                </Button>
                <Button
                  isDisabled={activeStep === 3}
                  colorScheme="blue"
                  onClick={() => {
                    setActiveStep(Math.min(Math.max(activeStep + 1, 0), 3));
                  }}
                >
                  Next
                </Button>

                <Button
                  isDisabled={activeStep !== 3}
                  type="submit"
                  colorScheme="green"
                  isLoading={formik.isSubmitting}
                >
                  Save
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default InputProductModal;
