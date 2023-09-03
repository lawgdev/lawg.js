import { z } from "zod";
import { Id } from "../types";
import { Event as IEvent } from "../types/event";
import { Log as ILog } from "../types/log";
import { createEventSchema, patchEventSchema } from "../utils/schemas/event";
import { createLogSchema } from "../utils/schemas/log";
import { Base } from "./base";
import { Events } from "./events";
import Lawg from "./lawg";
import { Logs } from "./logs";

export default class Feed extends Base {
  private readonly feedName: string;

  constructor(client: Lawg, feedName: string) {
    super(client);
    this.feedName = feedName;
  }

  public async fetchEvents() {
    const { success, data, error } = await this.client.rest<IEvent[]>(
      "get",
      `/projects/${this.client.project}/feeds/${this.feedName}/events`
    );

    if (!success || !data) {
      throw new Error(`Failed to fetch events ${error?.message}`);
    }

    return data?.map((event) =>
      Events.from({ ...event, client: this.client, feedName: this.feedName })
    );
  }

  public async fetchEvent(id: Id<"event">) {
    const { success, data, error } = await this.client.rest<IEvent>(
      "get",
      `/projects/${this.client.project}/feeds/${this.feedName}/events/${id}`
    );

    if (!success || !data) {
      throw new Error(`Failed to fetch event ${error?.message}`);
    }

    return Events.from({
      ...data,
      client: this.client,
      feedName: this.feedName,
    });
  }

  public async createEvent(event: z.infer<typeof createEventSchema>) {
    const { success, data, error } = await this.client.rest<IEvent>(
      "post",
      `/projects/${this.client.project}/feeds/${this.feedName}/events`,
      event
    );

    if (!success || !data) {
      throw new Error(`Failed to create event ${error?.message}`);
    }

    return Events.from({
      ...data,
      client: this.client,
      feedName: this.feedName,
    });
  }

  public async updateEvent(
    event: z.infer<typeof patchEventSchema> & { id: Id<"event"> }
  ) {
    const { success, data, error } = await this.client.rest<IEvent>(
      "patch",
      `/projects/${this.client.project}/feeds/${this.feedName}/events/${event.id}`,
      event
    );

    if (!success || !data) {
      throw new Error(`Failed to update event ${error?.message}`);
    }

    return Events.from({
      ...data,
      client: this.client,
      feedName: this.feedName,
    });
  }

  public async deleteEvent(id: Id<"event">): Promise<boolean> {
    const { success, error } = await this.client.rest(
      "delete",
      `/projects/${this.client.project}/feeds/${this.feedName}/events/${id}`
    );

    if (!success) {
      throw new Error(`Failed to delete event ${error?.message}`);
    }

    return true;
  }

  public async createLog(log: z.infer<typeof createLogSchema>) {
    const { success, data, error } = await this.client.rest<ILog>(
      "post",
      `/projects/${this.client.project}/feeds/${this.feedName}/logs`,
      log
    );

    if (!success || !data) {
      throw new Error(`Failed to create log ${error?.message}`);
    }

    return Logs.from({ ...data, client: this.client, feedName: this.feedName });
  }

  public async fetchLogs() {
    const { success, data, error } = await this.client.rest<ILog[]>(
      "get",
      `/projects/${this.client.project}/feeds/${this.feedName}/logs`
    );

    if (!success || !data) {
      throw new Error(`Failed to fetch logs ${error?.message}`);
    }

    return data?.map((log) =>
      Logs.from({ ...log, client: this.client, feedName: this.feedName })
    );
  }

  public async deleteLog(id: Id<"log">): Promise<boolean> {
    const { success, error } = await this.client.rest(
      "delete",
      `/projects/${this.client.project}/feeds/${this.feedName}/logs/${id}`
    );

    if (!success) {
      throw new Error(`Failed to delete log ${error?.message}`);
    }

    return true;
  }
}
