import {Box} from "../../../../model/project/box";

export interface BoxEditProps {
    onClose: () => void;
    onSave: (box: Box | null) => void;
    editedBox: Box | null;
}