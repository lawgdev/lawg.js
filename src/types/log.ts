export default interface CreateLog {
  title: string;
  description?: string;
  emoji?: string;
  timestamp?: string;
  metadata?: {
    tags?: Record<string, string | number | boolean>;
  };
  notify?: boolean;
}
