import { InvalidOperationError } from "../Errors/InvalidOperationError";
import { NotSupportedError } from "../Errors/NotSupportedError";
import { BlobTypes } from "../types/BlobTypes";
import { IDownloaderService } from "./IDownloaderService";


export class DownloaderService  implements IDownloaderService {
    private timeoutMS = 500;

    /* Downloads file to the browsers download destination
     * @param The filename including extension.
     * @param content The content for the file to be downloaded
     * @param blobType
     * @throws {InvalidOperationError} If the content is empty or if missing file name.
     */
    public download(file : string='journal.txt', content : string,
                    blobType: BlobTypes = BlobTypes.TextPlain): void{

        if (!content){
            throw (new InvalidOperationError("Empty content"));
        }

        if (!file) {
            throw (new InvalidOperationError("Missing file name"));
        }

        const sanitizedFileName = this.sanitizeFileName(file);

        const element = document.createElement('a');

        const blob = new Blob([content], {
            type: blobType
        });

        try {
            element.href = URL.createObjectURL(blob);
            element.download = sanitizedFileName;
            document.body.appendChild(element);
            element.click();
        }
        finally{
            setTimeout(() => {
                URL.revokeObjectURL(element.href);
            }, this.timeoutMS);
            document.body.removeChild(element);
        }

    };

    private sanitizeFileName(fileName: string): string {
        return fileName.replace(/[^\w.]/g, '');
    }
}
