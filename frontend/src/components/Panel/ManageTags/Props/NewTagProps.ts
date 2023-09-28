import {Tag} from "../../../../model/game/tag";

export interface NewTagProps {
    show: boolean;
    onClose: () => void;
    onSave: (tag: Tag | null) => void;
}