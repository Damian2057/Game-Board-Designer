import {User} from "../user/user";

export interface AuthToken {
    expiresIn: string;
    token: string;
    refresh?: string;
    user?: User;
}