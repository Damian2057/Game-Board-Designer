import {Game} from "../model/game/game";
import axios from "axios";
import {Property} from "../model/project/property";

export class PropertyApi {

    static getProperty(id: number): Promise<Property[]> {
        return axios.get(`${import.meta.env.VITE_URL}/property/${id}`)
            .then(res => {
                return res.data;
            });
    }

    static updateProperty(data: any, id: number): Promise<Property> {
        return axios.put(`${import.meta.env.VITE_URL}/property/${id}`, {
            name: data.name,
            value: data.value,
        }).then(res => {
            return res.data;
        });
    }

    static deleteProperty(id: number): Promise<any> {
        return axios.delete(`${import.meta.env.VITE_URL}/property/${id}`)
            .then(res => {
                return res.data;
            });
    }
}