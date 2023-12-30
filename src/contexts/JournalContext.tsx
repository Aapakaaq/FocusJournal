import { createContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage';
import { IJournal, JournalContextType } from '../types/Journal'

interface IProps {
  children: React.ReactNode;
}

const initialState: IJournal = {
	data: ['']
}

export const JournalContext = createContext<JournalContextType | null>(null)

export function JournalProvider({children}: IProps ){
    const storageKey = 'journal';
    const [journal, setJournal] = useLocalStorage<IJournal>(storageKey, initialState);

    function addJournalEntry(entry: string): void {
        setJournal(prevJournal => ({
            data: [...prevJournal.data, entry],
            headline: prevJournal.headline,
            date: prevJournal.date,
        }));
    }

    function getJournalData(): string[] {
        return journal.data.slice();
    }

    function clearJournal(): void {
        setJournal({
            data: initialState.data,
            headline: initialState.headline,
            date: initialState.date,
        });
    }

    return(
        <JournalContext.Provider value={{journal, addJournalEntry, getJournalData, clearJournal}}>
            {children}
        </JournalContext.Provider>
    )
}
