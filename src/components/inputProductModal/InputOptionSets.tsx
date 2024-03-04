import { FormikProps } from "formik";
import { FormikProductData, Option, OptionSet } from "../../types";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
function InputOptionSets({
  //optionSets,
  //setFormProductData,
  formik,
}: {
  //optionSets?: Partial<Array<OptionSet>> | undefined;
  //setFormProductData?: React.Dispatch<React.SetStateAction<FormikProductData>>;
  formik: FormikProps<FormikProductData>;
}) {
  //  let localOptionSets = formik.values.optionSets?.slice()
  // let tempOptionSets: OptionSet[] = [];
  /* */
  const [tempOptionSets, setTempOptionSets] = useState<Array<OptionSet>>([
    ...(formik.values.optionSets ?? []),
  ]);

  const [addOptionSetInput, setAddOptionSetInput] = useState("");
  const [addOptionInput, setAddOptionInput] = useState("");
  const addOptionSet = (optionSetName: string) => {
    setTempOptionSets((prevOptionSets) => [
      ...prevOptionSets,
      { optionSetName, options: [] },
    ]);
  };

  const addOption = (optionSetIndex: number, option: Option) => {
    setTempOptionSets((prevOptionSets) => {
      const updatedOptionSets = [...prevOptionSets];
      updatedOptionSets[optionSetIndex] = {
        ...updatedOptionSets[optionSetIndex],
        options: [...updatedOptionSets[optionSetIndex].options, option],
      };
      return updatedOptionSets;
    });
  };

  // Function to delete an OptionSet
  const deleteOptionSet = (optionSetIndex: number) => {
    setTempOptionSets((prevOptionSets) => {
      const updatedOptionSets = [...prevOptionSets];
      updatedOptionSets.splice(optionSetIndex, 1);
      return updatedOptionSets;
    });
  };

  // Function to delete an Option from a specific OptionSet
  const deleteOption = (optionSetIndex: number, optionIndex: number) => {
    setTempOptionSets((prevOptionSets) => {
      const updatedOptionSets = [...prevOptionSets];
      updatedOptionSets[optionSetIndex].options.splice(optionIndex, 1);
      return updatedOptionSets;
    });
  };

  useEffect(() => {
    formik.values.optionSets = tempOptionSets;
  }, [tempOptionSets]);

  return (
    <Flex flexDir="column" overflow="auto" maxH="50vh">
      <Flex p={2} gap={2}>
        <Input
          placeholder="Option-Set name"
          value={addOptionSetInput}
          onChange={(e) => {
            setAddOptionSetInput(e.target.value);
          }}
        ></Input>
        <Button
          colorScheme="blue"
          onClick={() => {
            if (!addOptionSetInput)
              return console.log("Please enter at least one character.");
            addOptionSet(addOptionSetInput);
            setAddOptionSetInput("");
          }}
        >
          Add Set
        </Button>
      </Flex>

      <VStack>
        {tempOptionSets.map((optionSet, index) => (
          <Flex
            flexDir="column"
            w="100%"
            key={index}
            p={2}
            borderWidth="1px"
            borderRadius="md"
          >
            {/* <Input
              placeholder="Option Set Name"
              value={optionSet.optionSetName}
              onChange={(e) => {
                const newName = e.target.value;
                setTempOptionSets((prevOptionSets) => {
                  const updatedOptionSets = [...prevOptionSets];
                  updatedOptionSets[index].optionSetName = newName;
                  return updatedOptionSets;
                });
              }}
            /> */}
            <Flex justify="space-between" m={2} p={2}>
              <Heading>{optionSet.optionSetName}</Heading>
              <Button
                colorScheme="red"
                onClick={() => {
                  deleteOptionSet(index);
                }}
              >
                Delete Set
              </Button>
            </Flex>
            <Stack flexDir="column" spacing={2} p={2} gap={2}>
              <Input
                placeholder="Option name"
                value={addOptionInput}
                onChange={(e) => {
                  setAddOptionInput(e.target.value);
                }}
              />
              <Flex gap={2} align="center">
                <Flex flexDir="row" gap={2}>
                  <Input
                    placeholder="Cost Modifier"
                    value={addOptionInput}
                    onChange={(e) => {
                      setAddOptionInput(e.target.value);
                    }}
                  />
                  <Input
                    placeholder="Price Modifier"
                    value={addOptionInput}
                    onChange={(e) => {
                      setAddOptionInput(e.target.value);
                    }}
                  />
                </Flex>
                <Button
                  size="sm"
                  colorScheme="blue"
                  onClick={() => {
                    if (addOptionInput.length < 1)
                      return console.log(
                        "Please enter at least one character."
                      );
                    addOption(index, {
                      optionItemName: addOptionInput,
                      costModifier: 0,
                      priceModifier: 0,
                    });
                    setAddOptionInput("");
                  }}
                  leftIcon={<AddIcon />}
                >
                  Add
                </Button>
              </Flex>
            </Stack>
            <Stack
              divider={<Divider />}
              flexDir="column-reverse"
              borderWidth="1px"
              borderRadius="md"
              display={optionSet.options.length === 0 ? "none" : "block"}
              p={2}
              spacing="0"
            >
              {optionSet.options.map((option, optionIndex) => (
                <Flex
                  justify="space-between"
                  align="center"
                  key={optionIndex}
                  m={1}
                  p={1}
                >
                  <Text fontSize="18px" fontWeight="600">
                    {option.optionItemName}
                  </Text>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => {
                      deleteOption(index, optionIndex);
                    }}
                  >
                    Delete Option
                  </Button>
                  {/* <Input
                  placeholder="Option Name"
                  value={option.optionItemName}
                  onChange={(e) => {
                    const newName = e.target.value;
                    setTempOptionSets((prevOptionSets) => {
                      const updatedOptionSets = [...prevOptionSets];
                      updatedOptionSets[index].options[
                        optionIndex
                      ].optionItemName = newName;
                      return updatedOptionSets;
                    });
                  }}
                /> */}
                </Flex>
              ))}
            </Stack>
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
    </Flex>
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
