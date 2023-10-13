import {ElementEntity} from "../../../../model/project/elementEntity";

export interface ElementEditProps {
    onClose: () => void;
    onSave: (element: ElementEntity | null) => void;
    editedElement: ElementEntity | null;
}