import {useMemo } from "react";
import JournalEntryComponent from '../components/JournalEntry/JournalEntryComponent'
import { FixedSizedQueue } from "../types/FixedSizeQueue"
import { JournalProvider } from "../contexts/JournalContext";
import { Int } from "../types/Int";
import "./InputPage.css"
export default function SingleInputPage() {
    const maxRecentEntries = 2 as Int;
    const recentEntries = useMemo(() =>
        new FixedSizedQueue<string>(maxRecentEntries), [maxRecentEntries]);

    return (
        <JournalProvider>
            <div className='container'>
                <JournalEntryComponent recentEntries={recentEntries} />
            </div>
        </JournalProvider>
    );
};
