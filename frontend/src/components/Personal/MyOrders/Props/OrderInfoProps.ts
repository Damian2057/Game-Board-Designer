import {Order} from "../../../../model/order/order";

export interface OrderInfoProps {
    order: Order;
    onClose: () => void;
}