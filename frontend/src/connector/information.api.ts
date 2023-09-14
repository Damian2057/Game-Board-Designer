import axios from "axios";

export class InformationApi {

    static getInformation() {
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
        const config = {
            params: queryParams,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };

        return axios.put(`${import.meta.env.VITE_URL}/configuration/update/about`, config)
            .then(res => {
                return res.data;
            });
    }
}