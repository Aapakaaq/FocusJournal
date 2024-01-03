import { useContext, useState } from "react";
import { DeleteOutlined} from "@ant-design/icons";
import { JournalContext } from "../../contexts/JournalContext";
import { JournalContextType } from "../../types/Journal";
import './NewJournalComponent.css'
import { RecentEntriesContext } from "../../contexts/RecentEntriesContext";
import { RecentEntriesContextType } from "../../types/RecentEntries";
import { Tooltip, VariantType } from 'react-tooltip'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useLocalStorage } from "../../hooks/useLocalStorage";

export default function NewJournalComponent(){
    const {clearJournal } = useContext(JournalContext) as JournalContextType;
    const {clearEntries} = useContext(RecentEntriesContext) as RecentEntriesContextType;

    const storageKey = 'showConfirmDialog';
    const [showConfirmDialog, setShowConfirmDialog] = useLocalStorage<boolean>(storageKey, true);

    const defaultMessage = "Clear journal";
    const [tooltipMessage, setTooltipMessage] = useState(defaultMessage);

    const [tooltipState, setTooltipState] = useState<VariantType | undefined>("info");

    const tooltipDelayMs = 500;

    function onClickHandler(): void {
        try {
            if (showConfirmDialog){
                showConfirmation();
            }
            else {
                clearJournal();
                clearEntries();
                setTooltipState("success");
                setTooltipMessage("Journal cleared!")
            }
        }
        catch(err) {
            // TODO: Better error handling.
            setTooltipMessage("An Error occured. Clear browser cache in browser settings.");
            setTooltipState('error')
        }
    }

    function afterHideHandler(): void {
        setTooltipState("info");
        setTooltipMessage(defaultMessage);
    }

    function showConfirmation(){
        confirmAlert({
            message: "Are you sure you want to delete your journal?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        clearJournal();
                        clearEntries();
                    }
                },
                {
                    label: "No",
                },
                {
                    label: "Yes, don\'t show this again",
                    onClick: () => {
                        setShowConfirmDialog(false);
                        clearJournal();
                        clearEntries();
                    }
                }
            ]
            });
    }

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
            <Tooltip id="new-journal-tooltip" afterHide={afterHideHandler}/>
        </div>
    );
}
