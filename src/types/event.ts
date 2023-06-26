export type Tags = { [key: string]: string | number };

/**
 * Options for updating a Event
 * Identical to creating a event except all fields are optional
 **/
export interface UpdateEvent {
  id?: string;
  title?: string;
  description?: string;
  emoji?: string;
  timestamp?: string;
  metadata?: {
    tags?: Tags;
  };
  notify?: boolean;
}

/**
 * Options for creating a Event
 **/
export interface CreateEvent {
  /**
   * Event Title (Required)
   * example: "Order Created"
   */
  title: string;

  /**
   * Event Title (Required)
   * example: "Order Created"
   */
  description?: string;

  /**
   * Event Emoji (Optional)
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
     * Event User Agent (Optional)
     */
    ua?: string;
    /**
     * Event Tags (Optional)
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
