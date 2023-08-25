import { z } from "zod";
import { Id } from "../types";
import { Event as IEvent } from "../types/event";
import { Log as ILog } from "../types/log";
import { createEventSchema, patchEventSchema } from "../utils/schemas/event";
import { createLogSchema } from "../utils/schemas/log";
import { Base } from "./base";
import { Event } from "./event";
import Lawg from "./lawg";
import { Log } from "./log";

export default class Feed extends Base {
  private readonly feedName: string;

  constructor(client: Lawg, feedName: string) {
    super(client);
    this.feedName = feedName;
  }

  public async fetchEvents(): Promise<Event[]> {
    const { success, data, error } = await this.client.rest<IEvent[]>(
      "get",
      `/projects/${this.client.project}/feeds/${this.feedName}/events`
    );

    if (!success || !data) {
      throw new Error(`Failed to fetch events ${error?.message}`);
    }

    return data?.map((event) => new Event(this.client, this.feedName, event));
  }

  public async fetchEvent(id: Id<"event">): Promise<Event> {
    const { success, data, error } = await this.client.rest<IEvent>(
      "get",
      `/projects/${this.client.project}/feeds/${this.feedName}/events/${id}`
    );

    if (!success || !data) {
      throw new Error(`Failed to fetch event ${error?.message}`);
    }

    return new Event(this.client, this.feedName, data);
  }

  public async createEvent(
    event: z.infer<typeof createEventSchema>
  ): Promise<Event> {
    const { success, data, error } = await this.client.rest<IEvent>(
      "post",
      `/projects/${this.client.project}/feeds/${this.feedName}/events`,
      event
    );

    if (!success || !data) {
      throw new Error(`Failed to create event ${error?.message}`);
    }

    return new Event(this.client, this.feedName, data);
  }

  public async updateEvent(
    event: z.infer<typeof patchEventSchema> & { id: Id<"event"> }
  ): Promise<Event> {
    const { success, data, error } = await this.client.rest<IEvent>(
      "patch",
      `/projects/${this.client.project}/feeds/${this.feedName}/events/${event.id}`,
      event
    );

    if (!success || !data) {
      throw new Error(`Failed to update event ${error?.message}`);
    }

    return new Event(this.client, this.feedName, data);
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

  public async createLog(log: z.infer<typeof createLogSchema>): Promise<Log> {
    const { success, data, error } = await this.client.rest<ILog>(
      "post",
      `/projects/${this.client.project}/feeds/${this.feedName}/logs`,
      log
    );

    if (!success || !data) {
      throw new Error(`Failed to create log ${error?.message}`);
    }

    return new Log(this.client, this.feedName, data);
  }

  public async fetchLogs(): Promise<Log[]> {
    const { success, data, error } = await this.client.rest<ILog[]>(
      "get",
      `/projects/${this.client.project}/feeds/${this.feedName}/logs`
    );

    if (!success || !data) {
      throw new Error(`Failed to fetch logs ${error?.message}`);
    }

    return data?.map((log) => new Log(this.client, this.feedName, log));
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
