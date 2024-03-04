import { FormikProps } from "formik";
import { FormikProductData, OptionSet } from "../../types";
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Text } from "@chakra-ui/react";

function InputOptionSets({
  //optionSets,
  //setFormProductData,
  formik,
}: {
  //optionSets?: Partial<Array<OptionSet>> | undefined;
  //setFormProductData?: React.Dispatch<React.SetStateAction<FormikProductData>>;
  formik: FormikProps<FormikProductData>;
}) {
  // let localOptionSets = formik.values.optionSets?.slice()
  return (
    <Flex>
      <Button onClick={() => {}}>New Set</Button>
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
                      <FormControl isInvalid={typeof (formik.errors.optionSets as unknown as (OptionSet | undefined)[])[index]?.options === "string" && formik.touched.name}>
                        {/* <FormLabel></FormLabel> */}
                        <Input
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.name}
                          type="text"
                          name="optionName"
                          placeholder="Option name"
                          autoFocus
                        />
                        <FormErrorMessage fontFamily="sans-serif">{formik.errors.name}</FormErrorMessage>
                      </FormControl>
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

export default InputOptionSets;
