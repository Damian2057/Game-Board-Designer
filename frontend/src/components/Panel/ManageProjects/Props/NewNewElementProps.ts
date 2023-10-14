import {ElementEntity} from "../../../../model/project/elementEntity";

export interface NewNewElementProps {
    onClose: () => void;
    onSave: (element: ElementEntity) => void;
}