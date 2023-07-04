export interface CreateInsight {
  title: string;
  value: number | { set: number; increment: number };
  emoji?: string;
}

export interface UpdateInsight {
  id?: string;
  emoji?: string;
  set?: number;
  increment?: number;
}