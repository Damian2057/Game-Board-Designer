import {AuthToken} from "../model/auth/auth.token";
import axios from "axios";
import {User} from "../model/user/user";

export class AuthApi {

    static getAuthToken(): string | null {
        return localStorage.getItem('token');
    }

    static getUser(): User | null {
        return JSON.parse(localStorage.getItem('user') ?? '{}');
    }

    static getRefreshToken(): string | null {
        return localStorage.getItem('refreshToken');
    }

    static setAuthToken(token: string): void {
        localStorage.setItem('token', token);
    }

    static setUser(user: User | undefined): void {
        localStorage.setItem('user', JSON.stringify(user));
    }

    static setRefreshToken(token: string | undefined): void {
        if (typeof token === "string") {
            localStorage.setItem('refreshToken', token);
        }
    }

    static removeData(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    }

    static login(email: string, password: string): Promise<AuthToken> {
        return axios.post(`${import.meta.env.VITE_URL}/auth/login`, {
            email: email,
            password: password
        }).then(res => {
            return res.data;
        });
    }

    static refresh(refreshToken: string): Promise<AuthToken> {
        return axios.post(`${import.meta.env.VITE_URL}/auth/refresh`, {
            refreshToken: refreshToken
        }).then(res => {
            return res.data;
        });
    }

    static isEmployee() {
        const user = this.getUser();
        if (user == null) {
            return false;
        }
        return user.role === 'employee' || user.role === 'admin';
    }

    static isAdmin() {
        const user = this.getUser();
        if (user == null) {
            return false;
        }
        return user.role === 'admin';
    }
}