import { InvalidOperationError } from "../Errors/InvalidOperationError";
import {IDataToContentStrategy}  from "./ConversionStrategies/IDataToContentStrategy"
import { IDownloaderService } from "./IDownloaderService";

export class ExportJournalService {
    private downloaderService: IDownloaderService;

    constructor(downloaderService: IDownloaderService) {
        this.downloaderService = downloaderService;
    }

    /*
     * Parse data to string and downloads the file using injected downloader service.
     * @param file The file name and extention
     * @param strategy The strategy used to convert the data to string
     */
    public parseFromStringArray(data : string[],
                                      file : string,
                                      blobType : string,
                                      strategy : IDataToContentStrategy)  {

        const stringContent : string = strategy.convertData(data);

        this.downloaderService.download(file, stringContent, blobType );
    }
}
