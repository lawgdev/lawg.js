import type { NextApiRequest, NextApiResponse } from "next";
import Lawg from "../../../../src/client/lawg";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const lawg = new Lawg({
    ua: req.headers["user-agent"],
    token: process.env.LAWG_TOKEN as string,
    project: "sm",
  });

  await lawg.feed("bug-reports").log({
    title: "Hello from Next.js",
    description: "User Agents with Next.js :)",
  });

  res.status(200).send("Success!");
}
