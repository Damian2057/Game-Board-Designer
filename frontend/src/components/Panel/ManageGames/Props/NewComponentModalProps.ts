export interface NewComponentModalProps {
    show: boolean;
    onClose: () => void;
    onSave: (component: any | null) => void;
}