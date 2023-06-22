import { LAWG_API_URL } from "../lib/constants";
import { CreateInsight } from "../types/insight";
import sendAPICall from "../utils/sendAPICall";
import Feed from "./classes/feed";

export default class Lawg {
  private readonly token: string;
  private readonly project: string;

  constructor({ token, project }: { token: string; project: string }) {
    this.token = token;
    this.project = project;
  }

  public feed(feed_name: string): Feed {
    return new Feed(this.token, this.project, feed_name);
  }

  /**
   * Create a new insight on Lawg
   * @param options
   * @returns true if successful
   */
  public async insight(options: CreateInsight): Promise<boolean> {
    await sendAPICall(
      `${LAWG_API_URL}/projects/${this.project}/insights`,
      this.token,
      options
    );

    return true;
  }
}
