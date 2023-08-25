import { Log as ILog } from "../types/log";
import { Base } from "./base";
import Lawg from "./lawg";

export class Log extends Base {
  public raw: ILog;
  private readonly feedName: string;

  constructor(client: Lawg, feedName: string, log: ILog) {
    super(client);
    this.feedName = feedName;
    this.raw = log;
  }

  public async delete(): Promise<boolean> {
    const { success, error } = await this.client.rest<never>(
      "delete",
      `/projects/${this.client.project}/feeds/${this.feedName}/logs/${this.raw.id}`
    );

    if (!success) {
      throw new Error(`Failed to delete log ${error?.message}`);
    }

    return true;
  }
}
