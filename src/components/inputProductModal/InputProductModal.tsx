import React, { useState } from "react";
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
import { productDataConvertArraysToKV } from "../../helperFunctions";
import { addProductToDatabase } from "../../api/firebase";
// import { addData } from "../../api/firebase";

const steps = [
  { title: "First", description: "Image" },
  { title: "Second", description: "Details" },
  { title: "Third", description: "Options" },
];

function InputProductModal({
  productData,
  title,
  button,
}: {
  productData?: ProductData;
  title: string;
  button?: (onOpen: () => void) => React.ReactElement<HTMLButtonElement>;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image, setImage] = useState<string | null>(productData?.image ?? "");
  const [imageName, setImageName] = useState<string | undefined>();
  const [formProductData, setFormProductData] = useState<FormikProductData>(
    JSON.parse(
      JSON.stringify(
        productData ?? {
          name: "",
          image: "",
          imageAlt: "",
          category: "",
          baseCost: "",
          basePrice: "",
          stock: "",
        }
      )
    )
  );
  function handleClose() {
    formik.resetForm();
    setActiveStep(1);
    setFormProductData(
      JSON.parse(
        JSON.stringify(
          productData ?? {
            name: "",
            image: "",
            imageAlt: "",
            category: "",
            baseCost: "",
            basePrice: "",
            stock: "",
          }
        )
      )
    );
    formik.setValues(
      JSON.parse(
        JSON.stringify(
          productData ?? {
            name: "",
            image: "",
            imageAlt: "",
            category: "",
            baseCost: "",
            basePrice: "",
            stock: "",
          }
        )
      )
    );
    setImage(productData?.image ?? "");
    setImageName(undefined);
    onClose();
  }
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
      alert("ahahhah");
      validateForm(values).then((errors) => {
        console.log(errors);
        alert(errors);
      });
      // alert("Hallo");
      setTimeout(() => {
        // productDataConvertArraysToKV(values as ProductData)
        addProductToDatabase(values as ProductData);
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    },
  });

  React.useEffect(() => {
    const errors = formik.errors;
    if (!formik.isValid && formik.isSubmitting) {
      alert("Your form is invalid, please check for required fields.");
      //Might remove it depending on how adding options would work.
      if (
        errors.baseCost ||
        errors.basePrice ||
        errors.category ||
        errors.name ||
        errors.stock
      )
        setActiveStep(2);
    }
  }, [formik.isSubmitting]);
  return (
    <>
      {button ? button(onOpen) : undefined}

      <Modal isCentered size="2xl" isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay backdropFilter="blur(2px)" />
        <ModalContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit(e);
            }}
          >
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
                <Flex flexDir="column" minH="300px">
                  {activeStep === 1 && (
                    <InputImage
                      newImage={image}
                      newImageName={imageName}
                      setImage={setImage}
                      setImageName={setImageName}
                      formik={formik}
                    />
                  )}
                  {activeStep === 2 && <InputProductDetails formik={formik} />}
                  {activeStep === 3 && <InputOptionSets formik={formik} />}
                </Flex>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <ButtonGroup>
                <Button variant="solid" onClick={handleClose} type="button">
                  Close
                </Button>

                <Button
                  isDisabled={activeStep === 1}
                  colorScheme="blue"
                  onClick={() => {
                    setActiveStep(Math.min(Math.max(activeStep - 1, 1), 3));
                  }}
                >
                  Previous
                </Button>
                <Button
                  isDisabled={activeStep === 3}
                  colorScheme="blue"
                  onClick={async () => {
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
