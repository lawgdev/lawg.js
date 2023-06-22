import "dotenv/config";
import Lawg from "../../../src/client/lawg";

const lawg = new Lawg({
  token: process.env.LAWG_TOKEN,
  project: "sm",
});

const createInsight = async () => {
  await lawg.insight({
    title: "Users Joined",
    value: 250,
  });
};

createInsight();
