import { Box, Divider, Flex, Heading, ResponsiveValue, Stack, Tag, Tooltip } from "@chakra-ui/react";
import { OptionSet } from "../types";

function OptionSection({
  size,
  optionSets,
}: {
  size?: ResponsiveValue<string> | undefined;
  optionSets: Array<OptionSet> | undefined;
}) {
  return (
    <Stack key={Math.random()} divider={<Divider />} pb={2} flexDir={"column"}> 
      {optionSets && optionSets.map((optionSet, index) => {
        return (
          <Flex flexDir="column" key={optionSet?.optionSetName ?? "" + index}>
            <Heading size={size} mb={1}>
              {optionSet?.optionSetName}
            </Heading>
            <Flex px={1} flexWrap={"wrap"} gap={1}>
              {optionSet?.options.map((option, index2) => {
                let toolTipText = [];
                let costText = "";
                if (option.costModifier !== 0) {
                  costText = `Cost +₱${option.costModifier}`;
                  toolTipText.push(costText);
                }
                let priceText = "";
                if (option.priceModifier !== 0) {
                  priceText = `Price +₱${option.priceModifier}`;
                  toolTipText.push(priceText);
                }

                return (
                  <Box key={option?.optionItemName ?? "" + index2}>
                    {toolTipText.length !== 0 ? (
                      <Tooltip hasArrow label={toolTipText.join(" | ")}>
                        <Tag>{option.optionItemName}</Tag>
                      </Tooltip>
                    ) : (
                      <Tag>{option.optionItemName}</Tag>
                    )}
                  </Box>
                );
              })}
            </Flex>
          </Flex>
        );
      })}
    </Stack>
  );
}

export default OptionSection;
