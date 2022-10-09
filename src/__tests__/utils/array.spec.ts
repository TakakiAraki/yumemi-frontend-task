import { reduce } from "~/utils/array";

describe("reduce test", () => {
  test("filter map", () => {
    const value = [1, 2, 3];
    const initialValue: { val: number }[] = [];

    const result = value.reduce(
      reduce.filterMap((val) => {
        if (val === 1) return false;
        return {
          val,
        };
      }),
      initialValue,
    );
    expect(result).toMatchSnapshot();
  });
});
