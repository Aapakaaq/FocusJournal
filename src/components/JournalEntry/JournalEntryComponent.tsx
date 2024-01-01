import { useContext, useState } from "react";

import ExportComponent from "../Export/ExportComponent";
import RecentEntriesComponent from "../RecentEntries/RecentEntriesComponent";
import "./JournalEntryComponent.css"
import { FixedSizedQueue } from "../../types/FixedSizeQueue";
import { JournalContext } from "../../contexts/JournalContext";
import { JournalContextType } from "../../types/Journal";
import NewJournalComponent from "../NewJournal/NewJournalComponent";
import { RecentEntriesContext} from "../../contexts/RecentEntriesContext";
import { RecentEntriesContextType } from "../../types/RecentEntries";


interface JournalEntryProps {
    recentEntries: FixedSizedQueue<string>;
}

export default function JournalEntryComponent({recentEntries }: JournalEntryProps ) {
    const [entry, setEntry] = useState<string>('');
    const {addJournalEntry, getJournalData} = useContext(JournalContext) as JournalContextType;
    const {addEntry} = useContext(RecentEntriesContext) as RecentEntriesContextType;

    function handleTextChange(newValue: string): void {
        setEntry(newValue);
    }

    function keyDownHandler(event: React.KeyboardEvent<HTMLInputElement>): void{
        if (event.code === "Enter") {
            addJournalEntry(entry)
            addEntry(entry)
            setEntry('');
        }
    }

    return (
        <div className="container">
                <RecentEntriesComponent />
                    <div className='input-wrapper'>
                        <input className="input"
                            value = {entry}
                            onChange = {e => handleTextChange(e.target.value)}
                            autoFocus = {true}
                            onKeyDown = {keyDownHandler}
                            />

                    </div>
                    <div className ="icon-wrapper">
                        <ExportComponent content={getJournalData()} fileName={"test.txt"}/>
                        <NewJournalComponent />
                    </div>
        </div>
    );
}
