import { EventMetadata, Event as IEvent } from "../types/event";
import { Base } from "./base";
import Lawg from "./lawg";

export class Event extends Base {
  public raw: IEvent;
  private readonly feedName: string;

  constructor(client: Lawg, feedName: string, event: IEvent) {
    super(client);
    this.feedName = feedName;
    this.raw = event;
  }

  public async deleteEvent() {
    return await this.client.rest<never>(
      "delete",
      `/projects/${this.client.project}/feeds/${this.feedName}/events/${this.raw.id}`
    );
  }

  public async updateEvent(
    options: Partial<{
      name: string;
      description: string;
      emoji: string;
      metadata: EventMetadata;
    }>
  ) {
    const { success, data, error } = await this.client.rest<IEvent>(
      "patch",
      `/projects/${this.client.project}/feeds/${this.feedName}/events/${this.raw.id}`,
      options
    );

    if (!success || !data) {
      throw new Error(`Failed to update event ${error?.message}`);
    }

    this.raw = data;

    return this;
  }
}
