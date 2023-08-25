import Lawg from "./lawg";

export abstract class Base {
  protected readonly client: Lawg;

  constructor(client: Lawg) {
    this.client = client;
  }
}
