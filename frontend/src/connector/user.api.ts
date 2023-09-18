import axios from "axios";
import {User} from "../model/user/user";

export class UserApi {

    static registerUser(username: string, password: string, email: string, phoneNumber: string): Promise<void> {
        return axios.post(`${import.meta.env.VITE_URL}/user/register`, {
            username: username,
            password: password,
            email: email,
            phoneNumber: phoneNumber
        }).then(res => {
            return res.data;
        });
    }

    static activateUser(data: any): Promise<void> {
        return axios.post(`${import.meta.env.VITE_URL}/user/activate`, {
            code: data.code,
            email: data.email,
        }).then(res => {
            return res.data;
        });
    }

    static getAllUsers(): Promise<User[]> {
        return axios.get(`${import.meta.env.VITE_URL}/user/all`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static getRoles(): Promise<string[]> {
        return axios.get(`${import.meta.env.VITE_URL}/user/roles`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static getSelf(): Promise<User> {
        return axios.get(`${import.meta.env.VITE_URL}/user/self`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static findUser(data: any): Promise<User[]> {
        const queryParams = {};

        for (const key in data) {
            if (data.hasOwnProperty(key) && data[key] !== null) {
                // @ts-ignore
                queryParams[key] = data[key];
            }
        }
        const config = {
            params: queryParams,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };

        return axios.get(`${import.meta.env.VITE_URL}/user/find`, config)
            .then(res => {
            return res.data;
        });
    }

    static selfUpdate(data: any): Promise<User> {
        return axios.put(`${import.meta.env.VITE_URL}/user/self_update`, {
            username: data.username,
            password: data.password,
            phoneNumber: data.phoneNumber,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static updateUser(id: number, data: any): Promise<User> {
        return axios.put(`${import.meta.env.VITE_URL}/user/update/${id}`, {
            username: data.username,
            password: data.password,
            phoneNumber: data.phoneNumber,
            role: data.role,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

}