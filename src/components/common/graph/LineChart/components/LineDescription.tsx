import React from "react";
import { Text } from "~/components/common/text/Text";
import { is } from "~/utils/Is";
import useSelectGraphLabelDescription from "../selectors/useSelectGraphLabelDescription";

export const LineDescription = () => {
  const description = useSelectGraphLabelDescription();
  if (is.null(description)) return null;
  return <Text type="mini">{description}</Text>;
};
