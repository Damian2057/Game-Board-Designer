import {Order} from "../../../../model/order/order";

export interface OrderEditProps {
    show: boolean;
    onClose: () => void;
    onSave: (editedOrder: Order) => void;
    editedOrder: Order | null;
}