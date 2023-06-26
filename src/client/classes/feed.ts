import { AxiosResponse } from "axios";
import { LAWG_API_URL } from "../../lib/constants";
import { CreateEvent, UpdateEvent } from "../../types/event";
import request from "../../utils/request";

export default class Feed {
  private readonly token: string;
  private readonly project: string;
  private readonly ua: string | undefined;
  private readonly feedName: string;

  constructor(
    token: string,
    project: string,
    feedName: string,
    ua: string | undefined
  ) {
    this.token = token;
    this.project = project;
    this.ua = ua;
    this.feedName = feedName;
  }

  /**
   * Get all events of a feed
   * @returns Response Data
   */
  public async fetchEvents(): Promise<AxiosResponse> {
    return await request(
      `${LAWG_API_URL}/projects/${this.project}/feeds/${this.feedName}/events`,
      {
        method: "get",
        token: this.token,
      }
    );
  }

  /**
   * Create a new event
   * @param options
   * @returns Response Data
   */
  public async event(options: CreateEvent): Promise<AxiosResponse> {
    return await request(
      `${LAWG_API_URL}/projects/${this.project}/feeds/${this.feedName}/logs`,
      {
        ua: options.metadata?.ua ?? this.ua,
        method: "post",
        token: this.token,
        data: options,
      }
    );
  }

  /**
   * Get an existing event
   * @param options
   * @returns Response Data
   */
  public async fetchEvent(options: { id: string }): Promise<AxiosResponse> {
    return await request(
      `${LAWG_API_URL}/projects/${this.project}/feeds/${this.feedName}/logs/${options.id}`,
      {
        method: "get",
        token: this.token,
      }
    );
  }

  /**
   * Edit an existing event using an ID param or latest event ID
   * @param id
   * @param options
   * @returns Response Data
   */
  public async editEvent(options: UpdateEvent): Promise<AxiosResponse> {
    const { id, ...data } = options;

    return await request(
      `${LAWG_API_URL}/projects/${this.project}/feeds/${this.feedName}/logs/${id}`,
      {
        method: "patch",
        token: this.token,
        data,
      }
    );
  }

  /**
   * Delete an existing event using an ID param or latest event ID
   * @param id
   * @param options
   * @returns Response Data
   */
  public async deleteEvent(options: { id: string }): Promise<AxiosResponse> {
    return await request(
      `${LAWG_API_URL}/projects/${this.project}/feeds/${this.feedName}/logs/${options.id}`,
      {
        method: "delete",
        token: this.token,
      }
    );
  }
}
