export default class HTTPResponseError extends Error {
  public readonly status: number;
  public readonly statusText: string;
  public readonly body: any | undefined;

  constructor(status: number, statusText: string, body: any | undefined) {
    const message = `Error sending data to Lawg API: ${status} ${statusText}`;
    super(message);
    this.name = "HTTPResponseError";
    this.status = status;
    this.statusText = statusText;
    this.body = body;
    Object.setPrototypeOf(this, HTTPResponseError.prototype);
  }
}
