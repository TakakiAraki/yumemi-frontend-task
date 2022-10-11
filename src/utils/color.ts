import diff from "color-diff";

// ref https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
interface Color {
  R: number; // 255
  G: number; // 255
  B: number; // 255
}
const parseColor = (str: string): Color => {
  const target = str.replace("#", "");
  switch (target.length) {
    case 8:
      return {
        R: parseInt(target[0] + target[1], 16),
        G: parseInt(target[2] + target[3], 16),
        B: parseInt(target[4] + target[5], 16),
      };
    case 6:
      return {
        R: parseInt(target[0] + target[1], 16),
        G: parseInt(target[2] + target[3], 16),
        B: parseInt(target[4] + target[5], 16),
      };
    case 3:
      return {
        R: parseInt(target[0] + target[0], 16),
        G: parseInt(target[1] + target[1], 16),
        B: parseInt(target[2] + target[2], 16),
      };
    default:
      throw new Error("変換対象のstringが不正なフォーマットです");
  }
};

/**
 * @param props
 * @returns
 */
export const color = (props: Color | string) => {
  const colorObject = typeof props === "string" ? parseColor(props) : props;
  return {
    value: colorObject,

    // 色距離が近いものを取得する
    closest: (target: Color[]) => {
      const result = diff.closest(colorObject, target);
      return color(result);
    },

    // 色距離が遠いものを取得する
    futhest: (target: Color[]) => {
      const result = diff.furthest(colorObject, target);
      return color(result);
    },

    // #FFFFFF #FFFFFFFF 形式で出力する
    toRGBString: () => {
      const fillZero = (str: string) => ("00" + str).slice(-2);
      return (
        "#" +
        fillZero(colorObject.R.toString(16)) +
        fillZero(colorObject.G.toString(16)) +
        fillZero(colorObject.B.toString(16))
      );
    },
  };
};
export type TColor = typeof color;
export const BLACK: Color = color("#000000").value;
export const WHITE: Color = color("#FFFFFF").value;

/**
 * 文字列を色に直すメソッド
 * @param str ハッシュ化させる文字列
 * @returns RGBの値
 */
export const stringToHashColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c: number[] = [];
  for (let i = 0; i < 4; i++) {
    const value = (hash >> (i * 8)) & 0xdf;
    c.push(value);
  }

  return color({
    R: c[0],
    G: c[1],
    B: c[2],
  });
};
