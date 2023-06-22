import "dotenv/config";
import Lawg from "../../../src/client/lawg";

const lawg = new Lawg({
  token: process.env.LAWG_TOKEN,
  project: "sm",
});

const createLog = async () => {
  await lawg.feed("bug-reports").log({
    title: "hello",
    description: "just testing out lawg!",
  });
};

createLog();
