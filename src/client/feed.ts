import { z } from "zod";
import { Id } from "../types";
import { Event as IEvent } from "../types/event";
import { createEventSchema, patchEventSchema } from "../utils/schemas/event";
import { Base } from "./base";
import { Event } from "./event";
import Lawg from "./lawg";

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
}
