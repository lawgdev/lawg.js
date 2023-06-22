export type Tags = { [key: string]: number };

/**
 * Options for updating a Log
 * Identical to creating a log except all fields are optional
 **/
export interface UpdateLog {
  title: string;
  description: string;
  emoji: string;
  timestamp?: string;
  metadata?: {
    tags?: Tags;
  };
  notify?: boolean;
}

/**
 * Options for creating a Log
 **/
export interface CreateLog {
  /**
   * Log Title (Required)
   * example: "Order Created"
   */
  title: string;

  /**
   * Log Title (Required)
   * example: "Order Created"
   */
  description?: string;

  /**
   * Log Emoji (Optional)
   * example: "🚀" or ":rocket:"
   */
  emoji?: string;

  /**
   * Historical Timestamps (Unix Time) (Optional)
   * example: 2023-06-22T13:42:55.789Z
   */
  timestamp?: string;

  metadata?: {
    /**
     * Log Tags (Optional)
     * example: { "customer-id": 123456 }
     */
    tags?: Tags;
  };

  /**
   * Send Notification (Optional)
   * Default: false
   */
  notify?: boolean;
}
