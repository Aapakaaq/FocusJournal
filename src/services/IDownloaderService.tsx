import { BlobTypes } from "../types/BlobTypes";

export interface IDownloaderService {
    download(file : string, content : string, blobType : BlobTypes): void;
}
