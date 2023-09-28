import {Game} from "../model/game/game";
import axios from "axios";
import {Tag} from "../model/game/tag";
import {Component} from "../model/game/component";
import {Page} from "../model/page";

export class GameApi {

    static getAllGames(): Promise<Game[]> {
        return axios.get(`${import.meta.env.VITE_URL}/game/all`)
            .then(res => {
            return res.data;
        });
    }

    static getAllGamesPage(page: number, limit: number, tags: string): Promise<Page<Game>> {
        return axios.get(`${import.meta.env.VITE_URL}/game/all/paged`, {
            params: {
                page: page,
                limit: limit,
                tags: tags
            }
        }).then(res => {
            return res.data;
        });
    }

    static getPagingGames(page: number, limit: number, tags?: string, title?: string): Promise<Page<Game>> {
        return axios.get(`${import.meta.env.VITE_URL}/game/all/paged`, {
            params: {
                page: page,
                limit: limit,
                tags: tags,
                title: title,
            }
        }).then(res => {
            return res.data;
        });
    }

    static findGame(data: any): Promise<Game[]> {
        const queryParams = {};

        for (const key in data) {
            if (data.hasOwnProperty(key) && data[key] !== null) {
                // @ts-ignore
                queryParams[key] = data[key];
            }
        }
        const config = {
            params: queryParams,
        };
        return axios.get(`${import.meta.env.VITE_URL}/game/find/by`, config)
            .then(res => {
            return res.data;
        });
    }

    static createGame(data: any): Promise<Game> {
        return axios.post(`${import.meta.env.VITE_URL}/game/create`, {
            title: data.title,
            description: data.description,
            publicationDate: data.publicationDate,
            price: data.price,
            tags: data.tags,
            currency: data.currency,
            components: data.components,
            imageIds: data.imageIds,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static updateGame(id: number, data: any): Promise<Game> {
        return axios.put(`${import.meta.env.VITE_URL}/game/update/${id}`, {
            title: data.title,
            description: data.description,
            publicationDate: data.publicationDate,
            price: data.price,
            imageIds: data.imageIds,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static deleteGame(id: number): Promise<any> {
        return axios.delete(`${import.meta.env.VITE_URL}/game/delete/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static addTagToGame(gameId: number, tagId: number): Promise<Game> {
        return axios.put(`${import.meta.env.VITE_URL}/game/${gameId}/add_tag/${tagId}`, {}, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static removeTagFromGame(gameId: number, tagId: number): Promise<Game> {
        return axios.put(`${import.meta.env.VITE_URL}/game/${gameId}/remove_tag/${tagId}`, {}, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static getAllTags(): Promise<Tag[]> {
        return axios.get(`${import.meta.env.VITE_URL}/tag/all`).then(res => {
            return res.data;
        });
    }

    static findTag(data: any): Promise<Tag[]> {
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
        return axios.get(`${import.meta.env.VITE_URL}/tag/find`, config).then(res => {
            return res.data;
        });
    }

    static createTag(data: any): Promise<Tag> {
        return axios.post(`${import.meta.env.VITE_URL}/tag/create`, {
            name: data.name,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static updateTag(id: number, data: any): Promise<Tag> {
        return axios.put(`${import.meta.env.VITE_URL}/tag/update/${id}`, {
            name: data.name,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static deleteTag(id: number): Promise<any> {
        return axios.delete(`${import.meta.env.VITE_URL}/tag/delete/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static updateComponent(id: number, data: any): Promise<Component> {
        return axios.put(`${import.meta.env.VITE_URL}/component/update/${id}`, {
            name: data.name,
            quantity: data.quantity,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static getComponentsByGameId(id: number): Promise<Component[]> {
        return axios.get(`${import.meta.env.VITE_URL}/component/all/${id}`)
            .then(res => {
            return res.data;
        });
    }

    static getAllComponents(): Promise<Component[]> {
        return axios.get(`${import.meta.env.VITE_URL}/component/all`)
            .then(res => {
            return res.data;
        });
    }

    static findComponent(data: any): Promise<Component[]> {
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

        return axios.get(`${import.meta.env.VITE_URL}/component/find`, config)
            .then(res => {
                return res.data;
            });
    }

    static deleteComponent(id: number): Promise<any> {
        return axios.delete(`${import.meta.env.VITE_URL}/component/delete/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static createComponentForGame(gameId: number, data: any): Promise<Game> {
        return axios.post(`${import.meta.env.VITE_URL}/component/create/${gameId}`, {
            name: data.name,
            quantity: data.quantity,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }
}