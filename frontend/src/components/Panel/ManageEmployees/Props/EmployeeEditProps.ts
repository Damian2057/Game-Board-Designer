import {User} from "../../../../model/user/user";

export interface EmployeeEditProps {
    show: boolean;
    onClose: () => void;
    onSave: (editedEmployee: User | null) => void;
    editedEmployee: User | null;
}