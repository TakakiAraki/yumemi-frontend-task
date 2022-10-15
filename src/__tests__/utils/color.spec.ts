import { color } from "~/utils/color";

describe("wait for test", () => {
  const black = color({
    R: 0,
    G: 0,
    B: 0,
  });
  const gray = color({
    R: 20,
    G: 20,
    B: 20,
  });
  const white = color({
    R: 255,
    G: 255,
    B: 255,
  });

  test("color output test", () => {
    expect(black.toRGBString()).toBe("#000000");
  });
  test("closest test", () => {
    expect(black.closest([gray.value, white.value]).value).toMatchObject(gray.value);
  });

  test("closest test", () => {
    expect(black.futhest([gray.value, white.value]).value).toMatchObject(white.value);
  });
});
