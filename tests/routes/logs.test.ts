import Lawg from "../../src/client/lawg";
import "dotenv/config";

const lawg = new Lawg({
  token: process.env.LAWG_TOKEN as string,
  project: "giggl",
});

const feed = process.env.LAWG_FEED as string;

describe("Logs", () => {
  test("Fetching all Feed Logs", async () => {
    const logs = await lawg.feed(feed).fetchLogs();

    expect(logs).toEqual(
      expect.objectContaining({
        success: true,
        data: expect.any(Array),
      })
    );
  });

  test("Creating a Log", async () => {
    const createLog = await lawg.feed(feed).log({
      title: "Order Shipped",
      description: "John's order has been shipped! (Order #10403)",
      emoji: "🚚",
      metadata: {
        tags: {
          "customer-id": 1234,
          "customer-email": "johnny@lawg.dev",
        },
      },
      notify: true,
    });

    expect(createLog).toEqual(
      expect.objectContaining({
        success: true,
        data: expect.any(Object),
      })
    );
  });

  test("Editing a Log", async () => {
    // TODO
  });

  test("Deleting a Log", async () => {
    // TODO
  });
});
