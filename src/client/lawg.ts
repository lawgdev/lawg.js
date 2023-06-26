import { LAWG_API_URL } from "../lib/constants";
import { CreateInsight, UpdateInsight } from "../types/insight";
import request from "../utils/request";
import Feed from "./classes/feed";

export default class Lawg {
  private readonly token: string;
  private readonly project: string;
  private readonly ua?: string;

  constructor({
    token,
    project,
    ua,
  }: {
    token: string;
    project: string;
    ua?: string;
  }) {
    this.token = token;
    this.project = project;
    this.ua = ua;
  }

  public feed(feed_name: string): Feed {
    return new Feed(this.token, this.project, feed_name, this.ua);
  }

  /**
   * Create a new insight
   * @param options
   * @returns Response Data
   */
  public async insight(options: CreateInsight): Promise<void> {
    return await request(`${LAWG_API_URL}/projects/${this.project}/insights`, {
      method: "post",
      token: this.token,
      data: options,
    });
  }

  /**
   * Set a value for an existing Insight
   * @param options
   * @returns Response Data
   */
  public async setInsight(options: UpdateInsight): Promise<void> {
    return await request(
      `${LAWG_API_URL}/projects/${this.project}/insights/${options.id}`,
      {
        method: "patch",
        token: this.token,
        data: {
          set: options.set,
        },
      }
    );
  }

  /**
   * Increment an existing Insight
   * @param options
   * @returns Response Data
   */
  public async incInsight(options: UpdateInsight): Promise<void> {
    return await request(
      `${LAWG_API_URL}/projects/${this.project}/insights/${options.id}`,
      {
        method: "patch",
        token: this.token,
        data: {
          increment: options.increment,
        },
      }
    );
  }

  /**
   * Delete an existing Insight
   * @param options
   * @returns Response Data
   */
  public async deleteInsight(options: { id: string }): Promise<void> {
    return await request(
      `${LAWG_API_URL}/projects/${this.project}/insights/${options.id}`,
      {
        method: "delete",
        token: this.token,
      }
    );
  }
}
