import { clock } from "~/utils/clock";

describe("wait for test", () => {
  const exampleTime = clock({
    days: 1,
    hours: 1,
    minutes: 1,
    seconds: 1,
    milliseconds: 1,
  });

  test("to milliseconds", () => {
    expect(exampleTime.toMilliseconds()).toBe(1 + 1000 + 60000 + 3600000 + 86400000);
  });

  test("to seconds", () => {
    expect(exampleTime.toSeconds()).toBeCloseTo(0.001 + 1 + 60 + 3600 + 86400);
  });
});
