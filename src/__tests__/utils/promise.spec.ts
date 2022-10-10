import { clock } from "~/utils/clock";
import { promiseControl, waitFor } from "~/utils/promise";

jest.setTimeout(10000);

describe("promise control test", () => {
  test("軽い場合(厳しいチェック)", (done) => {
    const main = async () => {
      const cb = promiseControl(() => {}, {
        thresholdTime: clock({ seconds: 1 }).toMilliseconds(),
        maxRequestCount: 5,
      });

      const prevTime = Date.now();

      await Promise.all([cb(), cb(), cb(), cb(), cb()]);

      await cb();

      const currentTime = Date.now();
      const result = currentTime - prevTime;
      // 0.9 - 1.1
      expect(result).toBeGreaterThanOrEqual(1000);
      expect(result).toBeLessThan(1100);

      done();
    };

    const testing = async () => {
      const promises: Promise<void>[] = [];
      for (let i = 0; i < 50; i++) {
        promises.push(main());
      }
      await Promise.all(promises);
      done();
    };
    testing();
  });

  test("直列処理", (done) => {
    const main = async () => {
      const cb = promiseControl(() => {}, {
        thresholdTime: clock({ seconds: 1 }).toMilliseconds(),
        maxRequestCount: 1,
      });
      const prevTime = Date.now();
      await Promise.all([cb(), cb(), cb()]);
      await cb();
      const currentTime = Date.now();
      const result = currentTime - prevTime;
      expect(result).toBeGreaterThanOrEqual(2000);
      done();
    };

    const testing = async () => {
      const promises: Promise<void>[] = [];
      for (let i = 0; i < 50; i++) {
        promises.push(main());
      }
      await Promise.all(promises);
      done();
    };
    testing();
  });

  test("実際のUI呼び出し的な煩雑なテスト", (done) => {
    const main = async () => {
      const cb = promiseControl(() => {}, {
        thresholdTime: clock({ milliseconds: 500 }).toMilliseconds(),
        maxRequestCount: 5,
      });
      const promises: Promise<void>[] = [];
      const prevTime = Date.now();
      for (let i = 0; i < 11; i++) {
        await waitFor(Math.random() * 100);
        promises.push(cb());
      }
      await Promise.all(promises);
      const currentTime = Date.now();
      expect(currentTime - prevTime).toBeGreaterThanOrEqual(1000);
    };

    const testing = async () => {
      const promises: Promise<void>[] = [];
      for (let i = 0; i < 50; i++) {
        promises.push(main());
      }
      await Promise.all(promises);
      done();
    };
    testing();
  });
});
