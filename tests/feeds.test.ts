import "dotenv/config";
import Lawg from "../src/client/lawg";
import { Event as IEvent } from "../src/types/event";

const lawg = new Lawg({
  token: process.env.LAWG_TOKEN as string,
  project: process.env.LAWG_PROJECT as string,
});

const feed = process.env.LAWG_FEED as string;

describe("Events", () => {
  let createdEvent: IEvent;

  test("Creating an Event", async () => {
    const createEvent = await lawg.feed(feed).createEvent({
      title: "Order Shipped",
      description: "John's order has been shipped! (Order #10403)",
      emoji: "🚚",
      tags: {
        "customer-id": 1234,
        "customer-email": "johnny@lawg.dev",
      },
      notify: true,
    });

    expect(createEvent.raw.title).toBe("Order Shipped");
    expect(createEvent.raw.description).toBe(
      "John's order has been shipped! (Order #10403)"
    );
    expect(createEvent.raw.emoji).toBe("🚚");
    expect(createEvent.raw.metadata.tags).toStrictEqual({
      "customer-id": 1234,
      "customer-email": "johnny@lawg.dev",
    });

    createdEvent = createEvent.raw;
  });

  test("Fetching all Feed Events", async () => {
    const events = await lawg.feed(feed).fetchEvents();

    expect(events.length).toBeGreaterThanOrEqual(1);
  });

  test("Fetch event", async () => {
    const event = await lawg.feed(feed).fetchEvent(createdEvent.id);

    expect(event.raw).toStrictEqual(createdEvent);
  });

  test("Editing an Event", async () => {
    const event = await lawg.feed(feed).updateEvent({
      id: createdEvent.id,
      description: "John's order has been shipped! (Order #10405)",
    });

    expect(event.raw.description).toBe(
      "John's order has been shipped! (Order #10405)"
    );
  });

  test("Deleting an Event", async () => {
    const success = await lawg.feed(feed).deleteEvent(createdEvent.id);

    expect(success).toBe(true);
  });
});
