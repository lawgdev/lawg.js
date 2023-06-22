import { LAWG_API_URL } from "../../lib/constants";
import { CreateLog, UpdateLog } from "../../types/log";
import sendAPICall from "../../utils/sendAPICall";

export default class Feed {
  private readonly token: string;
  private readonly project: string;
  private readonly feedName: string;
  private readonly latestLogId: string | null;

  constructor(token: string, project: string, feedName: string) {
    this.token = token;
    this.project = project;
    this.feedName = feedName;
    this.latestLogId = null;
  }

  /**
   * Create a new log on Lawg
   * @param options
   * @returns Response Data
   */
  public async log(options: CreateLog): Promise<void> {
    return await sendAPICall(
      `${LAWG_API_URL}/projects/${this.project}/feeds/${this.feedName}/logs`,
      "post",
      this.token,
      options
    );
  }

  /**
   * Edit an existing log on Lawg using the latest log ID
   * @param options
   * @returns Response Data
   */
  public async editLog(options: UpdateLog): Promise<void> {
    if (this.latestLogId === null) {
      throw new Error("No log ID available for editing. Create a log first.");
    }

    return await sendAPICall(
      `${LAWG_API_URL}/projects/${this.project}/feeds/${this.feedName}/logs/${this.latestLogId}`,
      "patch",
      this.token,
      options
    );
  }

  /**
   * Delete an existing log on Lawg using the latest log ID
   * @param options
   * @returns Response Data
   */
  public async deleteLog(): Promise<void> {
    if (this.latestLogId === null) {
      throw new Error("No log ID available for editing. Create a log first.");
    }

    return await sendAPICall(
      `${LAWG_API_URL}/projects/${this.project}/feeds/${this.feedName}/logs/${this.latestLogId}`,
      "delete",
      this.token
    );
  }
}
