import React from "react";
import { Text } from "~/components/common/text/Text";
import { is } from "~/utils/Is";
import useSelectGraphLabelTitle from "../selectors/useSelectGraphLabelTitle";

export const LineTitle = () => {
  const title = useSelectGraphLabelTitle();
  if (is.null(title)) return null;
  return <Text type="text">{title}</Text>;
};
