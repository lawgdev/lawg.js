import Lawg from "../src/client/lawg";
import "dotenv/config";

const lawg = new Lawg({
  token: process.env.LAWG_TOKEN as string,
  project: process.env.LAWG_PROJECT as string,
});

describe("Insights", () => {
  test("Creating a Insight", async () => {
    const insight = await lawg.insight({
      title: "Users Joined",
      value: 250,
    });

    expect(insight).toEqual(
      expect.objectContaining({
        success: true,
        data: expect.any(Object),
      })
    );
  });

  test("Setting a Insight's Value", async () => {
    // TODO
  });

  test("Incrementing a Insight", async () => {
    // TODO
  });
});
