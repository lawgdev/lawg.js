import Lawg from "../src/client/lawg";
import "dotenv/config";

const lawg = new Lawg({
  token: process.env.LAWG_TOKEN as string,
  project: "giggl",
});

const feed = process.env.LAWG_FEED as string;

describe("Events", () => {
  test("Fetching all Feed Events", async () => {
    const logs = await lawg.feed(feed).fetchEvents();

    expect(logs).toEqual(
      expect.objectContaining({
        success: true,
        data: expect.any(Array),
      })
    );
  });

  test("Creating a Event", async () => {
    const createEvent = await lawg.feed(feed).event({
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

    expect(createEvent).toEqual(
      expect.objectContaining({
        success: true,
        data: expect.any(Object),
      })
    );
  });

  test("Editing a Event", async () => {
    // TODO
  });

  test("Deleting a Event", async () => {
    // TODO
  });
});
