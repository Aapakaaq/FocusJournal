import { useContext, useState } from "react";
import { DeleteOutlined} from "@ant-design/icons";
import { JournalContext } from "../../contexts/JournalContext";
import { JournalContextType } from "../../types/Journal";
import './NewJournalComponent.css'
import { RecentEntriesContext } from "../../contexts/RecentEntriesContext";
import { RecentEntriesContextType } from "../../types/RecentEntries";
import { Tooltip, VariantType } from 'react-tooltip'

export default function NewJournalComponent(){
    const {clearJournal } = useContext(JournalContext) as JournalContextType;
    const {clearEntries} = useContext(RecentEntriesContext) as RecentEntriesContextType;

    const defaultMessage = "Clear journal";
    const [tooltipMessage, setTooltipMessage] = useState(defaultMessage);
    const [tooltipState, setTooltipState] = useState<VariantType | undefined>("info");
    const tooltipDelayMs = 500;

    function onClickHandler(): void {
        try {
            clearJournal();
            clearEntries();
            setTooltipState("success");
            setTooltipMessage("Journal cleared!")
        } catch(err){
            // TODO: Better error handling for localStorage
            setTooltipMessage("An Error occured. Clear browser cache in browser settings.");
            setTooltipState('error')
        }
    }

    function afterHideHanlder(){
        setTooltipState("info");
        setTooltipMessage(defaultMessage);
    }

    // TODO: Confirm dialog
    return(
        <div className="wrapper">
            <a data-tooltip-id="new-journal-tooltip"
                data-tooltip-content={tooltipMessage}
                data-tooltip-variant={tooltipState}
                data-tooltip-delay-show={tooltipDelayMs}
                >
                <button className='clear-button' onClick={onClickHandler}>
                <DeleteOutlined />
                </button>
            </a>
            <Tooltip id="new-journal-tooltip" afterHide={afterHideHanlder}/>
        </div>
    );
}
