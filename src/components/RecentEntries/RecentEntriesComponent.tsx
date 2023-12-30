import "./RecentEntriesComponent.css"
import {useRef} from 'react';
import { PhonePortrait, TabletPortrait } from "../../services/ScreenDimensions";
import { Int } from "../../types/Int";

interface RecentEntryProps{
    recentEntries: string[];
    prefix? : string;
    maxCharacters? : Int
}



export default function RecentEntriesComponent({recentEntries,
                                                prefix ="...",
                                                maxCharacters=75 as Int}: RecentEntryProps){

    const windowWidth = useRef(window.innerWidth);

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

    const trimmedEntries = trimEntries(recentEntries);

    return (
        <div className="recent-entries">
            {trimmedEntries.map((entry, index) =>
            <li className="recent-entry" key={index}> {entry}</li>)}
        </div>
    );
}
