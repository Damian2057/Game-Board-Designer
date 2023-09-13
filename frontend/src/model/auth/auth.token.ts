export interface AuthToken {
    expiresIn: string;
    token: string;
    refresh?: string;
}