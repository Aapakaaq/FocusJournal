import { useContext, useState } from "react";
import RecentEntriesComponent from "../RecentEntries/RecentEntriesComponent";
import "./JournalEntryComponent.css"
import { FixedSizedQueue } from "../../types/FixedSizeQueue";
import { JournalContext } from "../../contexts/JournalContext";
import { JournalContextType } from "../../types/Journal";
import { RecentEntriesContext} from "../../contexts/RecentEntriesContext";
import { RecentEntriesContextType } from "../../types/RecentEntries";
import IconTrayComponent from "../IconTray/IconTrayComponent";

interface JournalEntryProps {
    recentEntries: FixedSizedQueue<string>;
}

export default function JournalEntryComponent({recentEntries }: JournalEntryProps ) {
    const [entry, setEntry] = useState<string>('');
    const {addJournalEntry} = useContext(JournalContext) as JournalContextType;
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

    // TODO: Move to InputPage.tsx
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
            <IconTrayComponent />
        </div>
    );
}
