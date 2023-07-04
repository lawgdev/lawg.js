export type Tags = Readonly<{ [key: string]: string | number }>;

export type Metadata = {
  readonly ua?: string;
  readonly tags?: Tags;
};

export interface UpdateEvent {
  id?: string;
  title?: string;
  description?: string;
  emoji?: string;
  timestamp?: string;
  metadata?: Metadata;
  notify?: boolean;
}

export interface CreateEvent {
  title: string;
  description?: string;
  emoji?: string;
  timestamp?: string;
  metadata?: Metadata;
  notify?: boolean;
}
