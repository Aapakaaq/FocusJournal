export interface IJournal {
    data: string[];
    headline?: string;
    date?: Date;
}

export type JournalContextType = {
    journal: IJournal;
    addJournalEntry(entry: string): void;
    getJournalData(): string[];
    clearJournal(): void;
}
