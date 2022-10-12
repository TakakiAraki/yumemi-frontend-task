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

/**
 * このコードは、連続して同じ関数を呼び出したときに適用される制限を設定しています。
 * まず、同じ関数が連続して呼び出されたときに、その間隔が thresholdTime（ms）以上であれば、それを無視するようにしています。
 * 次に、連続して同じ関数を呼び出したときに、その総数が maxRequestCount（回）を超えた場合は、それを無視するようにしています。
 * 最後に、連続して同じ関数を呼び出したときに、その間隔が thresholdTime（ms）以上であれば、それを無視するようにしています。
 *
 * @param cb 対象となるpromise関数
 * @param options.thresholdTime 検査する時間(ms)
 * @param options.maxRequestCount 同時に実行できるカウント
 */
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

/**
 * イベントを呼び出し後、次のイベントまで指定した時間が経過するまではイベントを発生させない処理。
 * @param func
 * @param wait (ms)
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number = 500,
): ((...args: Parameters<T>) => void) => {
  let cancelToken: number;
  const callback = (...args: Parameters<T>) => {
    window.clearTimeout(cancelToken);
    cancelToken = window.setTimeout(() => {
      func(...args);
    }, wait);
  };
  return callback;
};
