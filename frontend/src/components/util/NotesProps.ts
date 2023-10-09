export interface NotesProps {
    show: boolean;
    notes: string[] | null;
    onClose: () => void;
    onSave: (notes: string[] | null) => void;
}