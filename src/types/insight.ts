/**
 * Options for creating a Lawg Insight
**/
export interface CreateInsight {
  /**
   * Insight Title (Required)
   * example: "Active Users"
   */
  title: string;

  /**
   * Insight Value (Required)
   *
   * Creating an Insight:
   * value: 5
   *
   * Updating an Insight:
   * "value": {
   *    set: 10 (Overide initial insight value)
   *    increment: 10 (new value: 15)
   * }
   */
  value: number | { set: number; increment: number };

  /**
   * Insight Emoji (Optional)
   * example: "🚀" or ":rocket:"
   */
  emoji?: string;
}
