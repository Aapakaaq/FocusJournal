import ExportComponent from "../Export/ExportComponent";
import NewJournalComponent from "../NewJournal/NewJournalComponent";
import { JournalContext } from "../../contexts/JournalContext";
import { JournalContextType } from "../../types/Journal";
import { useContext } from "react";
import "./IconTrayComponent.css"

export default function IconTrayComponent(){
    const {getJournalData} = useContext(JournalContext) as JournalContextType;

    return(
    <div className ="icon-wrapper">
         <ExportComponent content={getJournalData()} fileName={"test.txt"}/>
        <NewJournalComponent />
    </div>
    );
}
