import { DownCircleOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import { DownloaderService } from "../../services/DownloaderService";
import { ExportJournalService } from "../../services/ExportJournalService";
import { PureStringConversionStrategy } from "../../services/ConversionStrategies/PureStringConversionStrategy";
import "./ExportComponent.css"
import { InvalidOperationError } from "../../Errors/InvalidOperationError";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

interface ExportProps {
    content: Array<string>;
    fileName: string
};

export default function ExportComponent({content, fileName} : ExportProps){
    const downloaderService = useMemo(() => new DownloaderService(), []);
    const exportJournalService = useMemo(() => new ExportJournalService(downloaderService),
                                         [downloaderService]);
    const strategy = new PureStringConversionStrategy();

    function onClickHandler(){
        if (content.length === 0) return;

        try
        {
            exportJournalService.parseFromStringArray(content, fileName, "text/plain",strategy);
        }
        catch(err)
        {
            if(err instanceof InvalidOperationError){
                //TODO
            }
        }
      }

    return(
        <div className="wrapper">
            <a data-tooltip-id="export-tooltip" data-tooltip-content="Download your journal" data-tooltip-place="top">
                <button className="export-button" onClick={onClickHandler}>
                <DownCircleOutlined />
                </button>
            </a>
            <Tooltip id="export-tooltip" />
        </div>
    );
}
