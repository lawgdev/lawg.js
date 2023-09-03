import { create } from "@onehop/json-methods";
import { EventMetadata, Event as IEvent } from "../types/event";
import Lawg from "./lawg";

export const Events = create<
  IEvent & {
    client: Lawg;
    feedName: string;
  }
>().methods({
  async delete() {
    const { success, error } = await this.client.rest<never>(
      "delete",
      `/projects/${this.client.project}/feeds/${this.feedName}/events/${this.id}`
    );

    if (!success) {
      throw new Error(`Failed to delete event ${error?.message}`);
    }

    return true;
  },

  async update(
    options: Partial<{
      title: string;
      description: string;
      emoji: string;
      metadata: EventMetadata;
    }>
  ) {
    const { success, data, error } = await this.client.rest<IEvent>(
      "patch",
      `/projects/${this.client.project}/feeds/${this.feedName}/events/${this.id}`,
      options
    );

    if (!success || !data) {
      throw new Error(`Failed to update event ${error?.message}`);
    }

    this.title ??= data.title;
    this.description ??= data.description;
    this.emoji ??= data.emoji;
    this.metadata ??= data.metadata;

    return this;
  },
});
