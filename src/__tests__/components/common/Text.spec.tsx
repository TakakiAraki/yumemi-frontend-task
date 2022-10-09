import React from "react";
import { Text } from "~/components/common/text/Text";
import { render } from "@testing-library/react";

describe("Textコンポーネント", () => {
  test("should first", () => {
    const { getByText } = render(<Text>example</Text>);
    expect(getByText("example")).toBeTruthy();
  });
});
