export class AuthApi {

    static getAuthToken(): string | null {
        return localStorage.getItem('token');
    }

    static setAuthToken(token: string): void {
        localStorage.setItem('token', token);
    }

    static removeAuthToken(): void {
        localStorage.removeItem('token');
    }


}