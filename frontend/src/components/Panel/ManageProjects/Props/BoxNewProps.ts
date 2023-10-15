import {Box} from "../../../../model/project/box";

export interface BoxNewProps {
    onClose: () => void;
    onSave: (box: Box | null) => void;
    editedBox: Box | null;
}