export interface ToggleComponentProps {
    label: string;
    initialValue: boolean;
    labels: string[];
    onChange: (value: boolean) => void;
}