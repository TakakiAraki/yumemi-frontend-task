import { NextApiRequest, NextApiResponse } from "next";
import { fetchPrefectures } from "resources/resas/fetchPrefectures";

// https://opendata.resas-portal.go.jp
// /api/v1/prefectures

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const { state, result } = await fetchPrefectures();

  switch (state) {
    case "SUCCESS":
      res.status(200).json(result);
      break;

    case "ERROR":
      res.status(400).json(result);
      break;
  }
};
