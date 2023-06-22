export interface CreateInsight {
    title: string;
    value: number | { set: number; increment: number };
    emoji?: string;
}