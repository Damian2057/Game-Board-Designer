import axios from "axios";
import {Image} from "../model/image/image";

export class ImageApi {

    static async uploadImage(image: File): Promise<Image | any> {
        const formData = new FormData();
        formData.append("image", image);

        axios.post(`${import.meta.env.VITE_URL}/image/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static async getImage(id: number): Promise<Image> {
        return axios.get(`${import.meta.env.VITE_URL}/image/get/${id}`)
            .then(res => {
                return res.data;
        });
    }

    static getImageUrl(id: number): string {
        return `${import.meta.env.VITE_URL}/image/get/${id}`;
    }

    static async getImages(): Promise<Image[]> {
        return axios.get(`${import.meta.env.VITE_URL}/image/all`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
                return res.data;
            });
    }

    static async deleteImage(id: number): Promise<any> {
        return axios.delete(`${import.meta.env.VITE_URL}/image/delete/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }
}