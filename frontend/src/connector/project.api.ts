import axios from "axios";
import {Box} from "../model/project/box";
import {Element} from "../model/project/element";
import {Container} from "../model/project/container";
import {Project} from "../model/project/project";
import {Page} from "../model/page";
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

    static updateContainer(id: number, data: any): Promise<Container> {
        return axios.put(`${import.meta.env.VITE_URL}/container/update-container/${id}`, {
            name: data.name,
            description: data.description,
            notes: data.notes,
            quantity: data.quantity,
            imageIds: data.imageIds,
            properties: data.properties,
            elements: data.elements,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
                return res.data;
        });
    }

    static addContainerToProject(id: number, data: any): Promise<Container[]> {
        return axios.post(`${import.meta.env.VITE_URL}/container/add-container/${id}`, {
            name: data.name,
            description: data.description,
            notes: data.notes,
            quantity: data.quantity,
            imageIds: data.imageIds,
            properties: data.properties,
            elements: data.elements,
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

    static getContainer(id: number): Promise<Container> {
        return axios.get(`${import.meta.env.VITE_URL}/container/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
                return res.data;
        });
    }

    static getContainerElements(id: number): Promise<Element[]> {
        return axios.get(`${import.meta.env.VITE_URL}/container/containers-elements/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
                return res.data;
        });
    }

    static deleteContainer(id: number): Promise<any> {
        return axios.delete(`${import.meta.env.VITE_URL}/container/delete-container/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static deleteProjectContainers(id: number): Promise<any> {
        return axios.delete(`${import.meta.env.VITE_URL}/container/delete-containers/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static getAllProjectsForGame(id: number): Promise<Project[]> {
        return axios.get(`${import.meta.env.VITE_URL}/project/all-projects/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static getAllProjects(): Promise<Project[]> {
        return axios.get(`${import.meta.env.VITE_URL}/project/all`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static getProjectContainers(id: number): Promise<Container[]> {
        return axios.get(`${import.meta.env.VITE_URL}/project/containers/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static getProjectElements(id: number): Promise<Element[]> {
        return axios.get(`${import.meta.env.VITE_URL}/project/elements/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static getProjectAllTemplates(): Promise<Project[]> {
        return axios.get(`${import.meta.env.VITE_URL}/project/all-projects-template`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static completeProject(id: number): Promise<Project> {
        return axios.put(`${import.meta.env.VITE_URL}/project/complete-project/${id}`, {}, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static getProject(id: number): Promise<Project> {
        return axios.get(`${import.meta.env.VITE_URL}/project/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static updateProject(id: number, data: any): Promise<Project> {
        return axios.put(`${import.meta.env.VITE_URL}/project/update-project/${id}`, {
            name: data.name,
            description: data.description,
            notes: data.notes,
            games: data.games,
            imageIds: data.imageIds,
            order: data.order,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static createProjectTemplate(data: any): Promise<Project> {
        return axios.post(`${import.meta.env.VITE_URL}/project/create-new-project-template`, {
            name: data.name,
            description: data.description,
            notes: data.notes,
            box: data.box,
            containers: data.containers,
            elements: data.elements,
            games: data.games,
            imageIds: data.imageIds
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static startProject(id: number): Promise<Project> {
        return axios.post(`${import.meta.env.VITE_URL}/project/start-new-project/${id}`, {}, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static assignProjectToMe(id: number): Promise<Project> {
        return axios.put(`${import.meta.env.VITE_URL}/project/assign-project/${id}`, {}, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static assignProjectToUser(id: number, userId: number): Promise<Project> {
        return axios.put(`${import.meta.env.VITE_URL}/project/assign-project-to-user/${id}`, {}, {
            params: {
                userId: userId
            },
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static getMyProjects(): Promise<Project[]> {
        return axios.get(`${import.meta.env.VITE_URL}/project/my-projects`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data
        });
    }

    static getMyCompletedProjects(): Promise<Project[]> {
        return axios.get(`${import.meta.env.VITE_URL}/project/my-completed-projects`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data
        });
    }

    static getMyOnGoingProjects(): Promise<Project[]> {
        return axios.get(`${import.meta.env.VITE_URL}/project/my-ongoing-projects`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data
        });
    }

    static getAllProjectsForUser(id: number): Promise<Project[]> {
        return axios.get(`${import.meta.env.VITE_URL}/project/all-projects/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data
        });
    }

    static getAllCompletedProjectsForUser(id: number): Promise<Project[]> {
        return axios.get(`${import.meta.env.VITE_URL}/project/all-completed-projects/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data
        });
    }

    static getAllOnGoingProjectsForUser(id: number): Promise<Project[]> {
        return axios.get(`${import.meta.env.VITE_URL}/project/all-ongoing-projects/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data
        });
    }

    static findProjectPage(page: number, itemsPerPage: number, data: any): Promise<Page<Project>> {
        return axios.get(`${import.meta.env.VITE_URL}/project/paged`, {
            params: {
                page: page,
                limit: itemsPerPage,
                isTemplate: data.isTemplate ? data.isTemplate : null,
                isCompleted: data.isCompleted ? data.isCompleted : null,
                workerId: data.workerId ? data.workerId : null,
            },
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }
}