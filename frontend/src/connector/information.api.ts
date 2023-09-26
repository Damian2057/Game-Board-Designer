import axios from "axios";
import {Information} from "../model/information/information";

export class InformationApi {

    static getInformation(): Promise<Information> {
        return axios.get(`${import.meta.env.VITE_URL}/configuration/about`)
            .then(res => {
                return res.data;
            });
    }

    static updateInformation(data: any) {
        const queryParams = {};
        for (const key in data) {
            if (data.hasOwnProperty(key) && data[key] !== null) {
                // @ts-ignore
                queryParams[key] = data[key];
            }
        }
        return axios.put(`${import.meta.env.VITE_URL}/configuration/update/about`, null, {
            params: queryParams,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }
}