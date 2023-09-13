import {AuthToken} from "../model/auth/auth.token";
import axios from "axios";
import toast from "react-hot-toast";
import * as process from "process";

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

    static login(username: string, password: string): Promise<AuthToken> {
        console.log(import.meta.env.VITE_URL + '/auth/login')
        return axios.post(import.meta.env.VITE_URL + '/auth/login', {
            username: username,
            password: password
        }).then(res => {
            return res.data;
        });
    }

    static refresh(refreshToken: string): Promise<AuthToken> {
        return axios.post(import.meta.env.VITE_URL + '/auth/refresh', {
            refreshToken: refreshToken
        }).then(res => {
            return res.data;
        });
    }
}