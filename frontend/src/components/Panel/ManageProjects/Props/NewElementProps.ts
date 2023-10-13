import {ElementEntity} from "../../../../model/project/elementEntity";

export interface NewElementProps {
    onClose: () => void;
    onSave: (element: ElementEntity[] | null) => void;
    id: number | null;
}