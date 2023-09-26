import {User} from "../../../../model/user/user";

export interface NewEmployeeModalProps {
    show: boolean;
    onClose: () => void;
    onSave: (employee: User | null) => void;
}