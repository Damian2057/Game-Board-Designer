export interface ToggleComponentProps {
    label: string;
    initialValue: boolean;
    onChange: (value: boolean) => void;
}