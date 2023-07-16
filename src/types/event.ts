export type Tags = Readonly<{ [key: string]: string | number }>;

export type Metadata = {
  readonly tags?: Tags;
  readonly ua?: string;
}

export interface CreateEvent {
  title: string;
  description?: string;
  emoji?: string;
  timestamp?: string;
  metadata?: Metadata;
  notify?: boolean | string[];
  expiration: string;
  triggers: string[];
}

export interface UpdateEvent {
  id?: string;
  title?: string;
  description?: string;
  emoji?: string;
  timestamp?: string;
  metadata?: Metadata;
  notify?: boolean;
}
