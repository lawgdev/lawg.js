import { create } from "@onehop/json-methods";
import { Log as ILog } from "../types/log";
import Lawg from "./lawg";

export const Logs = create<
  ILog & {
    client: Lawg;
    feedName: string;
  }
>().methods({
  async delete() {
    const { success, error } = await this.client.rest<never>(
      "delete",
      `/projects/${this.client.project}/feeds/${this.feedName}/logs/${this.id}`
    );

    if (!success) {
      throw new Error(`Failed to delete log ${error?.message}`);
    }

    return true;
  },
});
