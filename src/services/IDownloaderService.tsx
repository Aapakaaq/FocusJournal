export interface IDownloaderService {
    download(file : string, content : string, blobType : string): void;
}
