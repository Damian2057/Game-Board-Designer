export interface CustomSelectProps {
    value: string;
    onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
    employees: any[];
}