import axios from "axios";
import {User} from "../model/user/user";
import {Page} from "../model/page";

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

    static createUser(data: any): Promise<void> {
        return axios.post(`${import.meta.env.VITE_URL}/user/create`, {
            username: data.username,
            password: data.password,
            email: data.email,
            phoneNumber: data.phoneNumber,
            role: data.role,
            isActive: data.isActive
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static activateUser(code: string): Promise<void> {
        return axios.put(`${import.meta.env.VITE_URL}/user/activate`, {
            code: code,
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

    static findUserPage(page: number, limit: number,data: any): Promise<Page<User>> {
        const queryParams: { [key: string]: any } = {};

        for (const key in data) {
            if (data.hasOwnProperty(key) && data[key] !== null) {
                // @ts-ignore
                queryParams[key] = data[key];
            }
        }
        queryParams['page'] = page;
        queryParams['limit'] = limit;
        const config = {
            params: queryParams,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };

        return axios.get(`${import.meta.env.VITE_URL}/user/find/paged`, config)
            .then(res => {
                return res.data;
            });
    }

    static selfUpdate(username: any, phoneNumber: any, email: any, password: any): Promise<User> {
        return axios.put(`${import.meta.env.VITE_URL}/user/self_update`, {
            username: username,
            password: password,
            phoneNumber: phoneNumber,
            email: email,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static updateUser(id: number, data: any): Promise<User> {
        console.log(data);
        return axios.put(`${import.meta.env.VITE_URL}/user/update/${id}`, {
            username: data.username,
            password: data.password,
            phoneNumber: data.phoneNumber,
            role: data.role,
            email: data.email,
            isActive: data.isActive,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

}