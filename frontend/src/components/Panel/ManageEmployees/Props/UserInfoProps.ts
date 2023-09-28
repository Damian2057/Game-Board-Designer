import {User} from "../../../../model/user/user";

export interface UserInfoProps {
    name: string;
    employee: User | null;
    onClose: () => void;
}