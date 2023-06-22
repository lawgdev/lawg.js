export default interface CreateLog {
  feed?: string;
  title: string;
  description?: string;
  emoji?: string;
  timestamp?: string;
  metadata?: {
    tags?: Record<string, string | number | boolean>;
  };
  notify?: boolean;
}
