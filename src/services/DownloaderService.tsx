import { InvalidOperationError } from "../Errors/InvalidOperationError";
import { NotSupportedError } from "../Errors/NotSupportedError";
import { IDownloaderService } from "./IDownloaderService";


export class DownloaderService  implements IDownloaderService {
    private allowedMimeTypes: string[] = ['text/plain', 'application/pdf'];
    private timeoutMS = 500;

    /* Downloads file to the browsers download destination
     * @param The filename including extension.
     * @param content The content for the file to be downloaded
     * @param blobType
     * @throws {NotSupportedError} If the given blobType is not supported
     */
    public download(file : string='journal.txt', content : string,
                    blobType: string='text/plain'): void{


        if (!content){
            throw (new InvalidOperationError("Empty content"));
        }

        if (!this.isMimeTypeAllowed(blobType)) {
            throw (new NotSupportedError("Invalid or disallowed MIME type"));
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

    private isMimeTypeAllowed(mimeType: string): boolean {
        return this.allowedMimeTypes.includes(mimeType);
    }
}
