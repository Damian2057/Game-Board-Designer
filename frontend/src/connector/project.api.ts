import axios from "axios";
import {Box} from "../model/project/box";
import {Element} from "../model/project/element";
export class ProjectApi {

    static createBox(data: any): Promise<Box> {
        return axios.post(`${import.meta.env.VITE_URL}/box/create-new-box`, {
            name: data.name,
            description: data.description,
            notes: data.notes,
            properties: data.properties,
            imageIds: data.imageIds,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
                return res.data;
        });
    }

    static getAllBoxes(): Promise<Box[]> {
        return axios.get(`${import.meta.env.VITE_URL}/box/all`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
                return res.data;
        });
    }

    static getBox(id: number): Promise<Box> {
        return axios.get(`${import.meta.env.VITE_URL}/box/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
                return res.data;
        });
    }

    static updateBox(id: number, data: any): Promise<Box> {
        return axios.put(`${import.meta.env.VITE_URL}/box/update/${id}`, {
            name: data.name,
            description: data.description,
            notes: data.notes,
            imageIds: data.imageIds,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
                return res.data;
        });
    }

    static getAvailableStatuses(): Promise<string[]> {
        return axios.get(`${import.meta.env.VITE_URL}/status/available-statuses`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
                return res.data;
        });
    }

    static updateStatus(id: number, status: string, type: string): Promise<any> {
        return axios.put(`${import.meta.env.VITE_URL}/box/update-status/${id}`, {
            status: status,
            type: type,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
                return res.data;
        });
    }

    static getAvailablePriorities(): Promise<string[]> {
        return axios.get(`${import.meta.env.VITE_URL}/priority/available-priorities`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
                return res.data;
        });
    }

    static updatePriority(id: number, priority: string, type: string): Promise<any> {
        return axios.put(`${import.meta.env.VITE_URL}/priority/update-priority/${id}`, {
            priority: priority,
            type: type,
        }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            return res.data;
        });
    }

    static getElement(id: number): Promise<Element> {
        return axios.get(`${import.meta.env.VITE_URL}/element/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
                return res.data;
        });
    }

    static updateElement(id: number, data: any): Promise<Element> {
        return axios.put(`${import.meta.env.VITE_URL}/element/update-element/${id}`, {
            name: data.name,
            description: data.description,
            notes: data.notes,
            quantity: data.quantity,
            imageIds: data.imageIds,
            properties: data.properties,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
                return res.data;
        });
    }

    static addElementToContainer(id: number, data: any): Promise<Element[]> {
        return axios.put(`${import.meta.env.VITE_URL}/element/add-container-element/${id}`, {
            name: data.name,
            description: data.description,
            notes: data.notes,
            quantity: data.quantity,
            imageIds: data.imageIds,
            properties: data.properties,
            status: data.status,
            priority: data.priority,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
                return res.data;
        });
    }

    static addElementToProject(id: number, data: any): Promise<Element[]> {
        return axios.put(`${import.meta.env.VITE_URL}/element/add-project-element/${id}`, {
            name: data.name,
            description: data.description,
            notes: data.notes,
            quantity: data.quantity,
            imageIds: data.imageIds,
            properties: data.properties,
            status: data.status,
            priority: data.priority,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
                return res.data;
        });
    }

    static deleteElement(id: number): Promise<any> {
        return axios.delete(`${import.meta.env.VITE_URL}/element/delete-element/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }
}