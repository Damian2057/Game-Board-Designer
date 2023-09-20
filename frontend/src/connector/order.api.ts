import axios from "axios";
import {Order} from "../model/order/order";
import {Game} from "../model/game/game";

export class OrderApi {

    static submitOrder(data: any): Promise<Order> {
        return axios.post(`${import.meta.env.VITE_URL}/order/submit`, {
            phone: data.phone,
            email: data.email,
            description: data.description,
            address: data.address,
            game: data.game,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static getMyOrders(): Promise<Order[]> {
        return axios.get(`${import.meta.env.VITE_URL}/order/my-orders`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static getAllOrders(): Promise<Order[]> {
        return axios.get(`${import.meta.env.VITE_URL}/order/all-orders`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static userUpdateOrder(id: number, data: any): Promise<Order> {
        return axios.put(`${import.meta.env.VITE_URL}/order/${id}`, {
            phone: data.phone,
            email: data.email,
            description: data.description,
            address: data.address,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static claimOrder(id: number): Promise<Order> {
        return axios.put(`${import.meta.env.VITE_URL}/order/management/claim/${id}`, {}, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static getOrdersAsWorker(): Promise<Order[]> {
        return axios.get(`${import.meta.env.VITE_URL}/order/management/my-orders`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static getOrderById(id: number): Promise<Order> {
        return axios.get(`${import.meta.env.VITE_URL}/order/management/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static cancelOrder(id: number): Promise<Order> {
        return axios.delete(`${import.meta.env.VITE_URL}/order/management/cancel/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static advanceUpdateOrder(id: number, data: any): Promise<Order> {
        return axios.put(`${import.meta.env.VITE_URL}/order/management/advance-update/${id}`, {
            phone: data.phone,
            email: data.email,
            description: data.description,
            address: data.address,
            price: data.price,
            worker: data.worker,
            status: data.status,
        }).then(res => {
            return res.data;
        });
    }

    static getWorkerOrdersById(id: number): Promise<Order[]> {
        return axios.get(`${import.meta.env.VITE_URL}/order/management/orders-worker/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static getCustomerOrdersById(id: number): Promise<Order[]> {
        return axios.get(`${import.meta.env.VITE_URL}/order/management/orders-customer/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        });
    }

    static getAvailableStatuses(): Promise<string[]> {
        return axios.get(`${import.meta.env.VITE_URL}/order/management/available/statuses`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            return res.data;
        })
    }

    static getTrendingGames(): Promise<Game[]> {
        return axios.get(`${import.meta.env.VITE_URL}/order/trending-games`).then(res => {
            return res.data;
        })
    }
}