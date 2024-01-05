import { RecentEntriesContextType } from "../types/RecentEntries";
import { createContext, useMemo } from 'react'
import { FixedSizedQueue } from "../types/FixedSizeQueue";
import { Int } from "../types/Int";

interface IProps {
    children: React.ReactNode;
}

export const RecentEntriesContext = createContext<RecentEntriesContextType | null>(null);

export function RecentEntriesProvider({children}: IProps) {
    const maxEntries = 2 as Int;
    const recentEntries = useMemo(() =>
        new FixedSizedQueue<string>(maxEntries), [maxEntries]);

    function addEntry(entry: string): void {
        recentEntries.enqueue(entry);
    }

    function getRecentEntries(): string[]{
        return recentEntries.getAll();
    }

    function clearEntries(): void {
        recentEntries.emptyQueue();
    }

    return(
        <RecentEntriesContext.Provider value={{recentEntries, addEntry,
                                               getRecentEntries, clearEntries}}>
            {children}
        </RecentEntriesContext.Provider>
    )
}
