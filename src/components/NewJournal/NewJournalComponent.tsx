import { useContext } from "react";

import { DeleteOutlined} from "@ant-design/icons";
import { JournalContext } from "../../contexts/JournalContext";
import { JournalContextType } from "../../types/Journal";
import './NewJournalComponent.css'
import { RecentEntriesContext } from "../../contexts/RecentEntriesContext";
import { RecentEntriesContextType } from "../../types/RecentEntries";

export default function NewJournalComponent(){
    const {clearJournal } = useContext(JournalContext) as JournalContextType;
    const {clearEntries} = useContext(RecentEntriesContext) as RecentEntriesContextType;

    function onClickHandler(): void {
        clearJournal();
        clearEntries();
    }

    // TODO: Confirm dialog
    return(
        <div className="wrapper">
            <a data-tooltip-id="export-tooltip" data-tooltip-content="Clear journal" data-tooltip-place="top">
                <button className='clear-button' onClick={onClickHandler}>
                <DeleteOutlined />
                </button>
            </a>
        </div>
    );
}
