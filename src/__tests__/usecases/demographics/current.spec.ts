import { mockDemographics } from "~/resources/resas/mockDemographics";
import current from "~/usecases/demographics/currentDemographics";

describe("usecase test - demographics", () => {
  test("current test", (done) => {
    current({ prefCode: "1" }, { api: mockDemographics }).then((res) => {
      expect(res).toMatchSnapshot();
      done();
    });
  });
});
