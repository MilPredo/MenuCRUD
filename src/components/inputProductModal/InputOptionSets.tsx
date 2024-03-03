import { FormikProps } from "formik";
import { FormikProductData } from "../../types";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";

function InputOptionSets({
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
              <Heading size="md">
                {optionSet && optionSet.optionSetName}
              </Heading>
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

export default InputOptionSets;
