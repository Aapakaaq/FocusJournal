import {useMemo } from "react";
import JournalEntryComponent from '../components/JournalEntry/JournalEntryComponent'
import { FixedSizedQueue } from "../types/FixedSizeQueue"
import { JournalProvider } from "../contexts/JournalContext";
import { Int } from "../types/Int";
import "./InputPage.css"
import { RecentEntriesProvider } from "../contexts/RecentEntriesContext";

export default function SingleInputPage() {
    return (

        <RecentEntriesProvider>
        <JournalProvider>
            <div className='container'>
                <JournalEntryComponent  />
            </div>
        </JournalProvider>

        </RecentEntriesProvider>
    );
};
