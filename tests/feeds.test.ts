import "dotenv/config";
import Lawg from "../src/client/lawg";
import { Event as IEvent } from "../src/types/event";
import { Log as ILog, LogLevel } from "../src/types/log";

const lawg = new Lawg({
  token: process.env.LAWG_TOKEN as string,
  project: process.env.LAWG_PROJECT as string,
});

const EVENT_FEED = process.env.EVENT_LAWG_FEED as string;
const APPLICATION_FEED = process.env.APPLICATION_LAWG_FEED as string;

describe("Events", () => {
  let createdEvent: IEvent;

  test("Creating an Event", async () => {
    const createEvent = await lawg.feed(EVENT_FEED).createEvent({
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
    const events = await lawg.feed(EVENT_FEED).fetchEvents();

    expect(events.length).toBeGreaterThanOrEqual(1);
  });

  test("Fetch event", async () => {
    const event = await lawg.feed(EVENT_FEED).fetchEvent(createdEvent.id);

    expect(event.raw).toStrictEqual(createdEvent);
  });

  test("Editing an Event", async () => {
    const event = await lawg.feed(EVENT_FEED).updateEvent({
      id: createdEvent.id,
      description: "John's order has been shipped! (Order #10405)",
    });

    expect(event.raw.description).toBe(
      "John's order has been shipped! (Order #10405)"
    );
  });

  test("Deleting an Event", async () => {
    const success = await lawg.feed(EVENT_FEED).deleteEvent(createdEvent.id);

    expect(success).toBe(true);
  });
});

describe("Logs", () => {
  let createdLog: ILog;

  test("Creating a Log", async () => {
    const createLog = await lawg.feed(APPLICATION_FEED).createLog({
      message: "Order #10403 has been shipped!",
      level: "info",
    });

    expect(createLog.raw.message).toBe("Order #10403 has been shipped!");
    expect(createLog.raw.level).toBe(LogLevel.INFO);

    createdLog = createLog.raw;
  });

  test("Fetching all Feed Logs", async () => {
    const logs = await lawg.feed(APPLICATION_FEED).fetchLogs();

    expect(logs.length).toBeGreaterThanOrEqual(1);
  });

  test("Deleting a Log", async () => {
    const success = await lawg.feed(APPLICATION_FEED).deleteLog(createdLog.id);

    expect(success).toBe(true);
  });
});
