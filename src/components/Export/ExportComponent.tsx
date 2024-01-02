import { DownloadOutlined} from "@ant-design/icons";
import { useMemo, useState, useRef } from "react";
import { DownloaderService } from "../../services/DownloaderService";
import { ExportJournalService } from "../../services/ExportJournalService";
import { PureStringConversionStrategy } from "../../services/ConversionStrategies/PureStringConversionStrategy";
import "./ExportComponent.css"
import { InvalidOperationError } from "../../Errors/InvalidOperationError";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip, VariantType } from 'react-tooltip'

interface ExportProps {
    content: Array<string>;
    fileName: string
};

export default function ExportComponent({content, fileName} : ExportProps){
    const downloaderService = useMemo(() => new DownloaderService(), []);
    const exportJournalService = useMemo(() => new ExportJournalService(downloaderService),
                                         [downloaderService]);

    const strategy = new PureStringConversionStrategy();

    const defaultMessage = "Download journal";
    const [tooltipMessage, setTooltipMessage] = useState(defaultMessage);
    const [tooltipState, setTooltipState] = useState<VariantType | undefined>("info");
    const tooltipDelayMs = 500;

    function onClickHandler(){
        if (content.length === 0) return;

        try
        {
            exportJournalService.parseFromStringArray(content, fileName, "text/plain",strategy);
            setTooltipMessage("Downloading journal...")
            setTooltipState('success');
        }
        catch(err)
        {
            if(err instanceof InvalidOperationError){
                setTooltipMessage("Cannot download an empty journal");
                setTooltipState('error');
            }
        }
      }

    function afterHideHandler(){
        setTooltipMessage(defaultMessage);
        setTooltipState('info');
    }

    return(
        <div className="wrapper" >
            <a data-tooltip-id="export-tooltip"
                data-tooltip-content={tooltipMessage}
                data-tooltip-delay-show={tooltipDelayMs}
                data-tooltip-variant={tooltipState}
            >
            <button className="export-button" onClick={onClickHandler} >
                <DownloadOutlined />
                </button>
            </a>

            <Tooltip id="export-tooltip" afterHide={afterHideHandler}/>
        </div>
    );
}
