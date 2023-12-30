import { useContext, useState } from "react";

import ExportComponent from "../Export/ExportComponent";
import RecentEntriesComponent from "../RecentEntries/RecentEntriesComponent";
import "./JournalEntryComponent.css"
import { FixedSizedQueue } from "../../types/FixedSizeQueue";
import { JournalContext } from "../../contexts/JournalContext";
import { JournalContextType } from "../../types/Journal";


interface JournalEntryProps {
    recentEntries: FixedSizedQueue<string>;
}

export default function JournalEntryComponent({recentEntries }: JournalEntryProps ) {
    const [entry, setEntry] = useState<string>('');
    const {addJournalEntry, getJournalData} = useContext(JournalContext) as JournalContextType;

    function handleTextChange(newValue: string): void {
        setEntry(newValue);
    }

    function keyDownHandler(event: React.KeyboardEvent<HTMLInputElement>): void{
        if (event.code === "Enter") {
            addJournalEntry(entry)
            recentEntries.enqueue(entry)
            setEntry('');
        }
    }

    return (
        <div className="container">
        <RecentEntriesComponent recentEntries = {recentEntries.getAll()}/>
            <div className='input-wrapper'>
                <input className="input"
                    value = {entry}
                    onChange = {e => handleTextChange(e.target.value)}
                    autoFocus = {true}
                    onKeyDown = {keyDownHandler}
                    />

                <ExportComponent content={getJournalData()} fileName={"test.txt"}/>
            </div>
        </div>
    );
}
