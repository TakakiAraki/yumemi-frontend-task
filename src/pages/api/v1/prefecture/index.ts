import { NextApiRequest, NextApiResponse } from "next";
import { is } from "~/utils/Is";
import bulkCurrentDemographics from "~/usecases/demographics/bulkCurrentDemographics";

// https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html
// /api/v1/population/composition/perYear

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { prefCode } = req.query;
  if (is.null(prefCode)) {
    res.status(400).json({
      code: "Prefecture",
      message: `Prefecture not found state value`,
    });
    return;
  }

  const parameters = is.array(prefCode) ? prefCode : prefCode.split(",");

  const result = await bulkCurrentDemographics(
    parameters.map((prefCode) => ({ prefCode, cityCode: "-" })),
  );
  res.status(200).json(result);
};
