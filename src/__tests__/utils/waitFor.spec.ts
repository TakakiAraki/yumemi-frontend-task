import { waitFor } from "~/utils/promise";

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");
describe("wait for test", () => {
  test("1000ms", () => {
    waitFor(1000);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });
});
