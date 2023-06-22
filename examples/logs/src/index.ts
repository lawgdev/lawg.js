import Lawg from "../../../src/client/Lawg";

const lawg = new Lawg({
  token: process.env.LAWG_TOKEN,
  project: "sm",
});

const createLog1stOption = async () => {
  // 1st Option
  await lawg.create({
    feed: "bug-reports",
    title: "Test Log",
    description: "Hi! I'm testing logs.",
  });
};

const createLog2ndOption = async () => {
  // 2nd Option
  await lawg.feed("bug-reports").create({
    title: "Test Log",
    description: "Hi! I'm testing logs.",
  });
};

createLog1stOption();
createLog2ndOption();
