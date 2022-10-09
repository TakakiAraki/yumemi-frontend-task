import { DemographicsRepository } from "~/usecases/demographics/interface";
import mock from "./demographics.json";

export const mockDemographics: DemographicsRepository = async (_) => {
  // TODO: テストケースを記述する際はMockを増やしprefCodeなどを利用する
  return await {
    state: "SUCCESS",
    result: mock,
  };
};
