import {Tag} from "../../../../model/game/tag";

export interface TagEditProps {
    show: boolean;
    onClose: () => void;
    onSave: (editedTag: Tag | null) => void;
    editedTag: Tag | null;
}