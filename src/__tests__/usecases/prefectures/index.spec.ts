import { mockPrefectures } from "~/resources/resas/mockPrefectures";
import prefectures from "~/usecases/prefectures/prefectures";

describe("usecase test - demographics", () => {
  test("current test", (done) => {
    prefectures({ api: mockPrefectures }).then((res) => {
      expect(res).toMatchSnapshot();
      done();
    });
  });
});
