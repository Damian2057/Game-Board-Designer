import {Order} from "../../../../model/order/order";

export interface StatusUpdateProps {
    show: boolean;
    onClose: () => void;
    onSave: (editedOrder: Order | undefined) => void;
    editedOrder: Order | undefined;
}