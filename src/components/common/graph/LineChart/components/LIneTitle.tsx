import React from "react";
import { Text } from "~/components/common/text/Text";
import useSelectGraphLabelTitle from "../selectors/useSelectGraphLabelTitle";

export const LineGraphTagList = () => {
  const title = useSelectGraphLabelTitle();
  return <Text type="heading-2">{title}</Text>;
};
