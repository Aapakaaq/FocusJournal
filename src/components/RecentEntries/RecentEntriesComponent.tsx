import "./RecentEntriesComponent.css"
import { useContext, useRef} from 'react';
import { PhonePortrait, TabletPortrait } from "../../services/ScreenDimensions";
import { Int } from "../../types/Int";
import { RecentEntriesContext } from "../../contexts/RecentEntriesContext";
import { RecentEntriesContextType } from "../../types/RecentEntries";

interface RecentEntryProps{
    prefix? : string;
    maxCharacters? : Int
}

export default function RecentEntriesComponent({prefix ="...",
                                                maxCharacters=75 as Int}: RecentEntryProps){

    const windowWidth = useRef(window.innerWidth);
    const {getRecentEntries} = useContext(RecentEntriesContext) as RecentEntriesContextType;

    function trimEntries(entries: string[]){
        return entries.map((entry : string) => {
            const length = entry.length;
            if (windowWidth.current <= PhonePortrait.width && length > 25) {
                return prefix + entry.slice(-50);
            }

            if (windowWidth.current <= TabletPortrait.width && length > 50){
                return prefix + entry.slice(-50);
            }
            if (entry.length > maxCharacters)
                return prefix + entry.slice(-75);

            return entry;
        })
    }

    const trimmedEntries = trimEntries(getRecentEntries());

    return (
        <div className="recent-entries">
            {trimmedEntries.map((entry, index) =>
            <li className="recent-entry" key={index}> {entry}</li>)}
        </div>
    );
}
