import { FormikProps } from "formik";
import { FormikProductData, Option, OptionSet } from "../../types";
import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
function InputOptionSets({
  formik,
}: {
  formik: FormikProps<FormikProductData>;
}) {
  const [tempOptionSets, setTempOptionSets] = useState<Array<OptionSet>>([
    ...(formik.values.optionSets ?? []),
  ]);
  const [addOptionSetInput, setAddOptionSetInput] = useState("");
  const addOptionSet = (optionSetName: string) => {
    setTempOptionSets((prevOptionSets) => [
      ...prevOptionSets,
      { optionSetName, options: [] },
    ]);
  };

  const addOption = (optionSetIndex: number, option: Option) => {
    // if (tempOptionSets[optionSetIndex].options.some(option => option.optionItemName === option.optionItemName)) return alert("Option name already exists.")
    for (const val of tempOptionSets[optionSetIndex].options) {
      if (val.optionItemName === option.optionItemName) {
        alert("Option name already exists.");
        return; // Exit the function if the condition is met
      }
    }
    const updatedOptionSets = [...tempOptionSets];
    const costModifier =
      typeof option.costModifier === "string" ? 0 : option.costModifier;
    const priceModifier =
      typeof option.priceModifier === "string" ? 0 : option.priceModifier;
    updatedOptionSets[optionSetIndex] = {
      ...updatedOptionSets[optionSetIndex],
      options: [
        ...updatedOptionSets[optionSetIndex].options,
        { ...option, costModifier, priceModifier },
      ],
    };
    setTempOptionSets(updatedOptionSets);
  };

  const deleteOptionSet = (optionSetIndex: number) => {
    const updatedOptionSets = [...tempOptionSets];
    updatedOptionSets.splice(optionSetIndex, 1);
    setTempOptionSets(updatedOptionSets);
  };

  const deleteOption = (optionSetIndex: number, optionIndex: number) => {
    const updatedOptionSets = [...tempOptionSets];
    updatedOptionSets[optionSetIndex].options.splice(optionIndex, 1);
    setTempOptionSets(updatedOptionSets);
  };

  useEffect(() => {
    formik.values.optionSets = tempOptionSets;
  }, [tempOptionSets]);

  function AddOptionInput({ optionSetIndex }: { optionSetIndex: number }) {
    const [addOptionInput, setAddOptionInput] = useState("");
    const [addOptionCostInput, setAddOptionCostInput] = useState<number | "">(
      0
    );
    const [addOptionPriceInput, setAddOptionPriceInput] = useState<number | "">(
      0
    );
    return (
      <Stack
        flexDir="column"
        spacing={2}
        p={2}
        gap={2}
        borderWidth="1px"
        borderRadius="md"
      >
        <Flex gap={2} align="center">
          <FormControl>
            <FormLabel>Option name</FormLabel>
            <Flex align="center" gap={2}>
              <Input
                placeholder="Option name"
                value={addOptionInput}
                onChange={(e) => {
                  setAddOptionInput(e.target.value);
                }}
              />
              <IconButton
                colorScheme="green"
                onClick={() => {
                  if (addOptionInput.length < 1)
                    return console.log("Please enter at least one character.");
                  addOption(optionSetIndex, {
                    optionItemName: addOptionInput,
                    costModifier:
                      typeof addOptionCostInput === "string"
                        ? 0
                        : addOptionCostInput,
                    priceModifier:
                      typeof addOptionPriceInput === "string"
                        ? 0
                        : addOptionPriceInput,
                  });
                  setAddOptionInput("");
                }}
                aria-label="Add option"
                icon={<AddIcon />}
              />
            </Flex>
          </FormControl>
        </Flex>
        <Flex gap={2} align="center">
          <FormControl>
            <FormLabel>Cost Modifier</FormLabel>
            <InputGroup>
              <InputLeftAddon>₱</InputLeftAddon>
              <NumberInput
                value={addOptionCostInput}
                name={
                  tempOptionSets[optionSetIndex].optionSetName + "-option-input"
                }
                onChange={(_, val) => {
                  setAddOptionCostInput(isNaN(val) ? "" : val);
                }}
                min={0}
                defaultValue={0}
                precision={2}
                step={0.1}
              >
                <NumberInputField borderStartRadius={0} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>
          </FormControl>

          {/* <Input
              placeholder="Cost Modifier"
              value={addOptionInput}
              onChange={(e) => {
                setAddOptionCostInput(e.target.valueAsNumber);
              }}
            /> */}
          <FormControl>
            <FormLabel>Price Modifier</FormLabel>
            <InputGroup>
              <InputLeftAddon>₱</InputLeftAddon>
              <NumberInput
                value={addOptionPriceInput}
                onChange={(_, val) => {
                  // isNaN(val)
                  setAddOptionPriceInput(isNaN(val) ? "" : val);
                }}
                min={0}
                defaultValue={0}
                precision={2}
                step={0.1}
              >
                <NumberInputField borderStartRadius={0} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>
          </FormControl>
        </Flex>
      </Stack>
    );
  }

  return (
    <Stack
      flexDir="column"
      divider={<Divider />}
      overflowY="auto"
      overflowX="hidden"
      maxH="60vh"
      p={4}
      gap={2}
    >
      <FormControl>
        <FormLabel>Option-set name</FormLabel>
        <Flex gap={2} align="center">
          <Input
            name="option-set-input"
            placeholder="Option-set name"
            value={addOptionSetInput}
            onChange={(e) => {
              setAddOptionSetInput(e.target.value);
            }}
          />
          <IconButton
            colorScheme="green"
            onClick={() => {
              if (!addOptionSetInput)
                return alert("Please enter at least one character.");
              addOptionSet(addOptionSetInput);
              setAddOptionSetInput("");
            }}
            aria-label="Add option set"
            icon={<AddIcon />}
          />
        </Flex>
      </FormControl>

      <VStack flexDir="column-reverse" overflow={"visible"} gap={8}>
        {tempOptionSets.map((optionSet, index) => (
          <Flex
            flexDir="column"
            w="100%"
            key={index}
            p={2}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md"
            gap={2}
          >
            <Flex align="center" gap={2} m={2} p={2}>
              <IconButton
                size="sm"
                variant="outline"
                onClick={() => {
                  deleteOptionSet(index);
                }}
                aria-label="Delete option set"
                icon={<DeleteIcon />}
              />
              <Heading isTruncated fontSize="24px">
                {optionSet.optionSetName}
              </Heading>
            </Flex>
            <AddOptionInput optionSetIndex={index} />
            <Flex
              borderWidth="1px"
              borderRadius="md"
              display={optionSet.options.length === 0 ? "none" : "block"}
              p={2}
            >
              <TableContainer>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Option</Th>
                      <Th isNumeric>Cost</Th>
                      <Th isNumeric>Price</Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {optionSet.options
                      .map((option, optionIndex) => (
                        <Tr key={optionIndex} m={1} p={1}>
                          <Td>
                            <Text isTruncated fontSize="14px" fontWeight="600">
                              {option.optionItemName}
                            </Text>
                          </Td>
                          <Td isNumeric>
                            <Text isTruncated fontSize="14px" fontWeight="600">
                              +
                              {option.costModifier.toLocaleString("en-PH", {
                                style: "currency",
                                currency: "PHP",
                              })}
                            </Text>
                          </Td>
                          <Td isNumeric>
                            <Text isTruncated fontSize="14px" fontWeight="600">
                              +
                              {option.priceModifier.toLocaleString("en-PH", {
                                style: "currency",
                                currency: "PHP",
                              })}
                            </Text>
                          </Td>
                          <Td textAlign="center">
                            <Button
                              size="sm"
                              colorScheme="red"
                              onClick={() => {
                                deleteOption(
                                  index,
                                  optionIndex //optionSet.options.findIndex((option) => option.optionItemName === option.optionItemName)
                                );
                              }}
                            >
                              <DeleteIcon />
                            </Button>
                          </Td>
                        </Tr>
                      ))
                      .reverse()}
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
          </Flex>
        ))}
        {/* <FormControl
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
          <Button>asd</Button>
          <FormErrorMessage fontFamily="sans-serif">
            {formik.errors.name}
          </FormErrorMessage>
        </FormControl> */}
      </VStack>
    </Stack>
  );
  // return (
  //   <Flex>
  //     <Button onClick={() => {}}>New Set</Button>
  //     {formik.values.optionSets &&
  //       formik.values.optionSets.map((optionSet, index) => {
  //         return (
  //           <Flex flexDir="column" key={index} w="150px" h="150px">
  //             <Heading size="md">{optionSet && optionSet.optionSetName}</Heading>
  //             <Button>New Option</Button>
  //             {optionSet &&
  //               optionSet.options.map((option, index2) => {
  //                 return (
  //                   <Flex key={index2}>
  //                     <Text>{option.optionItemName}</Text>
  //                     <FormControl isInvalid={typeof (formik.errors.optionSets as unknown as (OptionSet | undefined)[])[index]?.options === "string" && formik.touched.name}>
  //                       <Input
  //                         onChange={formik.handleChange}
  //                         onBlur={formik.handleBlur}
  //                         value={formik.values.name}
  //                         type="text"
  //                         name="optionName"
  //                         placeholder="Option name"
  //                         autoFocus
  //                       />
  //                       <FormErrorMessage fontFamily="sans-serif">{formik.errors.name}</FormErrorMessage>
  //                     </FormControl>
  //                     <Text>Cost +{option.costModifier}</Text>
  //                     <Text>Price +{option.priceModifier}</Text>
  //                   </Flex>
  //                 );
  //               })}
  //           </Flex>
  //         );
  //       })}
  //   </Flex>
  // );
}

export default InputOptionSets;
