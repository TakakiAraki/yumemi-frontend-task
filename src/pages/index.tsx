import { GetStaticProps } from "next";
import prefectures from "~/usecases/prefectures/prefectures";
import bulkCurrentDemographics from "~/usecases/demographics/bulkCurrentDemographics";
import { IndexPage, IndexProps } from "~/components/templates";
import { clock } from "~/utils/clock";

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const result = await prefectures();
  const prefCode =
    "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47";
  const parameters = prefCode.split(",");
  const demographics = await bulkCurrentDemographics(
    parameters.map((prefCode) => ({ prefCode, cityCode: "-" })),
  );

  return {
    props: {
      prefectures: result,
      demographics: demographics,
    },
    revalidate: clock({ days: 1 }).toSeconds(),
  };
};

export default IndexPage;
