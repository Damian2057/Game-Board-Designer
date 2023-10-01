import {Order} from "../../../../model/order/order";

export interface OrderEditProps {
    name: string;
    show: boolean;
    onClose: () => void;
    onSave: (editedOrder: Order | null) => void;
    editedOrder: Order
}