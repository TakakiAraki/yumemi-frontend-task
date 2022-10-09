import { NextApiRequest, NextApiResponse } from "next";
import { fetchDemographics } from "~/resources/resas/fetchDemographics";
import { is } from "~/utils/Is";

// https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html
// /api/v1/population/composition/perYear

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { prefCode } = req.query;
  if (is.null(prefCode) || is.array(prefCode)) {
    res.status(400).json({
      code: "Prefecture",
      message: `Prefecture not found state value[${prefCode?.toString()}]`,
    });
    return;
  }

  const { state, result } = await fetchDemographics({
    prefCode,
    cityCode: "-",
  });

  switch (state) {
    case "SUCCESS":
      res.status(200).json(result);
      break;

    case "ERROR":
      res.status(400).json(result);
      break;
  }
};
