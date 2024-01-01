import { FixedSizedQueue } from "./FixedSizeQueue";

export type RecentEntriesContextType = {
    recentEntries : FixedSizedQueue<string>;
    addEntry(entry: string): void;
    getRecentEntries() : string[];
    clearEntries(): void;

}
