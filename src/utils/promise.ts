import { clock } from "./clock";
import { is } from "./Is";

/**
 * @param time - 待ち時間 ms
 * @returns
 */
export const waitFor = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

interface PromiseControlOptions {
  thresholdTime?: number;
  maxRequestCount?: number;
}
export const promiseControl = <Callback extends (...args: any[]) => any>(
  cb: Callback,
  options?: PromiseControlOptions,
) => {
  const thresholdTime = options?.thresholdTime ?? clock({ seconds: 1 }).toMilliseconds();
  const maxRequestCount = options?.maxRequestCount ?? 5;
  let counts: number[] = [];

  const result = async (...args: Parameters<Callback>): Promise<ReturnType<Callback>> => {
    const currentTime = Date.now();

    // thresholdTime秒以上経過したものは除外
    counts = counts.filter((val) => currentTime - val <= thresholdTime);

    // wait time を maxRequestCount個数前から算出する
    const targetTime = counts[counts.length - maxRequestCount];
    const waitTime = is.null(targetTime)
      ? 0
      : Math.max(thresholdTime - (currentTime - targetTime), 0);
    counts.push(Date.now() + waitTime);
    await waitFor(waitTime);
    return cb(...args);
  };

  return result;
};
