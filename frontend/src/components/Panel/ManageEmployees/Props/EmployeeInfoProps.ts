import {User} from "../../../../model/user/user";

export interface EmployeeInfoProps {
    employee: User | null;
    onClose: () => void;
}