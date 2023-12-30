import "./JournalEntryComponent.css"

interface JournalInputProps {
    value: string;
}

export default function InputField({value}: JournalInputProps) {
    return (
        <input className="input"
            value ={value}
            autoFocus={true}
        />
    );
}
