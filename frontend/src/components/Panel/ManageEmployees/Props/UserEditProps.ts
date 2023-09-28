import {User} from "../../../../model/user/user";

export interface UserEditProps {
    name: string;
    show: boolean;
    onClose: () => void;
    onSave: (editedEmployee: User | null) => void;
    editedEmployee: User | null;
}