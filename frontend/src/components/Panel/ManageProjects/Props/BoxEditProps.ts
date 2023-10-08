import {Box} from "../../../../model/project/box";

export interface BoxEditProps {
    show: boolean;
    onClose: () => void;
    onSave: (box: Box | null) => void;
    editedBox: Box | null;
}