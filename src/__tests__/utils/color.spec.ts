import { color, stringToHashColor } from "~/utils/color";

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

  test("color convert", () => {
    expect(color("#000000").toRGBString()).toBe("#000000");
    expect(color("#FFFFFF").toRGBString().toUpperCase()).toBe("#FFFFFF");

    // R
    expect(color("#AAFFFF").toRGBString().toUpperCase()).toBe("#AAFFFF");

    // G
    expect(color("#FFAAFF").toRGBString().toUpperCase()).toBe("#FFAAFF");

    // B
    expect(color("#FFFFAA").toRGBString().toUpperCase()).toBe("#FFFFAA");
  });

  test("throws test", () => {
    expect(() => color("zzz")).toThrowErrorMatchingSnapshot();
    expect(() => color(";;;;;;;;")).toThrowErrorMatchingSnapshot();
    expect(() => color(";")).toThrowErrorMatchingSnapshot();
    expect(() => color("")).toThrowErrorMatchingSnapshot();
  });

  test("string to hash color", () => {
    expect(stringToHashColor("example1").value).toMatchSnapshot();
    expect(stringToHashColor("example2").value).toMatchSnapshot();
    expect(stringToHashColor("hoge1").value).toMatchSnapshot();
    expect(stringToHashColor("hoge2").value).toMatchSnapshot();
    expect(stringToHashColor("hoge3").value).toMatchSnapshot();
  });
});
